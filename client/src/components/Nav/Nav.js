import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
import Logo from '../../img/logo-henry.png'

export function Nav() {
  return (
    <div className="navbar">      
      <img className="logo" src={Logo} alt="Logo Henry" width="140" height="50"/>    
      <h2>API-Food</h2>
      <nav>
        <ul className="list">     
          <li className="list-item"><Link to='/'><span>Landing Page</span></Link></li>
          <li className="list-item"><Link to='/home'><span>Home</span></Link></li>
          <li className="list-item"><Link to='/add'><span>Add Recipe</span></Link></li>
        </ul>
      </nav>
    </div>
  )
};

export default Nav;