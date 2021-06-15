const { BASE_URL, API_KEY, COMPLEX_SEARCH, ADD_RECIPE_INFO } = require('../../constants')
const express = require('express')
const router = express.Router()
const axios = require("axios").default;
const { Recipe, Diet } = require('../db');
const { v4: uuidv4 } = require('uuid');


router.get("/", function (req, res) {
    if (req.query.name) {
        axios.get(COMPLEX_SEARCH + `?query=${req.query.name}&apiKey=` + API_KEY + ADD_RECIPE_INFO + `&number=${req.body.number ? req.body.number : 9}`)
            .then(response => {
                if (response.data.totalResults > 0) {

                    let resultApi = response.data.results.map( (recipe) => {
                        return recipe = {
                            id: recipe.id,
                            name: recipe.title,
                            image: recipe.image,
                            // summary: recipe.summary,
                            score: recipe.spoonacularScore,
                            // healthScore: recipe.healthScore,
                            // steps: recipe.analyzedInstructions[0].steps,
                            // dishTypes: recipe.dishTypes,
                            diets: recipe.diets,
                        };
                    })
                    console.log(response.data.results.diets)
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
                                    console.log(diet)
                                })
                            })
                        }
                    }); 

                    let recipesDb = Recipe.findAll({include: Diet})

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
                                // dishTypes: recipe.dishTypes,
                                diets: recipe.diets.map(e =>  e.name ),
                            };
                        })
            
                        return res.send(result.concat(resultApi))
                    })
                }
                else {
                    return res.status(404).send("Esta receta ya no existe")
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(500).send("Opps! Hubo un Error")
            })
    }
    else {
        return res.status(404).send("Ingrese el parametro ?name='...' seguido por el nombre de la receta para realizar la busqueda. Ejemplo : ?name=pasta")
    }
});

// ID: *
// Nombre *
// Resumen del plato *
router.post("/add", function (req, res) {

    try {
        const isEmpty = str => !str.trim().length;
        let { name, summary, score, healthScore, steps, diet } = req.body

        if ((!isEmpty(name)) && (!isEmpty(summary))) {
            const newId = uuidv4();

            var recipe;
            Recipe.findOrCreate({
                where: {
                    id: newId,
                    name,
                    summary,
                    score,
                    healthScore,
                    steps : [steps]
                }
            }).then(recipes => {
                recipe = recipes[0]
        
                let result = diet.map(diet => {
                  return Diet.findOrCreate({
                    where: {
                      name: diet,
                    },
                    defaults: {
                      id: newId,
                      name: diet,
                    }
                  }).then(diet => {
                    return diet
                  })
                })
                return result
              }).then(diets => {
                diets.forEach(e => {
                  e.then(diet => { 
                    return diet[0].setRecipes(recipe.id)
                  }).then(diet => {
                    console.log("created", diet)
                  })
                })
              })

            //.then(recipes => {
            //     recipe = recipes[0]
            //     return Diet.create(
            //         {
            //             id: newId,
            //             name: diet,
            //         })
            // }).then(diet => {
            //     return diet.setRecipes(recipe.id)
            // }).then(diet => {
            //     console.log(diet)
            // })


            return res.send("Recipe created")
        }
        else {
            return res.send("Debe llenar el name y summary antes de enviar")
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Opps! Hubo un Error")
    }
});


// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados

// Ruta de detalle de receta: debe contener
// [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Puntuación
// [ ] Nivel de "comida saludable"
// [ ] Paso a paso

router.get("/:id", function (req, res) {
    console.log(req.params.id)
    axios.get(BASE_URL + `/${req.params.id}/information?apiKey=` + API_KEY)
        .then(response => {
            result = {
                name: response.data.title,
                image: recipe.image,
                summary: response.data.summary,
                score: response.data.spoonacularScore,
                healthScore: response.data.healthScore,
                steps: response.data.analyzedInstructions[0].steps,
                dishTypes: recipe.dishTypes,
                diets: response.data.diets,
            };

            return res.json(result)
        })
        .catch(err => {
            console.log(err)
            if(err.response){
            if (err.response.status === 404) {
                Recipe.findByPk(req.params.id, { include: Diet })
                    .then(recipe => {
                        if(recipe){
                        return res.send(recipe)
                        }
                        else{
                            return res.send("Esta receta ya no existe")
                        }
                    })
                    .catch(err => {
                        return res.status(404).send("La receta no existe")
                    })
                }
                else {
                    return res.status(err.response.status).send("Opps! Hubo un Error")
                }             
            }
            else {
                return res.status(500).send("La receta no existe")
            }
        })
});



module.exports = router;