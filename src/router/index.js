import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../pages/logIn";
import NotFound from "../pages/notFound";
import Registration from "../pages/registration";
import Home from "../pages/home";
import NavBar from "../components/navbar";
import auth from "../services/auth";
import ProtectedRoute from "./protectedRoute";

const Routing = () => {
  return (
    <Router>
      <div style={styles.root}>
        <NavBar user={auth.getCurrentUser()}></NavBar>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/not-found" component={NotFound} />
            <ProtectedRoute exact path="/" component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Routing;

const styles = {
  root: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
  },
};
