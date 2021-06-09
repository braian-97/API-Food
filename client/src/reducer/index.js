import {SET_RECIPES} from "../actions/index";

const initialState = {
    recipes: undefined,
};

const recipes = (state = initialState, action) => {
    switch(action.type){
        case SET_RECIPES:
            return {  
                ...state,              
                recipes : action.payload                
            }
        default:
            return state
    }
}

export default recipes;