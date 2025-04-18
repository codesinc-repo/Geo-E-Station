
    const addPaymentButton = document.getElementById('addPayment');
    const paymentForm = document.getElementById('paymentForm');
    const paymentType = document.getElementById('paymentType');
    const paypalDetails = document.getElementById('paypalDetails');
    const cardDetails = document.getElementById('cardDetails');

    addPaymentButton.addEventListener('click', () => {
      paymentForm.classList.toggle('show');  // Toggle visibility of the payment form
    });

    paymentType.addEventListener('change', () => {
      if (paymentType.value === 'paypal') {
        paypalDetails.style.display = 'block';
        cardDetails.style.display = 'none';
      } else if (paymentType.value === 'card') {
        cardDetails.style.display = 'block';
        paypalDetails.style.display = 'none';
      } else {
        paypalDetails.style.display = 'none';
        cardDetails.style.display = 'none';
      }
    });
