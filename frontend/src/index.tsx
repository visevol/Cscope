import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App";

// Only used in the extension
const root = document.createElement("div");
document.body.appendChild(root);

const rootDiv = ReactDOM.createRoot(root);

rootDiv.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
