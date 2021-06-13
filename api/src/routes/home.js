const { BASE_URL, API_KEY, COMPLEX_SEARCH } = require('../../constants')
const express = require('express')
const router = express.Router()
const axios = require("axios").default;
const { Recipe } = require('../db');
const { v4: uuidv4 } = require('uuid');
const newId = uuidv4();


function firstHundred() {
    let firstHundredRecipes = []
    for (let i = 1; i < 2; i++) {
        let result = axios.get(BASE_URL + i + "/information?apiKey=" + API_KEY);
        firstHundredRecipes.push(result)
    }
    return firstHundredRecipes
}

//Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)

router.get("/", function (req, res) {

    //  let recipesApi = firstHundred();
    // let recipesDb = Recipe.findAll()
    // let recipes = recipesApi.concat(recipesDb);

    // Promise.all(recipes)
    //     .then(response => {
    //         let result = response.map((e) => {
    //             if (e.data) {
    //                 return e = {
    //                     image: e.data.image,
    //                     name: e.data.title,
    //                     dishTypes: e.data.dishTypes,
    //                     dietsTypes: e.data.diets
    //                 }
    //             }
    //             else {
    //                 return e
    //             }
    //         })
    //         res.send(result)
    //      })
    // Promise.all([recipesDb])
    //     .then(response => {
    //         res.send(response)
    //     })

    
    const recipes = [{
        id: 1,
        name: "oats upma recipe",
        image: "https://spoonacular.com/recipeImages/627977-312x231.jpg",
        imageType: "jpg",
        summary: "summary 1",
        score:1,
        healthScore: 9,
        steps: ["pasos"],
        diets: "recipe diets 1",
      },
      {
        id: 2,
        name: "Mardi Gras Cupcakes",
        image: "https://spoonacular.com/recipeImages/650965-312x231.png",
        imageType: "png",
        summary: "summary 2",
        score:5,
        healthScore: 9,
        steps: ["pasos"],
        diets: "recipe diets 2",
      },
      {
        id: 3,
        name: "Wholemeal Cranberry With Multi-Grain Loaf",
        image: "https://spoonacular.com/recipeImages/665302-312x231.jpg",
        summary: "summary 3",
        score:4,
        healthScore: 9,
        steps: ["pasos"],
        diets: "recipe diets 3",
      },
      {
        id: 4,
        name: "Indian-Style Pumpkin Side Dish",
        image: "https://spoonacular.com/recipeImages/643775-312x231.jpg",
        summary: "summary 4",
        score:8,
        healthScore: 9,
        steps: ["pasos"],
        diets: "recipe diets 4",
      },
      {
        id: 5,
        name: "Coconut & Pomogranate Ice Cream - Raw and Vegan",
        image: "https://spoonacular.com/recipeImages/639708-312x231.jpg",
        summary: "summary 5",
        score:3,
        healthScore: 9,
        steps: ["pasos"],
        diets: "recipe diets 5",
      },
      {
        id: 6,
        name: "Chocolate Whoopie Pies",
        image: "https://spoonacular.com/recipeImages/68254-312x231.jpg",
        summary: "summary 6",
        score:7,
        healthScore: 9,
        steps: ["pasos"],
        diets: "recipe diets 6",
      },
      {
        id: 7,
        name: "Vermont Spelt Sourdough",
        image: "https://spoonacular.com/recipeImages/664798-312x231.jpg",
        summary: "summary 7",
        score:2,
        healthScore: 9,
        steps: ["pasos"],
        diets: "recipe diets 7",
      },
      {
        id: 8,
        name: "Plantain Pizza",
        image: "https://spoonacular.com/recipeImages/716300-312x231.jpg",
        summary: "summary 8",
        score:10,
        healthScore: 9,
        steps: ["pasos"],
        diets: "recipe diets 8",
      },
      {
        id: 9,
        name: "Rustic Blueberry Cake Clafoutis",
        image: "https://spoonacular.com/recipeImages/658913-312x231.jpg",
        summary: "summary 9",
        score:1,
        healthScore: 9,
        steps: ["pasos"],
        diets: "recipe diets 9",
      },
      {
        id: 10,
        name: "Poached Eggs On A Bed Of Fried Mushrooms and Country White Bread",
        image: "https://spoonacular.com/recipeImages/656488-312x231.jpg",
        summary: "summary 10",
        score:9,
        healthScore: 9,
        steps: ["pasos"],
        diets: "recipe diets 10",

      }
    ]

    res.send(recipes)

})

module.exports = router;