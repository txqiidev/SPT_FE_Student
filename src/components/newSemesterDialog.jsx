import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const NewSemesterDialog = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{"New Semester"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {"Please enter a semester number"}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Semester Number"
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
          Add
        </Button>
        <Button
          onClick={props.onClose}
          color="secondary"
          style={{ fontWeight: 600 }}
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewSemesterDialog;
