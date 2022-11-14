import React from "react";

import { Tooltip, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const CustomToolTip = ({ title, content, children }) => {
  const useStyles = makeStyles(theme => ({
    mainContainer: {
      flex: 1,
      padding: 0,
      height: "100%"
    },
    contentWrapper: {
      height: "100%",
      overflowY: "hidden",
      display: "flex",
      flexDirection: "column"
    }
  }));

  const classes = useStyles();

  return (
    <Tooltip
      arrow
      classes={{
        tooltip: classes.tooltip,
        popper: classes.tooltipPopper
      }}
      title={
        <React.Fragment>
          <Typography gutterBottom color="inherit">
            {title}
          </Typography>
          {content && <Typography>{content}</Typography>}
        </React.Fragment>
      }
    >
      {children}
    </Tooltip>
  );
};

export default CustomToolTip;
