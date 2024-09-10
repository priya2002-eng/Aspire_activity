import React, { useState, useEffect } from 'react';
import '../css/manage_leave.css';
import { Link } from 'react-router-dom';
import icon from '../assets/icon.png'; // Adjust the path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressCard, faCalendar, faProjectDiagram, faTimesCircle, faCheckCircle, faClock, faWindowClose } from '@fortawesome/free-solid-svg-icons';

const ManageLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [currentLeaveRequest, setCurrentLeaveRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = () => {
    fetch('http://localhost:5000/api/leave-requests')
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => {
          if (a.status === 'Pending' && b.status !== 'Pending') return -1;
          if (a.status !== 'Pending' && b.status === 'Pending') return 1;
          return new Date(b.created_date) - new Date(a.created_date);
        });
        setLeaveRequests(data);
      })
      .catch(error => {
        alert('An error occurred while fetching leave requests. Please try again.');
      });
  };

  const updateLeaveRequestStatus = (status) => {
    if (!currentLeaveRequest || !currentLeaveRequest._id) {
      alert("Unable to update status. Leave request ID is missing.");
      return;
    }
  
    fetch(`http://localhost:5000/api/leave-requests/${currentLeaveRequest._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update leave request status');
      }
      return response.json();
    })
    .then(() => {
      alert('Leave request status updated successfully');
      fetchLeaveRequests();
      setShowDetails(false);
    })
    .catch(() => {
      alert('An error occurred while updating leave request status. Please try again.');
    });
  };

  const handleViewDetails = (request) => {
    setCurrentLeaveRequest(request);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
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
              <h1>Manage Leave</h1>
            </div>
            <div className="table-container" id="leaveRequestsTable">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Leave Type</th>
                    <th>Applied On</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.length > 0 ? (
                    leaveRequests.map((request, index) => (
                      <tr key={request.leave_request_id}>
                        <td>{index + 1}</td>
                        <td>{request.employee_id_number}</td>
                        <td>{request.full_name}</td>
                        <td>{request.leave_type}</td>
                        <td>{new Date(request.created_date).toLocaleDateString()}</td>
                        <td className={request.status.toLowerCase()}>
                          <FontAwesomeIcon icon={request.status === 'Approved' ? faCheckCircle : request.status === 'Pending' ? faClock : faWindowClose} />
                          {request.status}
                        </td>
                        <td>
                          {request.status === 'Pending' && (
                            <button className="view-btn" onClick={() => handleViewDetails(request)}>
                              View Details
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No leave requests found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {showDetails && currentLeaveRequest && (
            <section className="container" id="employeeDetailsSection">
              <FontAwesomeIcon icon={faTimesCircle} className="close-icon" onClick={handleCloseDetails} />
              <header>Employee Leave Details</header>
              <form className="form">
                <div className="details">
                  <table className="border">
                    <tbody>
                      <tr>
                        <td><span className="label">Employee ID</span></td>
                        <td><span className="colon">:</span></td>
                        <td><span className="value">{currentLeaveRequest.employee_id_number}</span></td>
                      </tr>
                      <tr>
                        <td><span className="label">Employee Name</span></td>
                        <td><span className="colon">:</span></td>
                        <td><span className="value">{currentLeaveRequest.full_name}</span></td>
                      </tr>
                      <tr>
                        <td><span className="label">Leave Type</span></td>
                        <td><span className="colon">:</span></td>
                        <td><span className="value">{currentLeaveRequest.leave_type}</span></td>
                      </tr>
                      <tr>
                        <td><span className="label">Description</span></td>
                        <td><span className="colon">:</span></td>
                        <td><span className="value">{currentLeaveRequest.reason}</span></td>
                      </tr>
                      <tr>
                        <td><span className="label">Start Date</span></td>
                        <td><span className="colon">:</span></td>
                        <td><span className="value">{new Date(currentLeaveRequest.start_date).toLocaleDateString()}</span></td>
                      </tr>
                      <tr>
                        <td><span className="label">End Date</span></td>
                        <td><span className="colon">:</span></td>
                        <td><span className="value">{new Date(currentLeaveRequest.end_date).toLocaleDateString()}</span></td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="action">
                    <button type="button" className="approve-btn" onClick={() => updateLeaveRequestStatus('Approved')}>
                      Approve
                    </button>
                    <button type="button" className="decline-btn" onClick={() => updateLeaveRequestStatus('Declined')}>
                      Decline
                    </button>
                  </div>
                </div>
              </form>
            </section>
          )}
        </div>
      </div>
      <footer>
        <p>&copy; 2024 ELMS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ManageLeave;
