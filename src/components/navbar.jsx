import React from "react";
import Button from "@material-ui/core/Button";
import auth from "../services/auth";

const NavBar = ({ user }) => {
  const onClickHandler = () => {
    console.log("übis");
  };

  return (
    user && (
      <div style={styles.root}>
        <p>{user.email}</p>
        <Button onClick={() => onClickHandler()} style={styles.buttons}>
          Planning
        </Button>
        <Button onClick={() => onClickHandler()} style={styles.buttons}>
          Modules
        </Button>
        <Button onClick={() => onClickHandler()} style={styles.buttons}>
          Study Progress
        </Button>
        <Button onClick={() => auth.logout()} style={styles.buttons}>
          LOGOUT
        </Button>
      </div>
    )
  );
};

export default NavBar;

const styles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: "auto",
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
