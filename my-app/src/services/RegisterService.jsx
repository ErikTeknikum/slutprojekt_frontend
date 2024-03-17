import React, { useState } from 'react';
import useFetch from 'react-fetch-hook';
import axios, { AxiosResponse, AxiosError } from 'axios';

function RegisterService() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();    
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try{                                //specialtecken gör att länken blir konstig
        const response = await fetch('https://experimentportalen.azurewebsites.net/User?name='+username+'&email='+email+'&pwd='+password, {
            method: 'POST',
            mode: "cors",
            headers: myHeaders,
        });
        console.log(response);
    } catch(error){
        console.error(error);
    }

    // You can also add logic to clear the form fields after submission
    setUsername('');
    setPassword('');
    setEmail('');
  };

  return (
    <div>
      <h2>Skapa ditt Konto</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Användarnamn:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Lösenord:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Skapa konto</button>   
      </form>
    </div>
  );
}

export default RegisterService;
