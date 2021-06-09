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

    // let recipesApi = firstHundred();
    let recipesDb = Recipe.findAll()
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
    //     })
    Promise.all([recipesDb])
        .then(response => {
            res.send(response)
        })

})

module.exports = router;