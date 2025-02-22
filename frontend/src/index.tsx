import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App";

const rootContainerId = "cscope-root";

const createRoot = () => {
  let root = document.getElementById(rootContainerId);
  if (!root) {
    // The extension will create a root container for the app.
    // If it was not found, we are probably running the app standalone and we need to create the container.
    root = document.createElement("div");
    root.id = rootContainerId;
    document.body.appendChild(root);
  }

  const rootDiv = ReactDOM.createRoot(root);
  rootDiv.render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  );
};

if (!!chrome && !!chrome.runtime) {
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      console.log("Request received");
    }
  );
}

createRoot();