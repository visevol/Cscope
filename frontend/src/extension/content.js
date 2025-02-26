const cscopeRootId = "cscope-root";
const injectCscopeRoot = () => {
    if (document.querySelectorAll("#" + cscopeRootId).length > 0) {
        return;
    }

    const rootContainer = document.createElement("div");
    rootContainer.id = cscopeRootId;
    rootContainer.className = "cscope-extension";

    const repoContainer = document.getElementById("repo-content-pjax-container");

    if (repoContainer) {
        const firstDivChild = repoContainer.querySelector("div");

        if (firstDivChild) {
            firstDivChild.appendChild(rootContainer);
            console.info("Cscope - Injected container root as last child of the first div inside repo-content-pjax-container");
        } else {
            console.error("Cscope - No <div> child found inside repo-content-pjax-container, falling back to appending to body");
            document.body.appendChild(rootContainer);
            console.info("Cscope - Fallback: Injected container root at the end of the body");
        }
    } else {
        console.error("Cscope - repo-content-pjax-container not found on the page, falling back to appending to body");
        document.body.appendChild(rootContainer);
        console.info("Cscope - Fallback: Injected container root at the end of the body");
    }
};

injectCscopeRoot();
