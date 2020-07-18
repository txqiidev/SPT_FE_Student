import React from "react";
import Button from "@material-ui/core/Button";
import auth from "../services/auth";
import { withRouter } from "react-router-dom";

const NavBar = ({ user, history }) => {
  return (
    user && (
      <div style={styles.root}>
        <p>{user.email}</p>
        <Button onClick={() => history.push("/")} style={styles.buttons}>
          Planning
        </Button>
        <Button onClick={() => history.push("/modules")} style={styles.buttons}>
          Modules
        </Button>
        <Button
          onClick={() => history.push("/studyProgress")}
          style={styles.buttons}
        >
          Study Progress
        </Button>
        <Button onClick={() => auth.logout()} style={styles.buttons}>
          LOGOUT
        </Button>
      </div>
    )
  );
};

export default withRouter(NavBar);

const styles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  buttons: {
    fontWeight: 500,
    marginTop: 5,
    marginBottom: 5,
    color: "#313639",
  },
  buttonClicked: {
    fontWeight: 600,
  },
};
