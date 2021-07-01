import React from 'react'
import { Link } from 'react-router-dom'

import s from  './LandingPage.module.css';
import logoCooking from '../../img/cooking.png'

function LandingPage () {
    return (
        <div className={s.page}>
            <img className={s.logoCooking} src={logoCooking} alt="logo cooking" width="400" height="400"/>
            <Link className={s.goHome} to="./home">
            <h2>Go to the main page!</h2> 
            </Link>
            <h3 className={s.by}>By Braian Silva</h3>
        </div>
    )
}

export default LandingPage
