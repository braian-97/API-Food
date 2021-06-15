import React from 'react';
import { Link } from 'react-router-dom';

export function Nav() {
  return (
    <div>
      <ul>
        <li><Link to='/home'><span>Inicio</span></Link></li>       
        <li><Link to='/add'><span>Add Recipe</span></Link></li>        
      </ul>
    </div>
  )
};

export default Nav;