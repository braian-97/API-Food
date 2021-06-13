import React from "react"

function Recipe ({name, image, diets}){
    return (
        <div>
            <h2>{name}</h2>
            <img src={image} alt="imagen"/>
            <p>{diets}</p>
        </div>
    )
}

export default Recipe