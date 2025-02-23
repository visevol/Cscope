const cscopeRootId = "cscope-root";
const injectCscopeRoot = () => {
    if (document.querySelectorAll("#" + cscopeRootId).length > 0) {
        // The root container already exists, nothing to do
        return;
    }

    const rootContainer = document.createElement("div");
    rootContainer.id = cscopeRootId;
    rootContainer.className = "cscope-extension";   // Class to identity that the container was created from the extension

    const body = document.getElementsByTagName("body")[0];
    body.appendChild(rootContainer);

    console.info("Cscope - Injected container root");
};
injectCscopeRoot();