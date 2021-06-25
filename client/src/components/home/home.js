import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRecipes, searchRecipe, getAllDiets } from '../../actions/index';

import Pagination from '../Pagination/Pagination'
import s from './Home.module.css';
import check from '../../img/check2.png'
import cross from '../../img/cross.png'

function Home({ recipes, getAllRecipes, searchRecipe, getAllDiets, diets, newRecipes }) {
    const [recipe, setRecipes] = useState();
    const [allNewRecipes, setAllNewRecipes] = useState([]);
    const [showRecipes, setShowRecipes] = useState(false);

    const [search, setSearch] = useState({
        name: "",
        number: undefined,
    });
    const [filterbyName, setFilterbyName] = useState("");
    const [sortType, setSortType] = useState(undefined);
    const [sort, setSort] = useState("Ascendente");
    const [diet, setDiet] = useState(undefined);

    const [b, setB] = useState()

    useEffect(() => {
        if(b && b.length === 0){
        setB(newRecipes)}
        else if(b){
            setB([...newRecipes, ...b])
        }
    }, [])

    useEffect(() => {
        getAllRecipes();
        getAllDiets();
        if (!recipe) {
            setRecipes(recipes)
        }
    }, [])

    useEffect(() => {
        if (newRecipes && newRecipes !== 'string') {
            if (newRecipes && allNewRecipes) {
                setAllNewRecipes([...newRecipes, ...allNewRecipes])
            }
            else {
                setAllNewRecipes([...newRecipes])
            }             
        }
    }, [newRecipes])

    useEffect(() => {
        if (recipes && allNewRecipes) {
            let hash = {};
            let arr = allNewRecipes.filter(o => hash[o.name] ? false : hash[o.name] = true)
            console.log("arr",arr)
            setShowRecipes([...arr, ...recipes])      
            getAllDiets();
        }
    }, [allNewRecipes, recipes])


    useEffect(() => {
        setRecipes(showRecipes)
    }, [showRecipes])


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
    console.log(sort)

    useEffect(() => {
        const recipesByName = (type) => {
            if (type === "") {
                if (showRecipes && showRecipes.length >= 100) {
                    setRecipes(showRecipes);
                }
                else {
                    setRecipes([...recipes]);
                }
            }
            else {
                if (showRecipes && showRecipes.length >= 100) {
                    let result = showRecipes.filter(d => d.name.toLowerCase().includes(filterbyName.toLowerCase()))
                    setRecipes(result);
                }
                else {
                    let result = recipes.filter(d => d.name.toLowerCase().includes(filterbyName.toLowerCase()))
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
                [e.target.name]: undefined,
            })
        };
        e.preventDefault();
    };


    const handleSubmit = (e) => {
        if (search.number && search.number !== "") {
            searchRecipe(search);
        }
        else {
            searchRecipe({
                name: search.name,
                number: 9,
            });
        }
        e.preventDefault();
        setShowResult(true)
    }

    const handleInputChangeSearch = function (e) {
        setFilterbyName(e.target.value);
    }

    const [showResult, setShowResult] = useState(true)

    const closebtn = () => {
        setShowResult(false)
    }

    return (
        <div className={s.home}>
            <div className={s.content}>
                <h1 className={s.title}>HOME</h1>

                {recipes ?
                    <div>
                        <div className={s.form}>
                            <form onSubmit={handleSubmit} className={s.search}>
                                <label> <h3>Load more recipes:</h3> </label>
                                <label>Load recipe by name: </label>
                                <input type="text" name="name" onChange={handleInputChange} value={search.name ? search.name : undefined} placeholder="Nombre de la receta..."></input><br></br>
                                <label>Number of recipes: </label>
                                <input type="number" name="number" onChange={handleInputChange} value={search.number ? search.number : undefined} placeholder="Cantidad de recetas..." size="4"></input>
                                <button disabled={search.name ? false : true} type="submit">Search</button>


                                {showResult && newRecipes && typeof newRecipes === 'string' && <div className={s.searchError}><span class={s.closebtn} onClick={() => closebtn()}>&times;</span> <img className={s.crossImg} src={cross} alt="" width="80" height="80" /><h4>No se encontraron resultados con ese nombre</h4> </div>}
                                {showResult && newRecipes && typeof newRecipes !== 'string' && <div className={s.searchOk}><span class={s.closebtn} onClick={() => closebtn()}>&times;</span> <img className={s.crossImg} src={check} alt="" width="80" height="80" /><h4>Exito!</h4> </div>}

                            </form>

                            <form className={s.filters}>
                                <label> <h3>Recipe list filters :</h3> </label>
                                <div>
                                    <label >Filter by name: </label>
                                    <input
                                        type="text"
                                        placeholder="Buscar receta..."
                                        value={filterbyName}
                                        onChange={handleInputChangeSearch}
                                    />
                                </div>
                                <div>
                                    <label >Filter by diet type: </label>
                                    {diets ?
                                        <select onChange={(e) => setDiet(e.target.value)}>
                                            <option value="none" >None</option>
                                            {diets.map((d) => (
                                                <option key={d.id} value={d.name} >{d.name}</option>
                                            )
                                            )}
                                        </select>
                                        : <h2>No hay dietas registradas</h2>}
                                </div>
                                <div className={s.buttons}>
                                    <div className={s.add}>
                                        <Link to="./add">
                                            Add new Recipe
                                        </Link>
                                    </div>
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
                                > {sort}
                                </button>
                            </div>
                        </div >
                    </div>
                    : null}
            </div>

            {recipe && <Pagination recipes={recipe} />}
            {recipes ? null : <div className={s.loading}><h2>Loading...</h2>  </div>}
        </div >
    )
};

const mapStateToProps = (state) => {
    console.log(state)
    return {
        recipes: state.recipes,
        diets: state.diets,
        newRecipes: state.newRecipes,
        searchResult: state.searchResult,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDiets: () => dispatch(getAllDiets()),
        getAllRecipes: () => dispatch(getAllRecipes()),
        searchRecipe: (name) => dispatch(searchRecipe(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);