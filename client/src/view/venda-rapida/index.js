import React from "react";
import FormProdEntregas from "../entrega/inputs-produto";
import TableCompra from "../../component/table-compra";
import "./style.css";

export default function VendaRapida() {

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
        <>
            <h2 className={"title-screen"}>Venda Rápida</h2>
            <main className={"vendaRapida-container-principal"}>
                <div className={"vendaRapida-container-superior"}>
                    <label>Total</label>
                    <p>R$ 171,20</p>
                </div>
                <div className={"vendaRapida-container-produto"}>
                    <FormProdEntregas/>
                </div>
                <div className={"vendaRapida-container-table"}>
                    <TableCompra
                        columns={columns}
                        itens={itens}
                    />
                </div>
            </main>
        </>
    );
}