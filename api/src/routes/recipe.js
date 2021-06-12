const { BASE_URL, API_KEY, COMPLEX_SEARCH, ADD_RECIPE_INFO } = require('../../constants')
const express = require('express')
const router = express.Router()
const axios = require("axios").default;
const { Recipe, Diet } = require('../db');
const { v4: uuidv4 } = require('uuid');


router.get("/", function (req, res) {
    if (req.query.name) {
        axios.get(COMPLEX_SEARCH + `?query=${req.query.name}&apiKey=` + API_KEY + ADD_RECIPE_INFO + "&number=9")
            .then(response => {
                if (response.data.totalResults > 0) {
                    console.log(response)
                    let result = response.data.results.map( (recipe) => {
                        return recipe = {
                            id: recipe.id,
                            name: recipe.title,
                            image: recipe.image,
                            summary: recipe.summary,
                            score: recipe.spoonacularScore,
                            healthScore: recipe.healthScore,
                            steps: recipe.analyzedInstructions[0].steps,
                            diets: recipe.diets,
                        };
                    })

                    return res.send(result)
                }
                else {
                    res.status(404).send("No se encontro la receta")
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send("<h2>Opps! Hubo un Error</h2>")
            })
    }
    else {
        res.status(404).send("</h3>Ingrese el parametro ?name='...' seguido por el nombre de la receta para realizar la busqueda. Ejemplo : ?name=pasta</h3>")
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
                    steps,
                }
            }).then(recipes => {
                recipe = recipes[0]
                return Diet.create(
                    {
                        id: newId,
                        name: diet,
                    })
            }).then(diet => {
                console.log(diet)
                return diet.setRecipes(recipe.id)
            }).then(diet => {
                console.log(diet)
            })


            return res.send("Recipe created")
        }
        else {
            return res.send("Debe llenar el name y summary antes de enviar")
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("<h2>Opps! Hubo un Error</h2>")
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

    axios.get(BASE_URL + `/${req.params.id}/information?apiKey=` + API_KEY)
        .then(response => {
            result = {
                name: response.data.title,
                summary: response.data.summary,
                score: response.data.spoonacularScore,
                healthScore: response.data.healthScore,
                steps: response.data.analyzedInstructions[0].steps,
                diets: response.data.diets,
            };

            return res.json(result)
        })
        .catch(err => {
            console.log(err.response.status);
            if (err.response.status === 404) {
                Recipe.findByPk(req.params.id, { include: Diet })
                    .then(recipe => {
                        if(recipe){
                        return res.send(recipe)
                        }
                        else{
                            return res.send("<h2>Esta receta ya no existe</h2>")
                        }
                    })
                    .catch(err => {
                        return res.status(404).send("<h2>La receta no existe</h2>")
                    })
            }
            else {
                res.status(500).send("<h2>Opps! Hubo un Error</h2>")
            }

        })
});



module.exports = router;