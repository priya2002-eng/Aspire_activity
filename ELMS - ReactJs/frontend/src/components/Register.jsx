import React, { useState } from 'react';
import '../css/register.css'; // Import the CSS

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    employeeId: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    employeeIdError: '',
    formError: '',
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'employeeId') {
      try {
        const response = await fetch('http://localhost:5000/api/check-employee-id', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ employeeId: value }),
        });     

        const data = await response.json();
        if (data.exists) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            employeeIdError: 'Employee ID already exists',
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            employeeIdError: '',
          }));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors({ formError: 'Passwords do not match!' });
      return;
    }

    if (formData.password.length < 6) {
      setErrors({ formError: 'Password must be at least 6 characters long.' });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.message === 'Registration successful') {
        alert('Registration successful!');
        window.location.href = '/login'; // Redirect to the login page
      } else {
        setErrors({ formError: data.message });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ formError: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <h1 className="register-h1">Registration Form</h1>
        <form id="registerForm" onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input className="register-input" 
              type="text" 
              id="fullName" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="email">Email:</label>
            <input className="register-input"
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="employeeId">Employee ID:</label>
            <input className="register-input"
              type="text" 
              id="employeeId" 
              name="employeeId" 
              value={formData.employeeId} 
              onChange={handleChange} 
              required 
            />
            {errors.employeeIdError && <div className="register-error-message">{errors.employeeIdError}</div>}
          </div>
          <div className="register-form-group">
            <label htmlFor="username">Username:</label>
            <input className="register-input" 
              type="text" 
              id="username" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="password">Password:</label>
            <input className="register-input"
              type="password" 
              id="password" 
              autoComplete="new-password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input className="register-input"
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              autoComplete="new-password" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button className="register-button" type="submit">Register</button>
        </form>
        {errors.formError && <div className="register-error-message">{errors.formError}</div>}
      </div>
    </div>
  );
};

export default Register;
