const { Recipe, Diet, conn } = require('../../src/db.js');
const { expect } = require('chai');

xdescribe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators Recipe', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({ name: null })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    });

    describe('summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({ summary : null })
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid summary', () => {
        Recipe.create({ summary: 'Consiste en carne, generalmente de vacuno, cubierta de salsa de tomate, jamón y queso' });
      });
    });

    describe('score', () => {
      it('should work when if score is null', () => {
        Recipe.create({ score : null })
      });
      it('should throw an error if score is not a number', (done) => {
        Recipe.create("")
          .then(() => done(new Error('Requires the score to be a number')))
          .catch(() => done());
      });
      it('should work when its a valid score', () => {
        Recipe.create({ score: 96.6 });
      });
    });

    describe('healthScore', () => {
      it('should work when if healthScore is null', () => {
        Recipe.create( { score: null })
      });
      it('should throw an error if healthScore is not a number', (done) => {
        Recipe.create("")
          .then(() => done(new Error('Requires the healthScore to be a number')))
          .catch(() => done());
      });
      it('should work when its a valid healthScore', () => {
        Recipe.create({ score: 96.6 });
      });
    });

    describe('steps', () => {
      it('should work when if steps is null', () => {
        Recipe.create({ steps : null })
      });
      it('should throw an error if healthScore is not a array', (done) => {
        Recipe.create({ 
          steps : "" })
          .then(() => done(new Error('Requires the steps to be a array')))
          .catch(() => done());
      });
      it('should throw an error if healthScore is not a array', (done) => {
        Recipe.create({ steps : [""] })
          .then(() => done(new Error('Requires the steps to be a array with a json')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Recipe.create({ steps: [{ step: "Paso 1: freir la milanesa"}] });
      });
    });
  });

  describe('Validators Diets', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({ name: null })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Vegetariana' });
      });
    });
  });
});
