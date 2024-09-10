import React, { useState } from 'react';
import '../css/forget_password.css'; // Import the CSS

const ChangePassword = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, newPassword: password })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.message === 'Password updated successfully') {
          alert('Password updated successfully!');
          window.location.href = '/login'; // Redirect to the login page
        } else {
          setErrorMessage(data.message);
        }
      } else {
        setErrorMessage(data.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="pass-body">
      <div className="pass-container">
        <h1 className="pass-h1" style={{ paddingBottom: '20px' }}>Change Password</h1>
        <form id="changePasswordForm" onSubmit={handleSubmit}>
          <div className="pass-form-group">
            <input className="pass-input"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="pass-form-group">
            <input className="pass-input"
              type="password"
              id="password"
              name="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="pass-form-group">
            <input className="pass-input"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="pass-button" type="submit">Submit</button>
          </div>
          {errorMessage && <p id="error-message" className="pass-error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
