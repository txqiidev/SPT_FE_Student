import React from "react";
import Module from "./module";
import color from "../services/color";

const ModuleGroup = (props) => {
  return (
    <div key={props.moduleGroup.idModuleGroup} style={styles.container}>
      <div style={styles.header}>
        <span style={{ fontSize: 19, fontWeight: 500 }}>
          {props.moduleGroup.Name}
        </span>
        <span>{props.ECTS} ECTS</span>
      </div>
      <div style={styles.main}>
        {props.modules.map((module) => (
          <Module
            key={module.idModule}
            module={module}
            color={color.getColors()[props.moduleGroup.Name]}
          ></Module>
        ))}
      </div>
    </div>
  );
};

export default ModuleGroup;

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
