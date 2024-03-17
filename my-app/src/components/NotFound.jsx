import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import '../App.css';

function NotFound(){
    return(        
        <div className='wrapper'>
            <main>
                <h2>Denna sidan finns inte ('-')? </h2>
            </main>
        </div>
    );
}

export default NotFound;