import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../../img/img2.jpg'
import s from  './LandingPage.css';

function LandingPage () {
    return (
        <div className="page">
            <img className={s.img} src={Image} alt="food" width="900" height="500"/>
            <Link to="./home">
            <h2>Ir a la pagina principal</h2>
            </Link>
        </div>
    )
}

export default LandingPage
