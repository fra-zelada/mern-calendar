import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'; //para tener las ayudas
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/events';

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
<Provider store={store}>
    <DeleteEventFab />
</Provider>)

jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn()
}))

describe('Pruebas en DeleteEventFab', () => {
    

    test('debe mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();

        wrapper.find('.btn').simulate('click')

        const action = store.getActions();
        expect(store.dispatch).toHaveBeenCalled()

    })
    
    test('debe de llamar el eventStartDelete al hacer click', () => {
        
        wrapper.find('.btn').simulate('click')

        //const action = store.getActions();
        expect(store.dispatch).toHaveBeenCalled();
        expect(eventStartDelete).toHaveBeenCalled();

    })
    


})
