import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withNamespaces } from "react-i18next";

const NewSemesterDialog = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.t("NewSemester")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.t("PleaseEnter")}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label={props.t("SemesterNumber")}
          color="secondary"
          fullWidth
          onChange={(event) => props.onChange(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.onClick}
          color="secondary"
          style={{ fontWeight: 600 }}
        >
          {props.t("Add")}
        </Button>
        <Button
          onClick={props.onClose}
          color="secondary"
          style={{ fontWeight: 600 }}
          autoFocus
        >
          {props.t("Cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withNamespaces()(NewSemesterDialog);
