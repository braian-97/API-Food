import axios from "axios";
export const SET_RECIPES = "SET_RECIPES";
export const SET_DIETS = "SET_DIETS";
export const ADD_RECIPE = "ADD_RECIPE";
export const ADD_DIET = "ADD_DIET";
export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const GET_DETAILS = "GET_DETAILS";

 
export function getAllRecipes() {
    return (dispatch) => {
        axios.get("http://localhost:5000/home")
            .then(response => {
                dispatch({ type: SET_RECIPES, payload: response.data }) 
            })
            .catch(err => { dispatch({ type: SET_RECIPES, payload: "Error loading recipes from database" })})
    }
}

export function getAllDiets() {
    return (dispatch) => {
        axios.get(" http://localhost:5000/types")
            .then(response => {
                dispatch({ type: SET_DIETS, payload: response.data })
            })
            .catch(err => { dispatch({ type: SET_DIETS, payload: "Failed to load all diets" })})
    }
}


export function addRecipe(recipe) {
    return (dispatch) => {
        axios.post(" http://localhost:5000/recipe", recipe)
            .then(response => {
                dispatch({ type: ADD_RECIPE, payload: response.data })
            })
            .catch(err => { dispatch({ type: ADD_RECIPE, payload: "Error creating recipe" })})
    }
}


export function searchRecipe({ name, number }) {
    return (dispatch) => {   
            axios.get(` http://localhost:5000/recipes/?name=${name}&number=${number}`)
                .then(response => {
                    dispatch({ type: SEARCH_RECIPE, payload: response.data })
                })
                .catch(err => { console.log(err)
                    console.log(err.status)
                    dispatch({ type: SEARCH_RECIPE, payload: "Error: 400" })                 
            })
        }    
}


export function getRecipeDetail(id) {
    return (dispatch) => {
        axios.get(`http://localhost:5000/recipes/${id}`)
            .then(response => {
                dispatch({ type: GET_DETAILS, payload: response.data })
            })
            .catch(err => {  dispatch({ type: GET_DETAILS, payload: "Error: 404" }) })
    }
}





