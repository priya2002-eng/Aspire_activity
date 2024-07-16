document.addEventListener("DOMContentLoaded", function () {
  const leaveRequestsBody = document.querySelector(".table-container tbody");
  const employeeDetailsSection = document.getElementById("employeeDetailsSection");
  const closeIcon = document.getElementById("closeFormAdd");

  function fetchLeaveRequests() {
    fetch("/leave-requests")
      .then(response => response.json())
      .then(data => {
        // Sort the leave requests
        data.sort((a, b) => {
          if (a.status === "Pending" && b.status !== "Pending") {
            return -1;
          } else if (a.status !== "Pending" && b.status === "Pending") {
            return 1;
          } else if (a.status === "Pending" && b.status === "Pending") {
            return new Date(b.created_date) - new Date(a.created_date);
          } else {
            return new Date(b.created_date) - new Date(a.created_date);
          }
        });

        leaveRequestsBody.innerHTML = "";

        data.forEach((request, index) => {
          const statusIcon = getStatusIcon(request.status);
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${request.employee_id_number}</td>
            <td>${request.full_name}</td>
            <td>${request.leave_type}</td>
            <td>${new Date(request.created_date).toLocaleDateString()}</td>
            <td class="${request.status.toLowerCase()}">${statusIcon} ${request.status}</td>
            <td>${request.status === "Pending" ? `<button class="view-btn" data-id="${request.leave_request_id}" data-emp-id="${request.emp_id}">View Details</button>` : ""}</td>
          `;
          leaveRequestsBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error("Error fetching leave requests:", error);
        alert("An error occurred while fetching leave requests. Please try again.");
      });
  }

  function getStatusIcon(status) {
    switch (status) {
      case "Approved":
        return '<i class="fas fa-check-circle"></i>';
      case "Pending":
        return '<i class="fa-regular fa-clock"></i>';
      case "Declined":
        return '<i class="fa fa-window-close"></i>';
      default:
        return '';
    }
  }

  fetchLeaveRequests();

  function showEmployeeDetails(requestId, employeeId) {
    fetch(`/employees?emp_id=${employeeId}`)
      .then(response => response.json())
      .then(employee => {
        if (!employee) throw new Error('Employee not found');

        fetch(`/leave-request/${requestId}`)
          .then(response => response.json())
          .then(leaveRequest => {
            displayCardDetails(employee, leaveRequest);
          })
          .catch(error => {
            console.error("Error fetching leave request details:", error);
            alert("An error occurred while fetching leave request details. Please try again.");
          });
      })
      .catch(error => {
        console.error("Error fetching employee details:", error);
        alert("Employee not found or an error occurred while fetching employee details. Please try again.");
      });
  }

  leaveRequestsBody.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("view-btn")) {
      const requestId = event.target.getAttribute("data-id");
      const employeeId = event.target.getAttribute("data-emp-id");
      showEmployeeDetails(requestId, employeeId);
    }
  });

  function updateLeaveRequestStatus(requestId, status) {
    fetch(`/leave-request/${requestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: status })
    })
      .then(response => response.text())
      .then(data => {
        alert("Leave request status updated successfully");
        fetchLeaveRequests();
        employeeDetailsSection.style.display = "none";
      })
      .catch(error => {
        console.error("Error updating leave request status:", error);
        alert("An error occurred while updating leave request status. Please try again.");
      });
  }

  employeeDetailsSection.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("approve-btn")) {
      event.preventDefault();
      const requestId = event.target.getAttribute("data-id");
      updateLeaveRequestStatus(requestId, "Approved");
    }
    if (event.target && event.target.classList.contains("decline-btn")) {
      event.preventDefault();
      const requestId = event.target.getAttribute("data-id");
      updateLeaveRequestStatus(requestId, "Declined");
    }
  });

  document.getElementById("logoutBtn").addEventListener("click", function () {
    window.location.href = "index.html";
  });

  closeIcon.addEventListener("click", function () {
    employeeDetailsSection.style.display = "none";
  });

  function displayCardDetails(employee, leaveRequest) {
    const employeeIdElement = document.getElementById("employeeId");
    const employeeNameElement = document.getElementById("employeeName");
    const leaveTypeElement = document.getElementById("leaveType");
    const descriptionElement = document.getElementById("description");
    const startDateElement = document.getElementById("startDate");
    const endDateElement = document.getElementById("endDate");

    employeeIdElement.textContent = leaveRequest.employee_id_number;
    employeeNameElement.textContent = leaveRequest.full_name;
    leaveTypeElement.textContent = leaveRequest.leave_type;
    descriptionElement.textContent = leaveRequest.reason;
    startDateElement.textContent = new Date(leaveRequest.start_date).toLocaleDateString();
    endDateElement.textContent = new Date(leaveRequest.end_date).toLocaleDateString();

    employeeDetailsSection.style.display = "block";

    document.querySelector(".approve-btn").setAttribute("data-id", leaveRequest.leave_request_id);
    document.querySelector(".decline-btn").setAttribute("data-id", leaveRequest.leave_request_id);
  }
});
