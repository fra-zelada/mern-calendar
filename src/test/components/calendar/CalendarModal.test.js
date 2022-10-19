import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'; //para tener las ayudas
import moment from 'moment';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../../actions/events';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
    ui: {
        modalOpen: true
    },
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola Mundo',
            notes: 'notas',
            start: now.toDate(),
            end: nowPlus1.toDate()
        }
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
    <CalendarModal />
</Provider>)
jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()
}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))



describe('pruebas en CalendarModal', () => {
beforeEach(() => {
    jest.clearAllMocks();
})
    
test('debe de mostrar el modal', () => {
    
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);

})

test('debe de llamar la acción de actualizar y cerrar el modal', () => {
    
    wrapper.find('form').simulate('submit',{
        preventDefault(){}
    });

    expect( eventStartUpdate ).toHaveBeenCalledWith(
        initState.calendar.activeEvent
    );

    expect( eventClearActiveEvent ).toHaveBeenCalled();

})

test('debe de mostrar error si falta el título', () => {
    
    wrapper.find('form').simulate('submit',{
        preventDefault(){}
    });

    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);


})

test('debe de crear un nuevo evento', () => {
  
    const initState = {
        ui: {
            modalOpen: true
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
        <CalendarModal />
    </Provider>)

    wrapper.find('input[name="title"]').simulate('change',{
        target:{
        name: 'title',
        value:  'hola pruebas'
    }
    })

    wrapper.find('form').simulate('submit',{
        preventDefault(){}
    });

    expect( eventStartAddNew ).toHaveBeenCalledWith({
        end: expect.anything(),
        start: expect.anything(),
        title: 'hola pruebas',
        notes: ''
    });

    expect(eventClearActiveEvent).toHaveBeenCalled()

})

test('debe de validar las fechas', () => {
    

    wrapper.find('input[name="title"]').simulate('change',{
        target:{
        name: 'title',
        value:  'hola pruebas'
    }
    })

    const hoy = new Date();

    act( () => {
        wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
    })

    wrapper.find('form').simulate('submit',{
        preventDefault(){}
    });
    
    expect(Swal.fire).toHaveBeenCalledWith("Error", "Fecha fin debe ser mayor a la fecha de inicio", "error")

})


})
