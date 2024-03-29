import React, { useState } from 'react';
import useFetch from 'react-fetch-hook';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { NavLink } from 'react-router-dom';

function LogOutService(){
    const handleClick= (e) => {
        localStorage.removeItem('GUID:');
        window.location.href="/home";
    }

    return (
        <button type="logout" onClick={handleClick}>Logga ut</button>
    )
}

export default LogOutService;