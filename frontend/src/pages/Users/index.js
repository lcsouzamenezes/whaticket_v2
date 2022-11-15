import React, { useState, useEffect, useReducer, useContext } from "react";
import { toast } from "react-toastify";
import openSocket from "socket.io-client";

import {
  Chip,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  InputAdornment
} from "@material-ui/core";

import {
  SupervisorAccountRounded as AdminIcon,
  PersonRounded as UserIcon
} from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

import Title from "../../components/Title";
import UserModal from "../../components/UserModal";
import MainHeader from "../../components/MainHeader";
import MainContainer from "../../components/MainContainer";
import TableRowSkeleton from "../../components/TableRowSkeleton";
import ConfirmationModal from "../../components/ConfirmationModal";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";
import {
  EditButton,
  DeleteButton,
  Search
} from "../../components/ActionButtons";

import api from "../../services/api";
import { AuthContext } from "../../context/Auth/AuthContext";
import { i18n } from "../../translate/i18n";
import toastError from "../../errors/toastError";

const reducer = (state, action) => {
  if (action.type === "LOAD_USERS") {
    const users = action.payload;
    const newUsers = [];

    users.forEach(user => {
      const userIndex = state.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        state[userIndex] = user;
      } else {
        newUsers.push(user);
      }
    });

    return [...state, ...newUsers];
  }

  if (action.type === "UPDATE_USERS") {
    const user = action.payload;
    const userIndex = state.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
      state[userIndex] = user;
      return [...state];
    } else {
      return [user, ...state];
    }
  }

  if (action.type === "DELETE_USER") {
    const userId = action.payload;

    const userIndex = state.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      state.splice(userIndex, 1);
    }
    return [...state];
  }

  if (action.type === "RESET") {
    return [];
  }
};

const useStyles = makeStyles(theme => ({
  mainPaper: {
    flex: 1,
    padding: theme.spacing(1),
    overflowY: "scroll",
    ...theme.scrollbarStyles
  }
}));

const Users = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParam, setSearchParam] = useState("");
  const [users, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({ type: "RESET" });
    setPageNumber(1);
  }, [searchParam]);

  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      const fetchUsers = async () => {
        try {
          const { data } = await api.get("/users/", {
            params: { searchParam, pageNumber }
          });
          const users = data.users.filter(users => {
            return user?.customer === "master"
              ? users
              : users?.name === user?.name ||
                  users?.email === user?.email ||
                  users?.customer === user?.id.toString();
          });
          dispatch({ type: "LOAD_USERS", payload: users });
          setHasMore(data.hasMore);
          setLoading(false);
        } catch (err) {
          toastError(err);
        }
      };
      fetchUsers();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchParam, pageNumber, user.customer, user.name, user.email, user.id]);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_BACKEND_URL);

    socket.on("user", data => {
      if (data.action === "update" || data.action === "create") {
        dispatch({ type: "UPDATE_USERS", payload: data.user });
      }

      if (data.action === "delete") {
        dispatch({ type: "DELETE_USER", payload: +data.userId });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleOpenUserModal = () => {
    setSelectedUser(null);
    setUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setSelectedUser(null);
    setUserModalOpen(false);
  };

  const handleSearch = event => {
    setSearchParam(event.target.value.toLowerCase());
  };

  const handleEditUser = user => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  const handleDeleteUser = async userId => {
    try {
      await api.delete(`/users/${userId}`);
      toast.success(i18n.t("users.toasts.deleted"));
    } catch (err) {
      toastError(err);
    }
    setDeletingUser(null);
    setSearchParam("");
    setPageNumber(1);
  };

  const loadMore = () => {
    setPageNumber(prevState => prevState + 1);
  };

  const handleScroll = e => {
    if (!hasMore || loading) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - (scrollTop + 100) < clientHeight) {
      loadMore();
    }
  };

  return (
    <MainContainer>
      <ConfirmationModal
        title={
          deletingUser &&
          `${i18n.t("users.confirmationModal.deleteTitle")} ${
            deletingUser.name
          }?`
        }
        open={confirmModalOpen}
        onClose={setConfirmModalOpen}
        onConfirm={() => handleDeleteUser(deletingUser.id)}
      >
        {i18n.t("users.confirmationModal.deleteMessage")}
      </ConfirmationModal>
      <UserModal
        open={userModalOpen}
        onClose={handleCloseUserModal}
        aria-labelledby="form-dialog-title"
        userId={selectedUser && selectedUser.id}
      />
      <MainHeader>
        <Title>{i18n.t("users.title")}</Title>
        <MainHeaderButtonsWrapper>
          <TextField
            placeholder={i18n.t("contacts.searchPlaceholder")}
            type="search"
            value={searchParam}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search style={{ color: "gray" }} />
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenUserModal}
          >
            {i18n.t("users.buttons.add")}
          </Button>
        </MainHeaderButtonsWrapper>
      </MainHeader>
      <Paper
        className={classes.mainPaper}
        variant="outlined"
        onScroll={handleScroll}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">{i18n.t("users.table.name")}</TableCell>
              <TableCell align="center">
                {i18n.t("users.table.email")}
              </TableCell>
              <TableCell align="center">
                {i18n.t("users.table.profile")}
              </TableCell>
              <TableCell align="center">
                {i18n.t("users.table.actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    {user.profile === "admin" ? (
                      <Chip
                        icon={<AdminIcon />}
                        color="primary"
                        label={user.profile}
                      />
                    ) : (
                      <Chip
                        icon={<UserIcon />}
                        variant="outlined"
                        color="primary"
                        label={user.profile}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleEditUser(user)}
                    >
                      <EditButton />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={e => {
                        setConfirmModalOpen(true);
                        setDeletingUser(user);
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

export default Users;
