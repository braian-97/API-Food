const { BASE_URL, API_KEY, COMPLEX_SEARCH, ADD_RECIPE_INFO } = require('../../constants')
const express = require('express')
const router = express.Router()
const axios = require("axios").default;
const { Recipe, Diet } = require('../db');
const { v4: uuidv4 } = require('uuid');


router.get('/', function (req, res) {
    const dietsDb = Diet.findAll()

    Promise.all([dietsDb])
        .then(response => { 
            res.send(response[0])
        }).catch(err => console.log(err))   
})


module.exports = router;