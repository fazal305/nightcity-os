let wallpaperCanvas = null;
let wallpaperContext = null;
let wallpaperAnimationId = null;
let activeWallpaper = "rain";
let rainDrops = [];
let stars = [];
let cityLights = [];

/* 
   Starts the animated wallpaper canvas
*/
function startWallpaperEngine() {
    wallpaperCanvas = document.querySelector("#wallpaper-canvas");

    if (!wallpaperCanvas) {
        return;
    }

    wallpaperContext = wallpaperCanvas.getContext("2d");

    resizeWallpaperCanvas();
    createWallpaperParticles();
    animateWallpaper();

    window.addEventListener("resize", function () {
        resizeWallpaperCanvas();
        createWallpaperParticles();
    });
}

/* 
   Makes the canvas match the browser window size
*/
function resizeWallpaperCanvas() {
    wallpaperCanvas.width = window.innerWidth;
    wallpaperCanvas.height = window.innerHeight;
}

/* 
   Creates particles for all wallpaper modes
*/
function createWallpaperParticles() {
    rainDrops = [];
    stars = [];
    cityLights = [];

    for (let i = 0; i < 120; i++) {
        rainDrops.push({
            x: Math.random() * wallpaperCanvas.width,
            y: Math.random() * wallpaperCanvas.height,
            length: Math.random() * 18 + 8,
            speed: Math.random() * 5 + 3
        });
    }

    for (let i = 0; i < 90; i++) {
        stars.push({
            x: Math.random() * wallpaperCanvas.width,
            y: Math.random() * wallpaperCanvas.height,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 0.6 + 0.2
        });
    }

    for (let x = 20; x < wallpaperCanvas.width; x += 34) {
        for (let y = 80; y < wallpaperCanvas.height; y += 34) {
            cityLights.push({
                x: x,
                y: y,
                size: Math.random() * 3 + 1,
                glow: Math.random()
            });
        }
    }
}

/* 
   Switches the active wallpaper mode
*/
function switchWallpaper(wallpaperName) {
    activeWallpaper = wallpaperName;
    createWallpaperParticles();
}

/* 
   Runs the wallpaper animation loop
*/
function animateWallpaper() {
    wallpaperContext.clearRect(
        0,
        0,
        wallpaperCanvas.width,
        wallpaperCanvas.height
    );

    if (activeWallpaper === "rain") {
        drawRainWallpaper();
    }

    if (activeWallpaper === "stars") {
        drawStarWallpaper();
    }

    if (activeWallpaper === "city") {
        drawCityWallpaper();
    }

    wallpaperAnimationId = requestAnimationFrame(animateWallpaper);
}

/* 
   Draws falling cyberpunk rain
*/
function drawRainWallpaper() {
    wallpaperContext.strokeStyle = "rgba(0, 245, 255, 0.45)";
    wallpaperContext.lineWidth = 1;

    rainDrops.forEach(function (drop) {
        wallpaperContext.beginPath();
        wallpaperContext.moveTo(drop.x, drop.y);
        wallpaperContext.lineTo(drop.x - 4, drop.y + drop.length);
        wallpaperContext.stroke();

        drop.y += drop.speed;

        if (drop.y > wallpaperCanvas.height) {
            drop.y = -20;
            drop.x = Math.random() * wallpaperCanvas.width;
        }
    });
}

/* 
   Draws a scrolling star field
*/
function drawStarWallpaper() {
    wallpaperContext.fillStyle = "rgba(191, 95, 255, 0.8)";

    stars.forEach(function (star) {
        wallpaperContext.beginPath();
        wallpaperContext.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        wallpaperContext.fill();

        star.y += star.speed;

        if (star.y > wallpaperCanvas.height) {
            star.y = 0;
            star.x = Math.random() * wallpaperCanvas.width;
        }
    });
}

/* 
   Draws a pulsing city light grid
*/
function drawCityWallpaper() {
    cityLights.forEach(function (light) {
        light.glow += 0.04;

        const opacity = 0.25 + Math.abs(Math.sin(light.glow)) * 0.65;

        wallpaperContext.fillStyle = `rgba(255, 0, 60, ${opacity})`;
        wallpaperContext.shadowColor = "rgba(255, 0, 60, 0.9)";
        wallpaperContext.shadowBlur = 10;

        wallpaperContext.fillRect(light.x, light.y, light.size, light.size);

        wallpaperContext.shadowBlur = 0;
    });
}

startWallpaperEngine();