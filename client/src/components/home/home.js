import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../actions/index';

function Home(props) {
    const [recipe, setRecipes] = useState([]);
    useEffect(() => {
        props.getRecipes()
    }, [recipe])

    console.log(props)
    return (
        <div className="home">
            <h1>Home</h1>
            {props.recipes ?
                <ul>
                    {props.recipes[0].map((recipe) => (
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
        getRecipes: () => dispatch(getAllRecipes()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);