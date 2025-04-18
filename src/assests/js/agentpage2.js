
    const sendExposeForm = document.getElementById('sendExposeForm');
    const clientList = document.getElementById('clientList');

    // Handle sending expose
    sendExposeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const clientEmail = document.getElementById('clientEmail').value;
      const exposeFile = document.getElementById('exposeFile').files[0];

      if (!exposeFile) {
        alert("Please attach an expose file!");
        return;
      }

      // Create a client item
      const clientItem = document.createElement('div');
      clientItem.className = 'client-item';
      clientItem.innerHTML = `
        <span>${clientEmail}</span>
        <button class="btn btn-danger btn-sm remove-client">Remove</button>
      `;

      // Add remove functionality
      clientItem.querySelector('.remove-client').addEventListener('click', () => {
        clientItem.remove();
      });

      // Append to client list
      clientList.appendChild(clientItem);

      // Reset the form
      sendExposeForm.reset();

      alert(`Expose sent to ${clientEmail}`);
    });
