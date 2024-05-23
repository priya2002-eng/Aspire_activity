function validateForm() {
    // Get form fields
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const employeeId = document.getElementById('employeeId').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    // Simple validation checks
    if (!fullName || !email || !employeeId || !username || !password || !confirmPassword) {
      alert('All fields are required.');
      return false;
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return false;
    }
  
    // Email validation (basic check)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
  
    // Password strength validation (basic check)
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return false;
    }
  
    // If all checks pass, store user data and return true to allow form submission
    const userData = { username, password };
    localStorage.setItem('userData', JSON.stringify(userData));
    return true;
  }
  
  // Add event listener to the form
  document.getElementById('registerForm').addEventListener('submit', function(event) {
    if (validateForm()) {
      event.preventDefault(); // Prevent form submission to allow redirect
      alert('Registration successful. Redirecting to login page...');
      window.location.href = 'loginadmin.html'; // Redirect to login page
    } else {
      event.preventDefault(); // Prevent form submission if validation fails
    }
  });
