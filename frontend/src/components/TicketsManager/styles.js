import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  ticketsWrapper: {
    position: "relative",
    display: "flex",
    height: "100%",
    flexDirection: "column",
    overflow: "hidden",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  tabsHeader: {
    flex: "none",
    backgroundColor: "#eee"
  },
  tab: {
    minWidth: 120,
    width: 120
  },
  ticketOptionsBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fafafa",
    padding: theme.spacing(1)
  },
  serachInputWrapper: {
    flex: 1,
    background: "#fff",
    display: "flex",
    borderRadius: 40,
    padding: 4,
    marginRight: theme.spacing(1)
  },
  searchIcon: {
    color: "grey",
    marginLeft: 6,
    marginRight: 6,
    alignSelf: "center"
  },
  searchInput: {
    flex: 1,
    border: "none",
    borderRadius: 30
  }
}));

export default useStyles;
