import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRecipes, searchRecipe, getAllDiets } from '../../actions/index';
import Recipe from '../Recipe/Recipe'
import Pagination from '../Pagination/Pagination'


function Home({ recipes, getAllRecipes, searchRecipe, getAllDiets, diets }) {
    const [recipe, setRecipes] = useState();
    const [search, setSearch] = useState({
        name: "",
        number: 9,
    });
    const [sortType, setSortType] = useState('predeterminado');
    const [sort, setSort] = useState('Ascendente');
    const [diet, setDiet] = useState("none");
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        getAllRecipes();
        getAllDiets();
    }, [])

    useEffect(() => {
        if (recipes) {
            setRecipes(recipes)
        }
    }, [recipes])

    useEffect(() => {
        const sortArray = (type) => {
            const types = {
                predeterminado: 'predeterminado',
                name: 'name',
                score: 'score',
            };
            const sortProperty = types[type];
            if (sortProperty === "predeterminado") {
                setRecipes(recipes);
            }
            else {
                const sortProperty = types[type];

                const sorted = [...recipe].sort(function (a, b) {
                    if (a[sortProperty] > b[sortProperty]) {
                        return 1;
                    }
                    if (a[sortProperty] < b[sortProperty]) {
                        return -1;
                    }
                    return 0;
                });

                setRecipes(sorted);
            }
        };
        if (recipe) {
            sortArray(sortType);
        }
    }, [sortType]);


    useEffect(() => {
        const filterByDiet = (type) => {
            if (type !== "none") {
                let result = [...recipes].filter(d => d.diets.includes(type))
                setRecipes(result);
            }
            else { setRecipes(recipes); }
        }
        filterByDiet(diet)
    }, [diet]);


    const handleClick = (e) => {
        console.log(e)
        const reverseOrder = () => {
            const reverse = [...recipe].reverse();
            setRecipes(reverse);
        }
        if(recipe){
        reverseOrder()
        }
        setSort(sort === "Ascendente" ? "Descendente" : "Ascendente")     
    }

    useEffect(() => {
        const filterByName = (type) => {
            if (type === "") { setRecipes([...recipe]); }
            else {
                let result = [...recipe].filter(d => d.name.toLowerCase().includes(searchName.toLowerCase()))
                setRecipes(result);
            }
        }
        if (recipe) {
            filterByName(searchName)
        }
    }, [searchName]);


    const handleInputChange = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = (e) => {
        searchRecipe(search);
        e.preventDefault();
        setSearch("");
    }

    const handleInputChangeSearch = function (e) {
        setSearchName(e.target.value);
    }


    return (
        <div className="home">
            <h1>Home</h1>
            <Link to="./add">
                <h2>Add new Recipe</h2>
            </Link>
            <form onSubmit={handleSubmit} >
                <label> <h3>Search Recipe:</h3> </label>
                <label>Search for Name: </label>
                <input type="text" name="name" onChange={handleInputChange} value={search.name}></input><br></br>
                <label>Number of recipes to search: </label>
                <input type="number" name="number" onChange={handleInputChange} value={search.number} size="4"></input>
                <button type="submit">Search</button>
            </form>
            <form>
                <label> <h3>Recipe list filters :</h3> </label>
                <div>
                    <label >Filter by name: </label>
                    <input
                        type="text"
                        className="mb-2 form-control"
                        placeholder="Buscar Receta"
                        value={searchName}
                        onChange={handleInputChangeSearch}
                    />
                </div>
                <div>
                    <label >Choose an order type: </label>
                    <select onChange={(e) => setSortType(e.target.value)}>
                        <option value="predeterminado">Predeterminado</option>
                        <option value="name">Alfabeto</option>
                        <option value="score">Puntuación</option>
                    </select>
                </div>
                <div>
                    <label >Filter by diet type: </label>
                    <select onChange={(e) => setDiet(e.target.value)}>
                        <option value="none" >None</option>
                        {diets.map((d) => (
                            <option key={d.id} value={d.name} >{d.name}</option>
                        )
                        )}
                    </select>
                </div>
            </form>
            <div>
                <label >Choose a sort way: </label>
                <button name={sort} onClick={(e) => handleClick(e)}
                > {sort}
                </button>
            </div>
            {recipe ? <Pagination recipes={recipe} diets={diets} /> : <h2>Cargando...</h2>}

        </div >
    )
};

function mapStateToProps(state) {
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