
    // JavaScript to handle dynamic content update
    document.getElementById('saveChanges').addEventListener('click', function() {
        // Get input values from the modal
        const imgSrc = document.getElementById('listing-img').value;
        const category = document.getElementById('listing-category-input').value;
        const title = document.getElementById('listing-title').value;
        const price = document.getElementById('listing-price-input').value;

        // Update the content of the listing
        document.querySelector('.property-highlight img').src = imgSrc;
        document.querySelector('.property-details h2').textContent = title;
        document.getElementById('listing-price').textContent = `Price: $${price}`;
        document.getElementById('listing-category').textContent = `Category: ${category}`;

        // Close the modal
        $('#editModal').modal('hide');
    });

    // Add Rating functionality
    function addRating() {
        const nameInput = document.getElementById('aspect-name');
        const scoreInput = document.getElementById('aspect-score');
        const ratingCategories = document.getElementById('rating-categories');

        // Validate inputs
        const name = nameInput.value.trim();
        const score = parseInt(scoreInput.value);

        if (!name) {
            alert("Please enter a valid aspect name.");
            return;
        }

        if (isNaN(score) || score < 0 || score > 100) {
            alert("Please enter a valid score between 0 and 100.");
            return;
        }

        // Create new rating category
        const newCategory = document.createElement('div');
        newCategory.className = 'rating-category';
        newCategory.innerHTML = `
            <span>${name}</span>
            <div class="progress-bar">
                <span style="width: ${score}%;"></span>
            </div>
        `;

        // Add the new category to the list
        ratingCategories.appendChild(newCategory);

        // Clear inputs
        nameInput.value = '';
        scoreInput.value = '';
    }