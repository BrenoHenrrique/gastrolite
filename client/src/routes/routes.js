import React from 'react';
import {Switch, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../view/login";
import Dashboard from "../view/dashboard";
import Cardapio from "../view/cardapio";
import Insumos from "../view/insumos";
import Entregas from "../view/entrega";
import VendaRapida from "../view/venda-rapida";
import Clientes from "../view/clientes";
import Locais from "../view/locais";
import Funcionarios from "../view/funcionarios";

export default function Routes() {
    return (
        <Switch>
            <Route exact path={"/login"} component={Login}/>
            <PrivateRoute exact path={"/"} component={Dashboard}/>
            <PrivateRoute exact path={"/cardapio"} component={Cardapio}/>
            <PrivateRoute exact path={"/insumos"} component={Insumos}/>
            <PrivateRoute exact path={"/entregas"} component={Entregas}/>
            <PrivateRoute exact path={"/vendaRapida"} component={VendaRapida}/>
            <PrivateRoute exact path={"/clientes"} component={Clientes}/>
            <PrivateRoute exact path={"/locais"} component={Locais}/>
            <PrivateRoute exact path={"/funcionarios"} component={Funcionarios}/>
        </Switch>
    );
}