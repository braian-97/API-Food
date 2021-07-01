const { BASE_URL, API_KEY, COMPLEX_SEARCH, ADD_RECIPE_INFO } = require('../../constants')
const express = require('express')
const router = express.Router()
const axios = require("axios").default;
const { Recipe , Diet} = require('../db');
const { v4: uuidv4 } = require('uuid');
const newId = uuidv4();

//Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)

router.get("/", function (req, res) {
    
    axios.get(COMPLEX_SEARCH + `?apiKey=` + API_KEY + ADD_RECIPE_INFO + `&number=100`)
    .then(response => {       
        if (response.data.totalResults > 0) {
            var resultApi = response.data.results.map( (recipe) => {
                return recipe = {
                    id: recipe.id,
                    name: recipe.title,
                    image: recipe.image,
                    score: recipe.spoonacularScore,
                    diets: recipe.diets,
                };
            })

            response.data.results.forEach(data => {
                if(data.diets[0]){
                    data.diets.forEach(diet => {
                        const newId = uuidv4();
                        
                        Diet.findOrCreate({
                            where: {
                                name: diet,
                            },
                            defaults: {
                                id: newId,
                                name: diet,
                              }                    
                        }).then(diet => {
                            console.log("recipe loaded")
                        })
                        .catch(err => console.log("err"))
                    })
                }
                console.log("recipe loaded")
            });

            let recipesDb = Recipe.findAll({include: Diet})

            Promise.all([recipesDb])
                .then(response => {
                    let result = response[0].map( (recipe) => {
                        return recipe = {
                            id: recipe.id,
                            name: recipe.name,
                            image: recipe.image,
                            score: recipe.score,
                            diets: recipe.diets.map(e =>  e.name ),
                        };
                    })

                    return res.send(result.concat(resultApi))
                })
                .catch(err => console.log("err"))
        }
    }).then(response => {
        console.log("All recipe send")
    })
    .catch(err => { 
        let recipesDb = Recipe.findAll({include: Diet})

        Promise.all([recipesDb])
        .then(response => {
            let result = response[0].map( (recipe) => {
                return recipe = {
                    id: recipe.id,
                    name: recipe.name,
                    image: recipe.image,
                    score: recipe.score,
                    diets: recipe.diets.map(e =>  e.name ),
                };
            })
            return res.status(200).send(result)
        })
        .catch( err => {  
            return  res.status(400).send("Opps! There was a mistake")
        }) 
    })   
  
})

module.exports = router;


