import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
// Import HashRouter instead of BrowserRouter
import { HashRouter } from 'react-router-dom';
import Web3Provider from "../src/contexts/Web3provider"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Web3Provider>
    <App />
  </Web3Provider>
  </HashRouter>
);
