import React from "react";
import "./style.css";

export default function CustomTableCompra({columns, itens}) {
    return (
        <table className={"customTable-container"}>
            <thead className={"customTable-column"}>
            <tr>
                {columns.map((column, index) => {
                    return (
                        <th key={index}>{column.toUpperCase()}</th>
                    )
                })}
            </tr>
            </thead>
            <tbody className={"customTable-body"}>
            {itens.map((item, index) => {
                return (
                    <tr key={index}>
                        <td style={{textAlign: "center", paddingRight: "10px"}}>{item.id.toUpperCase()}</td>
                        <td>{item.nome.toUpperCase()}</td>
                        <td style={{textAlign: "center", paddingRight: "10px"}}>{item.qtd.toUpperCase()}</td>
                        <td style={{textAlign: "center", paddingRight: "10px"}}>{item.valorUni.toUpperCase()}</td>
                        <td style={{textAlign: "center", paddingRight: "10px"}}>{item.valorQtd.toUpperCase()}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
}