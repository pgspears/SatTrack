# Interactive 3D Satellite Tracker



An interactive, real-time 3D visualization of all active satellites orbiting Earth. This web application provides a beautiful and educational tool to explore the thousands of objects humanity has placed into orbit. Built with Three.js and using live data from CelesTrak, it allows users to filter, search, and learn about the satellite ecosystem in a highly interactive way.

---

## 🚀 Features

*   **Real-Time 3D Visualization:** Renders thousands of active satellites orbiting a photorealistic Earth in real-time.
*   **Accurate Orbital Data:** Fetches live Two-Line Element (TLE) data from CelesTrak and uses the SGP4 propagation model via `satellite.js` for scientifically accurate positioning.
*   **Interactive Controls:**
    *   **Time Warp:** Speed up time up to 1000x to see the orbital dance unfold.
    *   **Dynamic Sizing:** Adjust the visual size of satellites for clarity.
    *   **Toggle Orbits:** Show or hide the orbital paths to reduce visual clutter.
    *   **Full 3D Camera:** Rotate (left-drag), pan (right-drag), and zoom (scroll) to explore the scene from any angle.
*   **Powerful Filtering & Search:**
    *   **Filter by Group:** Display specific satellite categories like GPS, GLONASS, Galileo, Starlink, Space Stations, Weather, and more.
    *   **Filter by Year:** Use a slider to show only satellites with an operational epoch up to a certain year.
    *   **Live Search:** Instantly search the data table by satellite name or NORAD ID.
*   **Informative Data Table:**
    *   View detailed orbital parameters for every displayed satellite, including Inclination, Period, Apogee, and Perigee.
    *   Hover over any satellite in the table to highlight its position and orbit in the 3D view.
*   **High Performance:**
    *   Utilizes a single, high-performance `LineSegments` object for efficient orbit rendering.
    *   Caches TLE data in `localStorage` for an instant-on experience, with seamless background updates.
*   **Educational "Learn More" Section:** An in-depth modal provides comprehensive information on satellite history, orbital mechanics, launch and operations, and how the application works.

## 🛠️ Technology Stack

*   **3D Rendering:** [Three.js](https://threejs.org/) (using WebGL)
*   **Orbital Mechanics:** [satellite.js](https://github.com/shashwatak/satellite-js)
*   **Data Source:** [CelesTrak](https://celestrak.org/) (via a client-side CORS proxy)
*   **Core Technologies:** HTML5, CSS3, JavaScript (ES6+)

## 🔧 Local Development Setup

This project is a static web application and does not require a complex backend. However, due to browser security policies (CORS) regarding local file access, you must serve the files from a local web server.

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-github-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Ensure All Assets Are Present:**
    The project relies on several local image assets for textures. Make sure these are present in the root directory:
    *   `earth_day.jpg`
    *   `earth_night.jpg`
    *   `earth_clouds.jpg`
    *   `starfield.jpg`
    *   `satellite.min.js` (The satellite propagation library)

3.  **Run a Local Server (Choose one):**

    *   **Using Python:**
        If you have Python installed, this is the simplest method.
        ```bash
        # For Python 3
        python -m http.server
        
        # For Python 2
        python -m SimpleHTTPServer
        ```
        Then, open your browser and go to `http://localhost:8000`.

    *   **Using VS Code Live Server:**
        If you use Visual Studio Code, the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension is highly recommended. Simply right-click on `index.html` and choose "Open with Live Server".

    *   **Using Node.js:**
        If you have Node.js installed:
        ```bash
        # Install the http-server package globally
        npm install -g http-server
        
        # Run the server in the project directory
        http-server
        ```
        Then, open your browser to the address provided (usually `http://127.0.0.1:8080`).


## 🙏 Acknowledgements

*   **Data:** A huge thank you to **Dr. T.S. Kelso** and **[CelesTrak](https://celestrak.org/)** for providing the high-quality, publicly accessible TLE data that makes this project possible.
*   **Libraries:** This project stands on the shoulders of giants. Our deepest gratitude to the creators and maintainers of [Three.js](https://threejs.org/) and [satellite.js](https://github.com/shashwatak/satellite-js).
*   **Textures:** Earth and starfield textures are sourced from the excellent collection at [Solar System Scope](https://www.solarsystemscope.com/textures/).

---

© 2024 Accelerate Solutions, LLC
