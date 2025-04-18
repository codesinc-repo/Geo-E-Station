
    // Handle agent authorization
    document.getElementById('authorizeAgentForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const agentName = document.getElementById('agentName').value;
      const authorizedActions = [];
      if (document.getElementById('createBuyerProfile').checked) authorizedActions.push('Create Buyer Profiles');
      if (document.getElementById('sendNotifications').checked) authorizedActions.push('Send Notifications');
      if (document.getElementById('requestPropertyMarking').checked) authorizedActions.push('Request Property Marking');

      if (authorizedActions.length > 0) {
        alert(`Agent "${agentName}" has been authorized for: ${authorizedActions.join(', ')}`);
      } else {
        alert('Please select at least one authorization action.');
      }
    });

    // Handle buyer profile creation
    document.getElementById('buyerProfileForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const buyerName = document.getElementById('buyerName').value;
      const buyerEmail = document.getElementById('buyerEmail').value;
      alert(`Buyer profile created for ${buyerName} with email: ${buyerEmail}`);
    });

    // Handle sending notification
    document.getElementById('sendNotificationForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const notificationText = document.getElementById('notificationText').value;
      alert(`Notification sent: ${notificationText}`);
    });

    // Handle requesting property marking
    document.getElementById('requestMarkingForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const propertyId = document.getElementById('propertyId').value;
      const markingType = document.getElementById('markingType').value;
      alert(`Property ID ${propertyId} has been marked for ${markingType}`);
    });
