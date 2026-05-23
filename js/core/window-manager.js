let zCounter = 100;
let openWindows = [];

/* 
   Finds an app object by its id
*/
function findAppById(appId) {
    return apps.find(function (app) {
        return app.id === appId;
    });
}

/* 
   Brings a selected window in front of all other windows
*/
function bringToFront(windowId) {
    const windowElement = document.querySelector(`[data-window-id="${windowId}"]`);

    if (!windowElement) {
        return;
    }

    zCounter++;

    windowElement.style.zIndex = zCounter;
}

/* 
   Keeps a window inside the visible screen area
*/
function keepWindowInBounds(windowElement, leftPosition, topPosition) {
    const maxLeft = window.innerWidth - windowElement.offsetWidth - 12;
    const maxTop = window.innerHeight - windowElement.offsetHeight - 76;

    const safeLeft = Math.min(Math.max(leftPosition, 12), maxLeft);
    const safeTop = Math.min(Math.max(topPosition, 12), maxTop);

    windowElement.style.left = `${safeLeft}px`;
    windowElement.style.top = `${safeTop}px`;
}

/* 
   Makes a window draggable with mouse and touch movement
*/
function dragWindow(windowElement, windowId) {
    const titleBar = windowElement.querySelector(".window-title-bar");

    if (!titleBar) {
        return;
    }

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    function startDrag(pointerX, pointerY) {
        if (windowElement.classList.contains("maximized")) {
            return;
        }

        isDragging = true;

        startX = pointerX;
        startY = pointerY;
        startLeft = windowElement.offsetLeft;
        startTop = windowElement.offsetTop;

        bringToFront(windowId);
    }

    function moveDrag(pointerX, pointerY) {
        if (!isDragging) {
            return;
        }

        const moveX = pointerX - startX;
        const moveY = pointerY - startY;

        keepWindowInBounds(
            windowElement,
            startLeft + moveX,
            startTop + moveY
        );
    }

    function stopDrag() {
        isDragging = false;
    }

    titleBar.addEventListener("mousedown", function (event) {
        if (event.target.closest(".window-control-btn")) {
            return;
        }

        startDrag(event.clientX, event.clientY);
    });

    document.addEventListener("mousemove", function (event) {
        moveDrag(event.clientX, event.clientY);
    });

    document.addEventListener("mouseup", stopDrag);

    titleBar.addEventListener("touchstart", function (event) {
        if (event.target.closest(".window-control-btn")) {
            return;
        }

        const touch = event.touches[0];

        startDrag(touch.clientX, touch.clientY);
    });

    document.addEventListener("touchmove", function (event) {
        if (!isDragging) {
            return;
        }

        const touch = event.touches[0];

        moveDrag(touch.clientX, touch.clientY);
    });

    document.addEventListener("touchend", stopDrag);
}

/* 
   Creates a taskbar pill for an opened app
*/
function addTaskbarPill(windowId, app) {
    const taskbarApps = document.querySelector("#taskbar-apps");

    if (!taskbarApps) {
        return;
    }

    const existingPill = document.querySelector(`[data-taskbar-window-id="${windowId}"]`);

    if (existingPill) {
        return;
    }

    const taskbarPill = document.createElement("button");

    taskbarPill.classList.add("taskbar-app-pill");
    taskbarPill.type = "button";
    taskbarPill.textContent = app.label;
    taskbarPill.setAttribute("data-taskbar-window-id", windowId);

    taskbarPill.addEventListener("click", function () {
        const windowElement = document.querySelector(`[data-window-id="${windowId}"]`);

        if (!windowElement) {
            return;
        }

        windowElement.classList.remove("minimized");

        bringToFront(windowId);
    });

    taskbarApps.appendChild(taskbarPill);
}

/* 
   Removes a taskbar pill when a window closes
*/
function removeTaskbarPill(windowId) {
    const taskbarPill = document.querySelector(`[data-taskbar-window-id="${windowId}"]`);

    if (taskbarPill) {
        taskbarPill.remove();
    }
}

