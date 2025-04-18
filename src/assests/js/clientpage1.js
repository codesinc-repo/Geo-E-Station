
  const buyerForm = document.getElementById('buyerForm');
  const buyerList = document.getElementById('buyerList');

  buyerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('buyerName').value;

    const buyerItem = document.createElement('div');
    buyerItem.className = 'buyer-item';
    buyerItem.innerHTML = `
      <span>${name}</span>
      <button class="btn btn-danger btn-sm remove-buyer">Remove</button>
    `;

    buyerItem.querySelector('.remove-buyer').addEventListener('click', () => {
      buyerItem.remove();
    });

    buyerList.appendChild(buyerItem);
    buyerForm.reset();
  });
