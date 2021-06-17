import React, { useEffect , useState} from 'react'
import { connect } from 'react-redux';
import { getRecipeDetail } from '../../actions';

function RecipeDetail({ id, getRecipeDetail, details }) {

    useEffect(() => {
        getRecipeDetail(id);
    }, [id])


    console.log(details)
    return (
        <div>
            {details.id === id ?
                <div>
                    <h2>{details.name}</h2>
                    {details.image ? <img src={ details.image } alt="imagen" height="600" width="600"/> : <p>Imagen no disponible</p>}
                    <p>Resumen: {details.summary}</p>
                    <p>Puntuación: {details.score}</p>
                    <p>Nivel de "comida saludable": {details.healthScore}</p>
                    {details.steps ? <span>Paso a paso: <ul>{details.steps.map((e, i) => <li key={i}>{e}</li>)}</ul></span> : <p>Esta receta no tiene registrado sus pasos</p>}
                    {details.dishTypes ? <span>Tipo de plato: <ul>{details.dishTypes.map((e, i) => <li key={i}>{e}</li>)}</ul></span> : <p>Esta receta no pertenece a ninguna tipo de plato</p>}
                    {details.diets ? <span>Tipos de dietas : <ul>{details.diets.map(e => <li key={e.id}>{e.name}</li>)}</ul></span> : <p>Esta receta no pertenece a ninguna dieta</p>}
                </div>
                :  <h2>Cargando...</h2>
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