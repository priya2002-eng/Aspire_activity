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

          
          {/* <Routes> // for hoc session management
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/employee-section" element={<PrivateRoute><EmployeeSection /></PrivateRoute>} />
            <Route path="/leave-types" element={<PrivateRoute><LeaveTypes /></PrivateRoute>} />
            <Route path="/manage-leave" element={<PrivateRoute><ManageLeave /></PrivateRoute>} />
            <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
          </Routes> */}
        </Router>

    // <div className="App">
    //   <ApplyLeave/>

    // </div>

    
  );
}

export default App;
