import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRecipes, searchRecipe, getAllDiets } from '../../actions/index';

import Pagination from '../Pagination/Pagination'
import s from './Home.module.css';


function Home({ recipes, getAllRecipes, searchRecipe, getAllDiets, diets, newRecipes }) {
    const [recipe, setRecipes] = useState();
    const [search, setSearch] = useState({
        name: "",
        number: undefined,
    });
    const [sortType, setSortType] = useState(null);
    const [sort, setSort] = useState(null);
    const [diet, setDiet] = useState(null);
    const [filterbyName, setFilterbyName] = useState("");
    const [showRecipes, setShowRecipes] = useState();



    useEffect(() => {
        getAllRecipes();
        getAllDiets();
    }, [])

    useEffect(() => {
        getAllDiets();
    }, [recipes])

    useEffect(() => {
        if (recipes) {
            setRecipes(recipes)
        }
    }, [recipes])


    useEffect(() => {
        if (newRecipes && recipes) {
            const hundredRecipes = () => {
                var iguales = [];
                for (let i = 0; i < newRecipes.length; i++) {
                    for (var j = 0; j < recipes.length; j++) {
                        if (newRecipes[i].name === recipes[j].name) {
                            iguales.push(j)
                        }
                    }
                }
                for (let i = 0; i < recipes.length; i++) {
                    let noRepeat = newRecipes.concat(recipes.filter((r, i) => i !== iguales[i]))
                    setShowRecipes(noRepeat)
                    setRecipes(noRepeat)
                }
            }
            hundredRecipes()
        }
    }, [newRecipes])

    console.log(recipe)
    useEffect(() => {
        const sortArray = (type) => {
            const types = {
                predeterminado: 'predeterminado',
                name: 'name',
                score: 'score',
            };
            const sortProperty = types[type];
            if (sortProperty === "predeterminado" || !type) {
                if (showRecipes && showRecipes.length >= 100) {
                    setRecipes(showRecipes);
                }
                else {
                    setRecipes(recipes);
                }
            }
            else {
                const sortProperty = types[type];
                const sorted = [...recipe].sort(function (a, b) {
                    if (sortProperty === 'name') {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1;
                        }
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1;
                        }
                        return 0;
                    }
                    else {
                        if (a[sortProperty] > b[sortProperty]) {
                            return 1;
                        }
                        if (a[sortProperty] < b[sortProperty]) {
                            return -1;
                        }
                        return 0;
                    }
                });
                setRecipes(sorted);

            }
        };
        if (recipe || showRecipes) {
            sortArray(sortType);
            setSort("Ascendente")
        }
    }, [sortType]);


    useEffect(() => {
        const filterByDiet = (type) => {
            if (type !== "none" && type) {
                if (showRecipes && showRecipes.length >= 100) {
                    let result = showRecipes.filter(d => d.diets.some(d => d.toLowerCase() === type.toLowerCase()))
                    setRecipes(result);
                }
                else {
                    let result = recipes.filter(d => d.diets.some(d => d.toLowerCase() === type.toLowerCase()))
                    setRecipes(result);
                }
            }
            else {
                if (showRecipes && showRecipes.length >= 100) {
                    setRecipes(showRecipes);
                }
                else {
                    setRecipes(recipes);
                }
            }
        }
        if (recipes) {
            filterByDiet(diet)
        }
    }, [diet]);


    const handleClick = (e) => {
        const reverseOrder = () => {
            const reverse = [...recipe].reverse();
            setRecipes(reverse);
        }
        if (recipe) {
            reverseOrder()
        }
        setSort(sort === "Ascendente" ? "Descendente" : "Ascendente")
    }

    useEffect(() => {
        const recipesByName = (type) => {
            if (type === "") {
                setRecipes([...recipes]);
            }
            else {
                if (showRecipes && showRecipes.length >= 100) {
                    let result = showRecipes.filter(d => d.name.toLowerCase().includes(filterbyName.toLowerCase()))
                    console.log(result)
                    setRecipes(result);
                }
                else {
                    let result = recipes.filter(d => d.name.toLowerCase().includes(filterbyName.toLowerCase()))
                    console.log(result)
                    setRecipes(result);
                }
            }
        }
        if (recipes) {
            recipesByName(filterbyName)
        }
    }, [filterbyName]);


    const handleInputChange = (e) => {
        if (e.target.value) {
            setSearch({
                ...search,
                [e.target.name]: e.target.value,
            })
        }
        else {
            setSearch({
                ...search,
                [e.target.name]: null,
            })
        };
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        searchRecipe(search);
        e.preventDefault();
        setSearch({
            name: "",
            number: undefined,
        })
    }

    const handleInputChangeSearch = function (e) {
        setFilterbyName(e.target.value);
    }

    const reload = () => {
        getAllRecipes();
        setSortType(null);
        setSort(null);
        setDiet(null);
        setFilterbyName("");
    }

    return (
        <div className={s.home}>
            <div className={s.content}>
                <h1 className={s.title}>Home</h1>

                <div className={s.form}>
                    <form onSubmit={handleSubmit} className={s.search}>
                        <label> <h3>Load more recipes:</h3> </label>
                        <label>Load for Name: </label>
                        <input type="text" name="name" onChange={handleInputChange} value={search.name ? search.name : undefined} placeholder="Nombre de la receta..."></input><br></br>
                        <label>Number of recipes to load: </label>
                        <input type="number" name="number" onChange={handleInputChange} value={search.number ? search.number : undefined} placeholder="Cantidad de recetas..." size="4"></input>
                        <button type="submit">Search</button>
                    </form>
                    <form className={s.filters}>
                        <label> <h3>Recipe list filters :</h3> </label>
                        <div>
                            <label >Filter by name: </label>
                            <input
                                type="text"
                                className="mb-2 form-control"
                                placeholder="Buscar receta..."
                                value={filterbyName}
                                onChange={handleInputChangeSearch}
                            />
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
                </div>
                <div className={s.sort}>
                    <div>
                        <label >Choose an order type: </label>
                        <select onChange={(e) => setSortType(e.target.value)}>
                            <option value="predeterminado">Predeterminado</option>
                            <option value="name">Alfabeto</option>
                            <option value="score">Puntuación</option>
                        </select>
                    </div>
                    <div>
                        <label >Choose a sort way: </label>
                        <button name={sort} onClick={(e) => handleClick(e)}
                        > {sort ? sort : "Ascendente/Descendente"}
                        </button>
                    </div>
                </div >
                <div className={s.buttons}>
                    <div className={s.add}>
                        <Link to="./add">
                            Add new Recipe
                        </Link>
                    </div>
                    <button className={s.refresh} onClick={() => reload()}>Refresh</button>
                </div>
            </div>
            {recipe && <Pagination recipes={recipe} />}
            {recipes ? null : <div className={s.loading}><h2>Loading...</h2>  </div>}
        </div >
    )
};

function mapStateToProps(state) {
    return {
        recipes: state.recipes,
        diets: state.diets,
        newRecipes: state.newRecipes,
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