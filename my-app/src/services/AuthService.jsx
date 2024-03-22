import React, { useState } from 'react';
import useFetch from 'react-fetch-hook';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { NavLink } from 'react-router-dom';



function AuthService() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can perform login authentication, for demonstration purposes, let's just log the credentials
    console.log('Username:', username);
    console.log('Password:', password);


    try {
      const response = await axios.get("https://experimentportalen.azurewebsites.net/User/Login", {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        }
      });
      localStorage.setItem('GUID:', response.data);
      if (localStorage.getItem('GUID:') === response.data) {
        console.log("Lyckades logga in!" + response.data);
        window.location.href="/home";
      }

    } catch (error) {
      console.error(error);
    }

    // You can also add logic to clear the form fields after submission
    setUsername('');
    setPassword('');
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        <div>Har du inte ett konto?<br />
          <NavLink to="/register">klicka här</NavLink>
        </div>

      </form>
    </div>
  );
}

export default AuthService;
