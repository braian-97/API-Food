import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../../img/fondo1.jpg'
import s from  './LandingPage.css';
import logoCooking from '../../img/cooking.png'

console.log(s)
function LandingPage () {
    return (
        <div className="page">
            {/* <h1 className="title">PI - Food</h1> */}
            <img className="logoCooking" src={logoCooking} alt="logo cooking" width="400" height="400"/>
            <Link class="goHome" to="./home">
            <h2>Ir a la pagina principal</h2> 
            </Link>
        </div>
    )
}

export default LandingPage
