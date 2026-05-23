const fakeFileSystem = {
    desktop: [
        {
            type: "folder",
            name: "Projects"
        },
        {
            type: "folder",
            name: "Screenshots"
        },
        {
            type: "file",
            name: "welcome.txt"
        }
    ],

    Projects: [
        {
            type: "file",
            name: "nightcity-os.js"
        },
        {
            type: "file",
            name: "radio-engine.css"
        },
        {
            type: "file",
            name: "terminal-core.txt"
        }
    ],

    Screenshots: [
        {
            type: "file",
            name: "desktop-preview.png"
        },
        {
            type: "file",
            name: "night-mode.png"
        }
    ]
};

let activeFolder = "desktop";

/* 
   Builds the explorer app inside a window
*/
function renderExplorerApp(contentElement) {
    contentElement.innerHTML = `
        <div class="explorer-app">

            <aside class="explorer-sidebar">
                <button class="explorer-sidebar-btn" data-folder="desktop">
                    Desktop
                </button>

                <button class="explorer-sidebar-btn" data-folder="Projects">
                    Projects
                </button>

                <button class="explorer-sidebar-btn" data-folder="Screenshots">
                    Screenshots
                </button>
            </aside>

            <section class="explorer-content">

                <div class="explorer-header">
                    <h3 id="explorer-folder-title">
                        ${activeFolder}
                    </h3>
                </div>

                <div id="explorer-grid" class="explorer-grid"></div>

            </section>

        </div>
    `;

    setupExplorerApp();
}

/* 
   Connects sidebar buttons and renders files
*/
function setupExplorerApp() {
    const sidebarButtons = document.querySelectorAll(".explorer-sidebar-btn");

    sidebarButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const folderName = button.getAttribute("data-folder");

            activeFolder = folderName;

            renderExplorerFiles();
        });
    });

    renderExplorerFiles();
}

/* 
   Shows files and folders for the current folder
*/
function renderExplorerFiles() {
    const explorerGrid = document.querySelector("#explorer-grid");
    const folderTitle = document.querySelector("#explorer-folder-title");

    if (!explorerGrid || !folderTitle) {
        return;
    }

    explorerGrid.innerHTML = "";

    folderTitle.textContent = activeFolder;

    const folderItems = fakeFileSystem[activeFolder] || [];

    folderItems.forEach(function (item) {
        const fileCard = document.createElement("button");

        fileCard.classList.add("explorer-item");
        fileCard.type = "button";

        const icon = item.type === "folder" ? "📁" : "📄";

        fileCard.innerHTML = `
            <span class="explorer-item-icon">${icon}</span>
            <span class="explorer-item-name">${item.name}</span>
        `;

        fileCard.addEventListener("dblclick", function () {
            handleExplorerItem(item);
        });

        explorerGrid.appendChild(fileCard);
    });
}

/* 
   Handles opening folders or files
*/
function handleExplorerItem(item) {
    if (item.type === "folder") {
        activeFolder = item.name;

        renderExplorerFiles();

        return;
    }

    sendNotification(
        "File Opened",
        `${item.name} launched successfully.`,
        "info"
    );
}