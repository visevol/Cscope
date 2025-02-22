const cscopeRootId = "cscope-root";

const injectCscopeRoot = () => {
    if (document.querySelectorAll("#" + cscopeRootId).length > 0) {
        // The root container already exists, nothing to do
        return;
    }

    const rootContainer = document.createElement("div");
    rootContainer.id = cscopeRootId;
    rootContainer.class = "cscope-extension";   // Class to identity that the container was created from the extension

    const body = document.getElementsByTagName("body")[0];
    body.appendChild(rootContainer);

    // TODO: Could not establish connection. Receiving end does not exist.
    chrome.runtime.sendMessage("inject");

    console.info("Cscope - Injected container root");
};

const removeCscopeRoot = () => {
    // Remove every root found
    const roots = document.querySelectorAll("#" + cscopeRootId);
    for (let root of roots) {
        root.remove();
    }

    console.info("Cscope - Removed container root");
};

// GitHub is a single page application (SPA), so the extension may load in a page that is not a repository.
// We don't want CScope in any GitHub page, so we need to listen for URL changes and check for the presence of a repository.
// https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
const observeUrlChange = () => {
    let oldHref = document.location.href;
    const body = document.querySelector("body");
    const observer = new MutationObserver(mutations => {
        if (oldHref !== document.location.href) {
            oldHref = document.location.href;
            console.info("Cscope - Detected document location change");

            // Check if the page looks like it contains a repo
            if (document.querySelectorAll("#repository-container-header").length > 0) {
                // Looks like it is a repository, inject CScope
                console.info("Cscope - Injecting...");
                injectCscopeRoot();
            } else {
                // Not in a repository, remove CScope
                console.info("Cscope - Removing...");
                removeCscopeRoot();
            }
        }
    });
    observer.observe(body, { childList: true, subTree: true });
};

observeUrlChange();