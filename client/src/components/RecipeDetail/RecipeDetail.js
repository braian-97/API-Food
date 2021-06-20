import React, { useEffect } from 'react'
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
                    <span className={s.nameDetails}> <h3 >{details.name}</h3> </span>

                    <div className={s.imageDetails}>
                        {details.image ?
                            <img className={s.image} src={details.image} alt="imagen" height="400" width="400" />
                            : <p className={s.notFound}>Imagen no disponible</p>}
                    </div>

                    <div className={s.summaryDetails}>
                        <div className={s.summary} ><h3>Resumen: </h3> <span>{details.summary}</span></div>                    
                    </div>

                    <div className={s.scoreDetails}>
                        <span className={s.score}> <h3>Puntuación: </h3> 
                         {details.score ? <h1>{details.score}</h1> : <p className={s.notFound}>Esta receta no tiene puntuación</p>}
                        </span>
                    </div>

                    <div className={s.healthScoreDetails}>
                        <span className={s.healthScore} > <h3>Nivel de "comida saludable": </h3>
                         {details.healthScore ? <h1>{details.healthScore}</h1> : <p className={s.notFound}>Esta receta no tiene nivel de "comida saludable"</p>}
                        </span>
                    </div>
                    
                    <div className={s.stepsDetails}>
                        {details.steps && details.steps[0] ?
                            <span className={s.steps} ><h3>Paso a paso: </h3> <ol className={s.listSteps}>{details.steps.map((e, i) => <li key={i}>{e.step}</li>)}</ol>
                            </span>
                            : <p className={s.notFound}>Esta receta no tiene registrado sus pasos</p>}
                    </div>

                    <div className={s.dishTypesDetails}>
                        {details.dishTypes ?
                            <span className={s.dishTypes} ><h3>Tipo de plato: </h3>
                                <ol>{details.dishTypes.map((e, i) => <li key={i+10}>{e}</li>)}</ol>
                            </span>
                            : <p className={s.notFound}>Esta receta no pertenece a ninguna tipo de plato</p>}
                    </div>

                    <div className={s.dietsDetails}>
                        {details.diets ?
                            <span><h3>Tipos de dietas : </h3>
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