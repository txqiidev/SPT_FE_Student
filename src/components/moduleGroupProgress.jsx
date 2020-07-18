import React, { useState } from "react";
import { connect } from "react-redux";
import Module from "./module";
import ProgressBar from "./progressbar";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { hasPassed } from "../redux/user/actions";
import Alert from "./alert";

const ModuleGroupProgress = (props) => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hasPassed, setHasPassed] = React.useState(0);
  const [currentModule, setCurrentModule] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const getHasPassedValue = (module) => {
    if (
      props.user.modulesPlaned.some((mp) => mp.idModule === module.idModule)
    ) {
      return props.user.modulesPlaned.find(
        (m) => m.idModule === module.idModule
      ).hasPassed;
    } else {
      return 0;
    }
  };

  const onClickHandlerPassModule = () => {
    setAnchorEl(null);
    props.hasPassed(props.user.email, currentModule, hasPassed === 0 ? 1 : 0);
    setAlert({
      open: true,
      message:
        hasPassed === 0
          ? `Module "${
              props.modules.find((m) => m.idModule === currentModule).Name
            }" flagged as passed!`
          : `Removed flag "passed" for "${
              props.modules.find((m) => m.idModule === currentModule).Name
            }"!`,
      severity: "success",
    });
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  return (
    <div key={props.moduleGroup.idModuleGroup} style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft} onClick={() => setOpen(!open)}>
          {open ? (
            <KeyboardArrowUpIcon style={{ marginRight: 10 }} />
          ) : (
            <KeyboardArrowDownIcon style={{ marginRight: 10 }} />
          )}
          <span style={{ fontSize: 19, fontWeight: 500 }}>
            {props.moduleGroup.Name}
          </span>
        </div>
        <ProgressBar
          barColor={props.barColor}
          value={props.modules
            .filter(
              (m) =>
                props.user.modulesPlaned.find(
                  (module) =>
                    m.idModule === module.idModule && module.hasPassed === 1
                ) &&
                m.ModuleGroup_idModuleGroup === props.moduleGroup.idModuleGroup
            )
            .reduce((r, a) => {
              return r + a.ECTSCredits;
            }, 0)}
          total={props.moduleGroup.MinRequiredCredits}
        />
      </div>
      <div style={styles.main}>
        {open &&
          props.modules.map((module) => (
            <Module
              key={module.idModule}
              module={module}
              style={props.style}
              onClick={() => props.onClick(module)}
              onClickOpen={(value) => {
                setCurrentModule(module.idModule);
                setAnchorEl(value);
                setHasPassed(getHasPassedValue(module));
              }}
              hasPassed={getHasPassedValue(module)}
            ></Module>
          ))}
      </div>
      <Alert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClick={(reason) => handleClose(reason)}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => onClickHandlerPassModule()}>
          {hasPassed === 0 ? "PASSED" : "UNDO PASSED"}
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hasPassed: (email, idModule, hp) =>
      dispatch(hasPassed(email, idModule, hp)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModuleGroupProgress);

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    color: "#313639",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "#313639",
    cursor: "pointer",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
    marginBottom: 40,
  },
};
