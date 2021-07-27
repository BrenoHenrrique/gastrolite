import React from "react";
import {BiEdit, BiTrashAlt, FaCartArrowDown} from "react-icons/all";
import "./style.css";

export default function TableItens({columns, itens, callBackEdit, callBackDelete, callDownStock}) {

    const handleEdit = (entity) => {
        callBackEdit(entity);
    }

    const handleDelete = (entity) => {
        callBackDelete(entity);
    }

    const handleDownStock = (entity) => {
        callDownStock(entity);
    }

    return (
        <table className={"tableItens-container"}>
            <thead className={"tableItens-column"}>
            <tr>
                {columns && columns.map((column, index) => {
                    return (
                        <th key={index}>{column.toUpperCase()}</th>
                    )
                })}
                {itens &&
                (itens[0]?.tipoDePagamento !== undefined ||
                itens[0]?.quantidadeBaixa !== undefined) ? <></> : <th className={"tableItens-column-acoes"}>AÇÕES</th>}
            </tr>
            </thead>
            <tbody className={"tableItens-body"}>
            {itens && itens.map((item, index) => {
                return (
                    item.preco &&
                        <tr key={index}>
                            <td>{item.idProduto}</td>
                            <td>{item.nome.toUpperCase()}</td>
                            <td>{parseFloat(item.preco)?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                            <td className={"tableItens-acoes"}>
                                <BiEdit onClick={() => handleEdit(item)}/>
                                <BiTrashAlt onClick={() => handleDelete(item)}/>
                            </td>
                        </tr> ||
                    (item.celular || item.endereco) &&
                        <tr key={index}>
                            <td>{item.nome.toUpperCase()}</td>
                            <td>{item.celular.toUpperCase()}</td>
                            <td>{item.endereco.toUpperCase()}</td>
                            <td>{item.referencia.toUpperCase()}</td>
                            <td className={"tableItens-acoes"}>
                                <BiEdit onClick={() => handleEdit(item)}/>
                                <BiTrashAlt onClick={() => handleDelete(item)}/>
                            </td>
                        </tr> ||
                    item.taxa && item.nome &&
                    <tr key={index}>
                        <td>{item.nome.toUpperCase()}</td>
                        <td>{item.taxa.replace(".", ",")}</td>
                        <td className={"tableItens-acoes"}>
                            <BiEdit onClick={() => handleEdit(item)}/>
                            <BiTrashAlt onClick={() => handleDelete(item)}/>
                        </td>
                    </tr> ||
                    item.funcao &&
                    <tr key={index}>
                        <td>{item.nome.toUpperCase()}</td>
                        <td>{item.celular.toUpperCase()}</td>
                        <td>{item.endereco.toUpperCase()}</td>
                        <td>{item.funcao.toUpperCase()}</td>
                        <td className={"tableItens-acoes"}>
                            <BiEdit onClick={() => handleEdit(item)}/>
                            <BiTrashAlt onClick={() => handleDelete(item)}/>
                        </td>
                    </tr> ||
                    item.unidade &&
                    <tr key={index}>
                        <td>{item.nome}</td>
                        <td style={{textAlign: "center"}}>{item.unidade}</td>
                        <td style={{textAlign: "center"}}>{item.valorUnidade?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                        <td style={{textAlign: "center"}}>{item.quantidade}</td>
                        <td style={{textAlign: "center"}}>{item.valorTotal?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                        <td className={"tableItens-acoes"}>
                            <FaCartArrowDown onClick={() => handleDownStock(item)}/>
                            <BiEdit onClick={() => handleEdit(item)}/>
                            <BiTrashAlt onClick={() => handleDelete(item)}/>
                        </td>
                    </tr> ||
                    item.data && item.valorUnidade &&
                    <tr key={index}>
                        <td>{item.nome}</td>
                        <td style={{textAlign: "center"}}>{item.valorUnidade?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                        <td style={{textAlign: "center"}}>{item.quantidadeBaixa}</td>
                        <td style={{textAlign: "center"}}>{item.total?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                        <td style={{textAlign: "center"}}>{item.data}</td>
                    </tr> ||
                    item.pago !== null && item.taxa !== null &&
                    <tr key={index}>
                        <td>{item.pago?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                        <td>{item.taxa?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                        <td>{item.troco?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                        <td>{item.total?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                        <td>{item.tipoDePagamento?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                        <td>{item?.data}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}