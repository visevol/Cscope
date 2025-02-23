import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App";

const rootContainerId = "cscope-root";

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

// If this is an extension
if (document.querySelectorAll(".cscope-extension")) {
  // GitHub is a single page application (SPA), so the extension may load in a page that is not a repository.
  // We don't want CScope in any GitHub page, so we need to listen for URL changes and check for the presence of a repository.
  // https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
  const observeUrlChange = () => {
    let oldHref = document.location.href;
    const observer = new MutationObserver(mutations => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href;
        console.info("Cscope - Detected document location change");

        setTimeout(() => {
          // Wait for the page to fully reload so we don't detect changes before it
          reloadCscope();
        }, 500)
      }
    });

    const body = document.querySelector("body")!;
    observer.observe(body, { childList: true, subtree: true });
  };

  const reloadCscope = () => {
    if (isRepository()) {
      console.info("Cscope - Found a repository, showing app...");
      root!.classList.remove("d-none");
    } else {
      console.info("Cscope - Repository not found in page, hidding...");
      root!.classList.add("d-none");
    }
  };

  const isRepository = () => {
    return document.querySelectorAll("#repository-container-header").length > 0;
  };

  observeUrlChange();
  reloadCscope();
}