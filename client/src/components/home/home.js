import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRecipes, searchRecipe, getAllDiets } from '../../actions/index';
import Recipe from '../Recipe/Recipe'
import Pagination from '../Pagination/Pagination'


function Home({recipes, getAllRecipes, searchRecipe, getAllDiets, diets }) {    
    const [recipe, setRecipes] = useState([]);
    const [search, setSearch] = useState({
        name: "",
        number: 9,
    });

    useEffect(() => {
        getAllRecipes();
        getAllDiets();
    }, [])

    useEffect(() => {
        if(recipes){
            setRecipes([...recipes])
        }
    }, [recipes])

    function handleInputChange(e) {
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e) {
        searchRecipe(search);
        e.preventDefault();
         setRecipes([...recipe, ...recipes])
    }

    return (
        <div className="home">
            <h1>Home</h1>
            <Link to="./add">
                <h2>Add Recipe</h2>
            </Link>
            <form onSubmit={handleSubmit} >
                <label>Search for Name</label>
                <input type="text" name="name" onChange={handleInputChange} value={search.name}></input>
                <label>Number of recipes to search</label>
                <input type="number" name="number" onChange={handleInputChange} value={search.number} size="5"></input>
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
            { recipes ? <Pagination recipes={recipes} diets={diets}/>: <h2>Cargando...</h2>} 
            
        </div>
    )
};
// props.recipes[0].map( (el) => <div></div> )              
function mapStateToProps(state) {
    console.log(state)
    return {
        recipes: state.recipes,
        diets: state.diets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllRecipes: () => dispatch(getAllRecipes()),
        getAllDiets: () => dispatch(getAllDiets()),
        searchRecipe: (name) => dispatch(searchRecipe(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);