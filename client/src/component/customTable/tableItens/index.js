import React from "react";
import "./style.css";

export default function TableItens({columns, itens}) {
    return (
        <table className={"tableItens-container"}>
            <thead className={"tableItens-column"}>
            <tr>
                {columns.map((column, index) => {
                    return (
                        <th key={index}>{column.toUpperCase()}</th>
                    )
                })}
            </tr>
            </thead>
            <tbody className={"tableItens-body"}>
            {itens.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.id.toUpperCase()}</td>
                        <td>{item.nome.toUpperCase()}</td>
                        <td>{`R$ ${item.preco.toUpperCase()}`}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
}