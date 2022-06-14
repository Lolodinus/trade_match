import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import {Provider} from "react-redux";
import { setupStore } from "./store/store";

// App
import App from "./components/app";

// Styles
import "./shared/styles/normalize.css";
import "./index.scss";


const container = document.getElementById("root")!;
const store = setupStore();
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={ store } >
    <Router>
      <App />
    </Router>
  </Provider>
);
