import React, {useEffect, useState} from "react";
import {Row, Col, Input} from "antd";

export default function ModalBody({entityEdit = null, entity = null}) {

    const [nome, setNome] = useState(null);
    const [celular, setCelular] = useState(null);
    const [endereco, setEndereco] = useState(null);
    const [referencia, setReferencia] = useState(null);

    useEffect(() => {
        if (entityEdit) {
            const {celular, nome, endereco, referencia} = entityEdit;
            setCelular(celular);
            setNome(nome);
            setEndereco(endereco);
            setReferencia(referencia);
        } else {
            setCelular(null);
            setNome(null);
            setEndereco(null);
            setReferencia(null);
        }
    }, [entityEdit]);

    useEffect(() => {
        if (entityEdit === null) {
            if ((celular && celular !== "") && (nome && nome !== "") && (endereco && endereco !== "") && (referencia && referencia !== "")) {
                entity({
                    celular: celular,
                    nome: nome,
                    endereco: endereco,
                    referencia: referencia
                });
            }
        }
    }, [celular, nome, endereco, referencia]);

    useEffect(() => {
        entity({
            celular: celular,
            nome: nome,
            endereco: endereco,
            referencia: referencia
        });
    }, [celular, nome, endereco, referencia]);

    return (
        <Row gutter={[24, 8]}>
            <Col span={24}>
                <label style={{paddingLeft: "3px"}}>NOME</label>
            </Col>
            <Col span={24}>
                <Input
                    name={"nome"}
                    onChange={event => setNome(event.target.value)}
                    value={nome}
                />
            </Col>
            <Col span={24}>
                <label style={{paddingLeft: "3px"}}>CELULAR</label>
            </Col>
            <Col span={24}>
                <Input
                    id={"id-celular"}
                    name={"celular"}
                    onChange={event => {
                        if (!isNaN(parseInt(event.target.value))) {
                            setCelular(event.target.value);
                        } else if (event.target.value === "") {
                            setCelular(event.target.value);
                        } else {
                            document.querySelector("#id-celular").value = null;
                        }
                    }}
                    value={celular}
                />
            </Col>
            <Col span={24}>
                <label style={{paddingLeft: "3px"}}>ENDEREÇO</label>
            </Col>
            <Col span={24}>
                <Input
                    name={"endereco"}
                    onChange={event => setEndereco(event.target.value)}
                    value={endereco}
                />
            </Col>
            <Col span={24}>
                <label style={{paddingLeft: "3px"}}>REFERÊNCIA</label>
            </Col>
            <Col span={24}>
                <Input
                    name={"referencia"}
                    onChange={event => setReferencia(event.target.value)}
                    value={referencia}
                />
            </Col>
        </Row>
    );
}