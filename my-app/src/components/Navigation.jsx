import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

function Navigation(){
    return(        
        <nav>
            <ul>
                <li><NavLink to="/home">Hem</NavLink></li>
                <li><NavLink to="/create-experiment">Skapa Experiment</NavLink></li>
                <li><NavLink to="/login">Logga In</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navigation;