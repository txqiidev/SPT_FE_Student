import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const CustomButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      color={props.color}
      onClick={(value) => props.onClick(value)}
      style={props.style}
    >
      {props.label}
    </Button>
  );
};

export default CustomButton;

const useStyles = makeStyles({
  button: {
    // maxWidth: 80,
    fontWeight: 600,
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#C7C7C7",
    },
  },
});
