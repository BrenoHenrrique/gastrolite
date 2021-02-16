import React from "react";
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
                <input
                    type={"number"}
                    className={"formProdEntregas-input-form-id"}
                />
            </div>
            <div className={"formProdEntregas-input-div-nome"}>
                <label>NOME</label>
                <input
                    type={"text"}
                    className={"formProdEntregas-input-form-nome"}
                    readOnly={true}
                    tabIndex={-1}
                />
            </div>
            <div className={"formProdEntregas-input-div-qtd"}>
                <label>QTD</label>
                <input
                    type={"number"}
                    className={"formProdEntregas-input-form-qtd"}
                />
            </div>
            <div className={"formProdEntregas-input-div-valor"}>
                <label>VALOR</label>
                <input
                    type={"number"}
                    className={"formProdEntregas-input-form-valor"}
                    readOnly={true}
                    tabIndex={-1}
                />
            </div>
            <div className={"formProdEntregas-container-submit"}>
                <button>FINALIZAR</button>
            </div>
        </form>
    );
}