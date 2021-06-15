const { BASE_URL, API_KEY, COMPLEX_SEARCH } = require('../../constants')
const express = require('express')
const router = express.Router()
const axios = require("axios").default;
const { Recipe , Diet} = require('../db');
const { v4: uuidv4 } = require('uuid');
const newId = uuidv4();



//Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)

router.get("/", function (req, res) {

    let recipesDb = Recipe.findAll({include: Diet})
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
    Promise.all([recipesDb])
        .then(response => {

            let result = response[0].map( (recipe) => {
                return recipe = {
                    id: recipe.id,
                    name: recipe.name,
                    image: recipe.image,
                    // summary: recipe.summary,
                    score: recipe.score,
                    // healthScore: recipe.healthScore,
                    // steps: recipe.steps,
                    diets: recipe.diets.map(e =>  e.name ),
                };
            })

            res.send(result)
        })

})

module.exports = router;