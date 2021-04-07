import React, {useEffect, useState} from "react";
import {Row, Col, Input} from "antd";

export default function ModalBody({entityEdit = null, entity = null}) {

    const [nome, setNome] = useState(null);
    const [taxa, setTaxa] = useState(null);

    useEffect(() => {
        if (entityEdit) {
            const {nome, taxa} = entityEdit;
            setTaxa(taxa);
            setNome(nome);
        } else {
            setNome(null);
            setTaxa(null);
        }
    }, [entityEdit]);

    useEffect(() => {
        if (entityEdit === null) {
            if ((taxa && taxa !== "") && (nome && nome !== "")) {
                entity({
                    taxa: taxa,
                    nome: nome
                });
            }
        }
    }, [taxa, nome]);

    useEffect(() => {
        entity({
            taxa: taxa,
            nome: nome,
        });
    }, [taxa, nome]);

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
                <label style={{paddingLeft: "3px"}}>TAXA</label>
            </Col>
            <Col span={24}>
                <Input
                    id={"id-taxa"}
                    name={"taxa"}
                    onChange={event => {
                        if (!isNaN(parseInt(event.target.value))) {
                            setTaxa(event.target.value.replace(",", "."));
                        } else if (event.target.value === "") {
                            setTaxa(event.target.value);
                        } else {
                            document.querySelector("#id-taxa").value = null;
                        }
                    }}
                    value={taxa}
                />
            </Col>
        </Row>
    );
}