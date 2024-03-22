import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

function Navigation(){
    return(                
        <nav>   
            <ul className='titleContainer'>
                <li>                    
                   <h2>ExperimentPortalen</h2>                      
                </li>
                <li>
                    <img src={process.env.PUBLIC_URL + "/images/experiment_logo2.jpg"} alt="logga" />
                </li>
            </ul>      
            <ul className='NavlinkContainer'>
                
                <li><NavLink to="/home">Hem</NavLink></li>
                <li><NavLink to="/create-experiment">Skapa Experiment</NavLink></li>
                <li><NavLink to="/login">Logga In</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navigation;