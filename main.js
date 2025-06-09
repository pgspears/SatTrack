function runApplication() {
    console.log("--- Application Starting ---");

    // --- Scene, Camera, Renderer Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scene-container').appendChild(renderer.domElement);

    // --- Constants & Globals ---
    const EARTH_RADIUS_KM = 6378.137;
    const VISUAL_SCALE = 1 / 1000;
    const EARTH_RADIUS_SCALED = EARTH_RADIUS_KM * VISUAL_SCALE;
    let masterSatelliteData = [];
    let displayedSatelliteData = [];
    let satelliteObjects, orbitsObject;
    let originalColors;

    let timeScale = 1;
    let currentTime = new Date();
    const clock = new THREE.Clock();

    // --- Lighting & Controls ---
    // THE LIGHTING FIX: Adjust values for better day/night contrast
    scene.add(new THREE.AmbientLight(0x222222)); // Much darker ambient light
    const light = new THREE.DirectionalLight(0xffffff, 1.2); // Slightly brighter directional light
    light.position.set(10, 5, 10);
    scene.add(light);
    
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = EARTH_RADIUS_SCALED * 1.2;
    controls.maxDistance = EARTH_RADIUS_SCALED * 50;
    controls.dollyToCursor = true;
    camera.position.z = EARTH_RADIUS_SCALED * 3;

    // --- DOM Elements ---
    // ... (This section is unchanged) ...

    // --- Event Listeners ---
    // ... (This section is unchanged) ...

    // --- Textures and Scene Objects ---
    const textureLoader = new THREE.TextureLoader();
    const starGeometry = new THREE.SphereGeometry(30000, 64, 64);
    const starMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load('starfield.jpg'), side: THREE.BackSide });
    scene.add(new THREE.Mesh(starGeometry, starMaterial));
    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS_SCALED, 64, 64);
    
    // THE LIGHTING FIX: Reduce emissive intensity to make the night side darker
    const earthMaterial = new THREE.MeshPhongMaterial({ 
        map: textureLoader.load('earth_day.jpg'), 
        shininess: 5, 
        emissiveMap: textureLoader.load('earth_night.jpg'), 
        emissive: new THREE.Color(0xaaaaaa), 
        emissiveIntensity: 0.1 // Significantly reduce night-side glow
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // --- Satellite Data and Scene Management ---
    // ... (The rest of the file is unchanged, the bug is already fixed here) ...
    
    // (The full main.js file content is identical to the last working version,
    // only the lighting values above are changed)
}

// Full main.js to copy-paste for certainty
function runApplication() {
    console.log("--- Application Starting ---");

    // --- Scene, Camera, Renderer Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scene-container').appendChild(renderer.domElement);

    // --- Constants & Globals ---
    const EARTH_RADIUS_KM = 6378.137;
    const VISUAL_SCALE = 1 / 1000;
    const EARTH_RADIUS_SCALED = EARTH_RADIUS_KM * VISUAL_SCALE;
    let masterSatelliteData = [];
    let displayedSatelliteData = [];
    let satelliteObjects, orbitsObject;
    let originalColors;

    let timeScale = 1;
    let currentTime = new Date();
    const clock = new THREE.Clock();

    // --- Lighting & Controls ---
    scene.add(new THREE.AmbientLight(0x222222));
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(10, 5, 10);
    scene.add(light);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = EARTH_RADIUS_SCALED * 1.2;
    controls.maxDistance = EARTH_RADIUS_SCALED * 50;
    controls.dollyToCursor = true;
    camera.position.z = EARTH_RADIUS_SCALED * 3;

    // --- DOM Elements ---
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loader-text');
    const satCountEl = document.getElementById('sat-count');
    const timeDisplayEl = document.getElementById('time-display');
    const tableBody = document.getElementById('sat-table-body');
    const toggleButton = document.getElementById('toggle-table');
    const tableWrapper = document.getElementById('table-wrapper');
    const timeWarpSlider = document.getElementById('time-warp');
    const timeWarpValueEl = document.getElementById('time-warp-value');
    const satSizeSlider = document.getElementById('satellite-size');
    const satSizeValueEl = document.getElementById('satellite-size-value');
    const launchYearSlider = document.getElementById('launch-year');
    const launchYearValueEl = document.getElementById('launch-year-value');
    const satTypeSelect = document.getElementById('satellite-type');
    const toggleOrbitsBtn = document.getElementById('toggle-orbits');
    const searchInput = document.getElementById('search-input');
    const learnMoreBtn = document.getElementById('learn-more-btn');
    const modalContainer = document.getElementById('modal-container');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    // --- Event Listeners ---
    toggleButton.addEventListener('click', () => tableWrapper.style.display = tableWrapper.style.display === 'block' ? 'none' : 'block');
    timeWarpSlider.addEventListener('input', (e) => {
        timeScale = Math.pow(10, parseFloat(e.target.value));
        timeWarpValueEl.textContent = timeScale.toFixed(0);
    });
    satSizeSlider.addEventListener('input', (e) => {
        if (satelliteObjects) satelliteObjects.material.size = parseFloat(e.target.value);
        satSizeValueEl.textContent = parseFloat(e.target.value).toFixed(1);
    });
    launchYearSlider.addEventListener('input', (e) => {
        const selectedYear = parseInt(e.target.value);
        launchYearValueEl.textContent = selectedYear;
        applyFilters(selectedYear);
    });
    satTypeSelect.addEventListener('change', (e) => loadSatelliteData(e.target.value));
    toggleOrbitsBtn.addEventListener('click', () => { if (orbitsObject) orbitsObject.visible = !orbitsObject.visible; });
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = tableBody.getElementsByTagName('tr');
        for (let row of rows) {
            const rowText = row.textContent.toLowerCase();
            if (rowText.includes(searchTerm)) row.style.display = '';
            else row.style.display = 'none';
        }
    });
    learnMoreBtn.addEventListener('click', () => {
        modalContainer.classList.remove('modal-hidden');
    });
    modalCloseBtn.addEventListener('click', () => {
        modalContainer.classList.add('modal-hidden');
    });
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            modalContainer.classList.add('modal-hidden');
        }
    });

    // --- Textures and Scene Objects ---
    const textureLoader = new THREE.TextureLoader();
    const starGeometry = new THREE.SphereGeometry(30000, 64, 64);
    const starMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load('starfield.jpg'), side: THREE.BackSide });
    scene.add(new THREE.Mesh(starGeometry, starMaterial));
    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS_SCALED, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({ map: textureLoader.load('earth_day.jpg'), shininess: 5, emissiveMap: textureLoader.load('earth_night.jpg'), emissive: new THREE.Color(0xaaaaaa), emissiveIntensity: 0.1 });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // --- Satellite Data and Scene Management ---
    function cleanupScene() {
        if (satelliteObjects) scene.remove(satelliteObjects);
        if (orbitsObject) scene.remove(orbitsObject);
        tableBody.innerHTML = '';
        satelliteObjects = orbitsObject = null;
    }

    function processTleData(tleData) {
        console.log("Processing TLE data...");
        masterSatelliteData = [];
        const lines = tleData.split('\n');
        for (let i = 0; i < lines.length - 2; i += 3) {
            const name = lines[i].trim();
            const tle1 = lines[i + 1].trim();
            const tle2 = lines[i + 2].trim();
            if (name && tle1 && tle2) {
                const satrec = satellite.twoline2satrec(tle1, tle2);
                if(satrec) masterSatelliteData.push({ name, satrec });
            }
        }
        masterSatelliteData.sort((a, b) => a.name.localeCompare(b.name));
        console.log(`Successfully processed ${masterSatelliteData.length} satellites.`);
        
        displayedSatelliteData = [...masterSatelliteData];
        rebuildSceneForDisplayedSats();
    }

    async function loadSatelliteData(group = 'active') {
        cleanupScene();
        loader.style.display = 'flex';
        const cacheKey = `tle_data_${group}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
            console.log(`[CACHE] Found cached data for group: ${group}. Displaying immediately.`);
            loaderText.textContent = `Loading cached satellites...`;
            processTleData(JSON.parse(cachedData).data);
            loader.style.display = 'none';
        }

        console.log(`[FETCH] Starting background fetch for group: ${group}...`);
        loaderText.textContent = `Fetching latest data for ${group}...`;
        loader.style.display = 'flex';

        const tleUrl = `https://celestrak.org/NORAD/elements/gp.php?GROUP=${group}&FORMAT=tle`;
        const proxies = [ 'https://corsproxy.io/?', 'https://api.allorigins.win/raw?url=' ];
        let tleData;
        for (const proxy of proxies) {
            try {
                const response = await fetch(proxy + encodeURIComponent(tleUrl));
                if (!response.ok) throw new Error(`Response not OK: ${response.statusText}`);
                tleData = await response.text();
                if (tleData && tleData.length > 100) break;
            } catch (error) { tleData = null; }
        }

        if (tleData) {
            if (!cachedData || JSON.parse(cachedData).data !== tleData) {
                console.log("[UPDATE] New data is different from cache. Updating scene and cache.");
                localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: tleData }));
                processTleData(tleData);
            } else { console.log("[UPDATE] Fetched data is same as cache. No update needed."); }
        } else {
            console.error("[FATAL] All fetch attempts failed.");
            if (!cachedData) loaderText.textContent = `Error fetching data for ${group}.`;
        }
        loader.style.display = 'none';
    }

    function applyFilters(yearFilter) {
        displayedSatelliteData = masterSatelliteData.filter(sat => {
             const satYear = parseInt(sat.satrec.epochyr);
             const fullYear = satYear < 57 ? satYear + 2000 : satYear + 1900;
             return fullYear <= yearFilter;
        });
        rebuildSceneForDisplayedSats();
    }

    function rebuildSceneForDisplayedSats() {
        cleanupScene();
        console.log(`Rebuilding scene for ${displayedSatelliteData.length} satellites.`);

        const satPositions = []; const satColors = []; const color = new THREE.Color();
        const allOrbitVertices = []; const allOrbitColors = [];
        
        displayedSatelliteData.forEach((sat) => {
            satPositions.push(0, 0, 0); 
            color.setHSL(Math.random(), 1.0, 0.7);
            satColors.push(color.r, color.g, color.b);
            const orbitPoints = getOrbitPoints(sat.satrec);
            for (let i = 0; i < orbitPoints.length - 1; i++) {
                allOrbitVertices.push(orbitPoints[i], orbitPoints[i + 1]);
                allOrbitColors.push(color, color);
            }
        });

        originalColors = new Float32Array(satColors);
        const satGeometry = new THREE.BufferGeometry();
        satGeometry.setAttribute('position', new THREE.Float32BufferAttribute(satPositions, 3));
        satGeometry.setAttribute('color', new THREE.Float32BufferAttribute(satColors, 3));
        const satMaterial = new THREE.PointsMaterial({ size: parseFloat(satSizeSlider.value), vertexColors: true, sizeAttenuation: false });
        satelliteObjects = new THREE.Points(satGeometry, satMaterial);
        scene.add(satelliteObjects);
        
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(allOrbitVertices);
        const orbitColors = allOrbitColors.flatMap(c => [c.r, c.g, c.b]);
        orbitGeometry.setAttribute('color', new THREE.Float32BufferAttribute(orbitColors, 3));
        const orbitMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.4 });
        orbitsObject = new THREE.LineSegments(orbitGeometry, orbitMaterial);
        orbitsObject.visible = false;
        scene.add(orbitsObject);
        
        populateDataTable();
    }
    
    function populateDataTable() {
        tableBody.innerHTML = '';
        displayedSatelliteData.forEach((sat, index) => {
            const params = calculateOrbitalParameters(sat.satrec);
            const row = document.createElement('tr');
            row.innerHTML = `<td>${sat.name}</td><td>${sat.satrec.satnum}</td><td>${params.inclination.toFixed(2)}</td><td>${params.period.toFixed(2)}</td><td>${params.apogee.toFixed(0)}</td><td>${params.perigee.toFixed(0)}</td>`;
            row.addEventListener('mouseover', () => highlightSatellite(index, true));
            row.addEventListener('mouseout', () => highlightSatellite(index, false));
            tableBody.appendChild(row);
        });
        satCountEl.textContent = displayedSatelliteData.length;
        console.log(`Data table populated with ${displayedSatelliteData.length} entries.`);
    }
    
    function getOrbitPoints(satrec) {
        const points = []; const periodMinutes = (2 * Math.PI) / satrec.no; const stepMinutes = periodMinutes / 120;
        const now = Date.now();
        for (let i = 0; i <= 120; i++) {
            const time = new Date(now + i * stepMinutes * 60000);
            const pos = satellite.propagate(satrec, time)?.position;
            if (pos) points.push(new THREE.Vector3(pos.x, pos.z, -pos.y).multiplyScalar(VISUAL_SCALE));
        } return points;
    }
    function calculateOrbitalParameters(satrec) {
        const period = ((2 * Math.PI) / satrec.no);
        const semiMajorAxis = Math.pow(8681663.653 / satrec.no, 2/3);
        const apogee = semiMajorAxis * (1 + satrec.ecco) - EARTH_RADIUS_KM;
        const perigee = semiMajorAxis * (1 - satrec.ecco) - EARTH_RADIUS_KM;
        const inclination = satellite.radiansToDegrees(satrec.inclo);
        return { period, apogee, perigee, inclination };
    }
    
    let highlightedIndex = -1;
    function highlightSatellite(index, isHighlighted) { highlightedIndex = isHighlighted ? index : -1; }

    function animate() {
        requestAnimationFrame(animate);
        const deltaTime = clock.getDelta();
        currentTime = new Date(currentTime.getTime() + deltaTime * 1000 * timeScale);
        timeDisplayEl.textContent = currentTime.toUTCString();

        if (satelliteObjects) {
            const positions = satelliteObjects.geometry.attributes.position.array;
            const colors = satelliteObjects.geometry.attributes.color.array;
            displayedSatelliteData.forEach((sat, index) => {
                const pos = satellite.propagate(sat.satrec, currentTime)?.position;
                if (pos) {
                    positions[index * 3] = pos.x * VISUAL_SCALE;
                    positions[index * 3 + 1] = pos.z * VISUAL_SCALE;
                    positions[index * 3 + 2] = -pos.y * VISUAL_SCALE;
                }
                if (index === highlightedIndex) {
                    colors[index * 3] = 1.0; colors[index * 3 + 1] = 1.0; colors[index * 3 + 2] = 0.0;
                } else {
                    colors[index * 3] = originalColors[index * 3];
                    colors[index * 3 + 1] = originalColors[index * 3 + 1];
                    colors[index * 3 + 2] = originalColors[index * 3 + 2];
                }
            });
            satelliteObjects.geometry.attributes.position.needsUpdate = true;
            satelliteObjects.geometry.attributes.color.needsUpdate = true;
        }
        controls.update();
        renderer.render(scene, camera);
    }
    
    loadSatelliteData('active');
    animate();
}
window.onload = runApplication;