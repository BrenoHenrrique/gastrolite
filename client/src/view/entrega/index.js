import React from "react";
import FormProdEntregas from "./inputsProduto";
import FormClientEntregas from "./inputsCliente";
import "./style.css";
import TableCompra from "../../component/table-compra";

export default function Entregas() {

    const columns = ["CODIGO", "ITEM", "QTD.", "VALOR UN.", "VALOR QTD."]
    const itens = [
        {
            id: "123456789",
            nome: "ARROZ NAMORADO",
            qtd: "3",
            valorUni: "4,60",
            valorQtd: "13,80"
        },
        {
            id: "234567891",
            nome: "FEIJÃO PAI JOÃO",
            qtd: "4",
            valorUni: "5,10",
            valorQtd: "20,40"
        },
        {
            id: "345678912",
            nome: "AÇUCAR ESTRELA",
            qtd: "2",
            valorUni: "4,30",
            valorQtd: "8,60"
        },
        {
            id: "123456789",
            nome: "ARROZ NAMORADO",
            qtd: "3",
            valorUni: "4,60",
            valorQtd: "13,80"
        },
        {
            id: "234567891",
            nome: "FEIJÃO PAI JOÃO",
            qtd: "4",
            valorUni: "5,10",
            valorQtd: "20,40"
        },
        {
            id: "345678912",
            nome: "AÇUCAR ESTRELA",
            qtd: "2",
            valorUni: "4,30",
            valorQtd: "8,60"
        },
        {
            id: "123456789",
            nome: "ARROZ NAMORADO",
            qtd: "3",
            valorUni: "4,60",
            valorQtd: "13,80"
        },
        {
            id: "234567891",
            nome: "FEIJÃO PAI JOÃO",
            qtd: "4",
            valorUni: "5,10",
            valorQtd: "20,40"
        },
        {
            id: "345678912",
            nome: "AÇUCAR ESTRELA",
            qtd: "2",
            valorUni: "4,30",
            valorQtd: "8,60"
        },
        {
            id: "123456789",
            nome: "ARROZ NAMORADO",
            qtd: "3",
            valorUni: "4,60",
            valorQtd: "13,80"
        },
        {
            id: "234567891",
            nome: "FEIJÃO PAI JOÃO",
            qtd: "4",
            valorUni: "5,10",
            valorQtd: "20,40"
        }
    ]

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