const bootLines = [
    "NIGHTCITY OS v1.0",
    "Initializing core systems...",
    "Loading desktop environment...",
    "Welcome back, Fazal."
];

const apps = [
    {
        id: "radio",
        label: "NIGHTSHIFT FM",
        emoji: "FM",
        color: "#bf5fff",
        windowWidth: 620,
        windowHeight: 440
    },
    {
        id: "terminal",
        label: "TERMINAL",
        emoji: ">_",
        color: "#00f5ff",
        windowWidth: 680,
        windowHeight: 460
    },
    {
        id: "notes",
        label: "NOTES",
        emoji: "NT",
        color: "#ffcc00",
        windowWidth: 720,
        windowHeight: 500
    },
    {
        id: "weather",
        label: "WEATHER",
        emoji: "WX",
        color: "#00f5ff",
        windowWidth: 560,
        windowHeight: 420
    },
    {
        id: "settings",
        label: "SETTINGS",
        emoji: "CFG",
        color: "#ff003c",
        windowWidth: 600,
        windowHeight: 460
    },
    {
        id: "files",
        label: "FILES",
        emoji: "DIR",
        color: "#bf5fff",
        windowWidth: 620,
        windowHeight: 440
    }
];

function bootSequence() {
    const bootScreen = document.querySelector("#boot-screen");
    const bootOutput = document.querySelector("#boot-output");
    const desktop = document.querySelector("#desktop");

    let currentLineIndex = 0;

    const bootInterval = setInterval(function () {
        const bootLine = document.createElement("p");

        bootLine.classList.add("boot-line");
        bootLine.textContent = bootLines[currentLineIndex];

        bootOutput.appendChild(bootLine);

        currentLineIndex++;

        if (currentLineIndex === bootLines.length) {
            clearInterval(bootInterval);

            setTimeout(function () {
                bootScreen.classList.add("boot-hidden");
                desktop.classList.add("desktop-visible");

                sendNotification(
                    "Welcome Back",
                    "Desktop environment loaded successfully.",
                    "info"
                );
            }, 900);
        }
    }, 700);
}

function renderDesktopIcons() {
    const desktopIcons = document.querySelector("#desktop-icons");

    if (!desktopIcons) {
        return;
    }

    desktopIcons.innerHTML = "";

    apps.forEach(function (app) {
        const iconButton = document.createElement("button");
        const iconEmoji = document.createElement("span");
        const iconLabel = document.createElement("span");

        iconButton.classList.add("desktop-icon");
        iconButton.type = "button";
        iconButton.style.setProperty("--icon-color", app.color);
        iconButton.style.setProperty("--icon-glow", `${app.color}55`);
        iconButton.setAttribute("aria-label", `Open ${app.label}`);

        iconEmoji.classList.add("desktop-icon-emoji");
        iconEmoji.textContent = app.emoji;

        iconLabel.classList.add("desktop-icon-label");
        iconLabel.textContent = app.label;

        iconButton.appendChild(iconEmoji);
        iconButton.appendChild(iconLabel);

        iconButton.addEventListener("dblclick", function () {
            openWindow(app.id);
        });

        iconButton.addEventListener("click", function () {
            iconButton.focus();
        });

        desktopIcons.appendChild(iconButton);
    });
}

bootSequence();
renderDesktopIcons();
