import React, { useState } from 'react';
import './LoginForm.css'; // Import the styles specific to this component

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Send login data to the server for authentication
    fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        // Handle success or error response from the server
      })
      .catch(error => console.error('Error logging in:', error));
  };

  return (
    <div className="login-form-container">
      <header>
        <h1>Login</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
