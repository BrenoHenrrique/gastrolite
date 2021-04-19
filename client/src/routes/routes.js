import React from 'react';
import {Switch, Route, Router} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../view/login";
import Dashboard from "../view/dashboard";
import Cardapio from "../view/cardapio";
import Entregas from "../view/entrega";
import VendaRapida from "../view/venda-rapida";
import Clientes from "../view/clientes";
import Locais from "../view/locais";
import Funcionarios from "../view/funcionarios";

export default function Routes() {
    return (
        <Router history={""}>
            <Switch>
                <Route exact path={"/login"} component={Login}/>
                <PrivateRoute exact path={"/"} component={Dashboard}/>
                <PrivateRoute exact path={"/cardapio"} component={Cardapio}/>
                <PrivateRoute exact path={"/entregas"} component={Entregas}/>
                <PrivateRoute exact path={"/vendaRapida"} component={VendaRapida}/>
                <PrivateRoute exact path={"/clientes"} component={Clientes}/>
                <PrivateRoute exact path={"/locais"} component={Locais}/>
                <PrivateRoute exact path={"/funcionarios"} component={Funcionarios}/>
            </Switch>
        </Router>
    );
}