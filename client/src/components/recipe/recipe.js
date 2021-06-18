import React from "react"
import { Link } from "react-router-dom"
import s from './Recipe.css';

function Recipe({ name, image, diets, id }) {

    return (
        <div className="recipe">
            <Link to={`/recipe/${id}`}>
                <h2>{name}</h2>
            
            {image ? <img className="img" src={image} alt="imagen" height="400" width="400" /> : <p>Imagen no disponible</p>}
            </Link>
            <ol className="diets"> <h4>Diets:</h4>
                {diets.map((d, i) => (
                <li key={i} >{d}</li>
            )
            )}</ol>
        </div>
    )
}

export default Recipe