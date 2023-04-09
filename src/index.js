import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import ToggleColorMode from "./conponents/ToggleColorMode";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToggleColorMode>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ToggleColorMode>
  </React.StrictMode>
);

