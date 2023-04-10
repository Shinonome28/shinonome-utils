import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import ToggleColorMode from "./conponents/ToggleColorMode";
import { BrowserRouter as Router } from "react-router-dom";

if (window.location.search !== "") {
  const params = new URLSearchParams(window.location.search);
  const redirectTarget = params.get("redirect");
  if (redirectTarget) {
    window.history.replaceState(null,"",redirectTarget)  
  }
}

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

