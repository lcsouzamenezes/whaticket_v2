import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  ticket: {
    position: "relative"
  },
  pendingTicket: {
    cursor: "unset"
  },
  noTicketsDiv: {
    display: "flex",
    height: "100px",
    margin: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  noTicketsText: {
    textAlign: "center",
    color: "rgb(104, 121, 146)",
    fontSize: "14px",
    lineHeight: "1.4"
  },
  noTicketsTitle: {
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600",
    margin: "0px"
  },
  contactNameWrapper: {
    display: "flex",
    justifyContent: "space-between"
  },
  lastMessageTime: {
    justifySelf: "flex-end"
  },
  closedBadge: {
    alignSelf: "center",
    justifySelf: "flex-end",
    marginRight: 32,
    marginLeft: "auto"
  },
  contactLastMessage: {
    paddingRight: 20
  },
  newMessagesCount: {
    alignSelf: "center",
    marginRight: 8,
    marginLeft: "auto"
  },
  badgeStyle: {
    color: "white",
    backgroundColor: green[500]
  },
  acceptButton: {
    position: "absolute",
    left: "50%"
  },
  ticketQueueColor: {
    flex: "none",
    width: "8px",
    height: "100%",
    position: "absolute",
    top: "0%",
    left: "0%"
  }
}));

export default useStyles;
