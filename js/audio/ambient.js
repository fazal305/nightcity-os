let inactivityTimer = null;
let isScreensaverActive = false;

/* 
   Starts all ambient OS reactions
*/
function startAmbientSystem() {
    applyDeepNightMode();
    setupInactivityWatcher();

    setInterval(applyDeepNightMode, 60000);
}

/* 
   Applies darker styling between midnight and 6am
*/
function applyDeepNightMode() {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 6) {
        document.documentElement.classList.add("deep-night-mode");
    } else {
        document.documentElement.classList.remove("deep-night-mode");
    }
}

/* 
   Watches user activity and starts screensaver after inactivity
*/
function setupInactivityWatcher() {
    resetInactivityTimer();

    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);
    document.addEventListener("click", handleUserActivity);
    document.addEventListener("touchstart", handleUserActivity);
}

/* 
   Resets the inactivity timer whenever the user interacts
*/
function handleUserActivity() {
    if (isScreensaverActive) {
        hideScreensaver();
    }

    resetInactivityTimer();
}

/* 
   Starts the 60 second inactivity countdown
*/
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);

    inactivityTimer = setTimeout(function () {
        showScreensaver();
    }, 60000);
}

/* 
   Shows the full screen screensaver
*/
function showScreensaver() {
    const screensaver = document.querySelector("#screensaver");

    if (!screensaver) {
        return;
    }

    isScreensaverActive = true;

    screensaver.classList.add("screensaver-visible");
}

/* 
   Hides the screensaver when user returns
*/
function hideScreensaver() {
    const screensaver = document.querySelector("#screensaver");

    if (!screensaver) {
        return;
    }

    isScreensaverActive = false;

    screensaver.classList.remove("screensaver-visible");
}

startAmbientSystem();