import React from "react";
import {Input} from "antd";
import "./style.css";

export default function FormClientEntregas() {
    return (
        <form
            className={"formClientEntregas-container-form"}
            method={"post"}
            onSubmit={{}}
        >
            <div className={"formClientEntregas-input-div-nome"}>
                <label>Nome</label>
                <Input
                    className={"formClientEntregas-input-nome"}
                />
            </div>
            <div
                className={"formClientEntregas-input-div-celular"}
            >
                <label>Celular</label>
                <Input
                    className={"formClientEntregas-input-celular"}
                    type={"number"}
                />
            </div>
            <div
                className={"formClientEntregas-input-div-endereco"}
            >
                <label>Endereço</label>
                <Input
                    className={"formClientEntregas-input-endereco"}
                />
            </div>
            <div
                className={"formClientEntregas-input-div-referencia"}
            >
                <label>Referência</label>
                <Input
                    className={"formClientEntregas-input-referencia"}
                />
            </div>
        </form>
    );
}