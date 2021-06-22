import React from "react";
import { Link } from "react-router-dom";
import s from './Recipe.module.css';

export function Recipe({ name, image, diets, id , score}) {

    return (
        <div className={s.recipe}>
            <span className={s.titleContainer}>
                <Link to={`/recipe/${id}`}>
                    <h2>{name}</h2>
                </Link>
            </span>
            <span className={s.imgContainer}>
                <Link to={`/recipe/${id}`}>
                    {image ? <img  className={s.img} src={image} alt="imagen" height="400" width="400" /> : <p>Imagen no disponible</p>}
                </Link>
            </span>
            <span className={s.scoreContainer}>SCORE: <h2>{score}</h2></span>
            <span  className={s.dietsContainer}>
                <ol className={s.diets}> <h4>Diets:</h4>
                    {diets.map((d, i) => (
                        <li key={i} >{d}</li>
                    )
                    )}</ol>
            </span>
        </div>
    )
}

export default Recipe