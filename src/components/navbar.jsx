import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import auth from "../services/auth";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

const NavBar = ({ user, history }) => {
  const [items] = useState([
    { link: "/", label: "Planning" },
    { link: "/modules", label: "Modules" },
    { link: "/studyProgress", label: "Study Progress" },
  ]);
  const [selected, setSelected] = useState(
    `/${window.location.pathname.split("/").pop()}`
  );

  return (
    user && (
      <div style={styles.root}>
        <Avatar style={{ marginRight: 10 }}>
          {user.email.charAt(0).toUpperCase()}
        </Avatar>
        {items.map((item) => (
          <Button
            key={item.label}
            onClick={() => {
              history.push(item.link);
              setSelected(item.link);
            }}
            style={{
              ...styles.buttons,
              ...{ fontWeight: selected === item.link ? 600 : 500 },
            }}
          >
            {item.label}
          </Button>
        ))}
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 6,
  },
  buttons: {
    marginTop: 5,
    marginBottom: 5,
    color: "#313639",
  },
  buttonClicked: {
    fontWeight: 600,
  },
};
