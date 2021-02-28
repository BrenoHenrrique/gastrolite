import React from "react";
import "./style.css";

export default function CustomTableCompra({columns, itens}) {
    return (
        <table className={"customTable-container"}>
            <thead className={"customTable-column"}>
            <tr>
                {columns.map((column, index) => {
                    return (
                        <th key={index} style={column === "ITEM" ? {width: "40%"} : {width: "auto"}}>{column.toUpperCase()}</th>
                    )
                })}
            </tr>
            </thead>
            <tbody className={"customTable-body"}>
            {itens.map((item, index) => {
                const {idProduto, nome, preco, quantidade} = item
                return (
                    <tr key={index}>
                        <td style={{textAlign: "center", paddingRight: "10px"}}>{idProduto}</td>
                        <td style={{width: "40%"}}>{nome.toUpperCase()}</td>
                        <td style={{textAlign: "center", paddingRight: "10px"}}>{quantidade}</td>
                        <td style={{textAlign: "center", paddingRight: "10px"}}>{`R$ ${preco}`}</td>
                        <td style={{textAlign: "center", paddingRight: "10px"}}>{`R$ ${parseInt(quantidade) * parseInt(preco)}`}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
}