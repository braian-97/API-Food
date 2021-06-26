import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { addRecipe, getAllDiets } from '../../actions'
import s from './AddRecipe.module.css'
import created from '../../img/check1.png'
import check from '../../img/check2.png'
import cross from '../../img/cross.png'

export function AddRecipe({ addRecipe, result, getAllDiets, diets }) {
    const [recipe, setRecipe] = useState({
        name: undefined,
        summary: undefined,
        image: undefined,
        score: undefined,
        healthScore: undefined,
        steps: undefined,
        dishTypes: [],
        diet: [],
    })
    const [errors, setErrors] = useState({});
    const [newDiet, setNewDiet] = useState({
        diet: []
    });
    const [errorImage, setErrorImage] = useState(undefined);

    useEffect(() => {
        getAllDiets()
    }, []);

    const handleInputChange = function (e) {
        if (e.target.name === "name" || e.target.name === "summary" || e.target.name === "image" || e.target.name === "steps") {
            setRecipe({
                ...recipe,
                [e.target.name]: e.target.value
            });
            setErrors(validate({
                ...recipe,
                [e.target.name]: e.target.value
            }));
        }
        else if (e.target.name === "diet") {
            if (e.target.type === "checkbox") {
                if (e.target.checked === true) {
                    setRecipe({
                        ...recipe,
                        [e.target.name]: [...recipe.diet].concat([e.target.value])
                    })
                }
                else {
                    if (e.target.value) {
                        setRecipe({
                            ...recipe,
                            [e.target.name]: [...recipe.diet].filter((d) => d !== e.target.value)
                        })
                    }
                }
            }
            else {
                setNewDiet({
                    ...newDiet,
                    [e.target.name]: [...e.target.value.split(",")]
                });
            }
        }
        else if (e.target.name === "score" || e.target.name === "healthScore") {
            if (e.target.value <= 100) {
                setRecipe({
                    ...recipe,
                    [e.target.name]: e.target.value
                });
            }
        }
        else if (e.target.name === "dishTypes") {
            setRecipe({
                ...recipe,
                [e.target.name]: [...e.target.value.split(",")]
            });
        }
    }


    let addDiets = ([...recipe.diet].concat([...newDiet.diet])).filter(r => r.trim())

    const handleSubmit = function (e) {
        addRecipe({
            name: recipe.name,
            summary: recipe.summary,
            image: recipe.image.trim() !== "" ? recipe.image : null,
            score: recipe.score.trim() !== "" ? recipe.score : null,
            healthScore: recipe.healthScore.trim() !== "" ? recipe.healthScore : null,
            steps: recipe.steps.trim() !== "" ? recipe.steps : null,
            dishTypes: recipe.dishTypes && recipe.dishTypes[0] && recipe.dishTypes[0] !== "" ? recipe.dishTypes : null,
            diet: addDiets
        });

        e.preventDefault();
    }

    const history = useHistory();

    const goNewRecipe = () => {
        let path = `./recipe/${result.id}`;
        history.push(path);
        result = null
    }
    const goOldRecipe = () => {
        let path = `./recipe/${result[1].id}`;
        history.push(path);
        result = null
    }


    const onFileChange = event => {
        if (event.target.files[0]) {
            var file = event.target.files[0];

            if (parseInt(file.size) < 100000) {
                var reader = new FileReader();

                reader.onloadend = function () {
                    setRecipe({
                        ...recipe,
                        image: reader.result
                    });
                    setErrorImage(null)
                    reader = null;
                }
                reader.readAsDataURL(file);

                if (recipe.image === "") event.target.value = undefined;
            }
            else {
                setErrorImage(
                    ` Tamaño de la imagen actual: ${file.size} Bytes( ${Math.round(file.size) * 0.000977} Kilobytes)`
                );
                event.target.value = null;
            }
        }
    };

    const validate = (recipe) => {
        let errors = {};
        const isEmpty = str => !str.trim().length;

        if (!recipe.name) {
            // errors.name = 'Name is required';
        } else if (isEmpty(recipe.name)) {
            errors.name = 'Name cannot be empty';
        }
        if (!recipe.summary) {
            // errors.summary = 'Summary is required';
        } else if (isEmpty(recipe.summary)) {
            errors.summary = 'Summary cannot be empty';
        }
        return errors;
    };


    const inputEl = React.useRef([]);

    if (inputEl.current[0]) {
        for (let i = 0; i >= diets.length; i++) {
            inputEl.current[i + 1].focus();
        }
    }

    const restart = () => {
        setRecipe({
            name: "",
            summary: "",
            image: "",
            score: "",
            healthScore: "",
            dishTypes: [],
            steps: "",
            diet: [],
        })
        setNewDiet({
            diet: []
        });
        if (inputEl.current[0]) {
            inputEl.current.slice(0, diets.length).forEach(d => d.checked = false)
        }
    }

    const [showResult, setShowResult] = useState(undefined)
    const [clicked, setClicked] = useState(undefined)

    const clickedfn = () => {
        setClicked(true)
        setShowResult(true)
    };
    const closebtn = () => {
        setShowResult(false)
        setClicked(false)
    }

    console.log(recipe)
    return (
        <div className={s.addRecipe}>
            <div>
                <nav className={s.navDetails}>
                    <p>See what you have complete</p>
                    <ul className={s.listDetails}>
                        <li className={s.liCheck}>
                            <h4 className={s.checkAdd}>Complete</h4>-
                            <h4 className={s.emptyAdd}>Empty</h4>
                        </li>
                        <li className={s.liAdd}><a className={recipe.name && recipe.name.trim() !== "" ? s.checkAdd : s.emptyAdd} href="#name">Name</a></li>
                        <li className={s.liAdd}><a className={recipe.summary && recipe.summary.trim() !== "" ? s.checkAdd : s.emptyAdd} href="#summary">Summary</a></li>
                        <li className={s.liAdd}><a className={recipe.image && recipe.image.trim() !== "" ? s.checkAdd : s.emptyAdd} href="#image">Image</a></li>
                        <li className={s.liAdd}><a className={recipe.score && recipe.score.trim() !== "" ? s.checkAdd : s.emptyAdd} href="#score">Score</a></li>
                        <li className={s.liAdd}><a className={recipe.healthScore && recipe.healthScore.trim() !== "" ? s.checkAdd : s.emptyAdd} href="#healthscore">Health Score</a></li>
                        <li className={s.liAdd}><a className={recipe.dishTypes && recipe.dishTypes[0] && recipe.dishTypes[0].trim() !== "" ? s.checkAdd : s.emptyAdd} href="#dishTypes">dishTypes</a></li>
                        <li className={s.liAdd}><a className={recipe.steps && recipe.steps.trim() !== "" ? s.checkAdd : s.emptyAdd} href="#steps">Steps</a></li>
                        <li className={s.liAdd}><a className={addDiets.length > 0 ? s.checkAdd : s.emptyAdd} href="#diets">Diets</a></li>
                    </ul>
                </nav>
            </div>
            <form onSubmit={handleSubmit} className={s.addForm}>

                <div id="name" className={s.addName}>
                    <label>Name</label>
                    <div className={s.inputName}>
                        <input className={errors.name && s.danger}
                            type="text" name="name" id="name" onChange={handleInputChange} value={recipe.name} size="45" ></input>
                        {!errors.name && recipe.name ? <img className={s.checkImg} src={check} alt="" width="40" height="40" /> : null}
                    </div>
                    {errors.name && (<p className={s.danger}>{errors.name}</p>)}
                    {!errors.name && recipe.name ? <p className={s.good}>Correct Name</p> : null}
                </div>

                <div id="summary" className={s.addSummary}>
                    <label>Summary</label>
                    <div className={s.inputSummary}>
                        <textarea className={errors.summary && s.danger}
                            type="text" name="summary" id="summary" onChange={handleInputChange} value={recipe.summary} rows="6" cols="50" ></textarea>
                        {!errors.summary && recipe.summary ? <img className={s.checkImg} src={check} alt="" width="40" height="40" /> : null}
                    </div>
                    {errors.summary && (<p className={s.danger}>{errors.summary}</p>)}
                    {!errors.summary && recipe.summary ? <p className={s.good}>Correct summary</p> : null}
                </div>

                <div id="image" className={s.addImage}>
                    <label>Image</label>
                    <div className={s.img} >
                        <div className={s.addImg}>
                            <h5>Ulr of the Image: </h5>
                            <div className={s.url}>
                                <input placeholder="Url of the image" type="text" name="image" id="image" onChange={handleInputChange} value={recipe.image} size="40" ></input>
                                <input type="button" value="Clear" onClick={() => setRecipe({ ...recipe, image: "" })} />
                            </div>
                            <h5>Select Image: </h5>
                            <p className={s.help}>Tamaño maximo permitido : 100000 Bytes(97.65 Kilobytes)</p>
                            <input type="file" name="myImage" onChange={onFileChange} />
                            {errorImage ? <span className={s.help}><p><strong>Error : Imagen demaciado grande</strong></p><p>{errorImage}</p></span> : null}

                            {recipe.image ? <img src={recipe.image} alt="recipe" height="400" width="400" /> : null}
                        </div>
                        {recipe.image ? <img className={s.checkImg} src={check} alt="" width="60" height="60" /> : null}
                    </div>
                </div>

                <div className={s.addNumber}>
                    <div id="score" className={s.addScore}>
                        <label>Score</label>
                        <div className={s.addScoreInput}>
                            <input type="number" name="score" onChange={handleInputChange} value={recipe.score} min="0" max="100" size="5"></input>
                            {recipe.score ? <img className={s.checkImg} src={check} alt="" width="40" height="40" /> : null}
                        </div>
                    </div>

                    <div id="healthscore" className={s.addHealthScore}>
                        <label>HealthScore</label>
                        <div className={s.addHealthScoreInput}>
                            <input type="number" name="healthScore" onChange={handleInputChange} value={recipe.healthScore} min="0" max="100" size="5"></input>
                            {recipe.healthScore ? <img className={s.checkImg} src={check} alt="" width="40" height="40" /> : null}
                        </div>
                    </div>
                </div>

                <div id="dishTypes" className={s.addDishTypes}>
                    <label>Dish Types</label>
                    <div className={s.addDishTypesInput}>
                        <input type="text" name="dishTypes" onChange={handleInputChange} value={recipe.dishTypes} ></input>
                        {recipe.dishTypes[0] ? <img className={s.checkImg} src={check} alt="" width="40" height="40" /> : null}
                    </div>
                </div>

                <div id="steps" className={s.addSteps}>
                    <div className={s.steps}>
                        <label>Steps</label>
                        <div className={s.addStepsInput}>
                            <textarea type="text" name="steps" onChange={handleInputChange} value={recipe.steps} rows="6" cols="50"></textarea>
                        </div>
                        {recipe.steps ? <img className={s.checkImg} src={check} alt="" width="40" height="40" /> : null}
                    </div>
                </div>


                <div id="diets" className={s.diet}>

                    <label>Diets</label>

                    <div className={s.addDiet}>
                        <h5>Available diets: </h5>
                        {diets && diets[0] ?
                            <div className={s.listDiet}>

                                <ul className={s.ulDiet}>
                                    {diets ? diets.map((d, i) => (
                                        <li className={s.listAddDiet} key={d.id}>
                                            <input ref={ref => inputEl.current.push(ref)}
                                                className={s.check} type="checkbox" name="diet" onChange={handleInputChange} value={d.name}></input>
                                            <label className={s.labelDiet}>{d.name}</label>
                                        </li>
                                    )
                                    ) : null}
                                </ul>
                            </div>
                            : <h2>No hay dietas registradas</h2>}
                        <div className={s.newDiets}>

                            <label>Add new diets: </label>
                            <div className={s.newDietsInput}>
                                <input type="text" name="diet" onChange={handleInputChange} value={newDiet.diet} size="45"></input>
                                <p className={s.help}>When adding more than one new diet, separate the different diets with a ","</p>
                            </div>
                        </div>


                        <ol className={s.allDiets}>
                            <h5>List of all diets to add to the recipe: </h5>
                            {addDiets.map((d, i) => (
                                <li key={i}>
                                    {d}
                                </li>
                            )
                            )}
                        </ol>

                        {addDiets[0] ? <img className={s.checkImg} src={check} alt="" width="60" height="60" /> : null}
                    </div>
                </div>

                <p>The name and summary of the recipe are required</p>
                <div className={s.buttonsContainer}>
                    <button className={s.addButton} onClick={() => clickedfn()} name="enviar" type="submit" disabled={(recipe.name && recipe.summary) && (recipe.name.trim() && recipe.summary.trim()) !== "" ? false : true} >Create recipe</button>
                    <input className={s.restartInput} type="button" value="Restart all" onClick={() => restart()} />
                </div>

                {showResult && result && result.id ?
                    <div className={s.created}>
                        <span class={s.closebtn} onClick={() => closebtn()}>&times;</span>
                        <img src={created} alt="" width="80" height="80" />
                        <h4>Recipe successfully created: </h4>
                        <button className={s.goButton} onClick={goNewRecipe}> Go to recipe </button>
                    </div> : null}

                {showResult && result && Array.isArray(result) ?
                    <div className={s.resultError}><span class={s.closebtn} onClick={() => closebtn()}>&times;</span><img className={s.crossImg} src={cross} alt="" width="80" height="80" /><h4 className={s.help}>{result[0]}</h4>
                        <button className={s.goButton} onClick={goOldRecipe}> Go to recipe </button>
                    </div> : null}

                {showResult && typeof result === 'string' && <div className={s.resultError}><span class={s.closebtn} onClick={() => closebtn()}>&times;</span> <img className={s.crossImg} src={cross} alt="" width="80" height="80" /><h4 className={s.help}>{result}</h4></div>}
                {clicked && !showResult && <h2>Loading...</h2>}
            </form>
        </div>
    )
}

function mapStateToProps(state) {
    console.log(state)
    return {
        result: state.result,
        diets: state.diets,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addRecipe: (recipe) => { dispatch(addRecipe(recipe)) },
        getAllDiets: () => { dispatch(getAllDiets()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);