
  // Initialize the map and set its view to Spain
  const map = L.map('map').setView([40.4168, -3.7038], 6); // Coordinates of Madrid, Spain

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Change Plans
  document.getElementById('updatePlanBtn').addEventListener('click', () => {
    const plan = document.getElementById('planType').value;
    alert(`Plan updated to: ${plan}`);
  });

  // Input Company Data
  document.getElementById('submitCompanyBtn').addEventListener('click', () => {
    const company = document.getElementById('companyName').value;
    const expose = document.getElementById('exposeDetails').value;

    if (!company || !expose) {
      alert('Please fill out all fields.');
    } else {
      alert(`Company Data Submitted:\nName: ${company}\nExpose: ${expose}`);
    }
  });

  // Grant Agent Access
  document.getElementById('grantAccessBtn').addEventListener('click', () => {
    const region = document.getElementById('region').value;
    alert(`Access granted to agents in the ${region} region.`);
  });

  // Mark Properties on Map
  document.getElementById('markPropertyBtn').addEventListener('click', () => {
    const color = document.getElementById('propertyColor').value;
    const coordinates = document.getElementById('propertyCoordinates').value.split(',').map(Number);

    if (coordinates.length !== 2 || isNaN(coordinates[0]) || isNaN(coordinates[1])) {
      alert('Invalid coordinates. Use format: latitude,longitude (e.g., 40.4168,-3.7038)');
      return;
    }

    // Add a marker with a colored circle at the specified location
    L.circleMarker(coordinates, {
      color: color,
      radius: 8
    }).addTo(map).bindPopup(`Property Marker: ${coordinates[0]}, ${coordinates[1]}`);
  });
