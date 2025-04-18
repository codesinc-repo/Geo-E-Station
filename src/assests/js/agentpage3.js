
const historyList = document.getElementById('historyList');
const ratingsList = document.getElementById('ratingsList');
const downloadBtn = document.getElementById('downloadBtn');

// Remove history or rating items
document.querySelectorAll('.btn-green').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.target.closest('.history-item, .rating-item').remove();
  });
});

// Download functionality
downloadBtn.addEventListener('click', () => {
  let content = "History:\n";
  document.querySelectorAll('.history-item span').forEach((item) => {
    content += `- ${item.textContent}\n`;
  });

  content += "\nRatings:\n";
  document.querySelectorAll('.rating-item span').forEach((item) => {
    content += `- ${item.textContent}\n`;
  });

  // Create a downloadable text file
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'history_and_ratings.txt';
  link.click();
});
