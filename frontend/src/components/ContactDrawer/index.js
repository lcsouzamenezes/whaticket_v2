import React, { useState } from "react";

import {
  Link,
  Paper,
  Button,
  Avatar,
  Drawer,
  InputLabel,
  Typography,
  IconButton
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import ContactModal from "../ContactModal";
import MarkdownWrapper from "../MarkdownWrapper";
import ContactDrawerSkeleton from "../ContactDrawerSkeleton";

import useStyles from "./styles";

import { i18n } from "../../translate/i18n";

const ContactDrawer = ({ open, handleDrawerClose, contact, loading }) => {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      PaperProps={{ style: { position: "absolute" } }}
      BackdropProps={{ style: { position: "absolute" } }}
      ModalProps={{
        container: document.getElementById("drawer-container"),
        style: { position: "absolute" }
      }}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.header}>
        <IconButton onClick={handleDrawerClose}>
          <CloseIcon />
        </IconButton>
        <Typography style={{ justifySelf: "center" }}>
          {i18n.t("contactDrawer.header")}
        </Typography>
      </div>
      {loading ? (
        <ContactDrawerSkeleton classes={classes} />
      ) : (
        <div className={classes.content}>
          <Paper square variant="outlined" className={classes.contactHeader}>
            <Avatar
              alt={contact.name}
              src={contact.profilePicUrl}
              className={classes.contactAvatar}
            ></Avatar>

            <Typography>{contact.name}</Typography>
            <Typography>
              <Link href={`tel:${contact.number}`}>{contact.number}</Link>
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setModalOpen(true)}
            >
              {i18n.t("contactDrawer.buttons.edit")}
            </Button>
          </Paper>
          <Paper square variant="outlined" className={classes.contactDetails}>
            <ContactModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              contactId={contact.id}
            ></ContactModal>
            <Typography variant="subtitle1">
              {i18n.t("contactDrawer.extraInfo")}
            </Typography>
            {contact?.extraInfo?.map(info => (
              <Paper
                key={info.id}
                square
                variant="outlined"
                className={classes.contactExtraInfo}
              >
                <InputLabel>{info.name}</InputLabel>
                <Typography component="div" noWrap style={{ paddingTop: 2 }}>
                  <MarkdownWrapper>{info.value}</MarkdownWrapper>
                </Typography>
              </Paper>
            ))}
          </Paper>
        </div>
      )}
    </Drawer>
  );
};

export default ContactDrawer;
