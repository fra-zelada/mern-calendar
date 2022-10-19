import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'; //para tener las ayudas
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';

jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))




const middlewares = [thunk]
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
<Provider store={store}>
    <LoginScreen />
</Provider>)





describe('Pruebas en <LoginScreen/>', () => {
    

test('debe mostrarse correctamente', () => {
    
    expect(wrapper).toMatchSnapshot()

})


test('debe de llamar el dispatch del login', () => {
    
    wrapper.find('input[name="lEmail"]').simulate('change',{
        target: {
            name: 'lEmail',
            value: 'test@gmail.com'
        }
    });

    wrapper.find('input[name="lPassword"]').simulate('change',{
        target: {
            name: 'lPassword',
            value: '123456'
        }
    });

    wrapper.find('form').at(0).prop('onSubmit')({
        preventDefault(){}
    })

    expect( startLogin ).toHaveBeenCalledWith( "test@gmail.com", "123456")

})

test('no hay registro si las contraseñas son diferentes', () => {
    
    wrapper.find('input[name="rName"]').simulate('change',{
        target: {
            name: 'rName',
            value: 'prueba'
        }
    });

    wrapper.find('input[name="rEmail"]').simulate('change',{
        target: {
            name: 'rEmail',
            value: 'prueba@gmail.com'
        }
    });

    wrapper.find('input[name="rPassword1"]').simulate('change',{
        target: {
            name: 'rPassword1',
            value: 'prueba'
        }
    });

    wrapper.find('input[name="rPassword2"]').simulate('change',{
        target: {
            name: 'rPassword2',
            value: 'prueba2'
        }
    });

    wrapper.find('form').at(1).prop('onSubmit')({
        preventDefault(){}
    })

    expect( startRegister ).not.toHaveBeenCalled()
    expect( Swal.fire ).toHaveBeenCalledWith( "Error", "Contraseñas no coinciden", "error")
    

})


test('debe de llamarse el registro si las contraseñas son iguales', () => {
    
    wrapper.find('input[name="rName"]').simulate('change',{
        target: {
            name: 'rName',
            value: 'prueba'
        }
    });

    wrapper.find('input[name="rEmail"]').simulate('change',{
        target: {
            name: 'rEmail',
            value: 'prueba@gmail.com'
        }
    });

    wrapper.find('input[name="rPassword1"]').simulate('change',{
        target: {
            name: 'rPassword1',
            value: 'prueba'
        }
    });

    wrapper.find('input[name="rPassword2"]').simulate('change',{
        target: {
            name: 'rPassword2',
            value: 'prueba'
        }
    });

    wrapper.find('form').at(1).prop('onSubmit')({
        preventDefault(){}
    })

    expect( startRegister ).toHaveBeenCalledWith( "prueba@gmail.com", "prueba", "prueba")
    expect( Swal.fire ).not.toHaveBeenCalled()
    

})


})
