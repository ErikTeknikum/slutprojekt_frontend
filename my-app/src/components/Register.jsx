import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import RegisterService from '../services/RegisterService';

function Register(){
    return(        
        <div>
        <main>
            <RegisterService />
        </main>
        <footer>
            <p>ExperimentPortalen - Erik Larsson</p>
        </footer>
    </div>
    );
}

export default Register;