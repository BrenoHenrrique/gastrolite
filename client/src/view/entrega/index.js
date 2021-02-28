import React from "react";
import FormProdEntregas from "./inputs-produto";
import FormClientEntregas from "./inputs-cliente";
import "./style.css";
import TableCompra from "../../component/table-compra";

export default function Entregas() {

    const columns = ["CODIGO", "ITEM", "QUANTIDADE", "VALOR UNIDADE", "VALOR SOMA"]
    const itens = []

    return (
        <main className={"entregas-container-principal"}>
            <h2 className={"title-screen"}>Entregas</h2>
            <div className={"entregas-div-superior"}>
                <label>Total</label>
                <p>R$ 171,20</p>
            </div>
            <div className={"entregas-container-produto"}>
                <FormProdEntregas/>
            </div>
            <div className={"entregas-container-cliente"}>
                <div className={"entregas-div-table"}>
                    <TableCompra
                        columns={columns}
                        itens={itens}
                    />
                </div>
                <FormClientEntregas/>
            </div>
        </main>
    )
}