import React from 'react'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { startChecking } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth)


    useEffect(() => {
        
        dispatch(startChecking())
        
    }, [dispatch])




    if ( checking )
    {
        return <h5>Espere...</h5>
    }
    else
{
    return (
        // <Router>
        //     <div>
        //         <Switch>
        //             <Route exact path="/login">
        //                 <LoginScreen />
        //             </Route>
        //             <Route path="/Calendar">
        //                 <CalendarScreen />
        //             </Route>
        //             <Redirect
        //                 to="/login"
        //             />
        //         </Switch>
        //     </div>
        // </Router>

        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact
                        path="/login"
                        isAuthenticated={ !!uid } 
                        component={ LoginScreen }
                    />
                    <PrivateRoute 
                        exact
                        path="/"
                        isAuthenticated={ !!uid } 
                        component={ CalendarScreen }
                    />
                    {/* <Route exact path="/login" component={LoginScreen} />
                    <Route exact path="/" component={CalendarScreen} /> */}
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
}
