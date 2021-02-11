import React from 'react';
import {Switch, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../view/login";
import Dashboard from "../view/dashboard";
import Entregas from "../view/entrega";

export default function Routes() {
    return (
        <Switch>
            <Route exact path={"/login"} component={Login}/>
            <PrivateRoute exact path={"/"} component={Dashboard}/>
            <PrivateRoute path={"/entregas"} component={Entregas}/>
        </Switch>
    );
}