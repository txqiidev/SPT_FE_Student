import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import { Tooltip } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import ModulesPage from "../pages/modules";
import Module from "../components/module";
import Button from "../components/button";
import DeleteDialog from "../components/deleteDialog";
import NewSemesterDialog from "../components/newSemesterDialog";
import Alert from "../components/alert";
import ProgressBar from "../components/progressbar";
import {
  addSemester,
  deleteSemester,
  deleteModule,
  hasPassed,
} from "../redux/user/actions";

const Home = (props) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSemester, setOpenSemester] = useState(false);
  const [currentSemester, setCurrentSemester] = useState("");
  const [currentModule, setCurrentModule] = useState("");
  const [newSemester, setNewSemester] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hasPassed, setHasPassed] = React.useState(0);

  useEffect(() => {
    props.user.error !== "" &&
      setAlert({
        open: true,
        message: props.user.error,
        severity: "error",
      });
  }, [props.user.error]);

  const onClickHandlerAddSemester = () => {
    if (
      props.user.plan.some(
        (p) => parseInt(p.idSemester) === parseInt(newSemester)
      )
    ) {
      setAlert({
        open: true,
        message: `Semester ${newSemester} does already exist!`,
        severity: "error",
      });
    } else {
      props.addSemester(props.user.email, newSemester);
      if (!isNaN(newSemester)) {
        setOpenSemester(false);
        setAlert({
          open: true,
          message: `Semester ${newSemester} has been added!`,
          severity: "success",
        });
      }
    }
  };

  const onClickHandlerDeleteSemester = () => {
    props.deleteSemester(props.user.email, currentSemester);
    if (props.user.error === "") {
      setOpenDelete(false);
      setAlert({
        open: true,
        message: `Semester ${currentSemester} has been deleted!`,
        severity: "success",
      });
    }
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
        <ProgressBar
          barColor="#FFEA00"
          title={true}
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
      <div style={styles.main}>
        {props.user.plan
          .sort((a, b) => parseInt(a.idSemester) - parseInt(b.idSemester))
          .map((p) => (
            <div key={p.idSemester} style={styles.semester}>
              <div style={styles.semesterHeader}>
                <div style={styles.titlewRemove}>
                  <span
                    style={{ fontWeight: 600, fontSize: 16, marginRight: 10 }}
                  >
                    Semester {p.idSemester}
                  </span>
                  <Tooltip
                    title={
                      <span style={{ fontSize: 12 }}>Delete Semester</span>
                    }
                    placement="top"
                    TransitionComponent={Zoom}
                  >
                    <DeleteIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpenDelete(true);
                        setCurrentSemester(p.idSemester);
                      }}
                    />
                  </Tooltip>
                </div>
                <span>
                  {`${
                    props.modules.length > 0 &&
                    props.modules
                      .filter((m) =>
                        p.modules.find(
                          (module) => m.idModule === module.Module_idModule
                        )
                      )
                      .reduce((r, a) => {
                        return r + a.ECTSCredits;
                      }, 0)
                  } ECTS`}
                </span>
              </div>
              {props.modules.length > 0 &&
                p.modules.map((m) => (
                  <Module
                    key={m.Module_idModule}
                    module={props.modules.find(
                      (module) => module.idModule === m.Module_idModule
                    )}
                    style={
                      m.hasPassed
                        ? {
                            marginBottom: 10,
                            borderStyle: "solid",
                            borderColor: "#A4E200",
                          }
                        : { marginBottom: 10 }
                    }
                    anchorEl={anchorEl}
                    onClickOpen={(value) => {
                      setCurrentSemester(p.idSemester);
                      setCurrentModule(m.Module_idModule);
                      setAnchorEl(value);
                      setHasPassed(m.hasPassed);
                    }}
                    hasPassed={m.hasPassed}
                  ></Module>
                ))}
              <Button
                variant="contained"
                color="primary"
                label={<AddIcon style={{ fontSize: 28 }} />}
                style={{
                  width: 300,
                  height: 120,
                  borderRadius: "15px",
                  marginBottom: 10,
                }}
                onClick={() => {
                  setOpen(true);
                  setCurrentSemester(p.idSemester);
                }}
              />
            </div>
          ))}
        <Button
          variant="contained"
          color="primary"
          label={<AddIcon style={{ fontSize: 28 }} />}
          style={{
            width: 320,
            borderRadius: "15px",
            margin: 10,
          }}
          onClick={() => setOpenSemester(true)}
        />
      </div>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
      >
        <ModulesPage idSemester={currentSemester} planning={true}></ModulesPage>
      </Dialog>
      <DeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onClick={() => onClickHandlerDeleteSemester()}
        label="Semester"
        deleteItem={`Semester ${currentSemester}`}
      />
      <NewSemesterDialog
        open={openSemester}
        onChange={(value) => setNewSemester(value)}
        onClose={() => setOpenSemester(false)}
        onClick={() => onClickHandlerAddSemester()}
        label="Semester"
        deleteItem={`Semester ${currentSemester}`}
      />
      <Alert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClick={(reason) => handleClose(reason)}
      ></Alert>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            props.deleteModule(
              props.user.email,
              currentSemester,
              currentModule
            );
          }}
        >
          DELETE
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            props.hasPassed(
              props.user.email,
              currentModule,
              hasPassed === 0 ? 1 : 0
            );
          }}
        >
          {hasPassed === 0 ? "PASSED" : "UNDO PASSED"}
        </MenuItem>
      </Menu>
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

const mapDispatchToProps = (dispatch) => {
  return {
    addSemester: (email, idSemester) =>
      dispatch(addSemester(email, idSemester)),
    deleteSemester: (email, idSemester) =>
      dispatch(deleteSemester(email, idSemester)),
    deleteModule: (email, idSemester, idModule) =>
      dispatch(deleteModule(email, idSemester, idModule)),
    hasPassed: (email, idModule, hp) =>
      dispatch(hasPassed(email, idModule, hp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
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
  titlewRemove: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  semesterAdd: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 320,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    margin: 10,
  },
  dialog: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
  },
  dialogContent: {
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
};
