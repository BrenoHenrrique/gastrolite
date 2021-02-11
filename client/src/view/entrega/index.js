import React from "react";
import FormProdEntregas from "./inputsProduto";
import "./style.css";

export default function Entregas() {
    return(
        <main className={"container-principal"}>
            <div className={"container-top"}>
                <FormProdEntregas/>
            </div>
        </main>
    )
}