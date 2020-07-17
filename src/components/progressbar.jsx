import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#FFEA00",
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    width: "33%",
  },
  value: {
    fontWeight: 700,
    color: "#FFEA00",
  },
  titel: {
    fontWeight: 600,
    color: "#ABABAB",
    fontSize: 12,
    marginBottom: 5,
  },
});

const ProgressBars = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p className={classes.titel}>Your Progress</p>
      <span className={classes.value}>{props.value}</span>{" "}
      <span style={{ color: "#ABABAB" }}>{` / ${props.total} ECTS`}</span>
      <BorderLinearProgress
        variant="determinate"
        value={(props.value / props.total) * 100}
      />
    </div>
  );
};

export default ProgressBars;
