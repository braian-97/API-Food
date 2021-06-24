import React from "react";
import { Link } from "react-router-dom";
import s from './Recipe.module.css';

export function Recipe({ name, image, diets, id , score}) {

    return (
        <div className={s.recipe}>
            <div className={s.titleContainer}>
                <Link to={`/recipe/${id}`}>
                    <h2>{name}</h2>
                </Link>
            </div>
            <div className={s.imgContainer}>
                <Link to={`/recipe/${id}`}>
                    {image ? <img  className={s.img} src={image} alt="imagen" height="270" width="270" /> : <p>Imagen no disponible</p>}
                </Link>
            </div>
            <div  className={s.dietsContainer}>
                <ol className={s.diets}> <h4>Diets:</h4>
                    {diets && diets.map((d, i) => (
                        <li key={i} >{d}</li>
                    )
                    )}</ol>
            </div>
            <div className={s.scoreContainer}>SCORE: <h2>{score}</h2></div>
        </div>
    )
}

export default Recipe