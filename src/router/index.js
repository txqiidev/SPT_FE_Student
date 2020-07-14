import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../pages/logIn";
import Modules from "../pages/modules";
import NotFound from "../pages/notFound";
import Registration from "../pages/registration";
import Home from "../pages/home";
import NavBar from "../components/navbar";
import auth from "../services/auth";
import ProtectedRoute from "./protectedRoute";
import { connect } from "react-redux";
import { fetchStudyprogrammes } from "../redux/studyprogrammes/actions";
import { fetchModuleGroups } from "../redux/moduleGroups/actions";
import { fetchModules } from "../redux/modules/actions";

const Routing = ({ fetchStudyprogrammes, fetchModuleGroups, fetchModules }) => {
  useEffect(() => {
    fetchStudyprogrammes();
    if (auth.getCurrentUser()) {
      fetchModuleGroups();
      fetchModules();
    }
  }, []);

  return (
    <Router>
      <div style={styles.root}>
        <NavBar user={auth.getCurrentUser()}></NavBar>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/modules" component={Modules} />
            <ProtectedRoute exact path="/" component={Home} />
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
  };
};

export default connect(null, mapDispatchToProps)(Routing);

const styles = {
  root: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
  },
};
