<!-- Title: Created an Employee Time Off Management System
Author: Priyadharshini S
Created Date: 03/08/2024
Last modified date: 10/09/2024 -->

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import EmployeeSection from './components/employee-section';
import LeaveTypes from './components/LeaveTypes';
import ManageLeave from './components/ManageLeave';
import HomePage from './components/Index-Home';
import ChangePassword from './components/ChangePassword';
import Login from './components/Login';
import Register from './components/Register'
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    
       <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/employee-section" element={<EmployeeSection />} />
            <Route path="/leave-types" element={<LeaveTypes />} />
            <Route path="/manage-leave" element={<ManageLeave />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>

  );
}

export default App;
