let inactivityTimer = null;
let isScreensaverActive = false;

function startAmbientSystem() {
  applyDeepNightMode();
  setupInactivityWatcher();

  setInterval(applyDeepNightMode, 60000);
}

function applyDeepNightMode() {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 6) {
    document.documentElement.classList.add("deep-night-mode");
  } else {
    document.documentElement.classList.remove("deep-night-mode");
  }
}

function setupInactivityWatcher() {
  resetInactivityTimer();

  document.addEventListener("mousemove", handleUserActivity);
  document.addEventListener("keydown", handleUserActivity);
  document.addEventListener("click", handleUserActivity);
  document.addEventListener("touchstart", handleUserActivity);
}

function handleUserActivity() {
  if (isScreensaverActive) {
    hideScreensaver();
  }

  resetInactivityTimer();
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(function () {
    showScreensaver();
  }, 60000);
}

function showScreensaver() {
  const screensaver = document.querySelector("#screensaver");

  if (!screensaver) {
    return;
  }

  isScreensaverActive = true;

  screensaver.classList.add("screensaver-visible");
}

function hideScreensaver() {
  const screensaver = document.querySelector("#screensaver");

  if (!screensaver) {
    return;
  }

  isScreensaverActive = false;

  screensaver.classList.remove("screensaver-visible");
}

startAmbientSystem();
