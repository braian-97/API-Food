require('dotenv').config();

const { API_KEY } = process.env;
const BASE_URL = "https://api.spoonacular.com/recipes/"
const COMPLEX_SEARCH = "https://api.spoonacular.com/recipes/complexSearch"
const ADD_RECIPE_INFO = "&addRecipeInformation=true"

module.exports = {
    BASE_URL, 
    API_KEY,
    COMPLEX_SEARCH,
    ADD_RECIPE_INFO
}