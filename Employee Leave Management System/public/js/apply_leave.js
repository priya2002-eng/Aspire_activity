function logout() {
    // Redirect to index.html
    window.location.href = "index.html";
  }
  
  document.getElementById("logoutBtn").addEventListener("click", function() {
    logout();
  });