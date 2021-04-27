import React, {useEffect, useState} from "react";
import {Button, Input} from "antd";
import "./style.css";

export default function FormProdRapida({handleFinalizar, handleId, searchProduct, itemFound, entityCallBack, saveItem, disabledButton}) {

    const [id, setId] = useState(null);
    const [nome, setNome] = useState(null);
    const [quant, setQuant] = useState(null);
    const [preco, setPreco] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [observacoes, setObservacoes] = useState(null);
    const [entity, setEntity] = useState(null);

    useEffect(() => {
        if (itemFound) {
            const {idProduto, nome, preco, quant, cliente, observacoes} = itemFound[0];
            setId(idProduto);
            setNome(nome);
            setPreco(preco);
            setQuant(quant);
            setCliente(cliente);
            setObservacoes(observacoes);
        } else {
            setId(null);
            setNome(null);
            setPreco(null);
            setQuant(null);
            setCliente(null);
            setObservacoes(null);
        }
    }, [itemFound]);

    useEffect(() => {
        setEntity({
            idProduto: id,
            quantidade: quant,
            cliente: cliente,
            observacoes: observacoes
        });
    }, [id, quant, cliente, observacoes]);

    useEffect(() => {
        if (entity) {
            entityCallBack(entity);
        }
    }, [entity])

    const handleOnChangeId = (value) => {
        handleId(value);
        setId(value);
    }

    const handleOnPressQuant = () => {
        saveItem();
        setId(null);
        setNome(null);
        setPreco(null);
        setQuant(null);
        document.querySelector(".formProdRapida-input-form-id").focus();
    }

    return (
        <section className={"formProdRapida-container-form"}>
            <div className={"formProdRapida-input-div-id"}>
                <label>CÓDIGO</label>
                <Input
                    type={"number"}
                    className={"formProdRapida-input-form-id"}
                    onChange={event => handleOnChangeId(event.target.value)}
                    onPressEnter={searchProduct}
                    value={id}
                />
            </div>
            <div className={"formProdRapida-input-div-nome"}>
                <label>NOME</label>
                <Input
                    type={"text"}
                    className={"formProdRapida-input-form-nome"}
                    readOnly={true}
                    tabIndex={-1}
                    onChange={event => setNome(event.target.value)}
                    value={nome}
                />
            </div>
            <div className={"formProdRapida-input-div-qtd"}>
                <label>QUANTIDADE</label>
                <Input
                    type={"number"}
                    className={"formProdRapida-input-form-qtd"}
                    onChange={event => setQuant(event.target.value)}
                    onPressEnter={() => handleOnPressQuant()}
                    value={quant}
                />
            </div>
            <div className={"formProdRapida-input-div-valor"}>
                <label>VALOR</label>
                <Input
                    type={"number"}
                    className={"formProdRapida-input-form-valor"}
                    readOnly={true}
                    tabIndex={-1}
                    onChange={event => setPreco(event.target.value)}
                    value={preco}
                />
            </div>
            <div className={"formProdRapida-input-div-cliente"}>
                <label>CLIENTE</label>
                <Input
                    className={"formProdRapida-input-form-cliente"}
                    tabIndex={-1}
                    onChange={event => setCliente(event.target.value)}
                    value={cliente}
                />
            </div>
            <div className={"formProdRapida-input-div-cliente"}>
                <label>OBSERVAÇÕES</label>
                <Input
                    className={"formProdRapida-input-form-cliente"}
                    tabIndex={-1}
                    onChange={event => setObservacoes(event.target.value)}
                    value={observacoes}
                />
            </div>
            <div className={"formProdRapida-container-submit"}>
                <Button
                    type={"primary"}
                    onClick={() => handleFinalizar()}
                    disabled={disabledButton}
                >FINALIZAR</Button>
            </div>
        </section>
    );
}