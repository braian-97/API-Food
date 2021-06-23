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

describe('Recipe routes', () => {
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
    it('create a recipe in the database', function (done) {
      newId_2 = uuidv4()

      agent.post('/recipe')
        .send({
          id: newId_2,
          name: 'Milanesa',
          summary: 'Consiste en carne frita en pan rallado, generalmente de vacuno ',
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
      done();
    });

    it('should throw an error if the recipe already exists', function (done) {
      agent.post('/recipe')
        .send({
          id: newId_2,
          name: 'Milanesa',
          summary: 'Consiste en carne frita en pan rallado, generalmente de vacuno '
        })
        .expect(400);
      done();
    });

    it('correctly set the diet in the database', function (done) {
      agent.post('/recipe')
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
      done();
    });
  });


  describe('GET /types', () => {
    it('should get 200', function (done) {
      agent.get('/types')
        .expect(200);
      done();
    })
    it('should get all diets', function (done) {
      agent.get('/types')
        .then(response => {
          const dietsDb = Diet.findAll()

          Promise.all([dietsDb])
            .then(diets => {
              expect(response.body.length).to.equal(diets[0].length);
            })
        })
      done();
    })
  });


  describe("GET /recipes?name=", () => {
    it('should get 200 if if the recipe is found', function (done) {
      agent.get(`/recipes?name=milanesa`)
        .expect(200);
      done();
    })
    it('the answer must have the number of recipes that was passed by query', function (done) {
      agent.get("GET /recipes?name=pasta&number=9")
        .then((response) => {
          expect(response.data).to.have.lengthOf(9);
        })       
      done();
    })    
    it('should throw an error 404 if the recipe is not found', function (done) {
      agent.get(`/recipes?name=asdsadss`)
        .expect(404);
      done();
    })
  });


  describe('GET /recipes/:id', () => {
    it('should get 200 if the id is validate', function (done) {
      agent.get(`/recipes/${newId}`)
        .expect(200);
      done();
    })
    it('should throw an error if the id is invalidates', function (done) {
      agent.get(`/recipes/sadasdsadas121213`)
        .expect(404);
      done();
    })
  });


});
