import React from "react";
import CustomTable from "../../component/custom-table";
import "./style.css";
import HeaderTable from "../../component/custom-table/header-table";

export default function Cardapio() {

    const header = ["id", "nome", "preço"]
    const itens = [
        {
            id: "123456789",
            nome: "ARROZ NAMORADO",
            preco: "3,60"
        },
        {
            id: "234567891",
            nome: "FEIJÃO PAI JOÃO",
            preco: "4,80",
        },
        {
            id: "345678912",
            nome: "AÇUCAR ESTRELA",
            preco: "2,15",
        }
    ]


    return (
        <>
            <h2 className={"title-screen"}>Cardápio</h2>
            <section className={"listaCardapio-container-principal"}>
                <div className={"listaCardapio-container-customTable"}>
                    <header className={"customTable-container-header"}>
                        <HeaderTable
                            headerBody={header}
                            widthInput={window.innerWidth < 1300 ? 200 : window.innerWidth > 1400 && window.innerWidth < 1500 ? 250 : 300}
                            heightModal={450}
                        />
                    </header>
                    <CustomTable
                        header={header}
                        itens={itens}
                    />
                </div>
            </section>
        </>
    );
}