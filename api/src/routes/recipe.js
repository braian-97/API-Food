const express = require('express')
const router = express.Router()
const { Recipe, Diet } = require('../db');
const { v4: uuidv4 } = require('uuid');


router.post("/", function (req, res) {
    try {
        const isEmpty = str => !str.trim().length;
        let { name, image, summary, score, healthScore, steps, diet, dishTypes } = req.body

        if ((!isEmpty(name)) && (!isEmpty(summary))) {
            const newId = uuidv4();

            var recipe;
            Recipe.findOrCreate({
                where: {
                    name,
                },
                defaults: {
                    id: newId,
                    name,
                    image,
                    summary,
                    score,
                    healthScore,    
                    dishTypes,               
                    steps: [{step:[steps,]}]
                }
                
            }).then(recipes => {
                recipe = recipes

                if(recipes[1] === true){
                let result = diet.map(diet => {
                    if (diet !== "" && diet) {
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
                    }
                })
                return result
            }
            else{
                return res.send(["A recipe with that name already exists", { id : recipe[0].id }])
            }
            }).then(diets => {
                if (!diets[0]  ) {
                    return res.send( { id : recipe[0].id })
                }
                else {
                    diets.forEach(e => {
                        e.then(diet => {
                            return diet[0].setRecipes(recipe[0].id)
                        }).then(diet => {
                            if (diet) {                                
                               console.log("new diet set")
                            }
                        })
                    })
                    return res.send( { id : recipe[0].id })                
            }
            })
            .catch(err => {  
                console.log(err)
                return res.status(400).send("Error creating recipe")            
           }) 
        }
        else {
            return res.status(400).send("You must fill in the name and summary before sending")
        }
    }
    catch (err) {  
        return res.status(400).send("Error creating recipe")
   }
});

module.exports = router;