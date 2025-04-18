
const searchForm = document.getElementById('searchForm');
const searchResults = document.getElementById('searchResults');

// Handle search form submission
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const query = document.getElementById('searchQuery').value;

  // Example results (simulate search functionality)
  const results = [
    { name: 'Expose 1', link: '#', id: 1 },
    { name: 'Expose 2', link: '#', id: 2 },
    { name: 'Expose 3', link: '#', id: 3 },
    { name: 'Expose 4', link: '#', id: 3 }
  ];

  // Clear previous results
  searchResults.innerHTML = '';

  // Display new results
  results.forEach((result) => {
    const exposeItem = document.createElement('div');
    exposeItem.className = 'expose-item';
    exposeItem.innerHTML = `
      <span>${result.name}</span>
      
<a href="${result.link}" class="btn btn-green btn-sm" download>Download</a>        `;
    searchResults.appendChild(exposeItem);
  });

  // Clear search input
  searchForm.reset();
});
