// Initialize the map
const map = L.map('map').setView([40.4168, -3.7038], 13); // Default to Madrid

// Add the default tile layer (Roadmap)
let currentLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Initialize the draw control
const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

const drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems,
  },
  draw: {
    polyline: true,
    polygon: true,
    rectangle: true,
    circle: true,
    marker: true,
    circlemarker: false,
  },
});
map.addControl(drawControl);

// Listen for the creation of new shapes
map.on('draw:created', (event) => {
  const { layer } = event;
  drawnItems.addLayer(layer);

  // Optionally log the geometry data
  console.log('Shape created:', layer.toGeoJSON());
});

// Add buttons for shape selection
const customControls = L.control({ position: 'topright' });
customControls.onAdd = function () {
  const div = L.DomUtil.create('div', 'draw-buttons');
  div.innerHTML = `
    <button id="draw-polyline">Polyline</button>
    <button id="draw-polygon">Polygon</button>
    <button id="draw-rectangle">Rectangle</button>
    <button id="draw-circle">Circle</button>
    <button id="draw-marker">Marker</button>
     <button id="clear-drawings"><i class="fa-solid fa-eraser"></i>Clear</button>
  `;
  
  return div;
};
customControls.addTo(map);

// Event handlers for custom buttons
document.getElementById('draw-polyline').addEventListener('click', () => {
  new L.Draw.Polyline(map, drawControl.options.draw.polyline).enable();
});
document.getElementById('draw-polygon').addEventListener('click', () => {
  new L.Draw.Polygon(map, drawControl.options.draw.polygon).enable();
});
document.getElementById('draw-rectangle').addEventListener('click', () => {
  new L.Draw.Rectangle(map, drawControl.options.draw.rectangle).enable();
});
document.getElementById('draw-circle').addEventListener('click', () => {
  new L.Draw.Circle(map, drawControl.options.draw.circle).enable();
});
document.getElementById('draw-marker').addEventListener('click', () => {
  new L.Draw.Marker(map, drawControl.options.draw.marker).enable();
});

// Tile layers for Roadmap and Satellite views
const roadmapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
});

const satelliteLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenTopoMap contributors',
});

// Handle Roadmap and Satellite View Switching
document.getElementById('roadmap-view').addEventListener('click', () => {
  if (currentLayer) {
    map.removeLayer(currentLayer);
  }
  currentLayer = roadmapLayer.addTo(map);
});

document.getElementById('satellite-view').addEventListener('click', () => {
  if (currentLayer) {
    map.removeLayer(currentLayer);
  }
  currentLayer = satelliteLayer.addTo(map); // Use a satellite tile layer
});

// Handle zoom controls
document.querySelector('.icon-button.plus').addEventListener('click', () => {
  map.zoomIn();
});

document.querySelector('.icon-button.minus').addEventListener('click', () => {
  map.zoomOut();
});



document.addEventListener("DOMContentLoaded", function () {
  const filterButton = document.querySelector(".Myfilterbutton");
  const filterSection = document.querySelector("#Myfilters");
  if (filterSection) {
      filterSection.style.display = "none";
  }
  
  
  // Check if both elements exist
  if (filterButton && filterSection) {
  filterButton.addEventListener("click", function () {
    // Toggle display
    if (filterSection.style.display === "none" || !filterSection.style.display) {
      filterSection.style.display = "block"; // Show the filter section
      filterSection.style.zIndex = "1000"; // Ensure it is above other elements
    } else {
      filterSection.style.display = "none"; // Hide the filter section
      filterSection.style.zIndex = "-1"; // Reset z-index
    }
  });
  } else {
  console.error("Filter button or filter section not found in the DOM.");
  }
  });
  document.querySelector('#clear-drawings').addEventListener('click', () => {
    drawnItems.clearLayers(); // Removes all shapes from the drawnItems layer group
  });