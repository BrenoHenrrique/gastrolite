import React from "react";
import CustomTable from "../../../component/custom-table";
import "./style.css";

export default function ListaCardapio() {
    return (
        <>
            <h2 className={"title-screen"}>Cardápio Lista</h2>
            <main className={"listaCardapio-container-principal"}>
                <div className={"listaCardapio-container-customTable"}>
                    <CustomTable/>
                </div>
            </main>
        </>
    );
}