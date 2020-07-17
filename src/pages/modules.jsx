import React, { useState, useEffect } from "react";
import ButtonGroup from "../components/buttonGroup";
import Table from "../components/table";
import { connect } from "react-redux";
import ModuleGroup from "../components/moduleGroup";
import { savePlan } from "../redux/user/actions";
import Alert from "../components/alert";

const Modules = (props) => {
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedDisplayStyle, setSelectedDisplayStyle] = useState("Listed");
  const [open, setOpen] = React.useState(false);
  const [currentModule, setCurrentModule] = useState({});
  const [modulesPlaned, setModulesPlaned] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    setModulesPlaned([]);
    props.user.plan.length > 0 &&
      props.user.plan.forEach((p) =>
        p.modules.map((x) =>
          setModulesPlaned((modulesPlaned) => [
            ...modulesPlaned,
            { idModule: x.Module_idModule, hasPassed: x.hasPassed },
          ])
        )
      );
  }, [props.user.plan]);

  const getTableData = () => {
    if (selectedSemester === "Spring") {
      return props.modules.filter((m) =>
        m.proposedSemester.some((ps) => ps.Semester_idSemester % 2 === 1)
      );
    } else if (selectedSemester === "Autumn") {
      return props.modules.filter((m) =>
        m.proposedSemester.some((ps) => ps.Semester_idSemester % 2 === 0)
      );
    } else {
      return props.modules;
    }
  };

  const filterData = (data) => {
    return data.filter(
      (g) => !modulesPlaned.map((mp) => mp.idModule).includes(g.idModule)
    );
  };

  const getECTS = (id) => {
    const modules = props.modules.filter(
      (m) => m.ModuleGroup_idModuleGroup === id
    );
    let ects = 0;
    modules.map((m) => (ects += m.ECTSCredits));

    return ects;
  };

  const onClickHandler = (module) => {
    setOpen(true);
    setCurrentModule(module);
    props.savePlan(props.user.email, props.idSemester, module.idModule);
    setAlert({
      open: true,
      message: `${module.Name} has been added to Semester ${props.idSemester}!`,
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
    <div style={styles.root}>
      <div style={styles.header}>
        <ButtonGroup
          values={["All", "Spring", "Autumn"]}
          onClick={(value) =>
            selectedSemester !== value && setSelectedSemester(value)
          }
          selected={selectedSemester}
        ></ButtonGroup>
        <ButtonGroup
          values={["Listed", "Grouped", "Dependencies"]}
          onClick={(value) =>
            selectedDisplayStyle !== value && setSelectedDisplayStyle(value)
          }
          selected={selectedDisplayStyle}
        ></ButtonGroup>
      </div>
      {selectedDisplayStyle === "Listed" ? (
        <Table
          modules={
            props.modulesPlaned ? filterData(getTableData()) : getTableData()
          }
          onClick={(module) => onClickHandler(module)}
        ></Table>
      ) : (
        <div style={{ marginTop: 40 }}>
          {props.moduleGroups.map((mg) => (
            <ModuleGroup
              key={mg.idModuleGroup}
              moduleGroup={mg}
              modules={
                props.modulesPlaned
                  ? filterData(getTableData()).filter(
                      (m) => m.ModuleGroup_idModuleGroup === mg.idModuleGroup
                    )
                  : getTableData().filter(
                      (m) => m.ModuleGroup_idModuleGroup === mg.idModuleGroup
                    )
              }
              ECTS={getECTS(mg.idModuleGroup)}
              style={{ marginRight: 20, marginBottom: 20 }}
              onClick={(module) => onClickHandler(module)}
              modulesPlaned={modulesPlaned}
            />
          ))}
        </div>
      )}
      <Alert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClick={(reason) => handleClose(reason)}
      ></Alert>
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

const mapDispatchToProps = (dispatch) => {
  return {
    savePlan: (email, idSemester, idModule) =>
      dispatch(savePlan(email, idSemester, idModule)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modules);

const styles = {
  root: {
    width: "80%",
    flex: 1,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
};
