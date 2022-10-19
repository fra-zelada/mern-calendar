import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'; //para tener las ayudas
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages';
import { eventSetActive } from '../../../actions/events';
import { act } from '@testing-library/react';

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

const initState = {
    ui: {
        modalOpen: false
    },
    calendar: {
        events: [],
        activeEvent: null
    },
    auth: {
        checking: false,
        uid: '6138118ccdb811e95293754c',
        name: 'Francisco'
    }
};
const store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
<Provider store={store}>
    <CalendarScreen />
</Provider>)

jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}))

Storage.prototype.setItem = jest.fn();


describe('Pruebas en <CalendarScreen/>', () => {
    
    test('debe de mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();

    })

    test('pruebas con las interacciones del calendario', () => {
        
        const calendar = wrapper.find('Calendar');
        
        const calendarMessages = calendar.prop('messages')

        expect ( calendarMessages ).toEqual(messages)

        calendar.prop('onDoubleClickEvent')();
        expect( store.dispatch ).toHaveBeenCalledWith({"type": "[ui] Open Modal"})

        calendar.prop('onSelectEvent')({start: 'hola'});
        expect(eventSetActive).toHaveBeenCalledWith( {"start": "hola"})

        act(() => {
        calendar.prop('onView')('week');
        expect( localStorage.setItem ).toHaveBeenCalledWith( "lastView", "week")

        })
        

    })
    

})
