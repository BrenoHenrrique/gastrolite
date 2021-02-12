import React from "react";
import "./style.css";

export default function FormClientEntregas() {
    return (
        <>
            <form className={"formClientEntregas-container-form"}>
                <div className={"formClientEntregas-input-div-nome"}>
                    <label>Nome</label>
                    <input
                        className={"formClientEntregas-input-nome"}
                    />
                </div>
                <div
                    className={"formClientEntregas-input-div-celular"}
                >
                    <label>Celular</label>
                    <input
                        className={"formClientEntregas-input-celular"}
                        type={"number"}
                    />
                </div>
                <div
                    className={"formClientEntregas-input-div-endereco"}
                >
                    <label>Endereço</label>
                    <input
                        className={"formClientEntregas-input-endereco"}
                    />
                </div>
                <div
                    className={"formClientEntregas-input-div-referencia"}
                >
                    <label>Referência</label>
                    <input
                        className={"formClientEntregas-input-referencia"}
                    />
                </div>
            </form>
        </>
    );
}