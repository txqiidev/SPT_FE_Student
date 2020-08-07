import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CustomButton from "./button";
import { withNamespaces } from "react-i18next";

const DeleteDialog = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.label}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.text}</DialogContentText>
        <div style={styles.buttons}>
          <CustomButton
            variant="contained"
            color="primary"
            label={props.t("Fulltime")}
            onClick={() => props.onClick(1)}
            style={styles.button}
          />
          <CustomButton
            variant="contained"
            color="primary"
            label={props.t("Parttime")}
            onClick={() => props.onClick(2)}
            style={styles.button}
          />
          <CustomButton
            variant="contained"
            color="primary"
            label={props.t("Scratch")}
            onClick={() => props.onClick(3)}
            style={styles.button}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.onClick}
          color="secondary"
          style={{ fontWeight: 600 }}
        >
          Yes
        </Button>
        <Button
          onClick={props.onClose}
          color="secondary"
          style={{ fontWeight: 600 }}
          autoFocus
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withNamespaces()(DeleteDialog);

const styles = {
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    height: 120,
    width: 120,
  },
};
