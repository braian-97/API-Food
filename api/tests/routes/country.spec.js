/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, Diet, conn } = require('../../src/db.js');
const { v4: uuidv4 } = require('uuid');

newId = uuidv4()

const agent = session(app);
const recipe = {
  id: newId,
  name: 'Milanesa Napolitana',
  summary: 'Consiste en carne, generalmente de vacuno, cubierta de salsa de tomate, jamón y queso',
  diet: ["Nueva dieta"],
};

xdescribe('Recipe routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));


  describe('GET /home', () => {
    it('should get 200', function () {
      agent.get('/home').expect(200)
    });
  });


  describe('POST /recipe', () => {
    it('create a recipe in the database', function () {
      newId_2 = uuidv4()

      return agent.post('/recipe')
        .send({
          id: newId_2,
          name: 'Milanesa',
          summary: 'Consiste en carne frita en pan rallado, generalmente de vacuno ',
          diet: ["vegetarian"],
        })
        .then(() => {
          return Recipe.findOne({
            where: {
              name: 'Milanesa',
            }
          });
        })
        .then(recipe => {
          expect(recipe).to.exist;
        });
    });
    it('should throw an error if the recipe already exists', function () {
      return agent.post('/recipe')
        .send({
          id: newId_2,
          name: 'Milanesa',
          summary: 'Consiste en carne frita en pan rallado, generalmente de vacuno '
        })
        .expect(400)
    });
    it('correctly set the diet in the database', function () {
      return agent.post('/recipe')
        .send({
          id: uuidv4(),
          name: 'Papas fritas',
          summary: 'Consiste en papas cortadsa en rodajas y freidas',
          diet: ["vegetarian"],
        })
        .then(() => {
          return Recipe.findOne({
            where: {
              name: 'Papas fritas',
            },
            include: {
              model: Diet
            }
          });
        })
        .then(recipe => {
          expect(recipe.diets[0].dataValues.name).to.equal('vegetarian');
        });
    });
  });


  describe('GET /types', () => {
    it('should get 200', function () {
      return agent.get('/types')
        .expect(200)
    })
    it('should get all diets', function () {
      return agent.get('/types')
        .then(response => {
          const dietsDb = Diet.findAll()

          Promise.all([dietsDb])
            .then(diets => {
              expect(response.body.length).to.equal(diets[0].length);
            })
        })
    })
  });


  describe("GET /recipes?name=", () => {
    it('should get 200 if the name is validate', function () {
      return agent.get(`/recipes?name=pasta`)
        .expect(200)
    })
    it('should throw an error if the name is invalidates', function () {
      return agent.get(`/recipes?name=asdsads`)
        .expect(404)
    })
    it('should get 402 if the daily points limit of 150 has been reached', function () {
      return agent.get(`/recipes?name=pasta`)
        .expect(402)
    })
  });


  describe('GET /recipes/:id', () => {
    it('should get 200 if the id is validate', function () {
      return agent.get(`/recipes/${newId}`)
        .expect(200)
    })
    it('should throw an error if the id is invalidates', function () {
      return agent.get(`/recipes/sadasdsadas121213`)
        .expect(404)
    })
  });


});
