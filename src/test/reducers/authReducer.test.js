const { authReducer } = require("../../reducers/authReducer")
const { types } = require("../../types/types")



const initialState = {
    checking: true
}

describe('Pruebas en authReducerd', () => {
    

    test('debe retornar estado por defecto ', () => {
        
        const action = {}
        const state = authReducer(initialState, action)
        expect(state).toEqual(initialState)

    })
    
    test('debe de autenticar el usuario', () => {

        const action = {
            type: types.authLogin,
            payload: {
                uid:'1213232',
                name:'Prueba'
                }
            }
        const state = authReducer(initialState, action)
        expect(state).toEqual( { checking: false, uid: '1213232', name: 'Prueba' })
        
    })
    

})
