import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import AddIcon from "@material-ui/icons/Add";
import Button from "./button";
import { compose } from "redux";
import { withNamespaces } from "react-i18next";

const ModulesInfosDialog = ({
  module,
  open,
  onClose,
  onClick,
  studyprogramme,
  moduleGroups,
  locations,
  modules,
  addMode,
  t,
}) => {
  // HTML parses the fetched data (performing newlines, setting bullet points and tabs)
  const formatContent = (content) => {
    return content.split("\n").map((line, i) =>
      line.includes("&bull") ? (
        <li key={i} style={{ marginLeft: line.includes("&Tab&bull") ? 20 : 0 }}>
          {ReactHtmlParser(line.replace("&bull", "").replace("&Tab", ""))}
        </li>
      ) : (
        <span key={i}>{ReactHtmlParser(line)}</span>
      )
    );
  };

  return (
    <Dialog maxWidth={"lg"} fullWidth={true} open={open} onClose={onClose}>
      <DialogTitle>{module.Name}</DialogTitle>
      <DialogContent>
        <div style={styles.root}>
          <div style={{ ...styles.half, ...{ marginRight: 15 } }}>
            <table>
              <tbody>
                <tr>
                  <td style={styles.td}>Credits:</td>
                  <td>{module.ECTSCredits}</td>
                </tr>
                <tr>
                  <td style={styles.td}>{t("StudyProgramme")}:</td>
                  <td>
                    {
                      studyprogramme.find(
                        (s) =>
                          s.idStudyProgramme ===
                          module.StudyProgramme_idStudyProgramme
                      ).Name
                    }
                  </td>
                </tr>
                <tr>
                  <td style={styles.td}>{t("ModuleGroup")}:</td>
                  <td>
                    {
                      moduleGroups.find(
                        (s) =>
                          s.idModuleGroup === module.ModuleGroup_idModuleGroup
                      ).Name
                    }
                  </td>
                </tr>
                <tr>
                  <td style={styles.td}>{t("Location")}:</td>
                  <td>
                    {
                      locations.find(
                        (s) => s.idLocation === module.Location_idLocation
                      ).Name
                    }
                  </td>
                </tr>
                <tr>
                  <td style={styles.td}>{t("Language")}:</td>
                  <td>{module.Language}</td>
                </tr>
                <tr>
                  <td style={styles.td}>{t("AcademicYear")}:</td>
                  <td>{module.Year}</td>
                </tr>
                <tr>
                  <td style={styles.td}>Level:</td>
                  <td>{module.Level}</td>
                </tr>
                <tr>
                  <td style={styles.td}>{t("Type")}: </td>
                  <td>{module.ModulType}</td>
                </tr>
              </tbody>
            </table>
            <p style={styles.title}>{t("GuidingPrinciple")}</p>
            {module.GuidingPrinciple.split("\n").map((text, i) => (
              <span key={i}>{ReactHtmlParser(text)}</span>
            ))}
            <p style={styles.title}>{t("Assessment")}</p>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <tbody>
                <tr style={styles.tr}>
                  <td style={styles.td}>Type: </td>
                  {module.exams.map((exam, i) => (
                    <td key={i} style={styles.td}>
                      {exam.Type}
                    </td>
                  ))}
                </tr>
                <tr style={styles.tr}>
                  <td style={styles.td}>Number: </td>
                  {module.exams.map((exam, i) => (
                    <td key={i} style={styles.td}>
                      {exam.Number}
                    </td>
                  ))}
                </tr>
                <tr style={styles.tr}>
                  <td style={styles.td}>Duration (Min): </td>
                  {module.exams.map((exam, i) => (
                    <td key={i} style={styles.td}>
                      {exam.DurationInMin}
                    </td>
                  ))}
                </tr>
                <tr style={styles.tr}>
                  <td style={styles.td}>Weighting (%): </td>
                  {module.exams.map((exam, i) => (
                    <td key={i} style={styles.td}>
                      {exam.Weight}
                    </td>
                  ))}
                </tr>
                <tr style={styles.tr}>
                  <td style={styles.td}>Evaluation: </td>
                  {module.exams.map((exam, i) => (
                    <td key={i} style={styles.td}>
                      {exam.Evaluation}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <p style={styles.title}>{t("AssessmentsComments")}</p>
            {module.AssessmentComment.split("\n").map((text, i) => (
              <span key={i}>{ReactHtmlParser(text)}</span>
            ))}
          </div>
          <div style={{ ...styles.half, ...{ marginLeft: 15 } }}>
            <p style={styles.title}>{t("Content")}</p>
            {formatContent(module.Content)}
            <p style={styles.title}>{t("Prerequisite")}</p>
            {module.HasPrerequisite === 1 &&
              module.prerequisiteModule.map((pm) => (
                <li key={pm.Module_idModule_Prerequisite}>{pm.Name}</li>
              ))}
            <p style={styles.title}>{t("Follow")}</p>
            {modules
              .filter(
                (m) =>
                  m.HasPrerequisite === 1 &&
                  m.prerequisiteModule.find(
                    (pm) => pm.Module_idModule_Prerequisite === module.idModule
                  )
              )
              .map((f, i) => (
                <li key={i}>{f.Name}</li>
              ))}
            <p style={styles.title}>{t("Further")}</p>
            {module.Comments.split("\n").map((text, i) => (
              <span key={i}>{text}</span>
            ))}
            <div style={styles.buttons}>
              <Button
                variant="contained"
                color="primary"
                label={t("More")}
                style={{
                  ...styles.button,
                  ...{
                    border: "1px solid red",
                    marginRight: 20,
                  },
                }}
                onClick={() => window.open(`${module.URL}`, "_blank")}
              />
              {addMode && (
                <Button
                  variant="contained"
                  color="primary"
                  label={<AddIcon style={{ fontSize: 28 }} />}
                  style={styles.button}
                  onClick={onClick}
                />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    locations: state.locations.locations,
    studyprogramme: state.studyprogramme.studyprogramme,
    moduleGroups: state.moduleGroups.moduleGroups,
    modules: state.modules.modules,
  };
};

export default compose(
  withNamespaces(),
  connect(mapStateToProps)
)(ModulesInfosDialog);

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
  },
  half: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  tr: {
    borderBottom: "1px solid #BDBDBD",
  },
  td: {
    paddingRight: 25,
    height: 30,
    verticalAlign: "center",
  },
  title: {
    fontWeight: 600,
    marginTop: 40,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    flex: 1,
  },
  button: {
    width: 200,
    height: 75,
    borderRadius: "15px",
    marginBottom: 10,
  },
};
