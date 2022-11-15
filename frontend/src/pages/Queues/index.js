import React, { useEffect, useReducer, useState, useContext } from "react";
import { toast } from "react-toastify";
import openSocket from "socket.io-client";

import {
  Chip,
  Paper,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import Title from "../../components/Title";
import MainHeader from "../../components/MainHeader";
import QueueModal from "../../components/QueueModal";
import MainContainer from "../../components/MainContainer";
import TableRowSkeleton from "../../components/TableRowSkeleton";
import ConfirmationModal from "../../components/ConfirmationModal";
import { EditButton, DeleteButton } from "../../components/ActionButtons";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";

import api from "../../services/api";
import { i18n } from "../../translate/i18n";
import { AuthContext } from "../../context/Auth/AuthContext";
import toastError from "../../errors/toastError";

const useStyles = makeStyles(theme => ({
  mainPaper: {
    flex: 1,
    padding: theme.spacing(1),
    overflowY: "scroll",
    ...theme.scrollbarStyles
  },
  customTableCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const reducer = (state, action) => {
  if (action.type === "LOAD_QUEUES") {
    const queues = action.payload;
    const newQueues = [];

    queues.forEach(queue => {
      const queueIndex = state.findIndex(q => q.id === queue.id);
      if (queueIndex !== -1) {
        state[queueIndex] = queue;
      } else {
        newQueues.push(queue);
      }
    });

    return [...state, ...newQueues];
  }

  if (action.type === "UPDATE_QUEUES") {
    const queue = action.payload;
    const queueIndex = state.findIndex(u => u.id === queue.id);

    if (queueIndex !== -1) {
      state[queueIndex] = queue;
      return [...state];
    } else {
      return [queue, ...state];
    }
  }

  if (action.type === "DELETE_QUEUE") {
    const queueId = action.payload;
    const queueIndex = state.findIndex(q => q.id === queueId);
    if (queueIndex !== -1) {
      state.splice(queueIndex, 1);
    }
    return [...state];
  }

  if (action.type === "RESET") {
    return [];
  }
};

const Queues = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [queues, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(false);
  const [queueModalOpen, setQueueModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedQueue, setSelectedQueue] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/queue");
        const queues = data.filter(queues => {
          return user?.customer === "master"
            ? queues
            : queues?.userId === user?.id;
        });
        dispatch({ type: "LOAD_QUEUES", payload: queues });

        setLoading(false);
      } catch (err) {
        toastError(err);
        setLoading(false);
      }
    })();
  }, [user.customer, user.email, user.id, user.name]);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_BACKEND_URL);

    socket.on("queue", data => {
      if (data.action === "update" || data.action === "create") {
        dispatch({ type: "UPDATE_QUEUES", payload: data.queue });
      }

      if (data.action === "delete") {
        dispatch({ type: "DELETE_QUEUE", payload: data.queueId });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleOpenQueueModal = () => {
    setQueueModalOpen(true);
    setSelectedQueue(null);
  };

  const handleCloseQueueModal = () => {
    setQueueModalOpen(false);
    setSelectedQueue(null);
  };

  const handleEditQueue = queue => {
    setSelectedQueue(queue);
    setQueueModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setConfirmModalOpen(false);
    setSelectedQueue(null);
  };

  const handleDeleteQueue = async queueId => {
    try {
      await api.delete(`/queue/${queueId}`);
      toast.success(i18n.t("queueModal.toasts.deleted"));
    } catch (err) {
      toastError(err);
    }
    setSelectedQueue(null);
  };

  return (
    <MainContainer>
      <ConfirmationModal
        title={
          selectedQueue &&
          `${i18n.t("queues.confirmationModal.deleteTitle")} ${
            selectedQueue.name
          }?`
        }
        open={confirmModalOpen}
        onClose={handleCloseConfirmationModal}
        onConfirm={() => handleDeleteQueue(selectedQueue.id)}
      >
        {i18n.t("queues.confirmationModal.deleteMessage")}
      </ConfirmationModal>
      <QueueModal
        open={queueModalOpen}
        onClose={handleCloseQueueModal}
        queueId={selectedQueue?.id}
      />
      <MainHeader>
        <Title>{i18n.t("queues.title")}</Title>
        <MainHeaderButtonsWrapper>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenQueueModal}
          >
            {i18n.t("queues.buttons.add")}
          </Button>
        </MainHeaderButtonsWrapper>
      </MainHeader>
      <Paper className={classes.mainPaper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                {i18n.t("queues.table.name")}
              </TableCell>
              <TableCell align="center">
                {i18n.t("queues.table.color")}
              </TableCell>
              <TableCell align="center">
                {i18n.t("queues.table.greeting")}
              </TableCell>
              <TableCell align="center">
                {i18n.t("queues.table.actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {queues.map(queue => (
                <TableRow key={queue.id}>
                  <TableCell align="center">{queue.name}</TableCell>
                  <TableCell align="center">
                    <div className={classes.customTableCell}>
                      <Chip
                        style={{
                          backgroundColor: queue.color,
                          width: 50,
                          height: 20,
                          alignSelf: "center"
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={classes.customTableCell}>
                      <Typography
                        style={{ width: 300, align: "center" }}
                        noWrap
                        variant="body2"
                      >
                        {queue.greetingMessage}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleEditQueue(queue)}
                    >
                      <EditButton />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedQueue(queue);
                        setConfirmModalOpen(true);
                      }}
                    >
                      <DeleteButton />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {loading && <TableRowSkeleton columns={4} />}
            </>
          </TableBody>
        </Table>
      </Paper>
    </MainContainer>
  );
};

export default Queues;
