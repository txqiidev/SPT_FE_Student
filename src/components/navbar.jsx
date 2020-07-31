import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import auth from "../services/auth";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { withNamespaces } from "react-i18next";

const NavBar = ({ user, history, t, i18n }) => {
  const [selected, setSelected] = useState(
    `/${window.location.pathname.split("/").pop()}`
  );

  const changeLanguage = (lng) => {
    localStorage.setItem("language", lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div style={styles.root}>
      {user ? (
        <div style={styles.nav}>
          <Avatar style={{ marginRight: 10 }}>
            {user.email.charAt(0).toUpperCase()}
          </Avatar>
          <Button
            onClick={() => {
              history.push("/");
              setSelected("/");
            }}
            style={{
              ...styles.buttons,
              ...{ fontWeight: selected === "/" ? 600 : 500 },
            }}
          >
            {t("Planning")}
          </Button>
          <Button
            onClick={() => {
              history.push("/modules");
              setSelected("/modules");
            }}
            style={{
              ...styles.buttons,
              ...{ fontWeight: selected === "/modules" ? 600 : 500 },
            }}
          >
            {t("Modules")}
          </Button>
          <Button
            onClick={() => {
              history.push("/studyProgress");
              setSelected("/studyProgress");
            }}
            style={{
              ...styles.buttons,
              ...{ fontWeight: selected === "/studyProgress" ? 600 : 500 },
            }}
          >
            {t("StudyProgress")}
          </Button>
          <Button onClick={() => auth.logout()} style={styles.buttons}>
            {t("Logout")}
          </Button>
        </div>
      ) : (
        <div />
      )}
      <div style={styles.nav}>
        <span
          onClick={() => changeLanguage("en")}
          style={{
            ...styles.buttonsLanguage,
            ...{
              fontWeight: localStorage.getItem("language") !== "de" ? 600 : 300,
            },
          }}
        >
          EN
        </span>
        <span
          onClick={() => changeLanguage("de")}
          style={{
            ...styles.buttonsLanguage,
            ...{
              fontWeight: localStorage.getItem("language") === "de" ? 600 : 300,
            },
          }}
        >
          DE
        </span>
      </div>
    </div>
  );
};

export default withRouter(withNamespaces()(NavBar));

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 6,
  },
  language: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 6,
  },
  buttons: {
    marginTop: 5,
    marginBottom: 5,
    color: "#313639",
  },
  buttonsLanguage: {
    marginTop: 5,
    marginBottom: 5,
    color: "#313639",
    cursor: "pointer",
    marginLeft: 10,
    fontSize: 16,
  },
};
