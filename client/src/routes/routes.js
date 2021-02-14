import React from 'react';
import {Switch, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../view/login";
import Dashboard from "../view/dashboard";
import CardapioLista from "../view/cardapio/lista";
import Entregas from "../view/entrega";

export default function Routes() {
    return (
        <Switch>
            <Route exact path={"/login"} component={Login}/>
            <PrivateRoute exact path={"/"} component={Dashboard}/>
            <PrivateRoute exact path={"/cardapio"} component={CardapioLista}/>
            <PrivateRoute path={"/entregas"} component={Entregas}/>
            <PrivateRoute path={"/vendaRapida"} component={Entregas}/>
            <PrivateRoute path={"/clientes"} component={Entregas}/>
        </Switch>
    );
}