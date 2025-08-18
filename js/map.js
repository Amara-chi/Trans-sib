// Interactive map functionality for GlobalLogistics terminals page

document.addEventListener('DOMContentLoaded', function() {
    initializeTerminalsMap();
});

function initializeTerminalsMap() {
    const mapContainer = document.getElementById('terminals-map');
    
    if (!mapContainer) return;
    
    // Initialize the map
    const map = L.map('terminals-map', {
        center: [20, 0], // Center on equator
        zoom: 2,
        minZoom: 2,
        maxZoom: 18,
        zoomControl: true,
        attributionControl: true
    });
    
    // Add custom tile layer with modern styling
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);
    
    // Custom marker icons
    const markerIcons = {
        ocean: L.divIcon({
            className: 'custom-marker ocean-marker',
            html: '<i class="fas fa-anchor"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        }),
        air: L.divIcon({
            className: 'custom-marker air-marker',
            html: '<i class="fas fa-plane"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        }),
        land: L.divIcon({
            className: 'custom-marker land-marker',
            html: '<i class="fas fa-truck"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        }),
        warehouse: L.divIcon({
            className: 'custom-marker warehouse-marker',
            html: '<i class="fas fa-warehouse"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        })
    };
    
    // Terminal data with global locations
    const terminalsData = [
        // Ocean Terminals
        {
            name: "Port of Rotterdam Hub",
            type: "ocean",
            coordinates: [51.9244, 4.4777],
            location: "Rotterdam, Netherlands",
            capacity: "15M TEU",
            features: ["Automated Operations", "Green Certified", "24/7 Operations"],
            description: "Europe's largest port facility with state-of-the-art container handling and automated systems."
        },
        {
            name: "Port of Shanghai Terminal",
            type: "ocean",
            coordinates: [31.2304, 121.4737],
            location: "Shanghai, China",
            capacity: "47M TEU",
            features: ["World's Busiest Port", "Advanced Technology", "Multi-Modal Hub"],
            description: "The world's busiest container port with cutting-edge automation and efficiency."
        },
        {
            name: "Port of Los Angeles",
            type: "ocean",
            coordinates: [33.7372, -118.2642],
            location: "Los Angeles, USA",
            capacity: "9.3M TEU",
            features: ["Green Port", "Rail Connected", "24/7 Operations"],
            description: "Premier gateway to trans-Pacific trade with comprehensive environmental programs."
        },
        {
            name: "Port of Hamburg",
            type: "ocean",
            coordinates: [53.5511, 9.9937],
            location: "Hamburg, Germany",
            capacity: "8.9M TEU",
            features: ["Smart Port", "Rail Hub", "Sustainable Operations"],
            description: "Germany's largest seaport with intelligent port technologies and excellent rail connections."
        },
        {
            name: "Port of Antwerp",
            type: "ocean",
            coordinates: [51.2194, 4.4025],
            location: "Antwerp, Belgium",
            capacity: "12M TEU",
            features: ["Chemical Cluster", "Digital Port", "Multimodal Hub"],
            description: "Europe's second-largest port with world's largest integrated chemical cluster."
        },
        
        // Air Cargo Hubs
        {
            name: "Hong Kong Air Cargo Center",
            type: "air",
            coordinates: [22.3193, 113.5439],
            location: "Hong Kong, China",
            capacity: "5M Tons",
            features: ["Climate Control", "24/7 Operations", "Express Hub"],
            description: "Premier air cargo facility connecting Asia-Pacific markets with advanced temperature-controlled storage."
        },
        {
            name: "Memphis Air Hub",
            type: "air",
            coordinates: [35.0424, -89.9767],
            location: "Memphis, USA",
            capacity: "4.3M Tons",
            features: ["Express Hub", "Automated Sorting", "24/7 Operations"],
            description: "World's largest express cargo hub with advanced automated sorting capabilities."
        },
        {
            name: "Frankfurt Air Cargo",
            type: "air",
            coordinates: [50.0379, 8.5622],
            location: "Frankfurt, Germany",
            capacity: "2.1M Tons",
            features: ["Pharma Hub", "Temperature Control", "European Gateway"],
            description: "Europe's leading air cargo hub specializing in pharmaceutical and high-value shipments."
        },
        {
            name: "Incheon Air Cargo",
            type: "air",
            coordinates: [37.4602, 126.4407],
            location: "Seoul, South Korea",
            capacity: "2.8M Tons",
            features: ["Technology Hub", "E-commerce Center", "Asian Gateway"],
            description: "Northeast Asia's premier air cargo hub with advanced technology infrastructure."
        },
        {
            name: "Dubai Air Cargo City",
            type: "air",
            coordinates: [25.2532, 55.3657],
            location: "Dubai, UAE",
            capacity: "3.2M Tons",
            features: ["Middle East Hub", "Free Zone", "24/7 Operations"],
            description: "Strategic Middle East cargo hub connecting three continents with world-class facilities."
        },
        
        // Land Transport Hubs
        {
            name: "Chicago Intermodal Hub",
            type: "land",
            coordinates: [41.8781, -87.6298],
            location: "Chicago, USA",
            capacity: "Multi-Modal",
            features: ["Rail Hub", "Truck Terminal", "Distribution Center"],
            description: "North America's largest intermodal hub with extensive rail and trucking connections."
        },
        {
            name: "Duisburg Rail Terminal",
            type: "land",
            coordinates: [51.4344, 6.7623],
            location: "Duisburg, Germany",
            capacity: "Silk Road Hub",
            features: ["China Rail Link", "Container Terminal", "Multimodal"],
            description: "Europe's largest inland port and key terminus for China-Europe rail freight."
        },
        {
            name: "Kazakhstan Dry Port",
            type: "land",
            coordinates: [43.2775, 76.8958],
            location: "Almaty, Kazakhstan",
            capacity: "Continental Hub",
            features: ["Silk Road", "Cross-Border", "Rail Connection"],
            description: "Strategic Eurasian land bridge connecting China, Europe, and Central Asia."
        },
        {
            name: "Mexico Border Crossing",
            type: "land",
            coordinates: [25.8968, -97.3979],
            location: "Laredo, USA/Mexico",
            capacity: "Cross-Border",
            features: ["NAFTA Hub", "Truck Terminal", "Customs Facility"],
            description: "Major North American trade corridor handling significant cross-border commerce."
        },
        
        // Warehouse/Distribution Centers
        {
            name: "Singapore Logistics Hub",
            type: "warehouse",
            coordinates: [1.3521, 103.8198],
            location: "Singapore",
            capacity: "3M Sq Ft",
            features: ["Free Trade Zone", "Technology Center", "Regional Hub"],
            description: "Southeast Asia's premier logistics hub with advanced automation and regional distribution."
        },
        {
            name: "Atlanta Distribution Center",
            type: "warehouse",
            coordinates: [33.6407, -84.4277],
            location: "Atlanta, USA",
            capacity: "5M Sq Ft",
            features: ["E-commerce Hub", "Automated Systems", "Same-Day Delivery"],
            description: "Major North American distribution center serving southeastern United States markets."
        },
        {
            name: "Tokyo Logistics Center",
            type: "warehouse",
            coordinates: [35.6762, 139.6503],
            location: "Tokyo, Japan",
            capacity: "2.5M Sq Ft",
            features: ["Urban Distribution", "Technology Integration", "Last Mile"],
            description: "Advanced urban distribution facility serving greater Tokyo metropolitan area."
        },
        {
            name: "London Gateway",
            type: "warehouse",
            coordinates: [51.5074, -0.1278],
            location: "London, UK",
            capacity: "4M Sq Ft",
            features: ["European Hub", "Rail Connected", "Automation"],
            description: "Modern logistics gateway serving UK and European markets with advanced technology."
        },
        {
            name: "São Paulo Distribution",
            type: "warehouse",
            coordinates: [-23.5505, -46.6333],
            location: "São Paulo, Brazil",
            capacity: "2M Sq Ft",
            features: ["South American Hub", "Cross-Docking", "Regional Distribution"],
            description: "Strategic South American distribution center serving Brazilian and regional markets."
        },
        {
            name: "Mumbai Logistics Park",
            type: "warehouse",
            coordinates: [19.0760, 72.8777],
            location: "Mumbai, India",
            capacity: "3.5M Sq Ft",
            features: ["Indian Subcontinent Hub", "Multi-Modal", "Technology Center"],
            description: "Major South Asian logistics hub with comprehensive distribution and technology capabilities."
        }
    ];
    
    // Create marker cluster group
    const markers = L.markerClusterGroup({
        chunkedLoading: true,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 50,
        iconCreateFunction: function(cluster) {
            const childCount = cluster.getChildCount();
            let className = 'marker-cluster ';
            
            if (childCount < 5) {
                className += 'marker-cluster-small';
            } else if (childCount < 10) {
                className += 'marker-cluster-medium';
            } else {
                className += 'marker-cluster-large';
            }
            
            return L.divIcon({
                html: `<div><span>${childCount}</span></div>`,
                className: className,
                iconSize: L.point(40, 40)
            });
        }
    });
    
    // Add terminals to map
    terminalsData.forEach(terminal => {
        const marker = L.marker(terminal.coordinates, {
            icon: markerIcons[terminal.type]
        });
        
        // Create popup content
        const popupContent = `
            <div class="terminal-popup">
                <div class="popup-header">
                    <h3>${terminal.name}</h3>
                    <span class="terminal-type-badge ${terminal.type}">${terminal.type.charAt(0).toUpperCase() + terminal.type.slice(1)}</span>
                </div>
                <div class="popup-content">
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${terminal.location}</p>
                    <p class="capacity"><i class="fas fa-cube"></i> Capacity: ${terminal.capacity}</p>
                    <p class="description">${terminal.description}</p>
                    <div class="features">
                        <h4>Key Features:</h4>
                        <ul>
                            ${terminal.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="popup-actions">
                        <button class="btn btn-sm btn-primary" onclick="getTerminalDetails('${terminal.name}')">
                            <i class="fas fa-info-circle"></i> More Details
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
        });
        
        // Add click event for analytics
        marker.on('click', function() {
            console.log('Terminal clicked:', terminal.name);
        });
        
        markers.addLayer(marker);
    });
    
    // Add markers to map
    map.addLayer(markers);
    
    // Add custom controls
    addMapControls(map, terminalsData);
    
    // Add map event listeners
    map.on('zoomend', function() {
        updateMapUI(map.getZoom());
    });
    
    // Fit map to show all markers initially
    if (markers.getLayers().length > 0) {
        map.fitBounds(markers.getBounds(), { padding: [20, 20] });
    }
    
    // Add custom CSS for markers and popups
    addMapStyles();
}

// Add custom map controls
function addMapControls(map, terminalsData) {
    // Filter control
    const filterControl = L.control({ position: 'topleft' });
    
    filterControl.onAdd = function() {
        const div = L.DomUtil.create('div', 'map-filter-control');
        div.innerHTML = `
            <div class="filter-header">
                <h4><i class="fas fa-filter"></i> Filter Terminals</h4>
            </div>
            <div class="filter-options">
                <label class="filter-option">
                    <input type="checkbox" value="ocean" checked>
                    <span class="filter-color ocean"></span>
                    Ocean Terminals
                </label>
                <label class="filter-option">
                    <input type="checkbox" value="air" checked>
                    <span class="filter-color air"></span>
                    Air Cargo Hubs
                </label>
                <label class="filter-option">
                    <input type="checkbox" value="land" checked>
                    <span class="filter-color land"></span>
                    Land Transport
                </label>
                <label class="filter-option">
                    <input type="checkbox" value="warehouse" checked>
                    <span class="filter-color warehouse"></span>
                    Distribution Centers
                </label>
            </div>
        `;
        
        // Prevent map events when interacting with control
        L.DomEvent.disableClickPropagation(div);
        L.DomEvent.disableScrollPropagation(div);
        
        // Add filter functionality
        const checkboxes = div.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                filterTerminals(map, terminalsData, getActiveFilters(checkboxes));
            });
        });
        
        return div;
    };
    
    map.addControl(filterControl);
    
    // Search control
    const searchControl = L.control({ position: 'topright' });
    
    searchControl.onAdd = function() {
        const div = L.DomUtil.create('div', 'map-search-control');
        div.innerHTML = `
            <div class="search-container">
                <input type="text" id="terminal-search" placeholder="Search terminals...">
                <button id="search-btn"><i class="fas fa-search"></i></button>
                <div id="search-results" class="search-results"></div>
            </div>
        `;
        
        L.DomEvent.disableClickPropagation(div);
        L.DomEvent.disableScrollPropagation(div);
        
        // Add search functionality
        const searchInput = div.querySelector('#terminal-search');
        const searchResults = div.querySelector('#search-results');
        
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            const results = terminalsData.filter(terminal => 
                terminal.name.toLowerCase().includes(query) ||
                terminal.location.toLowerCase().includes(query) ||
                terminal.type.toLowerCase().includes(query)
            );
            
            displaySearchResults(results, searchResults, map);
        });
        
        return div;
    };
    
    map.addControl(searchControl);
}

// Filter terminals based on selected types
function filterTerminals(map, terminalsData, activeFilters) {
    // Clear existing markers
    map.eachLayer(function(layer) {
        if (layer instanceof L.MarkerClusterGroup) {
            map.removeLayer(layer);
        }
    });
    
    // Create new marker cluster group
    const markers = L.markerClusterGroup({
        chunkedLoading: true,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 50
    });
    
    // Add filtered terminals
    terminalsData.forEach(terminal => {
        if (activeFilters.includes(terminal.type)) {
            const marker = L.marker(terminal.coordinates, {
                icon: getMarkerIcon(terminal.type)
            });
            
            marker.bindPopup(createPopupContent(terminal), {
                maxWidth: 300,
                className: 'custom-popup'
            });
            
            markers.addLayer(marker);
        }
    });
    
    map.addLayer(markers);
}

// Get active filter types
function getActiveFilters(checkboxes) {
    const activeFilters = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            activeFilters.push(checkbox.value);
        }
    });
    return activeFilters;
}

// Display search results
function displaySearchResults(results, container, map) {
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">No terminals found</div>';
        container.style.display = 'block';
        return;
    }
    
    const resultsHTML = results.map(terminal => `
        <div class="search-result" onclick="flyToTerminal(${terminal.coordinates[0]}, ${terminal.coordinates[1]}, '${terminal.name}')">
            <div class="result-header">
                <span class="result-name">${terminal.name}</span>
                <span class="result-type ${terminal.type}">${terminal.type}</span>
            </div>
            <div class="result-location">${terminal.location}</div>
        </div>
    `).join('');
    
    container.innerHTML = resultsHTML;
    container.style.display = 'block';
    
    // Hide results when clicking outside
    document.addEventListener('click', function(e) {
        if (!container.contains(e.target) && !e.target.matches('#terminal-search')) {
            container.style.display = 'none';
        }
    });
}

// Fly to specific terminal
function flyToTerminal(lat, lng, name) {
    const map = window.currentMap || L.map('terminals-map');
    map.flyTo([lat, lng], 10, {
        animate: true,
        duration: 1.5
    });
    
    // Find and open popup for the terminal
    setTimeout(() => {
        map.eachLayer(function(layer) {
            if (layer instanceof L.MarkerClusterGroup) {
                layer.eachLayer(function(marker) {
                    const popup = marker.getPopup();
                    if (popup && popup.getContent().includes(name)) {
                        marker.openPopup();
                    }
                });
            }
        });
    }, 1600);
}

// Get terminal details (callback for popup button)
function getTerminalDetails(terminalName) {
    console.log('Getting details for:', terminalName);
    // This could open a modal or navigate to a detailed page
    alert(`Loading detailed information for ${terminalName}...`);
}

// Update map UI based on zoom level
function updateMapUI(zoomLevel) {
    const markers = document.querySelectorAll('.custom-marker');
    markers.forEach(marker => {
        if (zoomLevel < 4) {
            marker.style.transform = 'scale(0.8)';
        } else if (zoomLevel > 10) {
            marker.style.transform = 'scale(1.2)';
        } else {
            marker.style.transform = 'scale(1)';
        }
    });
}

// Get marker icon for terminal type
function getMarkerIcon(type) {
    const icons = {
        ocean: L.divIcon({
            className: 'custom-marker ocean-marker',
            html: '<i class="fas fa-anchor"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        }),
        air: L.divIcon({
            className: 'custom-marker air-marker',
            html: '<i class="fas fa-plane"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        }),
        land: L.divIcon({
            className: 'custom-marker land-marker',
            html: '<i class="fas fa-truck"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        }),
        warehouse: L.divIcon({
            className: 'custom-marker warehouse-marker',
            html: '<i class="fas fa-warehouse"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        })
    };
    
    return icons[type];
}

// Create popup content for terminal
function createPopupContent(terminal) {
    return `
        <div class="terminal-popup">
            <div class="popup-header">
                <h3>${terminal.name}</h3>
                <span class="terminal-type-badge ${terminal.type}">${terminal.type.charAt(0).toUpperCase() + terminal.type.slice(1)}</span>
            </div>
            <div class="popup-content">
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${terminal.location}</p>
                <p class="capacity"><i class="fas fa-cube"></i> Capacity: ${terminal.capacity}</p>
                <p class="description">${terminal.description}</p>
                <div class="features">
                    <h4>Key Features:</h4>
                    <ul>
                        ${terminal.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="popup-actions">
                    <button class="btn btn-sm btn-primary" onclick="getTerminalDetails('${terminal.name}')">
                        <i class="fas fa-info-circle"></i> More Details
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Add custom styles for map components
function addMapStyles() {
    if (document.querySelector('#map-custom-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'map-custom-styles';
    style.textContent = `
        /* Custom marker styles */
        .custom-marker {
            background: white;
            border-radius: 50%;
            width: 30px !important;
            height: 30px !important;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .custom-marker:hover {
            transform: scale(1.2);
            z-index: 1000;
        }
        
        .ocean-marker {
            border-color: #3498db;
            color: #3498db;
        }
        
        .air-marker {
            border-color: #e74c3c;
            color: #e74c3c;
        }
        
        .land-marker {
            border-color: #f39c12;
            color: #f39c12;
        }
        
        .warehouse-marker {
            border-color: #2ecc71;
            color: #2ecc71;
        }
        
        /* Marker cluster styles */
        .marker-cluster {
            background: rgba(10, 61, 145, 0.8);
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        
        .marker-cluster div {
            background: rgba(10, 61, 145, 0.9);
            border-radius: 50%;
            color: white;
            font-weight: bold;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
        
        .marker-cluster-small {
            background: rgba(46, 204, 113, 0.8);
        }
        
        .marker-cluster-small div {
            background: rgba(46, 204, 113, 0.9);
        }
        
        .marker-cluster-medium {
            background: rgba(243, 156, 18, 0.8);
        }
        
        .marker-cluster-medium div {
            background: rgba(243, 156, 18, 0.9);
        }
        
        .marker-cluster-large {
            background: rgba(231, 76, 60, 0.8);
        }
        
        .marker-cluster-large div {
            background: rgba(231, 76, 60, 0.9);
        }
        
        /* Custom popup styles */
        .custom-popup .leaflet-popup-content-wrapper {
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            border: none;
            padding: 0;
        }
        
        .custom-popup .leaflet-popup-content {
            margin: 0;
            padding: 0;
        }
        
        .custom-popup .leaflet-popup-tip {
            background: white;
            border: none;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .terminal-popup {
            min-width: 280px;
        }
        
        .popup-header {
            background: linear-gradient(135deg, #0A3D91, #58B3FF);
            color: white;
            padding: 1rem;
            border-radius: 12px 12px 0 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .popup-header h3 {
            margin: 0;
            font-size: 1.1rem;
            font-weight: 600;
        }
        
        .terminal-type-badge {
            background: rgba(255,255,255,0.2);
            padding: 0.25rem 0.5rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: capitalize;
        }
        
        .popup-content {
            padding: 1rem;
        }
        
        .popup-content p {
            margin: 0.5rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
        }
        
        .popup-content i {
            color: #0A3D91;
            width: 16px;
        }
        
        .description {
            color: #666;
            line-height: 1.4;
            margin: 1rem 0 !important;
        }
        
        .features h4 {
            margin: 1rem 0 0.5rem 0;
            font-size: 0.9rem;
            color: #0A3D91;
        }
        
        .features ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .features li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin: 0.25rem 0;
            font-size: 0.85rem;
        }
        
        .features li i {
            color: #2ecc71;
            font-size: 0.75rem;
        }
        
        .popup-actions {
            margin-top: 1rem;
            text-align: center;
        }
        
        .popup-actions .btn {
            font-size: 0.85rem;
            padding: 0.5rem 1rem;
        }
        
        /* Map control styles */
        .map-filter-control,
        .map-search-control {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            padding: 1rem;
            margin: 0.5rem;
        }
        
        .filter-header h4 {
            margin: 0 0 0.75rem 0;
            font-size: 0.9rem;
            color: #0A3D91;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .filter-options {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .filter-option {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            font-size: 0.85rem;
        }
        
        .filter-color {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        
        .filter-color.ocean { background: #3498db; }
        .filter-color.air { background: #e74c3c; }
        .filter-color.land { background: #f39c12; }
        .filter-color.warehouse { background: #2ecc71; }
        
        .search-container {
            position: relative;
            min-width: 200px;
        }
        
        #terminal-search {
            width: 100%;
            padding: 0.5rem;
            border: 2px solid #e1e8ed;
            border-radius: 6px;
            font-size: 0.9rem;
        }
        
        #terminal-search:focus {
            outline: none;
            border-color: #0A3D91;
        }
        
        #search-btn {
            position: absolute;
            right: 0.5rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #0A3D91;
            cursor: pointer;
        }
        
        .search-results {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #e1e8ed;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        }
        
        .search-result {
            padding: 0.75rem;
            border-bottom: 1px solid #f0f0f0;
            cursor: pointer;
            transition: background 0.2s ease;
        }
        
        .search-result:hover {
            background: #f8f9fa;
        }
        
        .search-result:last-child {
            border-bottom: none;
        }
        
        .result-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.25rem;
        }
        
        .result-name {
            font-weight: 500;
            font-size: 0.9rem;
        }
        
        .result-type {
            padding: 0.125rem 0.5rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: capitalize;
            color: white;
        }
        
        .result-type.ocean { background: #3498db; }
        .result-type.air { background: #e74c3c; }
        .result-type.land { background: #f39c12; }
        .result-type.warehouse { background: #2ecc71; }
        
        .result-location {
            color: #666;
            font-size: 0.8rem;
        }
        
        .no-results {
            padding: 1rem;
            text-align: center;
            color: #666;
            font-size: 0.9rem;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .map-filter-control,
            .map-search-control {
                padding: 0.75rem;
                margin: 0.25rem;
            }
            
            .terminal-popup {
                min-width: 250px;
            }
            
            .search-container {
                min-width: 150px;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Make flyToTerminal globally accessible
window.flyToTerminal = flyToTerminal;
window.getTerminalDetails = getTerminalDetails;
