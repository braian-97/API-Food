import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addRecipe, getAllDiets } from '../../actions'

function AddRecipe({ addRecipe, result, getAllDiets, diets }) {
    const [recipe, setRecipe] = useState({
        name: "",
        summary: "",
        score: "",
        healthScore: "",
        steps: "",
        diet: [""],
    })
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getAllDiets()
    }, []);

    console.log(recipe)
    console.log(diets)
    const handleInputChange = function (e) {
        if (e.target.name !== "diet") {

            setRecipe({
                ...recipe,
                [e.target.name]: e.target.value
            });
            setErrors(validate({
                ...recipe,
                [e.target.name]: e.target.value
            }));
        }
        else {
            if (e.target.type === "checkbox") {
                if (e.target.checked === true) {
                    setRecipe({
                        ...recipe,
                        [e.target.name]: [...recipe.diet].concat([e.target.value])
                    })
                }
                else {
                    setRecipe({
                        ...recipe,
                        [e.target.name]: [...recipe.diet].filter((d) => d !== e.target.value)
                    })
                }
            }
            else {
                setRecipe({
                    ...recipe,
                    [e.target.name]: [...e.target.value.split(",")]
                });
            }
        }
    }

    console.log(recipe)
    const handleSubmit = function (e) {
        addRecipe(recipe);
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input className={errors.name && 'danger'}
                        type="text" name="name" id="name" onChange={handleInputChange} value={recipe.name} size="45" ></input>
                    {errors.name && (<p className="danger">{errors.name}</p>)}
                </div>
                <div>
                    <label>Summary</label>
                    <textarea className={errors.summary && 'danger'}
                        type="text" name="summary" id="summary" onChange={handleInputChange} value={recipe.summary} rows="4" cols="50" ></textarea>
                    {errors.summary && (<p className="danger">{errors.summary}</p>)}

                </div>
                <div>
                    <label>Score</label>
                    <input type="number" name="score" onChange={handleInputChange} value={recipe.score} size="5"></input>
                </div>
                <div>
                    <label>HealthScore</label>
                    <input type="number" name="healthScore" onChange={handleInputChange} value={recipe.healthScore} size="5"></input>
                </div>
                <div>
                    <label>Steps</label>
                    <textarea type="text" name="steps" onChange={handleInputChange} value={recipe.steps} rows="4" cols="50"></textarea>
                </div>

                <div><ul>
                    {diets.map((d, i) => (
                        <li key={d.id}>
                            <input type="checkbox" name="diet" onChange={handleInputChange} value={d.name}></input>
                            <label>{d.name}</label>
                        </li>
                    )
                    )}
                </ul>
                </div>
                <div>
                    <label>Diet</label>
                    <input type="text" name="diet" onChange={handleInputChange} value={recipe.diet} size="45"></input>
                </div>
                <button type="submit" >Add Diet</button>
                <button type="submit" >Add</button>
            </form>

            <h3>{result}</h3>
        </div>
    )
}

export function validate(recipe) {
    let errors = {};
    const isEmpty = str => !str.trim().length;

    if (!recipe.name) {
        errors.name = 'Name is required';
    } else if (isEmpty(recipe.name)) {
        errors.name = 'Name cannot be empty';
    }
    if (!recipe.summary) {
        errors.summary = 'Summary is required';
    } else if (isEmpty(recipe.summary)) {
        errors.summary = 'Summary cannot be empty';
    }
    return errors;
};

function mapStateToProps(state) {
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