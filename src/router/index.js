import React, { useEffect } from "react";
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
import { saveUser, fetchPlan } from "../redux/user/actions";

const Routing = ({
  fetchStudyprogrammes,
  fetchModuleGroups,
  fetchModules,
  fetchLocation,
  saveUser,
  fetchPlan,
}) => {
  useEffect(() => {
    fetchStudyprogrammes();
    if (auth.getCurrentUser()) {
      saveUser(auth.getCurrentUser());
      fetchPlan(auth.getCurrentUser().email);
      fetchModuleGroups();
      fetchModules();
      fetchLocation();
    }
  }, []);

  return (
    <Router>
      <div style={styles.root}>
        <NavBar user={auth.getCurrentUser()}></NavBar>
        <div style={styles.body}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/modules" component={Modules} />
            <Route path="/studyProgress" component={StudyProgress} />
            <ProtectedRoute exact path="/" component={Planning} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudyprogrammes: () => dispatch(fetchStudyprogrammes()),
    fetchModuleGroups: () => dispatch(fetchModuleGroups(4)),
    fetchModules: () => dispatch(fetchModules(4)),
    fetchLocation: () => dispatch(fetchLocation()),
    saveUser: (user) => dispatch(saveUser(user)),
    fetchPlan: (email) => dispatch(fetchPlan(email)),
  };
};

export default connect(null, mapDispatchToProps)(Routing);

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
};
