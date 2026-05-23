const radioStations = [
    {
        id: "nightshift",
        name: "NIGHTSHIFT FM",
        mood: "purple midnight transmission",
        color: "#bf5fff"
    },
    {
        id: "codewave",
        name: "CODEWAVE RADIO",
        mood: "cyan coding frequency",
        color: "#00f5ff"
    },
    {
        id: "ghost",
        name: "GHOST SIGNAL",
        mood: "red broken broadcast",
        color: "#ff003c"
    },
    {
        id: "solar",
        name: "SOLAR DRIFT",
        mood: "amber neon sunrise",
        color: "#ffcc00"
    }
];

let radioAudioContext = null;
let radioOscillator = null;
let radioGainNode = null;
let radioAnimationId = null;
let currentRadioStation = "nightshift";
let isRadioPlaying = false;

/* 
   Builds the radio app inside a window content area
*/
function renderRadioApp(contentElement) {
    const savedVolume = loadFromStorage("nightcity-radio-volume", 45);

    contentElement.innerHTML = `
        <div class="radio-app">
            <section class="radio-hero">
                <h3 class="radio-title">NIGHTSHIFT FM</h3>
                <p class="radio-subtitle">Browser-based cyberpunk radio module // oscillator fallback online</p>
            </section>

            <section class="radio-stations" id="radio-stations"></section>

            <section class="radio-visualizer" id="radio-visualizer"></section>

            <section class="radio-controls">
                <button class="radio-power-btn" id="radio-power-btn" type="button">
                    Start Signal
                </button>

                <label class="radio-volume">
                    Volume
                    <input
                        id="radio-volume-slider"
                        type="range"
                        min="0"
                        max="100"
                        value="${savedVolume}"
                    >
                </label>
            </section>
        </div>
    `;

    renderRadioStations();
    renderRadioBars();
    setupRadioControls(savedVolume);
}

/* 
   Renders station buttons from the station list
*/
function renderRadioStations() {
    const stationWrapper = document.querySelector("#radio-stations");

    if (!stationWrapper) {
        return;
    }

    stationWrapper.innerHTML = "";

    radioStations.forEach(function (station) {
        const stationButton = document.createElement("button");

        stationButton.classList.add("radio-station-btn");
        stationButton.type = "button";
        stationButton.style.setProperty("--station-color", station.color);
        stationButton.style.setProperty("--station-glow", `${station.color}55`);

        if (station.id === currentRadioStation) {
            stationButton.classList.add("active");
        }

        stationButton.innerHTML = `
            <span class="radio-station-name">${station.name}</span>
            <span class="radio-station-mood">${station.mood}</span>
        `;

        stationButton.addEventListener("click", function () {
            currentRadioStation = station.id;

            renderRadioStations();

            if (isRadioPlaying) {
                restartRadioSignal();
            }
        });

        stationWrapper.appendChild(stationButton);
    });
}

/* 
   Creates 32 equalizer bars
*/
function renderRadioBars() {
    const visualizer = document.querySelector("#radio-visualizer");

    if (!visualizer) {
        return;
    }

    visualizer.innerHTML = "";

    for (let i = 0; i < 32; i++) {
        const bar = document.createElement("span");

        bar.classList.add("radio-bar");

        visualizer.appendChild(bar);
    }
}

/* 
   Connects radio buttons and volume slider to the radio logic
*/
function setupRadioControls(savedVolume) {
    const powerButton = document.querySelector("#radio-power-btn");
    const volumeSlider = document.querySelector("#radio-volume-slider");

    if (!powerButton || !volumeSlider) {
        return;
    }

    powerButton.addEventListener("click", function () {
        if (isRadioPlaying) {
            stopRadioSignal();
        } else {
            startRadioSignal(savedVolume);
        }

        updateRadioPowerButton();
    });

    volumeSlider.addEventListener("input", function () {
        const volume = Number(volumeSlider.value);

        saveToStorage("nightcity-radio-volume", volume);

        if (radioGainNode) {
            radioGainNode.gain.value = volume / 100;
        }
    });
}

/* 
   Starts a simple generated audio signal using the Web Audio API
*/
function startRadioSignal() {
    const volumeSlider = document.querySelector("#radio-volume-slider");
    const volume = volumeSlider ? Number(volumeSlider.value) : 45;

    radioAudioContext = new AudioContext();
    radioOscillator = radioAudioContext.createOscillator();
    radioGainNode = radioAudioContext.createGain();

    radioOscillator.type = "sawtooth";
    radioOscillator.frequency.value = getStationFrequency();

    radioGainNode.gain.value = volume / 100;

    radioOscillator.connect(radioGainNode);
    radioGainNode.connect(radioAudioContext.destination);

    radioOscillator.start();

    isRadioPlaying = true;

    animateRadioBars();
}

/* 
   Stops the generated radio signal
*/
function stopRadioSignal() {
    if (radioOscillator) {
        radioOscillator.stop();
        radioOscillator.disconnect();
    }

    if (radioAnimationId) {
        cancelAnimationFrame(radioAnimationId);
    }

    radioOscillator = null;
    radioGainNode = null;
    radioAudioContext = null;
    radioAnimationId = null;
    isRadioPlaying = false;

    resetRadioBars();
}

/* 
   Restarts the radio when the user changes station while playing
*/
function restartRadioSignal() {
    stopRadioSignal();
    startRadioSignal();
    updateRadioPowerButton();
}

/* 
   Gives every station a different generated sound frequency
*/
function getStationFrequency() {
    if (currentRadioStation === "codewave") {
        return 180;
    }

    if (currentRadioStation === "ghost") {
        return 90;
    }

    if (currentRadioStation === "solar") {
        return 260;
    }

    return 130;
}

/* 
   Animates the visualizer bars while the signal is playing
*/
function animateRadioBars() {
    const bars = document.querySelectorAll(".radio-bar");
    const station = radioStations.find(function (stationItem) {
        return stationItem.id === currentRadioStation;
    });

    bars.forEach(function (bar) {
        const randomHeight = Math.floor(Math.random() * 72) + 12;

        bar.style.height = `${randomHeight}px`;
        bar.style.background = station.color;
        bar.style.color = station.color;
    });

    radioAnimationId = requestAnimationFrame(animateRadioBars);
}

/* 
   Resets visualizer bars when the radio stops
*/
function resetRadioBars() {
    const bars = document.querySelectorAll(".radio-bar");

    bars.forEach(function (bar) {
        bar.style.height = "18px";
    });
}

/* 
   Updates the radio power button text and style
*/
function updateRadioPowerButton() {
    const powerButton = document.querySelector("#radio-power-btn");

    if (!powerButton) {
        return;
    }

    if (isRadioPlaying) {
        powerButton.textContent = "Stop Signal";
        powerButton.classList.add("playing");
    } else {
        powerButton.textContent = "Start Signal";
        powerButton.classList.remove("playing");
    }
}