
// Mock data for downloaded exposes
const downloadedExposes = [
  { name: "Expose 1", date: "2024-11-25" },
  { name: "Expose 2", date: "2024-11-20" },
  { name: "Expose 3", date: "2024-11-15" }
];

// Mock data for session history
const sessionHistories = [
  { date: "2024-11-25", activity: "Viewed Expose 1" },
  { date: "2024-11-22", activity: "Downloaded Expose 2" },
  { date: "2024-11-18", activity: "Marked Property on Map" }
];

// Populate downloaded exposes table
const exposeTableBody = document.getElementById('exposeTableBody');
downloadedExposes.forEach((expose, index) => {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>${index + 1}</td>
  <td>${expose.name}</td>
  <td>${expose.date}</td>
  <td><button class="btn btn-sm btn-delete" onclick="deleteExpose(${index})">Delete</button></td>
`;
  exposeTableBody.appendChild(row);
});

// Populate session history table
const sessionTableBody = document.getElementById('sessionTableBody');
sessionHistories.forEach((session, index) => {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>${index + 1}</td>
  <td>${session.date}</td>
  <td>${session.activity}</td>
`;
  sessionTableBody.appendChild(row);
});

// Function to delete an expose
function deleteExpose(index) {
  if (confirm(`Are you sure you want to delete "${downloadedExposes[index].name}"?`)) {
    downloadedExposes.splice(index, 1);
    exposeTableBody.innerHTML = ''; // Clear table
    downloadedExposes.forEach((expose, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${idx + 1}</td>
      <td>${expose.name}</td>
      <td>${expose.date}</td>
      <td><button class="btn btn-sm btn-delete" onclick="deleteExpose(${idx})">Delete</button></td>
    `;
      exposeTableBody.appendChild(row);
    });
  }
}
