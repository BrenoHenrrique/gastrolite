import React, {useEffect, useState} from "react";
import {Row, Col, Input} from "antd";

export default function ModalBody({entityEdit = null, entity = null}) {

    const [idProduto, setIdProduto] = useState(null);
    const [nome, setNome] = useState(null);
    const [preco, setPreco] = useState(null);

    useEffect(() => {
        if (entityEdit) {
            const {idProduto, nome, preco} = entityEdit;
            setIdProduto(idProduto);
            setNome(nome);
            setPreco(preco);
        } else {
            setIdProduto(null);
            setNome(null);
            setPreco(null);
        }
    }, [entityEdit]);

    useEffect(() => {
        if (entityEdit === null) {
            if ((idProduto && idProduto !== "") && (nome && nome !== "") && (preco && preco !== "")) {
                entity({
                    idProduto: idProduto,
                    nome: nome,
                    preco: preco
                });
            }
        }
    }, [idProduto, nome, preco]);

    useEffect(() => {
        entity({
            idProduto: idProduto,
            nome: nome,
            preco: preco?.trim().replace(",", ".")
        });
    }, [idProduto, nome, preco]);

    return (
        <Row gutter={[24, 8]}>
            <Col span={24}>
                <label style={{paddingLeft: "3px"}}>ID</label>
            </Col>
            <Col span={24}>
                <Input
                    name={"idProduto"}
                    onChange={event => setIdProduto(event.target.value)}
                    value={idProduto}
                />
            </Col>
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
                <label style={{paddingLeft: "3px"}}>PREÇO</label>
            </Col>
            <Col span={24}>
                <Input
                    id={"id-preco"}
                    name={"preco"}
                    onChange={event => {
                        if (!isNaN(parseInt(event.target.value))) {
                            setPreco(event.target.value);
                        } else if (event.target.value === "") {
                            setPreco(event.target.value);
                        } else {
                            document.querySelector("#id-preco").value = null;
                        }
                    }}
                    value={preco}
                />
            </Col>
        </Row>
    );
}