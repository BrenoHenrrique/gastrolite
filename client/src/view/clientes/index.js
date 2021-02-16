import React from "react";
import CustomTable from "../../component/custom-table";
import "./style.css";
import HeaderTable from "../../component/custom-table/header-table";

export default function Clientes() {

    const header = ["nome", "celular", "endereco", "referencia"]
    const itens = [
        {
            nome: "Breno Herique",
            celular: "(85) 999586458",
            endereco: "rua 16 residencial nº 1516",
            referencia: "proximo a esquina"
        },
        {
            nome: "Priscilla Nascimento",
            celular: "(85) 995658745",
            endereco: "rua 1 maracanãzinho nº 14",
            referencia: "proximo a escola"
        },
        {
            nome: "Paulo Roberto",
            celular: "(85) 988648965",
            endereco: "rua a acaracuzinho nº 15B",
            referencia: "proximo a praça"
        },
        {
            nome: "João Nascimento",
            celular: "(85) 989586575",
            endereco: "rua 23 jereissati 1 nº 1345",
            referencia: "proximo a auto escola"
        },
    ]
    return (
        <>
            <h2 className={"title-screen"}>Clientes</h2>
            <section className={"clientes-container-principal"}>
                <HeaderTable
                    headerBody={header}
                    widthInput={window.innerWidth < 1300 ? 150 : window.innerWidth > 1400 && window.innerWidth < 1500 ? 200 : 250}
                    heightModal={550}
                />
                <CustomTable
                    header={header}
                    itens={itens}
                />
            </section>
        </>
    );
}