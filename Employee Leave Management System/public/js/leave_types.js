document.addEventListener("DOMContentLoaded", function () {
    function fetchLeaveTypes() {
        fetch('/leavetypes')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched leave types:', data);
                const leaveTypesTableBody = document.querySelector('.table-container tbody');
                leaveTypesTableBody.innerHTML = '';

                data.forEach((leaveType, index) => {
                    const row = `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${leaveType.leave_type}</td>
                            <td>${leaveType.description}</td>
                            <td>${new Date(leaveType.created_date).toLocaleDateString()}</td>
                            <td>
                                <button class="manage-btn" data-id="${leaveType.leave_type_id}">Manage</button>
                                <button class="delete-btn" data-id="${leaveType.leave_type_id}">Delete</button>
                            </td>
                        </tr>
                    `;
                    leaveTypesTableBody.innerHTML += row;
                });

                addEventListeners();
            })
            .catch(error => {
                console.error('Error fetching leave types:', error);
                alert('An error occurred while fetching leave types. Please try again.');
            });
    }

    fetchLeaveTypes();

    const addEmployeeBtn = document.getElementById("addEmployeeBtn");
    const addEmployeeForm = document.getElementById("addEmployeeForm");
    const addcloseFormBtn = document.getElementById("closeFormAdd");

    addEmployeeBtn.addEventListener("click", function () {
        addEmployeeForm.style.display = "block";
    });

    addcloseFormBtn.addEventListener("click", function () {
        addEmployeeForm.style.display = "none";
    });

    const addLeaveTypeForm = document.querySelector('#addEmployeeForm form');
    addLeaveTypeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(addLeaveTypeForm);
        const newLeaveTypeData = {
            leaveType: formData.get('leaveType'),
            description: formData.get('description')
        };

        fetch('/leavetypes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLeaveTypeData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchLeaveTypes();
            addEmployeeForm.style.display = 'none';
            addLeaveTypeForm.reset();
        })
        .catch(error => {
            console.error('Error adding leave type:', error);
            alert('An error occurred while adding a leave type. Please try again.');
        });
    });

    function addEventListeners() {
        const manageLeaveTypeBtns = document.querySelectorAll('.manage-btn');
        manageLeaveTypeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const leaveTypeId = btn.getAttribute('data-id');
                console.log('Manage button clicked for ID:', leaveTypeId);

                if (!leaveTypeId || leaveTypeId === 'null') {
                    alert('Invalid leave type ID');
                    return;
                }

                fetch(`/leavetypes/${leaveTypeId}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Leave type not found');
                        }
                        return response.json();
                    })
                    .then(leaveType => {
                        console.log('Fetched leave type for management:', leaveType);
                        const manageLeaveTypeForm = document.querySelector('#manageLeaveTypeForm');
                        const leaveTypeInput = manageLeaveTypeForm.querySelector('input[name="leaveType"]');
                        const descriptionInput = manageLeaveTypeForm.querySelector('input[name="description"]');

                        leaveTypeInput.value = leaveType.leave_type;
                        descriptionInput.value = leaveType.description;

                        manageLeaveTypeForm.setAttribute('data-id', leaveTypeId);
                        console.log('Set data-id on manageLeaveTypeForm:', manageLeaveTypeForm.getAttribute('data-id'));

                        manageLeaveTypeForm.style.display = 'block';
                    })
                    .catch(error => {
                        console.error('Error fetching leave type details:', error);
                        alert('Leave type not found. Please try again.');
                    });
            });
        });

        const deleteLeaveTypeBtns = document.querySelectorAll('.delete-btn');
        deleteLeaveTypeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const leaveTypeId = btn.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this leave type?')) {
                    fetch(`/leavetypes/${leaveTypeId}`, {
                        method: 'DELETE'
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert(data.message);
                        fetchLeaveTypes();
                    })
                    .catch(error => {
                        console.error('Error deleting leave type:', error);
                        alert('An error occurred while deleting the leave type. Please try again.');
                    });
                }
            });
        });
    }

    const managecloseFormBtn = document.getElementById("closeFormManage");
    managecloseFormBtn.addEventListener("click", function () {
        document.getElementById("manageLeaveTypeForm").style.display = "none";
    });

    const manageLeaveTypeForm = document.querySelector('#manageLeaveTypeForm');
    const manageLeaveTypeFormElement = manageLeaveTypeForm.querySelector('form');

    manageLeaveTypeFormElement.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(manageLeaveTypeFormElement);
        const updatedLeaveType = {
            leaveType: formData.get('leaveType'),
            description: formData.get('description')
        };

        const leaveTypeId = manageLeaveTypeForm.getAttribute('data-id');

        console.log('leaveTypeId:', leaveTypeId);
        console.log('manageLeaveTypeForm dataset:', manageLeaveTypeForm.dataset);

        if (!leaveTypeId || leaveTypeId === 'null' || isNaN(parseInt(leaveTypeId))) {
            alert('Invalid leave type ID');
            return;
        }

        fetch(`/leavetypes/${leaveTypeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedLeaveType)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchLeaveTypes();
            manageLeaveTypeForm.style.display = 'none';
        })
        .catch(error => {
            console.error('Error updating leave type:', error);
            alert('An error occurred while updating the leave type. Please try again.');
        });
    });

    function logout() {
        window.location.href = "index.html";
    }

    document.getElementById("logoutBtn").addEventListener("click", function() {
        logout();
    });
});

