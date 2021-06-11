const { BASE_URL, API_KEY, COMPLEX_SEARCH, ADD_RECIPE_INFO } = require('../../constants')
const express = require('express')
const router = express.Router()
const axios = require("axios").default;
const { Recipe, Diet } = require('../db');
const { v4: uuidv4 } = require('uuid');


router.get('/', function (req, res) {
    // const diets = ["Gluten_Free","Ketogenic","Lacto_Vegetarian","Ovo_Vegetarian","Vegan","Pescetarian","Paleo","Primal","Whole30"]
    // diets.forEach(d => {
    //     const newId = uuidv4();
    //     Diet.create({
    //         id: newId,
    //         name: d
    //     })
    // }); 
    const dietsDb = Diet.findAll()

    Promise.all([dietsDb])
        .then(response => { 
            res.send(response[0])
        })   
})


module.exports = router;