import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/loginadmin.css'; // Import the CSS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        // Parse the JSON response
        const data = await response.json(); 

        if (response.ok) {
            if (data.message === 'Login successful') {
                alert('Login successful!');
                window.location.href = '/home'; // Redirect to the homepage
            } else {
                setErrorMessage(data.message || 'An unexpected error occurred.');
            }
        } else {
            // If response is not OK, set error message
            setErrorMessage(data.message || 'An unexpected error occurred.');
        }
    } catch (error) {
        console.error('Error:', error); // Log error to console
        setErrorMessage('An error occurred. Please try again.');
    }
};




return (
  <div className="login-body">
      <div className="login-container">
          <h1 className="login-h1" style={{ paddingBottom: '20px' }}>Login</h1>
          <form onSubmit={handleSubmit}>
              <div className="login-form-group">
                  <input className="login-input"
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                  />
              </div>
              <div className="login-form-group">
                  <input className="login-input"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
              </div>
              <div className="login-forget-password">
                  <Link to="/change-password">Forget Password?</Link>
              </div>
              <div style={{ textAlign: 'center' }}>
                  <button className="login-button" type="submit">Login</button>
              </div>
              {errorMessage && <p id="error-message" className="login-error-message">{errorMessage}</p>}
          </form>
      </div>
  </div>
);


};

export default Login;
