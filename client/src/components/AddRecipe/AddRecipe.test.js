import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { addRecipe } from '../../actions';
import AddRecipeDefault, { AddRecipe } from './AddRecipe';

configure({ adapter: new Adapter() });

describe('<AddRecipe />', () => {

  describe('Estructura', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AddRecipe />);
    })
    it('Renderiza un <form>', () => {
      expect(wrapper.find('form')).toHaveLength(1)
    })

    it('Renderiza un label con el texto igual a "Name"', () => {
      expect(wrapper.find('label').at(0).text()).toEqual('Name');
    })

    it('Renderiza un input con la propiedad "name" igual a "name"', () => {
      expect(wrapper.find('input[name="name"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Summary"', () => {
      expect(wrapper.find('label').at(1).text()).toEqual('Summary');
    })

    it('Renderiza una textarea con la propiedad "name" igual a "summary"', () => {
      expect(wrapper.find('textarea[name="summary"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Image"', () => {
      expect(wrapper.find('label').at(2).text()).toEqual('Image');
    })

    it('Renderiza un input con la propiedad "name" igual a "place"', () => {
      expect(wrapper.find('input[name="image"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Score"', () => {
      expect(wrapper.find('label').at(3).text()).toEqual('Score');
    })

    it('Renderiza un input con la propiedad "name" igual a "score"', () => {
      expect(wrapper.find('input[name="score"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "HealthScore"', () => {
      expect(wrapper.find('label').at(4).text()).toEqual('HealthScore');
    })

    it('Renderiza un input con la propiedad "name" igual a "healthScore"', () => {
      expect(wrapper.find('input[name="healthScore"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Steps"', () => {
      expect(wrapper.find('label').at(5).text()).toEqual('Steps');
    })

    it('Renderiza un input con la propiedad "name" igual a "steps"', () => {
      expect(wrapper.find('textarea[name="steps"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Diets"', () => {
      expect(wrapper.find('label').at(6).text()).toEqual('Diets');
    })

    it('Renderiza un input con la propiedad "name" igual a "diet"', () => {
      expect(wrapper.find('input[name="diet"]')).toHaveLength(1);
    })
  });


  describe('Dispatch to store', () => {
    var wrapper;
    var store;
    beforeEach(() => {
      const middlewares = [thunk]
      const mockStore = configureMockStore(middlewares)

      store = mockStore([], addRecipe);
      store.clearActions();
      wrapper = mount(<AddRecipeDefault store={store} />);
    })

    it('deberia llamar al evento `preventDefault()` para evitar que se refresque la pagina al hacer un submit', () => {
      wrapper = mount(<AddRecipeDefault store={store} />);
      const event = { preventDefault: () => { } }
      jest.spyOn(event, 'preventDefault')
      wrapper.find('form').simulate('submit', event)
      expect(event.preventDefault).toBeCalled()
    })
  });
});