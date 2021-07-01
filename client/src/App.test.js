import App from './App';
import React from 'react';

import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux';

import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import AddRecipe from './components/AddRecipe/AddRecipe';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import LandingPage from './components/LandingPage/LandingPage';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('App', () => {
  let store

  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  beforeEach(() => {
    store = mockStore([]);
  });

  describe('El componente Nav debe renderizar en todas las rutas.', () => {
    it('Debería renderizarse en la ruta "/"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Nav)).toHaveLength(1);
    });
    it('Debería renderizarse en la ruta "/otraRuta"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/otraRuta']}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Nav)).toHaveLength(1);
    });
  });

  describe('Ruta /LandingPage.', () => {
    it('El componente LandingPage debe renderizar solo en la ruta /', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </Provider>
      );

      expect(wrapper.find(Nav)).toHaveLength(1);
      expect(wrapper.find(LandingPage)).toHaveLength(1);
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(RecipeDetail)).toHaveLength(0);
      expect(wrapper.find(AddRecipe)).toHaveLength(0);
    });
  });

  describe('Ruta /Home.', () => {
    it('El componente Home debe renderizar solo en la ruta /home', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/home']}>
            <App />
          </MemoryRouter>
        </Provider>
      );

      expect(wrapper.find(Home)).toHaveLength(1);
      expect(wrapper.find(Nav)).toHaveLength(1);
      expect(wrapper.find(RecipeDetail)).toHaveLength(0);
      expect(wrapper.find(AddRecipe)).toHaveLength(0);
      expect(wrapper.find(LandingPage)).toHaveLength(0);
    });
  });

  describe('Ruta /AddRecipe.', () => {
    it('El componente AddRecipe debe renderizar solo en la ruta /add', () => {
      const container = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/add']}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(container.find(Nav)).toHaveLength(1);
      expect(container.find(Home)).toHaveLength(0);
      expect(container.find(RecipeDetail)).toHaveLength(0);
      expect(container.find(AddRecipe)).toHaveLength(1);
      expect(container.find(LandingPage)).toHaveLength(0);
    });
  });

  describe('Ruta /recipeDetail.', () => {
    it('El componente recipeDetail debe renderizar solo en la ruta /recipe/:id', () => {
      const container = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/recipe/1']}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(container.find(Nav)).toHaveLength(1);
      expect(container.find(LandingPage)).toHaveLength(0);
      expect(container.find(RecipeDetail)).toHaveLength(1);
      expect(container.find(Home)).toHaveLength(0);
      expect(container.find(AddRecipe)).toHaveLength(0);
    });
  });
});
