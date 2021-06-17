import React from "react"
import { Link } from "react-router-dom"

function Recipe ({name, image, diets, id}){
    return (
        <div>
            <Link to={`/recipe/${id}`}>
                <h2>{name}</h2>
            </Link>
            {image ? <img src={image } alt="imagen" height="400" width="400"/> : <p>Imagen no disponible</p> }
            <p>Dietas : {diets}</p>
        </div>
    )
}

export default Recipe