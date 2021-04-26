import React, {useEffect, useState} from "react";
import {Input} from "antd";
import "./style.css";

export default function FormClientEntregas({handleCell, searchClient, clientFound, entityCallBack, clearFieldsForm}) {

    const [nome, setNome] = useState(null);
    const [celular, setCelular] = useState(null);
    const [endereco, setEndereco] = useState(null);
    const [referencia, setReferencia] = useState(null);
    const [entity, setEntity] = useState(null);

    useEffect(() => {
        if (clearFieldsForm) {
            setNome(null);
            setCelular(null);
            setEndereco(null);
            setReferencia(null);
        }
    }, [clearFieldsForm]);

    useEffect(() => {
        if (clientFound) {
            const {nome, celular, endereco, referencia} = clientFound;
            setNome(nome);
            setCelular(celular);
            setEndereco(endereco);
            setReferencia(referencia);
        } else {
            setNome(null);
            setCelular(null);
            setEndereco(null);
            setReferencia(null);
        }
    }, [clientFound]);

    useEffect(() => {
        setEntity({
            nome: nome,
            celular: celular,
            endereco: endereco,
            referencia: referencia
        });
    }, [nome, celular, endereco, referencia]);

    useEffect(() => {
        if (entity) {
            entityCallBack(entity);
        }
    }, [entity]);

    const handleCelular = (value) => {
        handleCell(value);
        setCelular(value);
    }

    return (
        <section className={"formClientEntregas-container-form"}>
            <div className={"formClientEntregas-input-div-nome"}>
                <label>Nome</label>
                <Input
                    className={"formClientEntregas-input-nome"}
                    onChange={e => setNome(e.target.value)}
                    value={nome?.toUpperCase()}
                />
            </div>
            <div className={"formClientEntregas-input-div-celular"}>
                <label>Celular<span style={{color: "red"}}> * Utilize o 9 na frete.</span></label>
                <Input
                    className={"formClientEntregas-input-celular"}
                    type={"number"}
                    onPressEnter={() => searchClient(celular)}
                    onChange={e => handleCelular(e.target.value)}
                    value={celular ? celular : 9}
                />
            </div>
            <div className={"formClientEntregas-input-div-endereco"}>
                <label>Endereço</label>
                <Input
                    className={"formClientEntregas-input-endereco"}
                    onChange={e => setEndereco(e.target.value)}
                    value={endereco?.toUpperCase()}
                />
            </div>
            <div className={"formClientEntregas-input-div-referencia"}>
                <label>Referência</label>
                <Input
                    className={"formClientEntregas-input-referencia"}
                    onChange={e => setReferencia(e.target.value)}
                    value={referencia?.toUpperCase()}
                />
            </div>
        </section>
    );
}