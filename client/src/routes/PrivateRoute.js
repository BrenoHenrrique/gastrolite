import {Redirect, Route} from "react-router-dom";
import {isAuthenticated} from "../service/auth";
import React from "react";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => isAuthenticated() ? (<Component {...props}/>)
                : <Redirect to={{pathname: "/login", state: {from: props.location}}}/>}
        />
    );
}

export default PrivateRoute;