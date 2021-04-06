import React, {useEffect, useState} from "react";
import "./style.css";

export default function CustomTableCompra({columns, itens, handleClick, totalVenda}) {

    const [totalSoma, setTotalSoma] = useState(0);

    useEffect(() => {
        if (itens && itens.length) {
            let total = 0;
            itens.map(item => {
                total = total + parseFloat(item.quantidade) * parseFloat(item.preco);
            });
            setTotalSoma(total);
        } else {
            setTotalSoma(0);
        }
    }, [itens]);

    useEffect(() => {
        totalVenda(totalSoma ?? 0);
    }, [totalSoma]);

    return (
        <table className={"customTable-container"}>
            <thead className={"customTable-column"}>
            <tr>
                {columns.map((column, index) => {
                    return (
                        <th key={index} style={column === "ITEM" ? {width: "40%"} : {width: "auto"}}>{column?.toUpperCase()}</th>
                    )
                })}
            </tr>
            </thead>
            <tbody className={"customTable-body"}>
            {itens?.map((item, index) => {
                const {idProduto, nome, preco, quantidade} = item;
                let total = parseFloat(quantidade) * parseFloat(preco);

                if (total.toString().indexOf(".") > -1) {
                    total = total + "0";
                } else {
                    total = total + ".00";
                }

                return (
                    <tr
                        className={"customTable-rows"}
                        key={index}
                        onClick={() => handleClick(idProduto)}
                    >
                        <td style={{textAlign: "center", paddingRight: "10px"}}>{idProduto}</td>
                        <td style={{width: "40%"}}>{nome?.toUpperCase()}</td>
                        <td style={{textAlign: "center", paddingRight: "10px"}}>{quantidade}</td>
                        <td style={{textAlign: "center", paddingRight: "10px"}}>{`R$ ${preco}`}</td>
                        <td style={{textAlign: "center", paddingRight: "10px"}}>{`R$ ${total}`}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
}