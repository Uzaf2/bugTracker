import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute ({ component: Component, ...rest}){

        //const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('jwtToken');
        //const isAuthenticated = null;
        console.log("Is authenticated", isAuthenticated);
        return isAuthenticated ? (
            <Route 
        {...rest}
        render={(props) =>
             <Component  {...props}/>
        }
        />

        ) : (
            <Redirect to={{ pathname: '/' }} />
        );
}

export default ProtectedRoute;