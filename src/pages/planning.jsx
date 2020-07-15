import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Module from "../components/module";

const Home = (props) => {
  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <span>zügs und sache</span>
      </div>
      <div style={styles.main}>
        {props.user.plan.map((p) => (
          <div key={p.idSemester} style={styles.semester}>
            <div style={styles.semesterHeader}>
              <span style={{ fontWeight: 600, fontSize: 16 }}>
                Semester {p.idSemester}
              </span>
              <span>
                {props.modules.length > 0 &&
                  props.modules
                    .filter((m) =>
                      p.modules.find(
                        (module) => m.idModule === module.Module_idModule
                      )
                    )
                    .reduce((r, a) => {
                      return r + a.ECTSCredits;
                    }, 0)}
              </span>
            </div>
            {props.modules.length > 0 &&
              p.modules.map((m) => (
                <Module
                  key={m.Module_idModule}
                  module={props.modules.find(
                    (module) => module.idModule === m.Module_idModule
                  )}
                  style={{ marginBottom: 10 }}
                ></Module>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modules: state.modules.modules,
    moduleGroups: state.moduleGroups.moduleGroups,
    user: state.user,
  };
};

export default connect(mapStateToProps)(Home);

const styles = {
  root: {
    width: "90%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  main: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
    width: "100%",
    marginTop: 30,
  },
  semester: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 320,
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    margin: 10,
  },
  semesterHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    backgroundColor: "#F8F8F8",
    marginBottom: 20,
    marginTop: 10,
  },
};