/* 
   Loads the correct app content into the selected window
*/
function renderAppContent(appId, contentElement) {
    if (appId === "radio") {
        renderRadioApp(contentElement);

        return;
    }

    if (appId === "terminal") {
        renderTerminalApp(contentElement);

        return;
    }

    if (appId === "notes") {
        renderNotesApp(contentElement);

        return;
    }

    if (appId === "weather") {
        renderWeatherApp(contentElement);

        return;
    }

    if (appId === "settings") {
        renderSettingsApp(contentElement);

        return;
    }

    if (appId === "explorer") {
    renderExplorerApp(contentElement);

    return;
}

    contentElement.innerHTML = `
        <div class="window-placeholder">
            <p>${appId.toUpperCase()} app content will be built in the next phases.</p>
        </div>
    `;
}

/* 
   Opens an app window on the desktop
*/
function openWindow(appId) {
    const app = findAppById(appId);
    const windowLayer = document.querySelector("#window-layer");

    if (!app || !windowLayer) {
        return;
    }

    const windowId = `${app.id}-${Date.now()}`;
    const windowElement = document.createElement("section");
    const titleBar = document.createElement("header");
    const title = document.createElement("h2");
    const controls = document.createElement("div");
    const minimizeButton = document.createElement("button");
    const maximizeButton = document.createElement("button");
    const closeButton = document.createElement("button");
    const content = document.createElement("div");

    const startLeft = Math.max((window.innerWidth - app.windowWidth) / 2, 16);
    const startTop = Math.max((window.innerHeight - app.windowHeight) / 2 - 32, 16);

    windowElement.classList.add("app-window");
    windowElement.setAttribute("data-window-id", windowId);
    windowElement.setAttribute("data-app-id", app.id);
    windowElement.style.width = `${app.windowWidth}px`;
    windowElement.style.height = `${app.windowHeight}px`;
    windowElement.style.left = `${startLeft}px`;
    windowElement.style.top = `${startTop}px`;

    titleBar.classList.add("window-title-bar");

    title.classList.add("window-title");
    title.textContent = `${app.emoji} ${app.label}`;

    controls.classList.add("window-controls");

    minimizeButton.classList.add("window-control-btn", "minimize-btn");
    minimizeButton.type = "button";
    minimizeButton.textContent = "–";
    minimizeButton.setAttribute("aria-label", "Minimize window");

    maximizeButton.classList.add("window-control-btn", "maximize-btn");
    maximizeButton.type = "button";
    maximizeButton.textContent = "□";
    maximizeButton.setAttribute("aria-label", "Maximize window");

    closeButton.classList.add("window-control-btn", "close-btn");
    closeButton.type = "button";
    closeButton.textContent = "✕";
    closeButton.setAttribute("aria-label", "Close window");

    content.classList.add("window-content");

    controls.appendChild(minimizeButton);
    controls.appendChild(maximizeButton);
    controls.appendChild(closeButton);

    titleBar.appendChild(title);
    titleBar.appendChild(controls);

    windowElement.appendChild(titleBar);
    windowElement.appendChild(content);

    windowLayer.appendChild(windowElement);

    renderAppContent(app.id, content);

    openWindows.push({
        id: windowId,
        appId: app.id
    });

    addTaskbarPill(windowId, app);

    bringToFront(windowId);

    dragWindow(windowElement, windowId);

    windowElement.addEventListener("mousedown", function () {
        bringToFront(windowId);
    });

    minimizeButton.addEventListener("click", function () {
        minimizeWindow(windowId);
    });

    maximizeButton.addEventListener("click", function () {
        maximizeWindow(windowId);
    });

    closeButton.addEventListener("click", function () {
        closeWindow(windowId);
    });
}

/* 
   Closes and removes a window from the desktop
*/
function closeWindow(windowId) {
    const windowElement = document.querySelector(`[data-window-id="${windowId}"]`);

    if (!windowElement) {
        return;
    }

    windowElement.remove();

    openWindows = openWindows.filter(function (windowItem) {
        return windowItem.id !== windowId;
    });

    removeTaskbarPill(windowId);
}

/* 
   Minimizes a window without deleting it
*/
function minimizeWindow(windowId) {
    const windowElement = document.querySelector(`[data-window-id="${windowId}"]`);

    if (!windowElement) {
        return;
    }

    windowElement.classList.add("minimized");
}

/* 
   Toggles a window between normal size and full desktop size
*/
function maximizeWindow(windowId) {
    const windowElement = document.querySelector(`[data-window-id="${windowId}"]`);

    if (!windowElement) {
        return;
    }

    windowElement.classList.toggle("maximized");

    bringToFront(windowId);
}