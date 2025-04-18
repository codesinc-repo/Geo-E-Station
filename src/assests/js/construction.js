
// JavaScript to handle dynamic content update
document.getElementById('saveChanges').addEventListener('click', function() {
  // Get input values from the modal
  const imgSrc = document.getElementById('listing-img').value;
  const category = document.getElementById('listing-category').value;
  const title = document.getElementById('listing-title').value;
  const description = document.getElementById('listing-description').value;
  const price = document.getElementById('listing-price').value;

  // Update the content of the listing
  document.getElementById('listing-img-1').src = imgSrc;
  document.getElementById('listing-category-1').textContent = category;
  document.getElementById('listing-title-1').textContent = title;
  document.getElementById('listing-description-1').textContent = description;
  document.getElementById('listing-price-1').textContent = `Estimated Price: ${price}`;

  // Close the modal
  $('#editModal').modal('hide');
});
