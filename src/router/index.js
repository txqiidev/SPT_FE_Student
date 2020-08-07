import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../pages/logIn";
import Modules from "../pages/modules";
import StudyProgress from "../pages/studyProgress";
import NotFound from "../pages/notFound";
import Registration from "../pages/registration";
import Planning from "../pages/planning";
import NavBar from "../components/navbar";
import auth from "../services/auth";
import ProtectedRoute from "./protectedRoute";
import { connect } from "react-redux";
import { fetchStudyprogrammes } from "../redux/studyprogrammes/actions";
import { fetchModuleGroups } from "../redux/moduleGroups/actions";
import { fetchModules } from "../redux/modules/actions";
import { fetchLocation } from "../redux/locations/actions";
import { saveUser, fetchPlan, setModulesPlaned } from "../redux/user/actions";
import CircularProgress from "@material-ui/core/CircularProgress";

const Routing = ({
  fetchStudyprogrammes,
  fetchModuleGroups,
  fetchModules,
  fetchLocation,
  saveUser,
  fetchPlan,
  setModulesPlaned,
  modules,
  moduleGroups,
  user,
  studyprogramme,
  locations,
}) => {
  const [loading, setLoading] = useState(false);

  // Executed when the component is rendered or changed, fetches all the data
  useEffect(() => {
    fetchStudyprogrammes();
    if (auth.getCurrentUser()) {
      setLoading(true);
      saveUser(auth.getCurrentUser());
      fetchPlan(auth.getCurrentUser().email);
      fetchModuleGroups(auth.getCurrentUser().studyprogramme);
      fetchModules(auth.getCurrentUser().studyprogramme);
      fetchLocation();
    }
  }, []);

  // Removes the Loading Icon, if all the data has been fetched successfully
  useEffect(() => {
    if (
      !user.loading &&
      !modules.loading &&
      !moduleGroups.loading &&
      !locations.loading
    ) {
      setLoading(false);
    }
  }, [user.loading, modules.loading, moduleGroups.loading, locations.loading]);

  // Checks which modules has been flagged as passed.
  useEffect(() => {
    let modulesPlaned = [];
    if (user.plan.length > 0) {
      user.plan.forEach((p) =>
        p.modules.map((x) =>
          modulesPlaned.push({
            idModule: x.Module_idModule,
            hasPassed: x.hasPassed,
          })
        )
      );
      setModulesPlaned(modulesPlaned);
    }
  }, [user.plan]);

  return (
    <Router>
      <div style={styles.root}>
        <NavBar user={auth.getCurrentUser()}></NavBar>
        <div style={styles.body}>
          {!loading ? (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/registration" component={Registration} />
              <Route path="/not-found" component={NotFound} />
              <Route
                path="/modules"
                render={(props) => <Modules {...props} page={true} />}
              />
              <Route path="/studyProgress" component={StudyProgress} />
              <ProtectedRoute exact path="/" component={Planning} />
              <Redirect to="/not-found" />
            </Switch>
          ) : (
            <div style={styles.progress}>
              <CircularProgress color="secondary" />
            </div>
          )}
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    modules: state.modules,
    moduleGroups: state.moduleGroups,
    user: state.user,
    studyprogramme: state.studyprogramme,
    locations: state.locations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudyprogrammes: () => dispatch(fetchStudyprogrammes()),
    fetchModuleGroups: (studyprogrammeID) =>
      dispatch(fetchModuleGroups(studyprogrammeID)),
    fetchModules: (studyprogrammeID) =>
      dispatch(fetchModules(studyprogrammeID)),
    fetchLocation: () => dispatch(fetchLocation()),
    saveUser: (user) => dispatch(saveUser(user)),
    fetchPlan: (email) => dispatch(fetchPlan(email)),
    setModulesPlaned: (modules) => dispatch(setModulesPlaned(modules)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);

const styles = {
  root: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
  },
  body: {
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  progress: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
};
