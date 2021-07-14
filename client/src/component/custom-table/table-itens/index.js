import React from "react";
import {BiEdit, BiTrashAlt} from "react-icons/all";
import moment from "moment";
import "./style.css";

export default function TableItens({columns, itens, callBackEdit, callBackDelete}) {

    const handleEdit = (entity) => {
        callBackEdit(entity);
    }

    const handleDelete = (entity) => {
        callBackDelete(entity);
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
                {itens && itens[0]?.tipoDePagamento !== undefined && itens[0]?.tipoDePagamento !== null ? <></> : <th className={"tableItens-column-acoes"}>AÇÕES</th>}
            </tr>
            </thead>
            <tbody className={"tableItens-body"}>
            {itens && itens.map((item, index) => {
                return (
                    item.preco &&
                        <tr key={index}>
                            <td>{item.idProduto}</td>
                            <td>{item.nome.toUpperCase()}</td>
                            <td>{`R$ ${item.preco.toUpperCase()}`}</td>
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