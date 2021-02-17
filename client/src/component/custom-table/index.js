import React from "react";
import TableItens from "./table-itens";
import "./style.css";

export default function CustomTable({header, itens, callBackEdit, callBackDelete}) {

    return (
        <section className={"customTable-container-principal"}>
            <section className={"customTable-container-body"}>
                <TableItens
                    columns={header}
                    itens={itens}
                    callBackEdit={callBackEdit}
                    callBackDelete={callBackDelete}
                />
            </section>
        </section>
    );
}