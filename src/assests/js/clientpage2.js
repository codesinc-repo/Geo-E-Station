
  const exposeForm = document.getElementById('exposeForm');

  exposeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('recipientEmail').value;
    const message = document.getElementById('message').value;

    alert(`Exposé sent to ${email}!\nMessage: ${message}`);
    exposeForm.reset();
  });
