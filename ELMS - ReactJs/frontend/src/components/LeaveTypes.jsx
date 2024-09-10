import React, { useState, useEffect } from 'react';
import '../css/employeesection.css';
import icon from '../assets/icon.png'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressCard, faCalendar, faProjectDiagram, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const LeaveTypes = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [currentLeaveType, setCurrentLeaveType] = useState({});

  useEffect(() => {
    // Fetch leave types from the backend
    fetch('http://localhost:5000/api/leave-types')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setLeaveTypes(data))
      .catch(error => console.error('Error fetching leave types:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      leaveType: currentLeaveType.leaveType,
      description: currentLeaveType.description,
    };

    if (formMode === 'add') {
      // Send data to backend to add new leave type
      fetch('http://localhost:5000/api/leave-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(`HTTP error! status: ${response.status}, ${text}`);
            });
          }
          return response.json();
        })
        .then(addedLeaveType => {
          setLeaveTypes([...leaveTypes, addedLeaveType]);
          setShowForm(false);
        })
        .catch(error => console.error('Error adding leave type:', error));
    } else if (formMode === 'edit') {
      // Send data to backend to update the leave type
      fetch(`http://localhost:5000/api/leave-types/${currentLeaveType._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(`HTTP error! status: ${response.status}, ${text}`);
            });
          }
          return response.json();
        })
        .then(updated => {
          setLeaveTypes(leaveTypes.map(type => (type._id === updated._id ? updated : type)));
          setShowForm(false);
          setCurrentLeaveType({});
        })
        .catch(error => console.error('Error updating leave type:', error));
    }
  };
  
  const handleDeleteLeaveType = (id) => {
    // Send request to backend to delete the leave type
    fetch(`http://localhost:5000/api/leave-types/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setLeaveTypes(leaveTypes.filter(type => type._id !== id));
      })
      .catch(error => console.error('Error deleting leave type:', error));
  };
  

  const openForm = (mode, leaveType = {}) => {
    setFormMode(mode);
    setCurrentLeaveType(leaveType);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const logout = () => {
    window.location.href = "/";
  };

  return (
    <div className="wrapper">
      <div className="sidebar">
        <img src={icon} alt="Logo" />
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
              <h1>Manage Leave Types</h1>
              <div className="add-employee-btn">
                <button onClick={() => openForm('add')}>Add New Leave Type</button>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Leave Type</th>
                    <th>Description</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveTypes.length > 0 ? (
                    leaveTypes.map((type, index) => (
                      <tr key={type._id}>
                        <td>{index + 1}</td>
                        <td>{type.leaveType}</td>
                        <td>{type.description}</td>
                        <td>{new Date(type.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button className="manage-btn" onClick={() => openForm('edit', type)}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDeleteLeaveType(type._id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No leave types found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <footer>
            <p>&copy; 2024 ELMS. All rights reserved.</p>
          </footer>
        </div>

        {/* Common Form Component */}
        {showForm && (
          <section className="container">
            <header>{formMode === 'add' ? 'Add New Leave Type' : 'Manage Leave Type'}</header>
            <FontAwesomeIcon icon={faTimesCircle} className="close-icon" onClick={handleCloseForm}/>
            <form className="form" onSubmit={handleSubmit}>
              <div className="input-box">
                <label>Leave Type</label>
                <input
                  type="text"
                  name="leaveType"
                  placeholder="Enter leave type"
                  required
                  value={currentLeaveType.leaveType || ''}
                  onChange={(e) => setCurrentLeaveType({ ...currentLeaveType, leaveType: e.target.value })}
                />
              </div>
              <div className="input-box">
                <label>Short Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Describe leave type"
                  required
                  value={currentLeaveType.description || ''}
                  onChange={(e) => setCurrentLeaveType({ ...currentLeaveType, description: e.target.value })}
                />
              </div>
              <button className="button-emp" type="submit">{formMode === 'add' ? 'Add' : 'Update'}</button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default LeaveTypes;
