const { BASE_URL, API_KEY, COMPLEX_SEARCH, ADD_RECIPE_INFO } = require('../../constants')
const express = require('express')
const router = express.Router()
const axios = require("axios").default;
const { Recipe } = require('../db');
const { v4: uuidv4 } = require('uuid');


router.get('/', function (req, res) {
    const diets = {
        Gluten_Free:
            "Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated)",
        Ketogenic:
            "The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not.",
        Vegetarian:
            "No ingredients may contain meat or meat by-products, such as bones or gelatin.",

        Lacto_Vegetarian:
            "All ingredients must be vegetarian and none of the ingredients can be or contain egg.",

        Ovo_Vegetarian:
            "All ingredients must be vegetarian and none of the ingredients can be or contain dairy.",

        Vegan:
            "No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.",

        Pescetarian:
            "Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not.",

        Paleo:
            "Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.",

        Primal:
            "Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.",

        Whole30:
            "Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.",
    }

    res.json(diets)
})


module.exports = router;