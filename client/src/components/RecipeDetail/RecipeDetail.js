import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getRecipeDetail } from '../../actions';
import s from './RecipeDetails.module.css'

console.log(s)
function RecipeDetail({ id, getRecipeDetail, details }) {

    useEffect(() => {
        getRecipeDetail(id);
    }, [id])


    console.log(details)
    return (
        <div className={s.details}>
            {details ?
                <div className={s.recipe}>
                    <span className={s.nameDetails}> <h2 >{details.name}</h2> </span>
                    <div className={s.imageDetails}>
                        {details.image ?
                            <img className={s.image} src={details.image} alt="imagen" height="400" width="400" />
                            : <p className={s.notFound}>Imagen no disponible</p>}
                    </div>

                    <div className={s.summaryDetails}>
                        <div className={s.summary} ><p>Resumen:</p> <span>{details.summary}</span></div>                    
                    </div>

                    <div className={s.scoreDetails}>
                        <span className={s.score}> <p>Puntuación:</p> 
                         {details.score ? details.score : <p className={s.notFound}>Esta receta no tiene puntuación</p>}
                        </span>
                    </div>

                    <div className={s.healthScoreDetails}>
                        <span className={s.healthScore} > <p>Nivel de "comida saludable": </p>
                         {details.healthScore ? details.healthScore : <p className={s.notFound}>Esta receta no tiene nivel de "comida saludable"</p>}
                        </span>
                    </div>
                    
                    <div className={s.stepsDetails}>
                        {details.steps && details.steps[0] ?
                            <span className={s.steps} >Paso a paso: <ul>{details.steps.map((e, i) => <li key={i}>{e.step}</li>)}</ul>
                            </span>
                            : <p className={s.notFound}>Esta receta no tiene registrado sus pasos</p>}
                    </div>

                    <div className={s.dishTypesDetails}>
                        {details.dishTypes ?
                            <span className={s.dishTypes} >Tipo de plato:
                                <ol>{details.dishTypes.map((e, i) => <li key={i+10}>{e}</li>)}</ol>
                            </span>
                            : <p className={s.notFound}>Esta receta no pertenece a ninguna tipo de plato</p>}
                    </div>

                    <div className={s.dietsDetails}>
                        {details.diets ?
                            <span>Tipos de dietas :
                                <ul className={s.diets}>
                                    {details.diets.map(e => <li key={e.id}>{e.name}</li>)}
                                </ul>
                            </span>
                            : <p className={s.notFound}>Esta receta no pertenece a ninguna dieta</p>}
                    </div>
                </div>
                : <h2>Cargando...</h2>
            }

        </div>
    )
}

function mapStateToProps(state) {
    console.log(state)
    return {
        ...state,
        details: state.recipeDetails
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipeDetail: (id) => dispatch(getRecipeDetail(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);