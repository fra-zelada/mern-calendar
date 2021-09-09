import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    return (
        <Route
            {...rest}
            component={(props) =>
            (
                // si está logeado, lo redirigimos a las pantallas de autenticado, si no, desplegamos componente recibido por parámetros
                (isAuthenticated) 
                    ? (<Redirect to="/" />)
                    : (<Component {...props} />)
                     
            )

            }

        />
    )
}

PublicRoute.propTypes =
{
    isAuthenticated: PropTypes.bool.isRequired,
    component:  PropTypes.func.isRequired
}