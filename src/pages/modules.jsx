import React, { useState, useEffect } from "react";
import ButtonGroup from "../components/buttonGroup";
import Table from "../components/table";
import KnowledgeGraph from "../components/knowledgeGraphe";
import { connect } from "react-redux";
import ModuleGroup from "../components/moduleGroup";
import { savePlan } from "../redux/user/actions";
import Alert from "../components/alert";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { compose } from "redux";
import { withNamespaces } from "react-i18next";

const Modules = (props) => {
  const [selectedSemester, setSelectedSemester] = useState(props.t("All"));
  const [selectedDisplayStyle, setSelectedDisplayStyle] = useState(
    props.t("Listed")
  );
  const [selectedModule, setSelectedModule] = useState("All");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Updates when the languages is changed
  useEffect(() => {
    setSelectedSemester(props.t("All"));
    setSelectedDisplayStyle(props.t("Listed"));
  }, [props.i18n.language]);

  // Filters the data according to the semester
  const getTableData = () => {
    if (selectedSemester === props.t("Spring")) {
      return props.modules.filter((m) =>
        m.proposedSemester.some((ps) => ps.Semester_idSemester % 2 === 1)
      );
    } else if (selectedSemester === props.t("Autumn")) {
      return props.modules.filter((m) =>
        m.proposedSemester.some((ps) => ps.Semester_idSemester % 2 === 0)
      );
    } else {
      return props.modules;
    }
  };

  // Only applied during planning --> filters already planned modules
  const filterData = (data) => {
    return data.filter(
      (g) =>
        !props.user.modulesPlaned.map((mp) => mp.idModule).includes(g.idModule)
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

  // Clickhandler to save a module
  const onClickHandler = (module) => {
    props.savePlan(props.user.email, props.idSemester, module.idModule);
    setAlert({
      open: true,
      message: `${module.Name} ${props.t("ModuleAdded")} ${props.idSemester}!`,
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
        {/* Rendering the corresponding components (Header) according to the selected view */}
        {selectedDisplayStyle === props.t("Dependencies") ? (
          <FormControl style={{ width: 400 }}>
            <InputLabel>{props.t("MWD")}</InputLabel>
            <Select
              value={selectedModule}
              onChange={(event) => setSelectedModule(event.target.value)}
            >
              <MenuItem key="All" value={"All"}>
                {props.t("All")}
              </MenuItem>
              {props.modules.length > 0 &&
                props.modules
                  .filter((m) => m.HasPrerequisite === 1)
                  .map((menuItem) => (
                    <MenuItem key={menuItem.idModule} value={menuItem.idModule}>
                      {menuItem.Name}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        ) : (
          <ButtonGroup
            values={[props.t("All"), props.t("Spring"), props.t("Autumn")]}
            onClick={(value) =>
              selectedSemester !== value && setSelectedSemester(value)
            }
            selected={selectedSemester}
          ></ButtonGroup>
        )}
        <ButtonGroup
          values={
            props.page
              ? [props.t("Listed"), props.t("Grouped"), props.t("Dependencies")]
              : [props.t("Listed"), props.t("Grouped")]
          }
          onClick={(value) =>
            selectedDisplayStyle !== value && setSelectedDisplayStyle(value)
          }
          selected={selectedDisplayStyle}
        ></ButtonGroup>
      </div>

      {/* Rendering the corresponding components (body) according to the selected view */}

      {selectedDisplayStyle === props.t("Listed") ? (
        <Table
          modules={props.planning ? filterData(getTableData()) : getTableData()}
          onClick={(module) => onClickHandler(module)}
          page={props.page}
        ></Table>
      ) : selectedDisplayStyle === props.t("Grouped") ? (
        <div style={{ marginTop: 40 }}>
          {props.moduleGroups.map((mg) => (
            <ModuleGroup
              key={mg.idModuleGroup}
              moduleGroup={mg}
              modules={
                props.planning
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
              dialog={props.dialog}
              page={props.page}
            />
          ))}
        </div>
      ) : (
        selectedDisplayStyle === props.t("Dependencies") && (
          <KnowledgeGraph selectedModule={selectedModule}></KnowledgeGraph>
        )
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

export default compose(
  withNamespaces(),
  connect(mapStateToProps, mapDispatchToProps)
)(Modules);

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
