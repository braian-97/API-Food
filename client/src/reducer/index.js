import { SET_RECIPES, ADD_RECIPE, SET_DIETS,  SEARCH_RECIPE, GET_DETAILS } from "../actions/index";

const initialState = {
    recipes: undefined,
    newRecipes: undefined,
    addRecipeResult: "",
    result: undefined,
    diets: [],    
    recipeDetails: {},
};

const recipes = (state = initialState, action) => {
    switch (action.type) {
        case SET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }
        case SET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case ADD_RECIPE:
            return {
                ...state,
                result: action.payload
            }
        case SEARCH_RECIPE:
            return {
                ...state,
                newRecipes: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                recipeDetails: action.payload
            }
        default:
            return state
    }
}

export default recipes;