import React from "react";
import {Button, Input} from "antd";
import "./style.css";

export default function FormProdEntregas() {
    return (
        <form
            className={"formProdEntregas-container-form"}
            method={"post"}
            onSubmit={{}}
        >
            <div className={"formProdEntregas-input-div-id"}>
                <label>CÓDIGO</label>
                <Input
                    type={"number"}
                    className={"formProdEntregas-input-form-id"}
                />
            </div>
            <div className={"formProdEntregas-input-div-nome"}>
                <label>NOME</label>
                <Input
                    type={"text"}
                    className={"formProdEntregas-input-form-nome"}
                    readOnly={true}
                    tabIndex={-1}
                />
            </div>
            <div className={"formProdEntregas-input-div-qtd"}>
                <label>QTD</label>
                <Input
                    type={"number"}
                    className={"formProdEntregas-input-form-qtd"}
                />
            </div>
            <div className={"formProdEntregas-input-div-valor"}>
                <label>VALOR</label>
                <Input
                    type={"number"}
                    className={"formProdEntregas-input-form-valor"}
                    readOnly={true}
                    tabIndex={-1}
                />
            </div>
            <div className={"formProdEntregas-container-submit"}>
                <Button
                    type={"primary"}
                >FINALIZAR</Button>
            </div>
        </form>
    );
}