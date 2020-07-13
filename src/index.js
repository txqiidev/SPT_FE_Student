import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Router from "./router";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";
import "./index.css";
import store from "./redux/store";

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
