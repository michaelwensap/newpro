import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Auth } from '../utils/'
export default function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                // const currentCustomer = localStorage.getItem('customer');
                // if(props.location.pathname === '/admin'){
                //
                // }
                if (Auth.isAuthenticated()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{ pathname: '/' }} />
                }
            }}
        />
    )
}
