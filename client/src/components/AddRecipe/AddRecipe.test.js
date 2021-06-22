import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { addRecipe } from '../../actions';
import AddRecipeDefault, { AddRecipe } from './AddRecipe.js';

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
  })


  xdescribe('Manejo de inputs con estado', () => {
    let wrapper, useState, useStateSpy;
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, 'useState')
      useStateSpy.mockImplementation((init) => [init, useState]);
      wrapper = shallow(<AddRecipe />)     

    });


    xdescribe("Name input", () => {

      it('El form deberia cambiar de estado cuando escriban en el input de Name', () => {
        wrapper.find('input[name="name"]').simulate('change', { target: { name: 'name', value: 'Milanesa' } });
        expect(useState).toHaveBeenCalledWith({ "name": "Milanesa" });
      });
    });

    xdescribe("Summary input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "summary"', () => {
        wrapper.find('textarea[name="summary"]').simulate('change', { target: { name: 'summary', value: 'carne' } });
        expect(useState).toHaveBeenCalledWith({ "name": "", "summary": "carne", "image": "", "score": "", "healthScore": "", "steps": "", "diet": [] });
      });
    });

    xdescribe("Image input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "place"', () => {
        wrapper.find('input[name="image"]').simulate('change', { target: { name: 'image', value: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-x2HM8arF4SUAWWI76kvuDEeuGlC6dARTA&usqp=CAU' } });
        expect(useState).toHaveBeenCalledWith({ "name": "", "summary": "", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-x2HM8arF4SUAWWI76kvuDEeuGlC6dARTA&usqp=CAU", "score": "", "healthScore": "", "steps": "", "diet": [] });
      });
    });

    xdescribe("Score input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "score"', () => {
        wrapper.find('input[name="score"]').simulate('change', { target: { name: 'score', value: 90 } });
        expect(useState).toHaveBeenCalledWith({ "name": "", "summary": "", "image": "", "score": 90, "healthScore": "", "steps": "", "diet": [] });
      });
    });

    xdescribe("HealthScore input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "score"', () => {
        wrapper.find('input[name="healthScore"]').simulate('change', { target: { name: 'healthScore', value: 95 } });
        expect(useState).toHaveBeenCalledWith({ "name": "", "summary": "", "image": "", "score": "", "healthScore": "95", "steps": "", "diet": [] });
      });
    });

    xdescribe("Steps input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "score"', () => {
        wrapper.find('textarea[name="steps"]').simulate('change', { target: { name: 'steps', value: "1 paso: saber cocinar" } });
        expect(useState).toHaveBeenCalledWith({ "name": "", "summary": "", "image": "", "score": "", "healthScore": "", "steps": "1 paso: saber cocinar", "diet": [] });
      });
    });

    xdescribe("Diet input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "score"', () => {
        wrapper.find('input[name="diet"]').simulate('change', { target: { name: 'diet', value: ["nueva dieta"] } });
        expect(useState).toHaveBeenCalledWith({ "name": "", "summary": "", "image": "", "score": "", "healthScore": "", "steps": "", "diet": ["nueva dieta"] });
      });
    });
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

    it('deberia hacer un dispatch al store de la action "AddRecipe" con los datos del state cuando se hace un Submit', () => {
      wrapper = mount(<AddRecipeDefault store={store} />);

      wrapper.find('button[name="enviar"]').simulate('submit', { preventDefault() { } });
      const expectedAction = [{
        payload: {
          name: "nombre",
          summary: "",
          image: "",
          score: "",
          healthScore: "",
          steps: "",
          diet: [],
        },
        type: 'ADD_RECIPE'
      }]
      expect(store.getActions()).toEqual(expectedAction);

    });

    it('deberia llamar al evento `preventDefault()` para evitar que se refresque la pagina al hacer un submit', () => {
      wrapper = mount(<AddRecipeDefault store={store} />);
      const event = { preventDefault: () => { } }
      jest.spyOn(event, 'preventDefault')
      wrapper.find('form').simulate('submit', event)
      expect(event.preventDefault).toBeCalled()
    })
  });
});