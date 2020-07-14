import React from "react";
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

const SimpleTable = (props) => {
  const classes = useStyles();
  const { modules } = props;

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

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
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
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modules.map((modules) => (
            <TableRow key={modules.Name}>
              <TableCell component="th" scope="row">
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

              <TableCell align="center">{modules.ECTSCredits}</TableCell>
              <TableCell align="center">
                {getSemester(modules.proposedSemester)}
              </TableCell>
              <TableCell align="center">{modules.ModulType}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  label={<AddIcon />}
                  onClick={() => props.onClick(modules)}
                  style={{ backgroundColor: "#FFFFFF" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    backgroundColor: "#F8F8F8",
  },
  fontWeight: {
    fontWeight: 600,
  },
});
