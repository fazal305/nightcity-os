# NIGHTCITY OS

A browser-based cyberpunk desktop simulator built with HTML, CSS, Canvas, localStorage, Open-Meteo, and vanilla JavaScript.

## Live Demo

https://fazal305.github.io/nightcity-os/

## Project Overview

NIGHTCITY OS turns the browser into a fictional neon operating system. It includes a boot sequence, animated desktop wallpaper, draggable app windows, a taskbar, notifications, settings, notes, a terminal, weather, a file explorer, and a radio-style audio interface.

The project is built without frameworks and uses a modular file structure to keep each desktop system and application separate.

## Screenshot

![Nightcity OS Screenshot](image.png)

## Features

- Animated boot screen
- Cyberpunk desktop environment
- Draggable, minimizable, maximizable, and closable app windows
- Taskbar with live clock and app pills
- Desktop icons generated from JavaScript app data
- Notification system
- Canvas wallpaper modes
- Idle screensaver
- Deep night mode
- Theme switching and accent customization
- Notes app with localStorage persistence
- Fake terminal with custom commands
- File explorer simulation
- Weather app using Open-Meteo
- Nightshift FM radio interface
- Responsive desktop behavior

## Built With

- HTML5
- CSS3
- Vanilla JavaScript
- Canvas API
- localStorage
- Open-Meteo API

## Project Structure

```text
nightcity-os/
|-- index.html
|-- image.png
|-- README.md
|-- LICENSE
|-- css/
|   |-- apps.css
|   |-- desktop.css
|   |-- themes.css
|   |-- windows.css
|-- js/
|   |-- apps/
|   |   |-- explorer.js
|   |   |-- notes.js
|   |   |-- radio.js
|   |   |-- settings.js
|   |   |-- terminal.js
|   |   |-- weather.js
|   |-- audio/
|   |   |-- ambient.js
|   |-- canvas/
|   |   |-- wallpaper.js
|   |-- core/
|   |   |-- desktop.js
|   |   |-- taskbar.js
|   |   |-- window-manager.js
|   |-- storage/
|   |   |-- storage.js
|   |-- widgets/
|       |-- notifications.js
```

## How To Run

Open `index.html` in a browser.

No installation, bundler, or framework is required.

## Portfolio Notes

This project demonstrates:

- Multi-file frontend architecture
- DOM-driven desktop UI systems
- Window management logic
- Canvas animation
- Browser storage
- API integration
- Interactive app design
- Responsive UI engineering with vanilla JavaScript

## Future Ideas

- Saveable desktop icon positions
- More terminal commands
- Real audio playback
- Browser app simulation
- App marketplace screen
- Login and user profile simulation
- Mission-style mini apps

## Author

Fazal Abbas

- GitHub: https://github.com/fazal305
- LinkedIn: https://www.linkedin.com/in/fazal-abbas-4653dg86

## License

This project is licensed under the MIT License.
