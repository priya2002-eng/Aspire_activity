// function validateForm() {
//     event.preventDefault();
//     var username = document.getElementById("username").value;
//     var password = document.getElementById("password").value;
//     var errorMessage = document.getElementById("error-message");
  
//     // Check if username and password are correct
//     if (username === "admin" && password === "admin123") {
//       // Redirect to dashboard or do any action on successful login
//       alert("Login successful!");
//       window.location.href = "home.html";
//       return true;
//     } else {
//       // Display error message
//       errorMessage.textContent = "Invalid username or password. Please try again.";
//       errorMessage.style.display = "block";
//       return false;
//     }
//   }
  

function validateForm() {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var errorMessage = document.getElementById("error-message");

  // Retrieve stored user data from localStorage
  var storedUserData = JSON.parse(localStorage.getItem('userData'));

  // Check if username and password match stored data
  if (storedUserData && username === storedUserData.username && password === storedUserData.password) {
      // Redirect to dashboard or do any action on successful login
      alert("Login successful!");
      window.location.href = "home.html";
      return true;
  } else {
      // Display error message
      errorMessage.textContent = "Invalid username or password. Please try again.";
      errorMessage.style.display = "block";
      return false;
  }
}
