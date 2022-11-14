import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  chatContainer: {
    flex: 1,
    height: `calc(100% - 48px)`,
    overflowY: "hidden"
  },
  chatPapper: {
    display: "flex",
    height: "100%"
  },
  contactsWrapper: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    overflowY: "hidden"
  },
  contactsWrapperSmall: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    overflowY: "hidden",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  messagessWrapper: {
    display: "flex",
    height: "100%",
    flexDirection: "column"
  },
  welcomeMsg: {
    backgroundColor: "#eee",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
    borderRadius: 0
  },
  ticketsManager: {},
  ticketsManagerClosed: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}));

export default useStyles;
