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

    //PRE-LOADED DIETS
    const diets = ["gluten free", "ketogenic", "vegetarian", "lacto vegetarian", "ovo vegetarian", "vegan", "pescetarian", "paleo", "primal", "whole 30"]
  
    diets.forEach( diet => {
      const newId = uuidv4();
      Diet.create({ 
        id: newId,
        name: diet,
      })
      .then( r => console.log("dietas precargadas"))
      .catch(err => console.log(err));
    })

    //PRE-LOADED RECIPES
    const recipes = [
      {
        title: "Pasta With Italian Sausage",
        image: "https://spoonacular.com/recipeImages/654928-312x231.jpg",
        summary: "The recipe Pasta With Italian Sausage could satisfy your Mediterranean craving in about <b>45 minutes</b>. This recipe serves 4 and costs $2.33 per serving. Watching your figure? This dairy free recipe has <b>832 calories</b>, <b>29g of protein</b>, and <b>44g of fat</b> per serving. This recipe is liked by 1 foodies and cooks. If you have parmesean cheese, basil, sausage, and a few other ingredients on hand, you can make it. To use up the onion you could follow this main course with the <a href=\"https://spoonacular.com/recipes/candy-corn-cupcakes-63881\">Candy Corn Cupcakes</a> as a dessert. Not a lot of people really liked this main course. All things considered, we decided this recipe <b>deserves a spoonacular score of 74%</b>. This score is good. Try <a href=\"https://spoonacular.com/recipes/italian-sausage-and-pasta-557995\">Italian Sausage and Pasta</a>, <a href=\"https://spoonacular.com/recipes/italian-sausage-pasta-pot-215729\">Italian sausage & pasta pot</a>, and <a href=\"https://spoonacular.com/recipes/italian-sausage-pasta-272903\">Italian Sausage Pasta</a> for similar recipes.",
        spoonacularScore: 95.0,
        healthScore: 93.0,
        dishTypes: [
          "lunch",
          "main course",
          "main dish",
          "dinner"
        ],
        steps: ["Crumble sausage into a large skillet. Cook over medium heat, stirring often, until meat is well browned."],
        diets: [
          "dairy free",
          "pescatarian"
        ],
      },
      {
        title: "Pasta With Gorgonzola Sauce",
        image: "https://spoonacular.com/recipeImages/654926-312x231.jpg",
        summary: "Pasta With Gorgonzola Sauce might be just the side dish you are searching for. This recipe makes 8 servings with <b>379 calories</b>, <b>11g of protein</b>, and <b>25g of fat</b> each. For <b>68 cents per serving</b>, this recipe <b>covers 8%</b> of your daily requirements of vitamins and minerals. Only a few people made this recipe, and 1 would say it hit the spot. From preparation to the plate, this recipe takes around <b>45 minutes</b>. A mixture of cup whipping cream, pkt pasta, half and half, and a handful of other ingredients are all it takes to make this recipe so scrumptious. All things considered, we decided this recipe <b>deserves a spoonacular score of 25%</b>. This score is not so awesome. Try <a href=\"https://spoonacular.com/recipes/chocolate-pasta-with-gorgonzola-cream-sauce-and-10-romantic-pasta-dishes-532706\">Chocolate Pasta with Gorgonzola Cream Sauce and 10 Romantic Pasta Dishes</a>, <a href=\"https://spoonacular.com/recipes/pasta-with-kale-and-gorgonzola-sauce-594400\">Pasta with Kale and Gorgonzola Sauce</a>, and <a href=\"https://spoonacular.com/recipes/tagliatelle-pasta-with-asparagus-and-gorgonzola-sauce-162657\">Tagliatelle Pasta with Asparagus and Gorgonzola Sauce</a> for similar recipes.",
        spoonacularScore: 98.0,
        healthScore: 97.0,
        dishTypes: [
          "dinner"
        ],
        steps: ["In an enamel saucepan, melt the butter over low heat, add the Gorgonzola cheese, Half and Half, and salt. Mash the Gorgonzola with a wooden spoon and stir to mix over a low flame. Cook about 1 minute until sauce becomes thick and creamy. In the meantime, cook the pasta according to the package directions and drain. Just before fettuccini is done, stir the whipping cream into the cheese sauce over a low flame."],
        diets: [
          "pescatarian"
        ],
      },
      {
        title: "Pasta With Salmon Cream Sauce",
        image: "https://spoonacular.com/recipeImages/654944-312x231.jpg",
        summary: "Pasta With Salmon Cream Sauce is a <b>pescatarian</b> main course. This recipe makes 4 servings with <b>439 calories</b>, <b>23g of protein</b>, and <b>15g of fat</b> each. For <b>$1.6 per serving</b>, this recipe <b>covers 23%</b> of your daily requirements of vitamins and minerals. 3 people have made this recipe and would make it again. If you have onion, parsley, milk, and a few other ingredients on hand, you can make it. To use up the milk you could follow this main course with the <a href=\"https://spoonacular.com/recipes/milky-way-brownie-bites-540544\">Milky Way Brownie Bites</a> as a dessert. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 69%</b>. This score is pretty good. Try <a href=\"https://spoonacular.com/recipes/spinach-pasta-with-salmon-and-cream-sauce-86877\">Spinach Pasta with Salmon and Cream Sauce</a>, <a href=\"https://spoonacular.com/recipes/artisan-farfalle-pasta-with-smoked-salmon-and-cream-sauce-632778\">Artisan Farfalle Pasta With Smoked Salmon and Cream Sauce</a>, and <a href=\"https://spoonacular.com/recipes/chocolate-pasta-with-gorgonzola-cream-sauce-and-10-romantic-pasta-dishes-532706\">Chocolate Pasta with Gorgonzola Cream Sauce and 10 Romantic Pasta Dishes</a> for similar recipes.",
        spoonacularScore: 97.0,
        healthScore: 98.0,
        dishTypes: [
          "main course",
        ],
        steps: ["Calories per serving: 300 In large pot of boiling water, cook pasta al dente (tender but firm) about 10 12 minutes."],
        diets: [
          "vegetarian"
        ],
      },
      {
        title: "Pasta With Chickpeas and Kale",
        image: "https://spoonacular.com/recipeImages/654905-312x231.jpg",
        summary: "Pasta With Chickpeas and Kale might be just the main course you are searching for. One serving contains <b>655 calories</b>, <b>27g of protein</b>, and <b>9g of fat</b>. For <b>$1.43 per serving</b>, this recipe <b>covers 43%</b> of your daily requirements of vitamins and minerals. This recipe from Foodista has 1 fans. It is a good option if you're following a <b>dairy free</b> diet. From preparation to the plate, this recipe takes around <b>45 minutes</b>. A mixture of bell pepper, ziti, kale, and a handful of other ingredients are all it takes to make this recipe so flavorful. To use up the salt and pepper you could follow this main course with the <a href=\"https://spoonacular.com/recipes/dr-pepper-cake-with-flour-cooked-frosting-539165\">Dr. Pepper Cake with Flour Cooked Frosting</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 93%</b>. This score is spectacular. Similar recipes include <a href=\"https://spoonacular.com/recipes/curried-chickpeas-and-kale-158454\">Curried Chickpeas and Kale</a>, <a href=\"https://spoonacular.com/recipes/creamed-kale-with-chickpeas-608963\">Creamed kale with chickpeas</a>, and <a href=\"https://spoonacular.com/recipes/sauted-chickpeas-with-ham-and-kale-15237\">Sautéed Chickpeas with Ham and Kale</a>.",
        spoonacularScore: 99.0,
        healthScore: 96.0,
        dishTypes: [
          "lunch",
          "dinner"
        ],
        steps: ["Set a large pot of water to boil, and add salt."],
        diets: [
          "paleo"
        ],
      },
      {
        title: "Pasta With Chicken and Broccoli",
        summary: "Pasta With Chicken and Broccoli might be a good recipe to expand your main course repertoire. This recipe makes 4 servings with <b>332 calories</b>, <b>19g of protein</b>, and <b>18g of fat</b> each. For <b>$1.46 per serving</b>, this recipe <b>covers 16%</b> of your daily requirements of vitamins and minerals. 3 people found this recipe to be flavorful and satisfying. A mixture of wine, parmesan cheese, basil leaves, and a handful of other ingredients are all it takes to make this recipe so yummy. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 55%</b>, which is solid. Similar recipes are <a href=\"https://spoonacular.com/recipes/pasta-house-pasta-con-broccoli-this-is-an-alfredo-based-sauce-that-combines-pasta-fresh-mushrooms-and-fresh-broccoli-601199\">Pasta House Pasta con Broccoli – This is an Alfredo based sauce that combines pasta, fresh mushrooms, and fresh broccoli</a>, <a href=\"https://spoonacular.com/recipes/broccoli-and-pasta-with-chicken-479320\">Broccoli and Pasta with Chicken</a>, and <a href=\"https://spoonacular.com/recipes/pasta-with-chicken-and-broccoli-110475\">Pasta With Chicken and Broccoli</a>.",
        image: "https://spoonacular.com/recipeImages/654901-312x231.jpg",
        spoonacularScore: 99.0,
        healthScore: 99.0,
        dishTypes: [
          "main course",
          "main dish",
          "dinner"
        ],
        steps: ["In a large skillet, heat oil over medium heat."],
        diets: ["vegan"],
      }
    ]

    recipes.forEach( recipe => {
      const newId = uuidv4();
      const {title, summary, image, spoonacularScore, dishTypes, steps, diets} = recipe

      var newRecipe;
      Recipe.findOrCreate({
        where: {
          id: newId,
          name: title,
          summary: summary,
          image: image,
          score: spoonacularScore,
          dishTypes: dishTypes,           
          steps: steps,
        }        
    }).then(recipes => {
        newRecipe = recipes[0]

        if(diets[0]){
        let result = diets.map(diet => {
            if (diet) {
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
    }).then(diet => {
            if(diet && diet[0]){
            diet.forEach(e => {
                e.then(diet => {
                    return diet[0].setRecipes(newRecipe.id)
                }).then(diet => {
                    if (diet) {                                
                      console.log("new diet set")
                    }
                })
            })
          }
        })
      .then( r => console.log("pre-loaded recipes "))
      .catch(err => console.log(err));
    })
  })
  .catch(err => console.log(err));
})
.catch(err => console.log(err));
