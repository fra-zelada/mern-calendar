import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'; //para tener las ayudas
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers/fetch';

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);


jest.mock('sweetalert2',()=> ({
    fire: jest.fn()
}))

let token = '';

//para saber con que valores fue invocado el local storage
Storage.prototype.setItem = jest.fn();

describe('Pruebas de las acciones de Auth', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks()
    })

    test('startLogin correcto', async () => {

        
        await store.dispatch(startLogin('francisco@gmail.com', '123456'))

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        }
        )
        
        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        token = localStorage.setItem.mock.calls[0][1];
        //console.log(token)
    })

    test('startLogin incorrecto', async() => {
        
        await store.dispatch(startLogin('francisco@gmail.com', '1234567'))

        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalledWith(`Error`, `Password incorrecto`, `error`)

        await store.dispatch(startLogin('francisco@gmail2.com', '123456'))

        actions = store.getActions();
        expect( Swal.fire ).toHaveBeenCalledWith(`Error`, `Usuario / contraseña incorrectos`, `error`)
    })
    
    test('startRegister correcto', async() => {
        
        fetchModule.fetchSinToken = jest.fn( () => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'testMock',
                    token: 'ASDFASSDF'
                }
            }
        }));

        await store.dispatch( startRegister('test@test.com','123456','test'));

        const action = store.getActions();

        expect (action[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'testMock',
            }
        }
        )

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ASDFASSDF');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    })
    
    test('startChecking correcto ', async() => {
        
        fetchModule.fetchConToken = jest.fn( () => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'testMock',
                    token: 'ASDFASSDF'
                }
            }
        }));

        await store.dispatch(startChecking());
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
                payload: 
                {name: "testMock", 
                uid: "123"}, 
                type: "[auth] Login"})

        expect( localStorage.setItem ).toHaveBeenCalledWith('token','ASDFASSDF')

    })
    


})
