import './App.css';
import React from "react"
import { Route } from "react-router-dom"
import  Home  from './components/Home/Home'
import LandingPage from './components/LandingPage/LandingPage'
import AddRecipe from './components/AddRecipe/AddRecipe';
import RecipeDetail from './components/RecipeDetail/RecipeDetail'
import Nav from './components/Nav/Nav'

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
