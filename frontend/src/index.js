import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import "./css/styles.css"; 
import "./css/scrollbarStyle.css";

const app = ReactDOMClient.createRoot(document.getElementById("app"));
app.render(<App />);
