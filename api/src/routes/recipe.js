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
                                    console.log("diet add")
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
                return res.status(err.response.status ? err.response.status : 500).send(err.response.statusText ? err.response.statusText : "Opps! Hubo un Error")
            })
    }
    else {
           return res.status(err.response.status ? err.response.status : 404).send(err.response.statusText ? err.response.statusText : "Ingrese el parametro ?name='...' seguido por el nombre de la receta para realizar la busqueda. Ejemplo : ?name=pasta")
    }
});

// ID: *
// Nombre *
// Resumen del plato *
router.post("/add", function (req, res) {
    console.log(req.body)
    try {
        const isEmpty = str => !str.trim().length;
        let { name, image, summary, score, healthScore, steps, diet } = req.body

        if ((!isEmpty(name)) && (!isEmpty(summary))) {
            const newId = uuidv4();

            var recipe;
            Recipe.findOrCreate({
                where: {
                    id: newId,
                    name,
                    image,
                    summary,
                    score,
                    healthScore,
                    steps : [steps]
                }
            }).then(recipes => {               
                recipe = recipes[0]
        
                let result = diet.map(diet => {
                  if(diet !== "" && diet) {
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
                  })}
                })
                return result
              }).then(diets => {
                diets.forEach(e => {
                  e.then(diet => { 
                    return diet[0].setRecipes(recipe.id)
                  }).then(diet => {
                    if(diet){
                        Recipe.findByPk(newId, { include: Diet })
                        .then(recipe => {
                            console.log("find", recipe)
                            if(recipe){
                            return res.send(recipe)
                            }
                            else{
                                return res.send("Esta receta ya no existe")
                            }
                        })
                        .catch(err => {
                            res.status(err.response.status).send(err.response.statusText)
                        })             
                    }                   
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

        }
        else {
            return res.send("Debe llenar el name y summary antes de enviar")
        }
    }
    catch (err) {
        console.log(err);
        res.status(err.response.status).send(err.response.statusText)
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
                    res.status(err.response.status).send(err.response.statusText)
                }             
            }
            else {
                return res.status(err.response.status ? err.response.status : 500).send(err.response.statusText ? err.response.statusText : "La receta no existe")
            }
        })
});



module.exports = router;