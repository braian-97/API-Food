import axios from "axios";
export const SET_RECIPES = "SET_RECIPES";

export function getAllRecipes( ){
    return (dispach) => {
        axios.get("http://localhost:3001/home")
            .then(response => {
                dispach({ type: SET_RECIPES, payload: response.data})
            }).catch(err => { console.log(err) })
    }
}