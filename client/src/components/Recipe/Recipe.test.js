import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Recipe from './Recipe';

configure({ adapter: new Adapter() });

describe('<Todo />', () => {
    let wrapper;
    let name;
    let image;
    let diets;
    let id;
    let score;

    beforeEach(() => {
        name = "Milanesa";
        image = "http://imagen.com";
        diets = ["dieta1", "dieta2"];
        id = "1";
        score = "99";
        wrapper = shallow(<Recipe name={name} image={image} diets={diets} id={id} score={score} />)
    })

    describe('Name', () => {
        it('deberia renderizar un "h2" que contenga el "name" que recibe por props', () => {
            expect(wrapper.find('h2').at(0).text()).toEqual('Milanesa');
        });

        it('deberia renderizar un "Link" que contenga el "name" que recibe por props', () => {
            expect(wrapper.find('Link').at(0).text()).toEqual('Milanesa');
        });

        it('el "Link" deberia redireccionar a /recipe/:id', () => {
            expect(wrapper.find('Link').at(0).prop('to')).toEqual('/recipe/1');
        });
    });
    describe('Image', () => {
        it('deberia renderizar un "img" que contenga la "image" que recibe por props', () => {
            expect(wrapper.find('img').at(0).prop('src')).toEqual("http://imagen.com");
        })
    });
    describe('Score', () => {
        it('deberia renderizar un "h2" que contenga el "score" que recibe por props', () => {
            expect(wrapper.find('h2').at(1).text()).toEqual("99");
        });
    });
    describe('Diets', () => {
        it('deberia renderizar un "ol" que contenga las "diets" que recibe por props', () => {
            expect(wrapper.find('ol')).toHaveLength(1);
        })

        it('deberia renderizar un "li" por cada dieta que contenga las "diets"', () => {
            expect(wrapper.find('li')).toHaveLength(2);
        })
    });
});