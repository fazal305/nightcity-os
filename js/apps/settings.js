const themeOptions = [
    {
        id: "theme-cyberpunk",
        label: "CYBERPUNK"
    },
    {
        id: "theme-blood-red",
        label: "BLOOD RED"
    },
    {
        id: "theme-deep-ocean",
        label: "DEEP OCEAN"
    },
    {
        id: "theme-ghost-white",
        label: "GHOST WHITE"
    }
];

/* 
   Builds the settings app inside a window
*/
function renderSettingsApp(contentElement) {
    const savedTheme = loadFromStorage("nightcity-theme", "theme-cyberpunk");
    const savedAccent = loadFromStorage("nightcity-accent", "#00f5ff");
    const savedWallpaper = loadFromStorage("nightcity-wallpaper", "rain");

    contentElement.innerHTML = `
        <div class="settings-app">
            <section class="settings-panel">
                <h3>Theme Control</h3>
                <div id="theme-buttons" class="settings-button-grid"></div>
            </section>

            <section class="settings-panel">
                <h3>Accent Color</h3>

                <input
                    id="accent-color-picker"
                    class="settings-color-picker"
                    type="color"
                    value="${savedAccent}"
                >
            </section>

            <section class="settings-panel">
                <h3>Wallpaper</h3>

                <div class="settings-button-grid">
                    <button class="settings-btn" data-wallpaper="rain" type="button">Rain</button>
                    <button class="settings-btn" data-wallpaper="stars" type="button">Stars</button>
                    <button class="settings-btn" data-wallpaper="city" type="button">City</button>
                </div>
            </section>

            <p class="settings-status" id="settings-status">
                Active theme: ${savedTheme} // Wallpaper: ${savedWallpaper}
            </p>
        </div>
    `;

    setupSettingsApp();
}

/* 
   Connects theme, color, and wallpaper controls
*/
function setupSettingsApp() {
    renderThemeButtons();

    const colorPicker = document.querySelector("#accent-color-picker");
    const wallpaperButtons = document.querySelectorAll("[data-wallpaper]");

    if (colorPicker) {
        colorPicker.addEventListener("input", function () {
            const selectedColor = colorPicker.value;

            document.documentElement.style.setProperty("--accent-cyan", selectedColor);
            saveToStorage("nightcity-accent", selectedColor);

            updateSettingsStatus("Accent color updated.");
        });
    }

    wallpaperButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const wallpaperName = button.getAttribute("data-wallpaper");

            switchWallpaper(wallpaperName);
            saveToStorage("nightcity-wallpaper", wallpaperName);

            updateSettingsStatus(`Wallpaper changed to ${wallpaperName}.`);
        });
    });
}

/* 
   Renders all theme buttons
*/
function renderThemeButtons() {
    const themeButtons = document.querySelector("#theme-buttons");

    if (!themeButtons) {
        return;
    }

    themeButtons.innerHTML = "";

    themeOptions.forEach(function (theme) {
        const button = document.createElement("button");

        button.classList.add("settings-btn");
        button.type = "button";
        button.textContent = theme.label;

        button.addEventListener("click", function () {
            applyTheme(theme.id);
            saveToStorage("nightcity-theme", theme.id);

            updateSettingsStatus(`Theme changed to ${theme.label}.`);
        });

        themeButtons.appendChild(button);
    });
}

/* 
   Applies a theme class to the html tag
*/
function applyTheme(themeId) {
    document.documentElement.classList.remove(
        "theme-cyberpunk",
        "theme-blood-red",
        "theme-deep-ocean",
        "theme-ghost-white"
    );

    document.documentElement.classList.add(themeId);
}

/* 
   Loads saved settings when the page starts
*/
function loadSavedSettings() {
    const savedTheme = loadFromStorage("nightcity-theme", "theme-cyberpunk");
    const savedAccent = loadFromStorage("nightcity-accent", "#00f5ff");
    const savedWallpaper = loadFromStorage("nightcity-wallpaper", "rain");

    applyTheme(savedTheme);

    document.documentElement.style.setProperty("--accent-cyan", savedAccent);

    if (typeof switchWallpaper === "function") {
        switchWallpaper(savedWallpaper);
    }
}

/* 
   Updates the small settings status text
*/
function updateSettingsStatus(message) {
    const status = document.querySelector("#settings-status");

    if (!status) {
        return;
    }

    status.textContent = message;
}

loadSavedSettings();