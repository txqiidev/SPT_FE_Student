import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const BasicButtonGroup = (props) => {
  const classes = useStyles();

  return (
    <ButtonGroup
      variant="contained"
      color="primary"
      aria-label="contained primary button group"
    >
      {props.values.map((v) => (
        <Button
          key={v}
          className={
            props.selected === v ? classes.selected : classes.notSelected
          }
          onClick={() => props.onClick(v)}
        >
          {v}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default BasicButtonGroup;

const useStyles = makeStyles({
  selected: {
    fontWeight: 600,
    backgroundColor: "#E0E0E0",
    "&:hover": {
      backgroundColor: "#E0E0E0",
    },
  },
  notSelected: {
    fontWeight: 500,
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "#E0E0E0",
    },
  },
});
