import axios from "axios";
export const SET_RECIPES = "SET_RECIPES";
export const SET_DIETS = "SET_DIETS";
export const ADD_RECIPE = "ADD_RECIPE";
export const ADD_DIET = "ADD_DIET";
export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const GET_DETAILS = "GET_DETAILS";

export function getAllRecipes() {
    return (dispach) => {
        axios.get("http://localhost:3001/home")
            .then(response => {
                dispach({ type: SET_RECIPES, payload: response.data })
            }).catch(err => { console.log(err) })
    }
}

export function getAllDiets() {
    return (dispach) => {
        axios.get("http://localhost:3001/types")
            .then(response => {
                dispach({ type: SET_DIETS, payload: response.data })
            }).catch(err => { console.log(err) })
    }
}


export function addRecipe(recipe) {
    return (dispach) => {
        axios.post("http://localhost:3001/recipe/add", recipe)
            .then(response => {
                dispach({ type: ADD_RECIPE, payload: response.data })
            }).catch(err => { console.log(err) })
    }
}


export function searchRecipe({ name, number }) {
    return (dispach) => {
        if (name) {
            axios.get(`http://localhost:3001/recipe/?name=${name}&number=${number}`)
                .then(response => {
                    console.log(response)
                    dispach({ type: SEARCH_RECIPE, payload: response.data })
                }).catch(err => { console.log(err) })
        }
        else {
            console.log("Error: falta el name")
        }
    }
}

export function getRecipeDetail(id) {
    return (dispach) => {
        console.log(id)
        axios.get(`http://localhost:3001/recipe/${id}`)
            .then(response => {
                console.log(response)
                dispach({ type: GET_DETAILS, payload: response.data })
            }).catch(err => {  dispach({ type: GET_DETAILS, payload: "Error: 404" }) })
    }
}





