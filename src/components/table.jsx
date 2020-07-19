import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "./button";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import ModulesInfosDialog from "../components/moduleInfosDialog";

const SimpleTable = (props) => {
  const { modules } = props;

  const [openDialog, setOpenDialog] = useState(false);
  const [currentModule, setCurrentModule] = useState(modules[0]);

  const classes = useStyles();

  const getSemester = (array) => {
    const spring = array.some((a) => a.Semester_idSemester % 2 === 1);
    const autumn = array.some((a) => a.Semester_idSemester % 2 === 0);

    if (spring && autumn) {
      return "Spring & Autumn";
    } else if (spring) {
      return "Spring";
    } else if (autumn) {
    }
    return "Autumn";
  };

  const onClickHandler = (modules) => {
    setCurrentModule(modules);
    setOpenDialog(true);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{ cursor: "auto" }}>
          <TableRow>
            <TableCell className={classes.fontWeight}>Name</TableCell>
            <TableCell className={classes.fontWeight} align="center">
              Module Group
            </TableCell>
            <TableCell className={classes.fontWeight} align="center">
              ECTS
            </TableCell>
            <TableCell className={classes.fontWeight} align="center">
              Semester
            </TableCell>
            <TableCell className={classes.fontWeight} align="center">
              Type
            </TableCell>
            {!props.page && <TableCell />}
          </TableRow>
        </TableHead>
        <TableBody>
          {modules.map((modules) => (
            <TableRow key={modules.Name}>
              <TableCell
                onClick={() => onClickHandler(modules)}
                component="th"
                scope="row"
              >
                {modules.Name}
              </TableCell>
              <TableCell align="center">
                {
                  props.moduleGroups.moduleGroups.find(
                    (mg) =>
                      mg.idModuleGroup === modules.ModuleGroup_idModuleGroup
                  ).Name
                }
              </TableCell>
              <TableCell onClick={() => onClickHandler(modules)} align="center">
                {modules.ECTSCredits}
              </TableCell>
              <TableCell onClick={() => onClickHandler(modules)} align="center">
                {getSemester(modules.proposedSemester)}
              </TableCell>
              <TableCell onClick={() => onClickHandler(modules)} align="center">
                {modules.ModulType}
              </TableCell>

              {!props.page && (
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    label={<AddIcon />}
                    onClick={() => props.onClick(modules)}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {openDialog > 0 && (
        <ModulesInfosDialog
          addMode={!props.page}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onClick={() => {
            props.onClick(currentModule);
            setOpenDialog(false);
          }}
          module={currentModule}
        />
      )}
    </TableContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    moduleGroups: state.moduleGroups,
  };
};

export default connect(mapStateToProps)(SimpleTable);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: "100%",
    cursor: "pointer",
    backgroundColor: "#F8F8F8",
  },
  fontWeight: {
    fontWeight: 600,
  },
});
