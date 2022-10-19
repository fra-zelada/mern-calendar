const { types } = require("../../types/types")



describe('Pruebas en types', () => {

    test('los types deben de ser iguales', () => {
        

        expect( types ).toEqual({

            uiOpenModal: '[ui] Open Modal',
            uiCloseModal: '[ui] Close Modal',
        
            eventSetActive: '[event] Set Active',
            eventLogout: '[event] Logout event',
            eventStartAddNew: '[event] Start Add New',
            eventAddNew: '[event] Add New',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdated: '[event] Event updated',
            eventDeleted: '[event] Event deleted',
            eventLoaded: '[event] Events Loaded',
        
            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start Login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start Register',
            authStartStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout',
        
        })


    })
    

})
