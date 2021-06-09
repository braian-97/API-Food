import './App.css';
import React, { useEffect } from "react"
import { Route } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from './actions/index';
import  Home  from './components/home/home'

function App() {
  // const dispach = useDispatch();
  // const recipes = useSelector(state => state.recipes)

  // useEffect(() => {
  //   dispach(getAllRecipes())
  // },[dispach])

  // console.log("app", recipes)

  return (
    <div className="App">
      <h1>Henry Food</h1>
      <Route path="/" exact component={Home} />
    </div>
  );
}

export default App;
