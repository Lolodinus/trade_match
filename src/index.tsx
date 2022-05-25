import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// App
import App from "./components/app";

// Styles
import "./shared/styles/normalize.css";
import "./index.scss";

const container = document.getElementById("root")!;

const root = ReactDOM.createRoot(container);
root.render(
  <Router>
    <App />
  </Router>
);
