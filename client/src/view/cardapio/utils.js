import React, {useEffect, useState} from "react";
import {Row, Col, Input} from "antd";

export default function ModalBody({entityEdit = null, entity = {}}) {

    const [id, setId] = useState(null);
    const [nome, setNome] = useState(null);
    const [preco, setPreco] = useState(null);

    useEffect(() => {
        if (entityEdit) {
            const {id, nome, preco} = entityEdit;
            setId(id);
            setNome(nome);
            setPreco(preco);
        }
    }, [entityEdit]);

    useEffect(() => {
        if (entityEdit === null) {
            if ((id && id !== "") && (nome && nome !== "") && (preco && preco !== "")) {
                entity({
                    id: id,
                    nome: nome,
                    preco: preco
                });
            }
        }
    }, [id, nome, preco]);

    return (
        <Row gutter={[24, 8]}>
            <Col span={24}>
                <label style={{paddingLeft: "5px"}}>ID</label>
            </Col>
            <Col span={24}>
                <Input
                    name={"id"}
                    onChange={event => setId(event.target.value)}
                    value={id}
                />
            </Col>
            <Col span={24}>
                <label style={{paddingLeft: "5px"}}>NOME</label>
            </Col>
            <Col span={24}>
                <Input
                    name={"nome"}
                    onChange={event => setNome(event.target.value)}
                    value={nome}
                />
            </Col>
            <Col span={24}>
                <label style={{paddingLeft: "5px"}}>PREÇO</label>
            </Col>
            <Col span={24}>
                <Input
                    name={"preco"}
                    onChange={event => setPreco(event.target.value)}
                    value={preco}
                />
            </Col>
        </Row>
    );
}