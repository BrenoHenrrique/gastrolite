import React from "react";
import "./style.css";

export default function FormProdEntregas() {
    return (
        <>
            <form className={"container-form"}>
                <div className={"input-div-id"}>
                    <label>ID</label>
                    <input
                        type={"number"}
                        className={"input-form-id"}
                    />
                </div>
                <div className={"input-div-nome"}>
                    <label>NOME</label>
                    <input
                        type={"text"}
                        className={"input-form-nome"}
                        readOnly={true}
                    />
                </div>
                <div className={"input-div-qtd"}>
                    <label>QTD</label>
                    <input
                        type={"number"}
                        className={"input-form-qtd"}
                    />
                </div>
                <div className={"input-div-valor"}>
                    <label>VALOR</label>
                    <input
                        type={"number"}
                        className={"input-form-valor"}
                        readOnly={true}
                    />
                </div>
            </form>
        </>
    );
}