import React from "react";
import "./style.css";

export default function CustomTable({columns, itens}) {
    return (
        <table className={"customTable-container"}>
            <thead className={"customTable-column"}>
            <tr>
                {columns.map((column, index) => {
                    return (
                        <th key={index}>{column}</th>
                    )
                })}
            </tr>
            </thead>
            <tbody className={"customTable-body"}>
            {itens.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.nome}</td>
                        <td>{item.qtd}</td>
                        <td>{item.valorUni}</td>
                        <td>{item.valorQtd}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
}