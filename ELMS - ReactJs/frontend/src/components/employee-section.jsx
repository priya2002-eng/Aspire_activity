import React, { useState, useEffect } from 'react';
import '../css/employeesection.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressCard, faCalendar, faProjectDiagram, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const EmployeeSection = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch('http://localhost:5000/api/employees')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));
  };

  const handleAddEmployee = () => {
    setIsEditing(false);
    setEmployeeData(null);
    setIsFormVisible(true);
  };

  const handleEditEmployee = (employee) => {
    setIsEditing(true);
    setEmployeeData(employee);
    setIsFormVisible(true);
  };

  const handleDeleteEmployee = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error deleting employee: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Employee deleted successfully', result);
        fetchEmployees();
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const employee = Object.fromEntries(formData.entries());
  
    if (employee.password !== employee.confirmPassword) {
      return alert('Passwords do not match');
    }
  
    const url = isEditing
      ? `http://localhost:5000/api/employees/${employee.employeeId}`
      : 'http://localhost:5000/api/employees';
  
    try {
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error occurred');
      }
  
      const data = await response.json();
      alert(data.message);
      fetchEmployees();
      handleCloseForm();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  
  
  const logout = () => {
    window.location.href = "/";
  };

  return (
    <div className="wrapper">
      <div className="sidebar">
        <img src={require('../assets/icon.png')} alt="Icon" />
        <br />
        <ul>
          <li><Link to="/home"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
          <li><Link to="/employee-section"><FontAwesomeIcon icon={faAddressCard} /> Employee Section</Link></li>
          <li><Link to="/leave-types"><FontAwesomeIcon icon={faCalendar} /> Leave Types</Link></li>
          <li><Link to="/manage-leave"><FontAwesomeIcon icon={faProjectDiagram} /> Manage Leave</Link></li>
        </ul>
      </div>
      <div className="main_content">
        <div className="header" style={{ fontSize: 'large' }}>
          <b><h2>ELMS</h2></b>
          <div className="dropdown">
            <button onClick={logout} className="dropbtn" id="logoutBtn">Logout</button>
          </div>
        </div>
        
        <div className="body-table">
          <div className="container-table">
            <div className="header-table">
              <h1>Manage Employee</h1>
              <div className="add-employee-btn">
                <button onClick={handleAddEmployee}>Add Employee</button>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Employee ID</th>
                    <th>Department</th>
                    <th>Contact</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="employeeTableBody">
                  {employees.length > 0 ? (
                    employees.map((employee, index) => (
                    <tr key={employee._id}>
                      <td>{index + 1}</td>
                      <td>{employee.fullName}</td>
                      <td>{employee.employeeId}</td>
                      <td>{employee.department}</td>
                      <td>{employee.phoneNumber}</td>
                      <td>
                        <button className="manage-btn" onClick={() => handleEditEmployee(employee)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
                      </td>
                    </tr>
                    ))
                  ) : (
                  <tr>
                    <td colSpan="6">No employees found.</td>
                  </tr>
                )}
                </tbody>

              </table>
            </div>
          </div>
        </div>

        {isFormVisible && (
          <section className="container">
            <FontAwesomeIcon 
              icon={faTimesCircle} 
              className="close-icon" 
              onClick={handleCloseForm} 
            />
            <header>{isEditing ? 'Manage Employee' : 'Add Employee'}</header>
            <form className='form' onSubmit={handleSubmit}>
              <div className="input-box">
                <label>Full Name</label>
                <input type="text" name="fullName" placeholder="Enter full name" required defaultValue={employeeData?.fullName || ''} />
              </div>
              <div className="input-box">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="Enter email address" required defaultValue={employeeData?.email || ''} />
              </div>
              <div className="input-box">
                <label>Employee ID</label>
                <input type="text" name="employeeId" placeholder="Enter Employee ID" required defaultValue={employeeData?.employeeId || ''} readOnly={isEditing} />
              </div>
              <div className="input-box">
                <label>Set Username</label>
                <input type="text" name="username" placeholder="Enter username" required defaultValue={employeeData?.username || ''} />
              </div>
              <div className="input-box">
                <label>Department</label>
                <div className="select-box">
                  <select name="department" defaultValue={employeeData?.department || ''}>
                    <option value="" hidden>Department</option>
                    <option>Service Line</option>
                    <option>Human Resource</option>
                    <option>Accounts</option>
                    <option>Sales</option>
                    <option>Helpdesk</option>
                  </select>
                </div>
              </div>
              <div className="column">
                <div className="input-box">
                  <label>Phone Number</label>
                  <input type="tel" name="phoneNumber" placeholder="Enter phone number" required defaultValue={employeeData?.phoneNumber || ''} />
                </div>
                <div className="input-box">
                  <label>Birth Date</label>
                  <input type="date" name="birthDate" required defaultValue={employeeData?.birthDate ? employeeData.birthDate.split('T')[0] : ''} />
                </div>
              </div>
              <div className="gender-box">
                <h3>Gender</h3>
                <div className="gender-option">
                  <div className="gender">
                    <input type="radio" id="check-male" name="gender" value="male" defaultChecked={employeeData?.gender === 'male'} />
                    <label htmlFor="check-male">Male</label>
                  </div>
                  <div className="gender">
                    <input type="radio" id="check-female" name="gender" value="female" defaultChecked={employeeData?.gender === 'female'} />
                    <label htmlFor="check-female">Female</label>
                  </div>
                  <div className="gender">
                    <input type="radio" id="check-other" name="gender" value="others" defaultChecked={employeeData?.gender === 'others'} />
                    <label htmlFor="check-other">Others</label>
                  </div>
                </div>
              </div>
              <div className="input-box address">
                <label>Address</label>
                <input type="text" name="streetAddress" placeholder="Enter street address" required defaultValue={employeeData?.streetAddress || ''} />
                <div className="column">
                  <div className="select-box">
                    <select name="country" defaultValue={employeeData?.country || ''}>
                      <option value="" hidden>Country</option>
                      <option>America</option>
                      <option>Japan</option>
                      <option>India</option>
                      <option>Nepal</option>
                    </select>
                  </div>
                  <input type="text" name="city" placeholder="Enter city" required defaultValue={employeeData?.city || ''} /> 
                  
                </div>
                <div className="column">
                  <input type="text" name="region" placeholder="Enter region" required defaultValue={employeeData?.region || ''} />
                  <input type="text" name="postalCode" placeholder="Enter postal code" required defaultValue={employeeData?.postalCode || ''} />
                </div>
                {!isEditing && (
                  <div className="input-box">
                    <label>Set Password</label>
                    <input type="password" name="password" placeholder="Enter password" required minLength="6" />
                    <input type="password" name="confirmPassword" placeholder="Confirm password" required minLength="6" />
                  </div>
                )}
              </div>
              <button className="button-emp" type="submit">{isEditing ? 'Update' : 'Add'}</button>
            </form>
          </section>
        )}
      </div>
      <footer>
        <p>&copy; 2024 ELMS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EmployeeSection;
