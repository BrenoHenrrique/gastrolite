import React, {useEffect, useState} from "react";
import {Button, Input} from "antd";
import "./style.css";

export default function FormProdEntregas({handleFinalizar, handleId, searchProduct, itemFound, entityCallBack, saveItem}) {

    const [id, setId] = useState(null);
    const [nome, setNome] = useState(null);
    const [quant, setQuant] = useState(null);
    const [preco, setPreco] = useState(null);
    const [entity, setEntity] = useState(null);

    useEffect(() => {
        if (itemFound) {
            const {idProduto, nome, preco, quant} = itemFound[0];
            setId(idProduto);
            setNome(nome);
            setPreco(preco);
            setQuant(quant);
        } else {
            setId(null);
            setNome(null);
            setPreco(null);
            setQuant(null);
        }
    }, [itemFound]);

    useEffect(() => {
        setEntity({
            idProduto: id,
            quantidade: quant,
        });
    }, [id, quant]);

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
        document.querySelector(".formProdEntregas-input-form-id").focus();
    }

    return (
        <section className={"formProdEntregas-container-form"}>
            <div className={"formProdEntregas-input-div-id"}>
                <label>CÓDIGO</label>
                <Input
                    type={"number"}
                    className={"formProdEntregas-input-form-id"}
                    onChange={event => handleOnChangeId(event.target.value)}
                    onPressEnter={searchProduct}
                    value={id}
                />
            </div>
            <div className={"formProdEntregas-input-div-nome"}>
                <label>NOME</label>
                <Input
                    type={"text"}
                    className={"formProdEntregas-input-form-nome"}
                    readOnly={true}
                    tabIndex={-1}
                    onChange={event => setNome(event.target.value)}
                    value={nome}
                />
            </div>
            <div className={"formProdEntregas-input-div-qtd"}>
                <label>QUANTIDADE</label>
                <Input
                    type={"number"}
                    className={"formProdEntregas-input-form-qtd"}
                    onChange={event => setQuant(event.target.value)}
                    onPressEnter={() => handleOnPressQuant()}
                    value={quant}
                />
            </div>
            <div className={"formProdEntregas-input-div-valor"}>
                <label>VALOR</label>
                <Input
                    type={"number"}
                    className={"formProdEntregas-input-form-valor"}
                    readOnly={true}
                    tabIndex={-1}
                    onChange={event => setPreco(event.target.value)}
                    value={preco}
                />
            </div>
            <div className={"formProdEntregas-container-submit"}>
                <Button
                    type={"primary"}
                    onClick={() => handleFinalizar}
                >FINALIZAR</Button>
            </div>
        </section>
    );
}