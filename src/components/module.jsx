import React from "react";
import WarningIcon from "@material-ui/icons/Warning";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import { Tooltip } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import { connect } from "react-redux";
import color from "../services/color";

const Module = (props) => {
  return (
    <div
      key={props.module.idModule}
      style={{
        ...styles.rcorners,
        ...{
          backgroundColor: color.getColors(
            props.module.ModuleGroup_idModuleGroup
          ),
        },
        ...props.style,
      }}
    >
      <div style={styles.header}>
        {props.module.HasPrerequisite === 1 ? (
          <Tooltip
            title={
              <div>
                <p style={{ fontSize: 13 }}>
                  Module has prerequisite module(s)
                </p>
                {props.module.prerequisiteModule.map((mp) => (
                  <p
                    key={mp.Module_idModule_Prerequisite}
                    style={{ fontSize: 13 }}
                  >
                    - {mp.Name}
                  </p>
                ))}
              </div>
            }
            placement="top"
            TransitionComponent={Zoom}
          >
            <WarningIcon />
          </Tooltip>
        ) : (
          <div />
        )}

        {/* <MoreVertIcon style={{ cursor: "pointer" }} /> */}
        <div style={styles.button}>
          <AddIcon style={{ fontSize: 18 }} />
        </div>
      </div>
      <div style={styles.center}>
        <span>{props.module.Name}</span>
      </div>
      <div style={styles.footer}>
        <span>
          {
            props.locations.locations.find(
              (l) => l.idLocation === props.module.Location_idLocation
            ).Name
          }
        </span>
        <span>{props.module.ECTSCredits}</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
  };
};

export default connect(mapStateToProps)(Module);

const styles = {
  rcorners: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "15px",
    // backgroundColor: "#FCA381",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    width: 300,
    height: 120,
  },
  header: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
    width: "95%",
  },
  center: {
    flex: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "blue",
    width: "100%",
    fontWeight: 500,
    fontSize: 15,
    textAlign: "center",
    cursor: "pointer",
  },
  footer: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "green",
    width: "95%",
    fontSize: 13,
    fontWeight: 400,
    color: "#313639",
  },
  button: {
    backgroundColor: "#FFFFFF",
    border: "1.5px solid #F3F3F3",
    boxSizing: "border-box",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: 5,
    width: 25,
    height: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
  },
};
