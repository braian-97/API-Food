import './App.css';
import React from "react"
import { Route } from "react-router-dom"
import Home from './components/Home/Home.js'
import LandingPage from './components/LandingPage/LandingPage.js'
import AddRecipe from './components/AddRecipe/AddRecipe.js';
import RecipeDetail from './components/RecipeDetail/RecipeDetail.js'
import Nav from './components/Nav/Nav.js'

import './global.css';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Nav}/>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/add"  component={AddRecipe} />
      <Route exact path="/recipe/:id" render={({ match }) => <RecipeDetail id={match.params.id} />}/>
    </div>
  );
}

export default App;
