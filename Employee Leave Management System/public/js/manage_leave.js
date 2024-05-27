document.addEventListener("DOMContentLoaded", function () {
    const addEmployeeBtn = document.getElementById("addEmployeeBtn");
    const addEmployeeForm = document.getElementById("addEmployeeForm");
    const addcloseFormBtn = document.getElementById("closeFormAdd");
  
    addEmployeeBtn.addEventListener("click", function () {
      addEmployeeForm.style.display = "block";
    });
  
    addcloseFormBtn.addEventListener("click", function () {
      addEmployeeForm.style.display = "none";
    });
  });

  function logout() {
    // Redirect to index.html
    window.location.href = "index.html";
  }
  
  document.getElementById("logoutBtn").addEventListener("click", function() {
    logout();
  });
  
  
