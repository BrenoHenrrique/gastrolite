import React from "react";
import {BiEdit, BiTrashAlt} from "react-icons/bi";
import "./style.css";

export default function TableItens({columns, itens, callBackEdit, callBackDelete}) {

    const handleEdit = (entity) => {
        callBackEdit(entity);
    }

    const handleDelete = (entity) => {
        callBackDelete(entity)
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
                <th className={"tableItens-column-acoes"}>AÇÕES</th>
            </tr>
            </thead>
            <tbody className={"tableItens-body"}>
            {itens && itens.map((item, index) => {
                const {idProduto, nome, preco} = item
                return (
                    item.id ?
                        <tr key={index}>
                            <td>{idProduto}</td>
                            <td>{nome.toUpperCase()}</td>
                            <td>{`R$ ${preco.toUpperCase()}`}</td>
                            <td className={"tableItens-acoes-cardapio"}>
                                <BiEdit onClick={() => handleEdit(item)}/>
                                <BiTrashAlt onClick={() => handleDelete(item)}/>
                            </td>
                        </tr>
                        :
                        <tr key={index}>
                            <td>{item.nome.toUpperCase()}</td>
                            <td>{item.celular.toUpperCase()}</td>
                            <td>{item.endereco.toUpperCase()}</td>
                            <td>{item.referencia.toUpperCase()}</td>
                            <td className={"tableItens-acoes-cliente"}>
                                <BiEdit onClick={() => handleEdit(item)}/>
                                <BiTrashAlt onClick={() => handleDelete(item)}/>
                            </td>
                        </tr>
                )
            })}
            </tbody>
        </table>
    );
}