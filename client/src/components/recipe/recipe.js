import React from "react"

function Recipe ({name, image, diets}){
    return (
        <div>
            <h1>{name}</h1>
            <img src={image} alt="imagen"/>
            <span>{diets}</span>
        </div>
    )
}

export default Recipe