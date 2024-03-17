import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import AuthService from '../services/AuthService';
import LogOutService from '../services/LogOutService';

function LoginForm(){
    return(        
        <div>
        <main>
            <AuthService />
            <LogOutService />
        </main>
        <footer>
            <p>ExperimentPortalen - Erik Larsson</p>
        </footer>
    </div>
    );
}

export default LoginForm;