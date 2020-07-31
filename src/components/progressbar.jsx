import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withNamespaces } from "react-i18next";

const useStyles = makeStyles({
  root: {
    width: "33%",
  },
  value: {
    fontWeight: 700,
    color: (props) => props.barColor,
  },
  titel: {
    fontWeight: 600,
    color: "#ABABAB",
    fontSize: 12,
    marginBottom: 5,
  },
  rootBar: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#F3F3F3",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: (props) => props.barColor,
  },
});

const ProgressBars = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      {props.title && (
        <p className={classes.titel}>{props.t("YourProgress")}</p>
      )}
      <span className={classes.value}>{props.value}</span>{" "}
      <span style={{ color: "#ABABAB" }}>{` / ${props.total} ECTS`}</span>
      <LinearProgress
        classes={{
          root: classes.rootBar,
          colorPrimary: classes.colorPrimary,
          bar: classes.bar,
        }}
        variant="determinate"
        value={(props.value / props.total) * 100}
      />
    </div>
  );
};

export default withNamespaces()(ProgressBars);
