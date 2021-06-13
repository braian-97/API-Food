import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRecipes, searchRecipe } from '../../actions/index';
import Recipe from '../Recipe/Recipe'
import Pagination from '../Pagination/Pagination'

function Home({recipes, getAllRecipes, searchRecipe }) {    
    const [recipe, setRecipes] = useState([]);
    const [search, setSearch] = useState({
        name: ""
    });

    useEffect(() => {
        getAllRecipes();
    }, [])

    console.log(recipe)
    function handleInputChange(e) {
        setSearch({
            ...search,
            name: e.target.value
        })
    }

    function handleSubmit(e) {
        searchRecipe(search.name);
        e.preventDefault();
    }

    return (
        <div className="home">
            <h1>Home</h1>
            <Link to="./add">
                <h2>Add Recipe</h2>
            </Link>
            <form onSubmit={handleSubmit} >
                <label>Search for Name</label>
                <input type="text" name="search" onChange={handleInputChange} value={search.name}></input>
                <button>Search</button>
            </form>
             {/* {recipes ?
                <ul>
                    {recipes.map((recipe) => (
                        <Recipe
                            key={recipe.id}
                            name={recipe.name}
                            image={recipe.image}
                            diets={recipe.diets}
                        />
                    ))}
                </ul>
                : <h1>Cargando...</h1>}  */}
            { recipes ? <Pagination recipes={recipes}/>: <h2>Cargando...</h2>}
        </div>
    )
};
// props.recipes[0].map( (el) => <div></div> )              
function mapStateToProps(state) {
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