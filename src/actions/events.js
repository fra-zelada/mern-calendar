import Swal from "sweetalert2";
import { fetchConToken } from "../components/helpers/fetch";
import { prepareEvents } from "../components/helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = ( event ) => {
    return async( dispatch, getState ) => {
        try {

            const { uid, name } = getState().auth;

            const resp = await fetchConToken('events', event, 'POST')
            const body = await resp.json();

            if ( body.ok ) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name
                }
                console.log( event );
                dispatch( eventAddNew( event ))
            }

        } catch (error) {
            console.log(error);
            Swal.fire('Error','Error al guardar el evento','error')
        }
        


    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
})

export const eventStartUpdate = ( event ) => {
    return async( dispatch ) => {

        try {
            //console.log( event )
            const resp = await fetchConToken(`events/${ event.id }`, event ,'PUT')
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventUpdated( event ))
            }
            else
            {
                Swal.fire('Error', `No se pudo actualizar evento. ${ body.msg }` , 'error')
            }

        } catch (error) {
            Swal.fire('Error', `Error al actualizar evento` , 'error')
            console.log(error)

        }

    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
})

export const eventStartDelete = () => {
    return async ( dispatch, getState ) => {
        try {
            const {id} = getState().calendar.activeEvent;
            //console.log( event )
            const resp = await fetchConToken(`events/${ id }`, {} ,'DELETE')
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventDeleted())
            }
            else
            {
                Swal.fire('Error', `No se pudo eliminar evento. ${ body.msg }` , 'error')
            }

        } catch (error) {
            Swal.fire('Error', `Error al eliminar evento` , 'error')
            console.log(error)

        }
    }
}

 const eventDeleted = () => ({
    type: types.eventDeleted
    
})

export const eventStartLoading = () => {
    return async( dispatch ) => {

        try {
        
            const resp = fetchConToken('events');
            const body = await (await resp).json()
            
            const events = prepareEvents( body.eventos );
            dispatch( eventLoaded( events ));


        } catch (error) {

            console.log(error)
            Swal.fire('Error', 'Error al cargar eventos', 'error')
        }
        

    }
}

const eventLoaded = ( events ) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventLogout = () => (
    { type: types.eventLogout}
)