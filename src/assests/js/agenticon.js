const agentForm = document.getElementById('agentForm');
const agentList = document.getElementById('agentList');

// Add agent to the list
agentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('agentEmail').value;
  const password = document.getElementById('agentPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Create agent item
  const agentItem = document.createElement('div');
  agentItem.className = 'agent-item';
  agentItem.innerHTML = `
    <span>${email}</span>
    <button class="btn btn-danger btn-sm remove-agent">Remove</button>
  `;

  // Add remove functionality
  agentItem.querySelector('.remove-agent').addEventListener('click', () => {
    agentItem.remove();
  });

  // Append agent to the list
  agentList.appendChild(agentItem);

  // Reset form
  agentForm.reset();
});
