// public/js/home.js

// Function to fetch data from the backend API and update the HTML content
async function fetchDataAndUpdate() {
  try {
    const response = await fetch('/api/home/counts');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();

    // Update the HTML content dynamically based on the fetched data
    document.getElementById('registeredEmployeesCount').textContent = data.empCount;
    document.getElementById('leaveTypesCount').textContent = data.leaveTypesCount;
    document.getElementById('pendingApplicationsCount').textContent = data.pendingCount;
    document.getElementById('approvedApplicationsCount').textContent = data.approvedCount;
    document.getElementById('declinedApplicationsCount').textContent = data.declinedCount;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    // Display an error message to the user
    document.getElementById('errorContainer').textContent = 'Failed to fetch data. Please try again later.';
  }
}

// Call the fetchDataAndUpdate function when the page loads
window.onload = function () {
  fetchDataAndUpdate();
};

function logout() {
  window.location.href = "index.html";
}

document.getElementById("logoutBtn").addEventListener("click", function() {
  logout();
});
