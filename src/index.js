import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";

if (window.location.search !== "") {
  const params = new URLSearchParams(window.location.search);
  const redirectTarget = params.get("redirect");
  if (redirectTarget) {
    window.history.replaceState(null, "", redirectTarget);
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router></Router>
  </React.StrictMode>
);
