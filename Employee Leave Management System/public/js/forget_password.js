document.addEventListener('DOMContentLoaded', function() {
  function validateForm() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('error-message');

    errorMessage.textContent = '';  // Clear previous error message

    if (password.length < 6) {
      errorMessage.textContent = 'Password must be at least 6 characters long.';
      return false;
    }

    if (password !== confirmPassword) {
      errorMessage.textContent = 'Passwords do not match.';
      return false;
    }

    // If all conditions pass, return true
    return true;
  }

  document.getElementById('changePasswordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    if (validateForm()) {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      fetch('/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, newPassword: password })
      })
      .then(response => response.text())
      .then(data => {
        if (data === 'Password updated successfully') {
          alert('Password updated successfully');
          window.location.href = 'loginadmin.html';
        } else {
          document.getElementById('error-message').textContent = data;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'An error occurred';
      });
    }
  });
});
