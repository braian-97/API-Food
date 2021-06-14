import React from "react"

function Recipe ({name, image, diets}){
    return (
        <div>
            <h2>{name}</h2>
            {image ? <img src={image } alt="imagen"/> : <p>Imagen no disponible</p> }
            <p>Dietas : {diets}</p>
        </div>
    )
}

export default Recipe