document.getElementById('employeeId').addEventListener('input', function() {
  const employeeId = this.value;
  const employeeIdError = document.getElementById('employeeIdError');

  fetch('/check-employee-id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ employeeId }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.exists) {
        employeeIdError.textContent = 'Employee ID already exists';
      } else {
        employeeIdError.textContent = '';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

function validateForm() {
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const employeeId = document.getElementById('employeeId').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!fullName || !email || !employeeId || !username || !password || !confirmPassword) {
    alert('All fields are required.');
    return false;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return false;
  }

  return true;
}

document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const employeeIdError = document.getElementById('employeeIdError');
  if (employeeIdError.textContent !== '') {
    return;
  }

  const formData = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    employeeId: document.getElementById('employeeId').value,
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value,
  };

  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Registration successful') {
        alert('Registration successful');
        setTimeout(() => {
          window.location.href = 'loginadmin.html';
        }, 2000);
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
});
