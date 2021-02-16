import React from "react";
import TableItens from "./table-itens";
import "./style.css";

export default function CustomTable({header, itens}) {

    return (
        <section className={"customTable-container-principal"}>
            <section className={"customTable-container-body"}>
                <TableItens
                    columns={header}
                    itens={itens}
                />
            </section>
        </section>
    );
}