import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={(reason) => props.onClick(reason)}
    >
      <MuiAlert
        onClose={(reason) => props.onClick(reason)}
        severity={props.severity}
        elevation={6}
        variant="filled"
      >
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
