import React from 'react';
import { Link } from 'react-router-dom';

import { AuthButton } from './AuthButton';

const NavBar = () => (
  <div id="nav">    
    <h1>      
      TaskList
    </h1>
    <br />
    <Link to="/">Inicio</Link>
    <span> | </span>    
    <Link to="/add-task">Nueva Tarea</Link>
    <span> | </span>
    <AuthButton />
  </div>
);

export { NavBar };
