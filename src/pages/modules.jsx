import React, { useState } from "react";
import ButtonGroup from "../components/buttonGroup";
import Table from "../components/table";
import { connect } from "react-redux";

const Modules = (props) => {
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedDisplayStyle, setSelectedDisplayStyle] = useState("Listed");
  const [open, setOpen] = React.useState(false);
  const [currentModule, setCurrentModule] = useState({});

  const getTableData = () => {
    if (selectedSemester === "Spring") {
      console.log("called");
      return props.modules.modules.filter((m) =>
        m.proposedSemester.some((ps) => ps.Semester_idSemester % 2 === 1)
      );
    } else if (selectedSemester === "Autumn") {
      return props.modules.modules.filter((m) =>
        m.proposedSemester.some((ps) => ps.Semester_idSemester % 2 === 0)
      );
    } else {
      return props.modules.modules;
    }
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
      <Table
        modules={getTableData()}
        onClick={(module) => {
          setOpen(true);
          setCurrentModule(module);
        }}
      ></Table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modules: state.modules,
  };
};

export default connect(mapStateToProps)(Modules);

const styles = {
  root: {
    minHeight: "100vh",
    width: "80%",
    margin: "auto",
    maxWidth: 1000,
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
