const { BASE_URL, API_KEY, COMPLEX_SEARCH, ADD_RECIPE_INFO } = require('../../constants')
const express = require('express')
const router = express.Router()
const axios = require("axios").default;
const { Recipe } = require('../db');
const { v4: uuidv4 } = require('uuid');
const newId = uuidv4();

router.get("/", function (req, res) {
    if (req.query.name) {
        axios.get(COMPLEX_SEARCH + `?query=${req.query.name}&apiKey=` + API_KEY + "&number=9")
            .then(response => {
                if (response.data.totalResults > 0) {
                    return res.json(response.data)
                }
                else {
                    res.status(404).send("No se encontro la receta")
                }
            })
            .catch(err => { 
                console.log(err); 
                res.status(500).send("Opps! Hubo un Error") 
            })
    }
    else {
        res.status(404).send("Ingrese el parametro ?name='...' seguido por el nombre de la receta para realizar la busqueda. Ejemplo : ?name=pasta")
    }
});


router.post("/", function (req, res) {    
    Recipe.create(
        {
            id: newId,
            name: req.body.title,
            summary: req.body.summary,
            score: req.body.spoonacularScore,
            healthScore: req.body.healthScore,
            steps: req.body.analyzedInstructions[0].steps,
        }
    )
    return res.send("Recipe created")

});


router.get("/add", function (req, res) {

    axios.get("https://api.spoonacular.com/recipes/2/information?apiKey=d9dee7110a6e4e2fa772c3f765768567")
        .then(response => {
            Recipe.create(
                {
                     id : newId,
                     name : response.data.title,
                     summary : response.data.summary,
                     score : response.data.spoonacularScore,
                     healthScore : response.data.healthScore,
                     steps : response.data.analyzedInstructions[0].steps
                }
            )
            return res.send("Recipe created")
        })
        .catch(err => { 
            console.log(err); 
            res.status(500).send("Opps! Hubo un Error") 
        })
});
// router.post("/add", function (req, res) {   
//     axios.get("https://api.spoonacular.com/recipes/10/information?apiKey=d9dee7110a6e4e2fa772c3f765768567")
//     .then(response => {
//         Recipe.create(
//             {
//                 id: newId,
//                 name: response.data.title,
//                 summary: response.data.summary,
//                 score: response.data.spoonacularScore,
//                 healthScore: response.data.healthScore,
//                 steps: response.data.analyzedInstructions[0].steps, 
//             }
//         )
//         return res.send("Recipe created")
//     })
//     .catch(err => { console.log(err) }) 
// });

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
            console.log(err); 
            res.status(500).send("Opps! Hubo un Error") 
        })
});



module.exports = router;