import React from "react";
import { connect } from "react-redux";
import ModuleGroupProgress from "../components/moduleGroupProgress";
import color from "../services/color";
import ProgressBar from "../components/progressbar";

const StudyProgress = (props) => {
  return (
    <div style={styles.root}>
      {props.moduleGroups.map((mg) => (
        <ModuleGroupProgress
          key={mg.idModuleGroup}
          moduleGroup={mg}
          modules={props.modules.filter(
            (m) => m.ModuleGroup_idModuleGroup === mg.idModuleGroup
          )}
          style={{ marginRight: 20, marginBottom: 20 }}
          barColor={color.getColors(mg.idModuleGroup)}
        />
      ))}

      <div style={styles.total}>
        <span style={{ fontSize: 23, fontWeight: 600 }}>Total</span>
        <ProgressBar
          barColor="#FFEA00"
          value={props.modules
            .filter((m) =>
              props.user.modulesPlaned.find(
                (module) =>
                  m.idModule === module.idModule && module.hasPassed === 1
              )
            )
            .reduce((r, a) => {
              return r + a.ECTSCredits;
            }, 0)}
          total={
            props.studyprogramme.length > 0 &&
            props.studyprogramme.find((s) => s.idStudyProgramme === 4).Credits
          }
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modules: state.modules.modules,
    moduleGroups: state.moduleGroups.moduleGroups,
    user: state.user,
    studyprogramme: state.studyprogramme.studyprogramme,
  };
};

export default connect(mapStateToProps)(StudyProgress);

const styles = {
  root: {
    width: "75%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  total: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    color: "#313639",
  },
};
