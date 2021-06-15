import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage () {
    return (
        <div>
            <img src="https://initiate.alphacoders.com/images/396/cropped-1360-768-396169.jpg?4533" alt="food" />
            <Link to="./home">
            <h2>Ir a la pagina principal</h2>
            </Link>
        </div>
    )
}

export default LandingPage
