import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { addRecipe, getAllDiets } from '../../actions'

function AddRecipe({ addRecipe, result, getAllDiets, diets }) {
    const [recipe, setRecipe] = useState({
        name: "",
        summary: "",
        image: "",
        score: "",
        healthScore: "",
        steps: "",
        diet: [],
    })
    const [errors, setErrors] = useState({});
    const [newDiet, setNewDiet] = useState({
        diet: []
    });
    const [errorImage, setErrorImage] = useState(null);

    useEffect(() => {
        getAllDiets()
    }, [diets]);

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
    }

    let addDiets = ([...recipe.diet].concat([...newDiet.diet]))

    const handleSubmit = function (e) {
        addRecipe(recipe);
        setRecipe({
            name: "",
            summary: "",
            image: "",
            score: "",
            healthScore: "",
            steps: "",
            diet: [],
        });
        setNewDiet({
            diet: []
        })
        e.preventDefault();
    }

    const history = useHistory();
    const routeChange = () => {
        let path = `./recipe/${result.id}`;
        history.push(path);
        result = null       
    }

    const onFileChange = event => {
        console.log(event)
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

                if(recipe.image === "") event.target.value = null;
            }
            else {
                setErrorImage(       
                  ` Tamaño de la imagen actual: ${file.size} Bytes( ${Math.round(file.size)*0.000977} Kilobytes)`                    
                );
                event.target.value = null;
            }
        }
    };

    console.log(errorImage)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label><br></br>
                    <input className={errors.name && 'danger'}
                        type="text" name="name" id="name" onChange={handleInputChange} value={recipe.name} size="45" ></input>
                    {errors.name && (<p className="danger">{errors.name}</p>)}
                </div>
                <div>
                    <label>Summary: </label><br></br>
                    <textarea className={errors.summary && 'danger'}
                        type="text" name="summary" id="summary" onChange={handleInputChange} value={recipe.summary} rows="4" cols="50" ></textarea>
                    {errors.summary && (<p className="danger">{errors.summary}</p>)}

                </div>
                <div>
                    <label>Image: </label><br></br>
                    <h5>Ulr of the Image</h5>
                    <input placeholder="Url of the image" type="text" name="image" id="image" onChange={handleInputChange} value={recipe.image} size="100" ></input><input type="button" value="Clear" onClick={() => setRecipe({ ...recipe, image: "" })} /> <br></br>
                    <h5>Select Image</h5>
                    <p>Tamaño maximo permitido : 100000 Bytes(97.65 Kilobytes)</p>
                    <input type="file" name="myImage" onChange={onFileChange} /><br></br>
                   { errorImage ? <span><p><strong>Error : Imagen demaciado grande</strong></p><p>{ errorImage }</p></span> : null }
                    <br></br>
                    {recipe.image ? <img src={recipe.image} alt="recipe" height="400" width="400" /> : null}
                </div>

                <div>

                    <label>Score: </label><br></br>
                    <input type="number" name="score" onChange={handleInputChange} value={recipe.score} size="5"></input>
                </div>
                <div>
                    <label>HealthScore: </label><br></br>
                    <input type="number" name="healthScore" onChange={handleInputChange} value={recipe.healthScore} size="5"></input>
                </div>
                <div>
                    <label>Steps: </label><br></br>
                    <textarea type="text" name="steps" onChange={handleInputChange} value={recipe.steps} rows="4" cols="50"></textarea>
                </div>

                <div><ul>
                    <h5>Current diets: </h5>
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
                    <label>Add new diets: </label><br></br>
                    <input type="text" name="diet" onChange={handleInputChange} value={newDiet.diet} size="45"></input>
                    <p>When adding a new diet separate the different diets with a ","</p>
                </div>
                {addDiets ? <ul> <h5>List of all diets to add to the recipe: </h5>
                    {addDiets.map((d, i) => (
                        <li key={i}>
                            {d}
                        </li>
                    )
                    )}
                </ul> : null}
                <button type="submit" disabled={recipe.name !== "" && recipe.summary !== "" ? false : true} >Create recipe</button>
            </form>
            { result && result.id ? <div><h4>Recipe successfully created: </h4><button onClick={routeChange}> Go to recipe </button></div> : null }
            { result && !result.id ? <h4>Error: recipe creation failed</h4> : null }
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