//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Recipe, Diet } = require('./src/db.js');
const { v4: uuidv4 } = require('uuid');
const newId = uuidv4();
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console

    const diets = ["gluten free", "ketogenic", "vegetarian", "lacto vegetarian", "ovo vegetarian", "vegan", "pescetarian", "paleo", "primal", "whole30"]
  
    diets.forEach( diet => {
      const newId = uuidv4();
      Diet.create({ 
        id: newId,
        name: diet,
      }).then( r => console.log("dietas precargadas"))
    })
  
    // const recipes = [{
    //   id: 1,
    //   name: "oats upma recipe",
    //   image: "https://spoonacular.com/recipeImages/627977-312x231.jpg",
    //   imageType: "jpg",
    //   summary: "summary 1",
    //   score: 1,
    //   healthScore: 9,
    //   steps: ["pasos"],
    //   dishTypes: [
    //     "lunch",
    //     "main course",
    //     "main dish",
    //     "dinner"
    //   ],
    //   diets: ["gluten Free"],
    // },
    // {
    //   id: 2,
    //   name: "Mardi Gras Cupcakes",
    //   image: "https://spoonacular.com/recipeImages/650965-312x231.png",
    //   imageType: "png",
    //   summary: "summary 2",
    //   score: 5,
    //   healthScore: 9,
    //   steps: ["pasos"],
    //   dishTypes: [
    //     "lunch",
    //     "main course",
    //     "main dish",
    //     "dinner"
    //   ],
    //   diets: ["ketogenic"],
    // },
    // {
    //   id: 3,
    //   name: "Wholemeal Cranberry With Multi-Grain Loaf",
    //   image: "https://spoonacular.com/recipeImages/665302-312x231.jpg",
    //   summary: "summary 3",
    //   score: 4,
    //   healthScore: 9,
    //   steps: ["pasos"],
    //   dishTypes: [
    //     "lunch",
    //     "main course",
    //     "main dish",
    //     "dinner"
    //   ],
    //   diets: ["vegan"],
    // },
    // {
    //   id: 4,
    //   name: "Indian-Style Pumpkin Side Dish",
    //   image: "https://spoonacular.com/recipeImages/643775-312x231.jpg",
    //   summary: "summary 4",
    //   score: 8,
    //   healthScore: 9,
    //   steps: ["pasos"],
    //   dishTypes: [
    //     "lunch",
    //     "main course",
    //     "main dish",
    //     "dinner"
    //   ],
    //   diets: ["lacto vegetarian"],
    // },
    // {
    //   id: 5,
    //   name: "Coconut & Pomogranate Ice Cream - Raw and Vegan",
    //   image: "https://spoonacular.com/recipeImages/639708-312x231.jpg",
    //   summary: "summary 5",
    //   score: 3,
    //   healthScore: 9,
    //   steps: ["pasos"],
    //   dishTypes: [
    //     "lunch",
    //     "main course",
    //     "main dish",
    //     "dinner"
    //   ],
    //   diets: ["pescetarian"],
    // },
    // {
    //   id: 6,
    //   name: "Chocolate Whoopie Pies",
    //   image: "https://spoonacular.com/recipeImages/68254-312x231.jpg",
    //   summary: "summary 6",
    //   score: 7,
    //   healthScore: 9,
    //   steps: ["pasos"],
    //   dishTypes: [
    //     "lunch",
    //     "main course",
    //     "main dish",
    //     "dinner"
    //   ],
    //   diets: ["ovo vegetarian"],
    // },
    // {
    //   id: 7,
    //   name: "Vermont Spelt Sourdough",
    //   image: "https://spoonacular.com/recipeImages/664798-312x231.jpg",
    //   summary: "summary 7",
    //   score: 2,
    //   healthScore: 9,
    //   steps: ["pasos"],
    //   dishTypes: [
    //     "lunch",
    //     "main course",
    //     "main dish",
    //     "dinner"
    //   ],
    //   diets: ["paleo"],
    // },
    // {
    //   id: 8,
    //   name: "Plantain Pizza",
    //   image: "https://spoonacular.com/recipeImages/716300-312x231.jpg",
    //   summary: "summary 8",
    //   score: 10,
    //   healthScore: 9,
    //   steps: ["pasos"],
    //   dishTypes: [
    //     "lunch",
    //     "main course",
    //     "main dish",
    //     "dinner"
    //   ],
    //   diets: ["whole30"],
    // },
    // {
    //   id: 9,
    //   name: "Rustic Blueberry Cake Clafoutis",
    //   image: "https://spoonacular.com/recipeImages/658913-312x231.jpg",
    //   summary: "summary 9",
    //   score: 1,
    //   healthScore: 9,
    //   steps: ["pasos"],
    //   dishTypes: [
    //     "lunch",
    //     "main course",
    //     "main dish",
    //     "dinner"
    //   ],
    //   diets: ["primal"],
    // },
    // ]

    // var recipe = []

    // recipes.forEach((data, i) => {
    //   const newId = uuidv4();
    //   Recipe.findOrCreate({
    //     where: {
    //       id: newId,
    //       name: data.name,
    //       summary: data.summary,
    //       score: data.score,
    //       healthScore: data.healthScore,
    //       steps: data.steps,
    //     }
    //   }).then(recipes => {
    //     recipe.push(recipes[0])

    //     let result = data.diets.map(diet => {
    //       return Diet.findOrCreate({
    //         where: {
    //           name: diet,
    //         },
    //         defaults: {
    //           id: newId,
    //           name: diet,
    //         }
    //       }).then(diet => {
    //         return diet
    //       })
    //     })
    //     return result
    //   }).then(diets => {
    //     diets.forEach(e => {
    //       e.then(diet => { 
    //         return diet[0].setRecipes(recipe[i].id)
    //       }).then(diet => {
    //         console.log("created", diet)
    //       })
    //     })
    //   })
    // });

  });
}).catch(err => console.log(err));
