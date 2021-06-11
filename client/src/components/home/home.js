import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRecipes, searchRecipe } from '../../actions/index';

function Home(props) {
    const [recipe, setRecipes] = useState([]);
    const [search, setSearch] = useState({
        name : ""
    });

    useEffect(()=> {
        let all = props.getAllRecipes();
       
        setRecipes(el => [...el, all])
    },[])

    function handleInputChange(e){
        setSearch({
            ...search,
            name : e.target.value
        })
    }

    function handleSubmit(e){        
        let searchR = props.searchRecipe(search.name);
        setRecipes(el => [...el, searchR])
        e.preventDefault();
    }

    console.log(recipe)
    console.log(search)
    return (
        <div className="home">
            <h1>Home</h1>
            <Link to="./add">
            <h2>Add Recipe</h2>
            </Link>
            <form onSubmit={handleSubmit} >
            <label>Search for Name</label>
            <input type="text" name="search" onChange={handleInputChange}  value={search.name}></input>
            <button>Search</button>
            </form>
            {props.recipes ?
                <ul>
                    {props.recipes.map((recipe) => (
                        <li key={recipe.id}>                       
                            <span>
                                {recipe.name}
                            </span>                               
                        </li>))}
                </ul>
                : <h1>Cargando...</h1>}
        </div>
    )
};
// props.recipes[0].map( (el) => <div></div> )              
function mapStateToProps(state) {
    console.log(state)
    return {
        recipes: state.recipes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllRecipes: () => dispatch(getAllRecipes()),
        searchRecipe: (name) => dispatch(searchRecipe(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);