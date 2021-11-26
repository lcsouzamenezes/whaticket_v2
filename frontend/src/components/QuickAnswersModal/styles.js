import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
      flexWrap: "wrap",
    },
    textField: {
      marginRight: theme.spacing(1),
      width: "100%",
    },
  
    btnWrapper: {
      position: "relative",
    },
  
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
    textQuickAnswerContainer: {
      width: "100%",
    },
  }));

export default useStyles;
