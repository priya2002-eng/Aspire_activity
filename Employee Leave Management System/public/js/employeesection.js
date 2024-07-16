document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch and display employees
    function fetchEmployees() {
        fetch('/employees')
            .then(response => response.json())
            .then(data => {
                const employeeTable = document.querySelector('#employeeTableBody');
                employeeTable.innerHTML = '';

                data.forEach((employee, index) => {
                    const row = `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${employee.full_name}</td>
                            <td>${employee.employee_id_number}</td>
                            <td>${employee.department}</td>
                            <td>${employee.phone_number}</td>
                            <td>
                                <button class="manage-btn" data-id="${employee.employee_id_number}">Manage</button>
                                <button class="delete-btn" data-id="${employee.employee_id_number}">Delete</button>
                            </td>
                        </tr>
                    `;
                    employeeTable.innerHTML += row;
                });

                // Add event listeners for the Manage and Delete buttons after populating the table
                addEventListeners();
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    }

    // Fetch and display employees on page load
    fetchEmployees();

    // Add event listener for the Add Employee button
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    addEmployeeBtn.addEventListener('click', function() {
        document.getElementById('addEmployeeForm').style.display = 'block';
    });

    // Add event listener for the Close Add Employee Form button
    const closeFormAdd = document.getElementById('closeFormAdd');
    closeFormAdd.addEventListener('click', function() {
        document.getElementById('addEmployeeForm').style.display = 'none';
    });

    // Add event listener for the Add Employee form submission
    const addEmployeeForm = document.querySelector('#addEmployeeForm form');
    addEmployeeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(addEmployeeForm);
        const newEmployeeData = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            employeeId: formData.get('employeeId'),
            department: formData.get('department'),
            phoneNumber: formData.get('phoneNumber'),
            birthDate: formData.get('birthDate'),
            gender: formData.get('gender'),
            streetAddress: formData.get('streetAddress'),
            country: formData.get('country'),
            city: formData.get('city'),
            region: formData.get('region'),
            postalCode: formData.get('postalCode'),
            password: formData.get('password')
        };

        fetch('/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEmployeeData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchEmployees();
            document.getElementById('addEmployeeForm').style.display = 'none';
            addEmployeeForm.reset();
        })
        .catch(error => {
            console.error('Error adding employee:', error);
            alert('An error occurred. Please try again.');
        });
    });

    // Function to add event listeners for Manage and Delete buttons
    function addEventListeners() {
        const manageEmployeeBtns = document.querySelectorAll('.manage-btn');
        manageEmployeeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const employeeId = btn.getAttribute('data-id');
                fetch(`/employees/${employeeId}`)
                    .then(response => response.json())
                    .then(employee => {
                        const manageEmployeeForm = document.querySelector('#manageEmployeeFormElement');
                        manageEmployeeForm.fullName.value = employee.full_name;
                        manageEmployeeForm.email.value = employee.email;
                        manageEmployeeForm.employeeId.value = employee.employee_id_number;
                        manageEmployeeForm.username.value = employee.username;
                        manageEmployeeForm.department.value = employee.department;
                        manageEmployeeForm.phoneNumber.value = employee.phone_number;
                        manageEmployeeForm.birthDate.value = new Date(employee.birth_date).toISOString().split('T')[0];
                        manageEmployeeForm.gender.value = employee.gender;
                        manageEmployeeForm.streetAddress.value = employee.street_address;
                        manageEmployeeForm.country.value = employee.country;
                        manageEmployeeForm.city.value = employee.city;
                        manageEmployeeForm.region.value = employee.region;
                        manageEmployeeForm.postalCode.value = employee.postal_code;
                        manageEmployeeForm.password.value = '';
                        manageEmployeeForm.confirmPassword.value = '';

                        document.querySelector(`#manageEmployeeFormElement input[name="gender"][value="${employee.gender}"]`).checked = true;
                        document.getElementById('manageEmployeeForm').style.display = 'block';
                    })
                    .catch(error => {
                        console.error('Error fetching employee details:', error);
                    });
            });
        });

        const deleteEmployeeBtns = document.querySelectorAll('.delete-btn');
        deleteEmployeeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const employeeId = btn.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this employee?')) {
                    fetch(`/employees/${employeeId}`, {
                        method: 'DELETE'
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert(data.message);
                        fetchEmployees();
                    })
                    .catch(error => {
                        console.error('Error deleting employee:', error);
                        alert('An error occurred. Please try again.');
                    });
                }
            });
        });
    }

    const closeFormManage = document.getElementById('closeFormManage');
    closeFormManage.addEventListener('click', function() {
        document.getElementById('manageEmployeeForm').style.display = 'none';
    });

    const manageEmployeeForm = document.querySelector('#manageEmployeeFormElement');
    manageEmployeeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(manageEmployeeForm);
        const updatedEmployeeData = {
            full_name: formData.get('fullName'),
            email: formData.get('email'),
            employee_id_number: formData.get('employeeId'),
            username: formData.get('username'),
            department: formData.get('department'),
            phone_number: formData.get('phoneNumber'),
            birth_date: formData.get('birthDate'),
            gender: formData.get('gender'),
            street_address: formData.get('streetAddress'),
            country: formData.get('country'),
            city: formData.get('city'),
            region: formData.get('region'),
            postal_code: formData.get('postalCode'),
            password: formData.get('password')
        };

        fetch(`/employees/${updatedEmployeeData.employee_id_number}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEmployeeData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchEmployees();
            document.getElementById('manageEmployeeForm').style.display = 'none';
            manageEmployeeForm.reset();
        })
        .catch(error => {
            console.error('Error updating employee:', error);
            alert('An error occurred. Please try again.');
        });
    });

    function logout() {
        window.location.href = "index.html";
    }

    document.getElementById("logoutBtn").addEventListener("click", function() {
        logout();
    });
});
