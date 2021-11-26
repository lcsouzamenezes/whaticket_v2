import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    mainWrapper: {
      background: "#eee",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      [theme.breakpoints.down("sm")]: {
        position: "fixed",
        bottom: 0,
        width: "100%",
      },
    },
    newMessageBox: {
      background: "#eee",
      width: "100%",
      display: "flex",
      padding: "7px",
      alignItems: "center",
    },
    messageInputWrapper: {
      padding: 6,
      marginRight: 7,
      background: "#fff",
      display: "flex",
      borderRadius: 20,
      flex: 1,
      position: "relative",
    },
    messageInput: {
      paddingLeft: 10,
      flex: 1,
      border: "none",
    },
    sendMessageIcons: {
      color: "grey",
    },
    uploadInput: {
      display: "none",
    },
    viewMediaInputWrapper: {
      display: "flex",
      padding: "10px 13px",
      position: "relative",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#eee",
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    },
    emojiBox: {
      position: "absolute",
      bottom: 63,
      width: 40,
      borderTop: "1px solid #e8e8e8",
    },
    circleLoading: {
      color: green[500],
      opacity: "70%",
      position: "absolute",
      top: "20%",
      left: "50%",
      marginLeft: -12,
    },
    audioLoading: {
      color: green[500],
      opacity: "70%",
    },
    recorderWrapper: {
      display: "flex",
      alignItems: "center",
      alignContent: "middle",
    },
    cancelAudioIcon: {
      color: "red",
    },
    sendAudioIcon: {
      color: "green",
    },
    replyginMsgWrapper: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 8,
      paddingLeft: 73,
      paddingRight: 7,
    },
    replyginMsgContainer: {
      flex: 1,
      marginRight: 5,
      overflowY: "hidden",
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      borderRadius: "7.5px",
      display: "flex",
      position: "relative",
    },
    replyginMsgBody: {
      padding: 10,
      height: "auto",
      display: "block",
      whiteSpace: "pre-wrap",
      overflow: "hidden",
    },
    replyginContactMsgSideColor: {
      flex: "none",
      width: "4px",
      backgroundColor: "#35cd96",
    },
    replyginSelfMsgSideColor: {
      flex: "none",
      width: "4px",
      backgroundColor: "#6bcbef",
    },
    messageContactName: {
      display: "flex",
      color: "#6bcbef",
      fontWeight: 500,
    },
    messageQuickAnswersWrapper: {
      margin: 0,
      position: "absolute",
      bottom: "50px",
      background: "#ffffff",
      padding: "2px",
      border: "1px solid #CCC",
      left: 0,
      width: "100%",
      "& li": {
        listStyle: "none",
        "& a": {
          display: "block",
          padding: "8px",
          textOverflow: "ellipsis",
          overflow: "hidden",
          maxHeight: "32px",
          "&:hover": {
            background: "#F1F1F1",
            cursor: "pointer",
          },
        },
      },
    },
  }));

export default useStyles;
