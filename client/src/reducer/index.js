import { SET_RECIPES, ADD_RECIPE, SET_DIETS, ADD_DIET, SEARCH_RECIPE } from "../actions/index";

const initialState = {
    recipes: undefined,
    result: "",
    diets: [],
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
        case ADD_DIET:
            return {
                ...state,
                result: action.payload
            }
        case SEARCH_RECIPE:
            return {
                ...state,
                recipes: action.payload
            }
        default:
            return state
    }
}

export default recipes;