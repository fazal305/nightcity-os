const notificationColors = {
    info: "#00f5ff",
    warning: "#ffcc00",
    alert: "#ff003c"
};

let notificationQueue = [];

/* 
   Sends a system notification to the desktop
*/
function sendNotification(title, message, type) {
    const notificationContainer = document.querySelector("#notification-container");

    if (!notificationContainer) {
        return;
    }

    const notificationType = type || "info";
    const notificationColor = notificationColors[notificationType] || notificationColors.info;

    const notification = document.createElement("article");

    notification.classList.add("os-notification");
    notification.style.setProperty("--notification-color", notificationColor);
    notification.style.setProperty("--notification-glow", `${notificationColor}55`);

    notification.innerHTML = `
        <p class="os-notification-title">${title}</p>
        <p class="os-notification-message">${message}</p>
    `;

    notificationQueue.push(notification);

    notificationContainer.appendChild(notification);

    setTimeout(function () {
        removeNotification(notification);
    }, 4000);
}

/* 
   Removes a notification with a small exit animation
*/
function removeNotification(notification) {
    notification.classList.add("removing");

    setTimeout(function () {
        notification.remove();

        notificationQueue = notificationQueue.filter(function (queuedNotification) {
            return queuedNotification !== notification;
        });
    }, 250);
}

/* 
   Connects the notification bell to a test notification
*/
function setupNotificationTestButton() {
    const notificationButton = document.querySelector("#notification-test-btn");

    if (!notificationButton) {
        return;
    }

    notificationButton.addEventListener("click", function () {
        sendNotification(
            "System Ping",
            "NIGHTCITY notification channel is alive.",
            "info"
        );
    });
}

setupNotificationTestButton();