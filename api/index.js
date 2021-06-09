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
const { conn, Recipe } = require('./src/db.js');
const { v4: uuidv4 } = require('uuid');
const newId = uuidv4();
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
      
    Recipe.create(
      {
          id: newId,
          name: "title",
          summary: " summary",
          score: 98.0,
          healthScore: 99.0,
          steps: [
              {
                  "name": "",
                  "steps": [
                      {
                          "number": 1,
                          "step": "Preheat broiler.",
                          "ingredients": [

                          ],
                          "equipment": [
                              {
                                  "id": 405914,
                                  "name": "broiler",
                                  "localizedName": "broiler",
                                  "image": "oven.jpg"
                              }
                          ]
                      }]
              }]
      }).then(res => { console.log("Precargado") });
 
  });
}).catch(err => console.log(err));
