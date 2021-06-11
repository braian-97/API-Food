import './App.css';
import React from "react"
import { Route } from "react-router-dom"
import  Home  from './components/Home/Home'
import LandingPage from './components/Landing_page/Landing_page'
import AddRecipe from './components/AddRecipe/AddRecipe';

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
      <Route path="/home" exact component={Home} />
      <Route path="/" exact component={LandingPage} />
      <Route path="/add" exact component={AddRecipe} />
    </div>
  );
}

export default App;
