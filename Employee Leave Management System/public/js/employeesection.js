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

document.addEventListener("DOMContentLoaded", function () {
  const manageEmployeeBtn = document.getElementById("manageEmployeeBtn");
  const manageEmployeeForm = document.getElementById("manageEmployeeForm");
  const managecloseFormBtn = document.getElementById("closeFormManage");

  manageEmployeeBtn.addEventListener("click", function () {
    manageEmployeeForm.style.display = "block";
  });

  managecloseFormBtn.addEventListener("click", function () {
    manageEmployeeForm.style.display = "none";
  });
});

// Get all the "Delete" buttons
const deleteButtons = document.querySelectorAll('.delete-btn');

// Loop through each "Delete" button and add a click event listener
deleteButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Get the parent <tr> element of the clicked button
    const row = this.closest('tr');
    
    // Remove the row from the table
    row.remove();
  });
});

function logout() {
  // Redirect to index.html
  window.location.href = "index.html";
}

document.getElementById("logoutBtn").addEventListener("click", function() {
  logout();
});
