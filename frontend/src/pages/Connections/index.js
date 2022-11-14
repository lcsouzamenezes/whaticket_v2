import React, { useState, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";

import {
  Table,
  Paper,
  Button,
  SvgIcon,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  IconButton,
  CircularProgress
} from "@material-ui/core";

import {
  CropFree,
  CheckCircle,
  SignalCellular4Bar,
  SignalCellularConnectedNoInternet2Bar,
  SignalCellularConnectedNoInternet0Bar
} from "@material-ui/icons";

import { ReactComponent as QrCodeIcon } from "../../assets/icons/qr-code.svg";

import { green } from "@material-ui/core/colors";

import useStyles from "./styles";

import Title from "../../components/Title";
import MainHeader from "../../components/MainHeader";
import QrcodeModal from "../../components/QrcodeModal";
import CustomToolTip from "../../components/CustomToolTip";
import WhatsAppModal from "../../components/WhatsAppModal";
import MainContainer from "../../components/MainContainer";
import TableRowSkeleton from "../../components/TableRowSkeleton";
import ConfirmationModal from "../../components/ConfirmationModal";
import { EditButton, DeleteButton } from "../../components/ActionButtons";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";

import api from "../../services/api";
import { i18n } from "../../translate/i18n";
import { WhatsAppsContext } from "../../context/WhatsApp/WhatsAppsContext";
import toastError from "../../errors/toastError";

const Connections = () => {
  const classes = useStyles();

  const { whatsApps, loading } = useContext(WhatsAppsContext);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedWhatsApp, setSelectedWhatsApp] = useState(null);

  const confirmationModalInitialState = {
    action: "",
    title: "",
    message: "",
    whatsAppId: "",
    open: false
  };
  const [confirmModalInfo, setConfirmModalInfo] = useState(
    confirmationModalInitialState
  );

  const handleStartWhatsAppSession = async whatsAppId => {
    try {
      await api.post(`/whatsappsession/${whatsAppId}`);
    } catch (err) {
      toastError(err);
    }
  };

  const handleRequestNewQrCode = async whatsAppId => {
    try {
      await api.put(`/whatsappsession/${whatsAppId}`);
    } catch (err) {
      toastError(err);
    }
  };

  const handleOpenWhatsAppModal = () => {
    setSelectedWhatsApp(null);
    setWhatsAppModalOpen(true);
  };

  const handleCloseWhatsAppModal = useCallback(() => {
    setWhatsAppModalOpen(false);
    setSelectedWhatsApp(null);
  }, [setSelectedWhatsApp, setWhatsAppModalOpen]);

  const handleOpenQrModal = whatsApp => {
    setSelectedWhatsApp(whatsApp);
    setQrModalOpen(true);
  };

  const handleCloseQrModal = useCallback(() => {
    setSelectedWhatsApp(null);
    setQrModalOpen(false);
  }, [setQrModalOpen, setSelectedWhatsApp]);

  const handleEditWhatsApp = whatsApp => {
    setSelectedWhatsApp(whatsApp);
    setWhatsAppModalOpen(true);
  };

  const handleOpenConfirmationModal = (action, whatsAppId) => {
    if (action === "disconnect") {
      setConfirmModalInfo({
        action: action,
        title: i18n.t("connections.confirmationModal.disconnectTitle"),
        message: i18n.t("connections.confirmationModal.disconnectMessage"),
        whatsAppId: whatsAppId
      });
    }

    if (action === "delete") {
      setConfirmModalInfo({
        action: action,
        title: i18n.t("connections.confirmationModal.deleteTitle"),
        message: i18n.t("connections.confirmationModal.deleteMessage"),
        whatsAppId: whatsAppId
      });
    }
    setConfirmModalOpen(true);
  };

  const handleSubmitConfirmationModal = async () => {
    if (confirmModalInfo.action === "disconnect") {
      try {
        await api.delete(`/whatsappsession/${confirmModalInfo.whatsAppId}`);
      } catch (err) {
        toastError(err);
      }
    }

    if (confirmModalInfo.action === "delete") {
      try {
        await api.delete(`/whatsapp/${confirmModalInfo.whatsAppId}`);
        toast.success(i18n.t("connections.toasts.deleted"));
      } catch (err) {
        toastError(err);
      }
    }

    setConfirmModalInfo(confirmationModalInitialState);
  };

  const renderActionButtons = whatsApp => {
    return (
      <>
        {whatsApp.status === "qrcode" && (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => handleOpenQrModal(whatsApp)}
            endIcon={<SvgIcon component={QrCodeIcon} />}
          >
            {i18n.t("connections.buttons.qrcode")}
          </Button>
        )}
        {whatsApp.status === "DISCONNECTED" && (
          <>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleStartWhatsAppSession(whatsApp.id)}
            >
              {i18n.t("connections.buttons.tryAgain")}
            </Button>{" "}
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => handleRequestNewQrCode(whatsApp.id)}
            >
              {i18n.t("connections.buttons.newQr")}
            </Button>
          </>
        )}
        {(whatsApp.status === "CONNECTED" ||
          whatsApp.status === "PAIRING" ||
          whatsApp.status === "TIMEOUT") && (
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => {
              handleOpenConfirmationModal("disconnect", whatsApp.id);
            }}
          >
            {i18n.t("connections.buttons.disconnect")}
          </Button>
        )}
        {whatsApp.status === "OPENING" && (
          <Button size="small" variant="outlined" disabled color="default">
            {i18n.t("connections.buttons.connecting")}
          </Button>
        )}
      </>
    );
  };

  const renderStatusToolTips = whatsApp => {
    return (
      <div className={classes.customTableCell}>
        {whatsApp.status === "DISCONNECTED" && (
          <CustomToolTip
            title={i18n.t("connections.toolTips.disconnected.title")}
            content={i18n.t("connections.toolTips.disconnected.content")}
          >
            <SignalCellularConnectedNoInternet0Bar color="secondary" />
          </CustomToolTip>
        )}
        {whatsApp.status === "OPENING" && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
        {whatsApp.status === "qrcode" && (
          <CustomToolTip
            title={i18n.t("connections.toolTips.qrcode.title")}
            content={i18n.t("connections.toolTips.qrcode.content")}
          >
            <CropFree />
          </CustomToolTip>
        )}
        {whatsApp.status === "CONNECTED" && (
          <CustomToolTip title={i18n.t("connections.toolTips.connected.title")}>
            <SignalCellular4Bar style={{ color: green[500] }} />
          </CustomToolTip>
        )}
        {(whatsApp.status === "TIMEOUT" || whatsApp.status === "PAIRING") && (
          <CustomToolTip
            title={i18n.t("connections.toolTips.timeout.title")}
            content={i18n.t("connections.toolTips.timeout.content")}
          >
            <SignalCellularConnectedNoInternet2Bar color="secondary" />
          </CustomToolTip>
        )}
      </div>
    );
  };

  return (
    <MainContainer>
      <ConfirmationModal
        title={confirmModalInfo.title}
        open={confirmModalOpen}
        onClose={setConfirmModalOpen}
        onConfirm={handleSubmitConfirmationModal}
      >
        {confirmModalInfo.message}
      </ConfirmationModal>
      <QrcodeModal
        open={qrModalOpen}
        onClose={handleCloseQrModal}
        whatsAppId={!whatsAppModalOpen && selectedWhatsApp?.id}
      />
      <WhatsAppModal
        open={whatsAppModalOpen}
        onClose={handleCloseWhatsAppModal}
        whatsAppId={!qrModalOpen && selectedWhatsApp?.id}
      />
      <MainHeader>
        <Title>{i18n.t("connections.title")}</Title>
        <MainHeaderButtonsWrapper>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenWhatsAppModal}
          >
            {i18n.t("connections.buttons.add")}
          </Button>
        </MainHeaderButtonsWrapper>
      </MainHeader>
      <Paper className={classes.mainPaper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                {i18n.t("connections.table.name")}
              </TableCell>
              <TableCell align="center">
                {i18n.t("connections.table.status")}
              </TableCell>
              <TableCell align="center">
                {i18n.t("connections.table.session")}
              </TableCell>
              <TableCell align="center">
                {i18n.t("connections.table.lastUpdate")}
              </TableCell>
              <TableCell align="center">
                {i18n.t("connections.table.default")}
              </TableCell>
              <TableCell align="center">
                {i18n.t("connections.table.actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRowSkeleton />
            ) : (
              <>
                {whatsApps?.length > 0 &&
                  whatsApps.map(whatsApp => (
                    <TableRow key={whatsApp.id}>
                      <TableCell align="center">{whatsApp.name}</TableCell>
                      <TableCell align="center">
                        {renderStatusToolTips(whatsApp)}
                      </TableCell>
                      <TableCell align="center">
                        {renderActionButtons(whatsApp)}
                      </TableCell>
                      <TableCell align="center">
                        {format(parseISO(whatsApp.updatedAt), "dd/MM/yy HH:mm")}
                      </TableCell>
                      <TableCell align="center">
                        {whatsApp.isDefault && (
                          <div className={classes.customTableCell}>
                            <CheckCircle style={{ color: green[500] }} />
                          </div>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => handleEditWhatsApp(whatsApp)}
                        >
                          <EditButton />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={e => {
                            handleOpenConfirmationModal("delete", whatsApp.id);
                          }}
                        >
                          <DeleteButton />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
      </Paper>
    </MainContainer>
  );
};

export default Connections;
