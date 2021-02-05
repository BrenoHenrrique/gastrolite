import React from 'react';
import {Switch, Route} from "react-router-dom";

import Login from "../view/login";
import Dashboard from "../view/dashboard";

export default function Routes() {
    return (
        <Switch>
            <Route path={"/login"} component={Login} />
            <Route path={"/"} component={Dashboard} />
        </Switch>
    );
}