import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressCard, faCalendar, faProjectDiagram, faFileAlt, faUser, faClock, faWindowClose, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [counts, setCounts] = useState({
    empCount: 0,
    leaveTypesCount: 0,
    pendingCount: 0,
    approvedCount: 0,
    declinedCount: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/counts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCounts(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchDataAndUpdate();
  }, []);

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
        <div className="info">
          {error ? <div id="errorContainer" className="error">{error}</div> : null}
          <div className="grid-container">
            <div className="grid-item">
              <FontAwesomeIcon icon={faFileAlt} />
              <span className="item-text">Available Leave Types</span>
              <span id="leaveTypesCount" className="item-text-num">{counts.leaveTypesCount}</span>
            </div>
            <div className="grid-item">
              <FontAwesomeIcon icon={faUser} />
              <span className="item-text">Registered Employee</span>
              <span id="registeredEmployeesCount" className="item-text-num">{counts.empCount}</span>
            </div>
            <div className="grid-item">
              <FontAwesomeIcon icon={faClock} />
              <span className="item-text">Pending Application</span>
              <span id="pendingApplicationsCount" className="item-text-num">{counts.pendingCount}</span>
            </div>
            <div className="grid-item">
              <FontAwesomeIcon icon={faWindowClose} />
              <span className="item-text">Declined Application</span>
              <span id="declinedApplicationsCount" className="item-text-num">{counts.declinedCount}</span>
            </div>
            <div className="grid-item">
              <FontAwesomeIcon icon={faCheckCircle} />
              <span className="item-text">Approved Application</span>
              <span id="approvedApplicationsCount" className="item-text-num">{counts.approvedCount}</span>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 ELMS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
