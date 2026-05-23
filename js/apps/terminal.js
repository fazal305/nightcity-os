/* 
   Builds the terminal app inside a window content area
*/
function renderTerminalApp(contentElement) {
    contentElement.innerHTML = `
        <div class="terminal-app">
            <div class="terminal-output" id="terminal-output">
                <p class="terminal-line success">NIGHTCITY TERMINAL ONLINE</p>
                <p class="terminal-line muted">Type help to view available commands.</p>
            </div>

            <form class="terminal-input-row" id="terminal-form">
                <span class="terminal-prompt">fazal@nightcity:~$</span>

                <input
                    class="terminal-input"
                    id="terminal-input"
                    type="text"
                    placeholder="enter command..."
                    autocomplete="off"
                >
            </form>
        </div>
    `;

    setupTerminal();
}

/* 
   Connects terminal form submit to the command parser
*/
function setupTerminal() {
    const terminalForm = document.querySelector("#terminal-form");
    const terminalInput = document.querySelector("#terminal-input");

    if (!terminalForm || !terminalInput) {
        return;
    }

    terminalInput.focus();

    terminalForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const command = terminalInput.value.trim();

        if (command === "") {
            return;
        }

        addTerminalLine(`fazal@nightcity:~$ ${command}`, "command");
        runTerminalCommand(command);

        terminalInput.value = "";
    });
}

/* 
   Adds a new line to the terminal output
*/
function addTerminalLine(text, type) {
    const terminalOutput = document.querySelector("#terminal-output");

    if (!terminalOutput) {
        return;
    }

    const line = document.createElement("p");

    line.classList.add("terminal-line");

    if (type) {
        line.classList.add(type);
    }

    line.textContent = text;

    terminalOutput.appendChild(line);

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

/* 
   Reads user commands and runs matching terminal actions
*/
function runTerminalCommand(command) {
    const commandParts = command.toLowerCase().split(" ");
    const mainCommand = commandParts[0];
    const secondCommand = commandParts.slice(1).join(" ");

    switch (mainCommand) {
        case "help":
            showHelpCommand();
            break;

        case "clear":
            clearTerminal();
            break;

        case "date":
            addTerminalLine(new Date().toString(), "success");
            break;

        case "whoami":
            addTerminalLine("Fazal Abbas // User 001", "success");
            break;

        case "system-info":
            showSystemInfo();
            break;

        case "launch":
            launchAppFromTerminal(secondCommand);
            break;

        case "weather":
            addTerminalLine("Weather command will connect to the real weather app in Step 10.", "muted");
            break;

        case "music":
            addTerminalLine("Music station switching will connect deeper after the radio system grows.", "muted");
            break;

        default:
            addTerminalLine(`Command not found: ${command}. Even the robots are confused.`, "error");
            break;
    }
}

/* 
   Prints the list of supported terminal commands
*/
function showHelpCommand() {
    addTerminalLine("Available commands:", "success");
    addTerminalLine("help          - show this command list", "muted");
    addTerminalLine("clear         - clear terminal output", "muted");
    addTerminalLine("date          - show current date and time", "muted");
    addTerminalLine("whoami        - show current user", "muted");
    addTerminalLine("system-info   - show fake OS stats", "muted");
    addTerminalLine("launch radio  - open an app by name", "muted");
    addTerminalLine("weather       - weather app shortcut placeholder", "muted");
    addTerminalLine("music station - music shortcut placeholder", "muted");
}

/* 
   Clears the terminal output area
*/
function clearTerminal() {
    const terminalOutput = document.querySelector("#terminal-output");

    if (!terminalOutput) {
        return;
    }

    terminalOutput.innerHTML = "";

    addTerminalLine("Terminal cleared.", "success");
}

/* 
   Shows fake operating system stats
*/
function showSystemInfo() {
    addTerminalLine("NIGHTCITY OS v1.0", "success");
    addTerminalLine("User: Fazal Abbas", "muted");
    addTerminalLine("RAM: 16GB neon memory allocated", "muted");
    addTerminalLine("CPU: CyberCore 8088 experimental chip", "muted");
    addTerminalLine("Uptime: unstable but stylish", "muted");
}

/* 
   Opens an app from a terminal command
*/
function launchAppFromTerminal(appName) {
    if (!appName) {
        addTerminalLine("Usage: launch radio", "error");

        return;
    }

    const matchedApp = apps.find(function (app) {
        return app.id === appName || app.label.toLowerCase() === appName;
    });

    if (!matchedApp) {
        addTerminalLine(`No app called "${appName}" exists in NIGHTCITY OS.`, "error");

        return;
    }

    openWindow(matchedApp.id);

    addTerminalLine(`Launching ${matchedApp.label}...`, "success");
}