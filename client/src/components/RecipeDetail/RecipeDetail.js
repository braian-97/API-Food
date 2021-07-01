import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { getRecipeDetail } from '../../actions';
import s from './RecipeDetails.module.css'


function RecipeDetail({ id, getRecipeDetail, details }) {
    const [show, setShow] = useState(true)

    useEffect(() => {
        getRecipeDetail(id);
    }, [id])


    const navRef = useRef()
    const nav = navRef.current
    const showNav = () => {    
        if (nav.style.display === "none") {
            nav.style.display = "block";
            setShow(true)
        } else {
            nav.style.display = "none";
            setShow(false)
        }
    }

        console.log(details)
    return (
        <div className={s.details}>
            <div>
                <button className={show ? s.ShowNavDetails : s.HideNavDetails} onClick={() => showNav()}>Click to Show details index</button>
                <nav ref={navRef} id="myNav" className={s.navDetails}>
                    <ul className={s.listDetails}>
                        <li><a href="#name">Name</a></li>
                        <li><a href="#summary">Summary</a></li>
                        <li><a href="#image">Image</a></li>
                        <li><a href="#score">Score</a></li>
                        <li><a href="#healthscore">Health Score</a></li>
                        <li><a href="#steps">Steps</a></li>
                        <li><a href="#dishtypes">Dish Types</a></li>
                        <li><a href="#diets">Diets</a></li>
                    </ul>
                </nav>

                {typeof details === 'string' && <div className={s.error}><h1>Error: 404</h1> <p>Recipe not found</p></div>}
                {details && typeof details !== 'string' ?
                    <div className={s.recipeContainer}>
                        <span id="name" className={s.nameDetails}> <h3 >{details.name}</h3> </span>

                        <div id="image" className={s.imageDetails}>
                            {details.image ?
                                <img className={s.image} src={details.image} alt="imagen" height="400" width="400" />
                                : <p className={s.notFound}>This recipe does not have a Image registered</p>}
                        </div>

                        <div id="summary" className={s.summaryDetails}>
                            <div className={s.summary} ><h3>Summary: </h3> <span>{details.summary}</span></div>
                        </div>

                        <div id="score" className={s.scoreDetails}>
                            <span className={s.scoreContainer}> <h3>Score: </h3>
                                {details.score ? <div className={s.score}><h1>{details.score}</h1></div> : <p className={s.notFound}>This recipe does not have it Score registered</p>}
                            </span>
                        </div>

                        <div id="healthscore" className={s.healthScoreDetails}>
                            <span className={s.healthScoreContainer} > <h3>Health Score: </h3>
                                {details.healthScore ? <div className={s.healthScore}><h1>{details.healthScore}</h1></div> : <p className={s.notFound}>This recipe does not have it Health Score registered</p>}
                            </span>
                        </div>

                        <div id="steps" className={s.stepsDetails}>
                            {details.steps && details.steps[0] ?
                                <span className={s.steps} ><h3>Steps: </h3> <ol className={s.listSteps}>{details.steps.map((e, i) => <li key={i}><p>{e.step}</p></li>)}</ol>
                                </span>
                                : <p className={s.notFound}>This recipe does not have its Steps registered</p>}
                        </div>

                        <div id="dishtypes" className={s.dishTypesDetails}>
                            {details.dishTypes ?
                                <span className={s.dishTypes} ><h3>Dish Types: </h3>
                                    <ol>{details.dishTypes.map((e, i) => <li key={i + 10}><p>{e}</p></li>)}</ol>
                                </span>
                                : <p className={s.notFound}>This recipe does not have its Dish Types registered</p>}
                        </div>

                        <div id="diets" className={s.dietsDetails}>
                            {details.diets && details.diets.length > 0 ?
                                <span><h3>Types of diets : </h3>
                                    <ul className={s.diets}>
                                        {details.diets.map((e,i) => <li>{e}</li>)}
                                    </ul>
                                </span>
                                : <p className={s.notFound}>This recipe does not have its diets registered</p>}
                        </div>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state,
        details: state.recipeDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipeDetail: (id) => dispatch(getRecipeDetail(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);