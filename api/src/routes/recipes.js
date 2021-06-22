const { BASE_URL, API_KEY, COMPLEX_SEARCH, ADD_RECIPE_INFO } = require('../../constants')
const express = require('express')
const router = express.Router()
const axios = require("axios").default;
const { Recipe, Diet } = require('../db');
const { v4: uuidv4 } = require('uuid');


router.get("/", function (req, res) {
    console.log(req.query.name)
    if (req.query.name) {
        axios.get(COMPLEX_SEARCH + `?query=${req.query.name}&apiKey=` + API_KEY + ADD_RECIPE_INFO + `&number=${req.body.number ? req.body.number : 9}`)
            .then(response => {
                if (response.data.totalResults > 0) {

                    let resultApi = response.data.results.map((recipe) => {
                        return recipe = {
                            id: recipe.id,
                            name: recipe.title,
                            image: recipe.image,
                            score: recipe.spoonacularScore,
                            diets: recipe.diets,
                        };
                    })

                    response.data.results.forEach(data => {
                        if (data.diets[0]) {
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
                                    console.log("new diet add")
                                })
                            })
                        }
                    });
                    return res.send(resultApi)
                }
                else {
                    return res.status(err.response.status ? err.response.status : 404).send(err.response.statusText ? err.response.statusText : "Esta receta ya no existe")
                }
            })
            .catch(err => {
                return res.status(err.response.status ? err.response.status : 400).send(err.response.statusText ? err.response.statusText : "Opps! Hubo un Error")
            })
    }
    else {
        return res.status(400).send(
            "Ingrese el parametro ?name='...' seguido por el nombre de la receta para realizar la busqueda. Ejemplo : ?name=pasta." 
            +   "/o ingrese '/' seguido del id de la receta que quiere buscar."
            )
    }
});


router.get("/:id", function (req, res) {
    if(req.params.id){
    axios.get(BASE_URL + `/${req.params.id}/information?apiKey=` + API_KEY)
        .then(response => {

            result = {
                name: response.data.title,
                image: response.data.image,
                summary: response.data.summary,
                score: response.data.spoonacularScore,
                healthScore: response.data.healthScore,
                steps: response.data.analyzedInstructions[0] ? response.data.analyzedInstructions[0].steps : response.data.analyzedInstructions,
                dishTypes: response.data.dishTypes,
                diets: response.data.diets,
            };

            return res.json(result)
        })
        .catch(err => {            
            if (err.response) {
                if (err.response.status === 404) {
                    Recipe.findByPk(req.params.id, { include: Diet })
                        .then(recipe => {
                            if (recipe) {
                                return res.send(recipe)
                            }
                            else {
                                return res.send(recipe)
                            }
                        })
                        .catch(err => {
                            return res.status(404).send("La receta no existe")
                        })
                }
                else {
                    res.status(err.response.status ? err.response.status : 400).send(err.response.statusText ? err.response.statusText : "Opps! hubo un error.")
                }
            }
            else {
                return res.status(400).send("La receta no existe")
            }
        })}
        else{
            return res.status(400).send("Ingrese un id para realizar la busqueda")
        }
});

module.exports = router;


