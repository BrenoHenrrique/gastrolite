import React, {useEffect, useState} from "react";
import {Row, Col, Input, Select} from "antd";

export default function ModalBody({unidades, entityEdit = null, entity = null}) {

    const {Option} = Select;
    const [nome, setNome] = useState(null);
    const [unidade, setUnidade] = useState(null);
    const [valorUnidade, setValorUnidade] = useState(null);
    const [quantidade, setQuantidade] = useState(null);
    const [valorTotal, setValorTotal] = useState(0);

    useEffect(() => {
        if (entityEdit) {
            const {nome, unidade, valorUnidade, quantidade, valorTotal} = entityEdit;
            setNome(nome);
            setUnidade(unidade);
            setValorUnidade(valorUnidade);
            setQuantidade(quantidade);
            setValorTotal(valorTotal);
        } else {
            setNome(null);
            setUnidade(null);
            setValorUnidade(null);
            setQuantidade(null);
            setValorTotal(null);
        }
    }, [entityEdit]);

    useEffect(() => {
        if (entityEdit === null) {
            if ((nome && nome !== "") && (unidade && unidade !== "") && (valorUnidade && valorUnidade !== "") && (quantidade && quantidade !== "") && valorTotal) {
                entity({
                    nome: nome,
                    unidade: unidade,
                    valorUnidade: valorUnidade,
                    quantidade: quantidade,
                    valorTotal: valorTotal
                });
            }
        }
    }, [nome, unidade, valorUnidade, quantidade, valorTotal]);

    useEffect(() => {
        if (valorUnidade && quantidade) {
            let total = parseFloat(valorUnidade.toString().replace(",", ".")) * parseFloat(quantidade.toString().replace(",", "."));
            entity({
                nome: nome,
                unidade: unidade,
                valorUnidade: parseFloat(valorUnidade.toString().replace(",", ".")),
                quantidade: parseFloat(quantidade.toString().replace(",", ".")),
                valorTotal: total
            });
            setValorTotal(total);
        }
    }, [nome, unidade, valorUnidade, quantidade, valorTotal]);

    return (
        <Row gutter={[24, 8]}>
            <Col span={24}>
                <label style={{paddingLeft: "3px"}}>NOME</label>
            </Col>
            <Col span={24}>
                <Input
                    name={"nome"}
                    style={{paddingLeft: "5px !important"}}
                    onChange={event => setNome(event.target.value)}
                    value={nome}
                />
            </Col>
            <Col span={12}>
                <Col span={24} style={{padding: 0}}>
                    <label style={{padding: "3px"}}>UNIDADE</label>
                </Col>
                <Col span={24} style={{padding: 0}}>
                    {unidades &&
                    <Select
                        style={{width: "100%", marginBottom: "10px"}}
                        onChange={setUnidade}
                        defaultValue={entityEdit ? unidades.find((unidade) => entityEdit.unidade === unidade) : unidade}
                    >
                        {unidades.map((unidade) => {
                            return (
                                <Option
                                    key={unidade}
                                    value={unidade}
                                >{unidade}</Option>
                            )
                        })}
                    </Select>}
                </Col>
            </Col>
            <Col span={12}>
                <Col span={24}>
                    <label style={{paddingLeft: "3px"}}>VALOR UND.</label>
                </Col>
                <Col span={24}>
                    <Input
                        id={"id-valor-unidade"}
                        name={"valorUnidade"}
                        style={{width: 250}}
                        onChange={event => {
                            if (!isNaN(parseInt(event.target.value))) {
                                setValorUnidade(event.target.value);
                            } else if (event.target.value === "") {
                                setValorUnidade(event.target.value);
                            }
                        }}
                        value={valorUnidade}
                    />
                </Col>
            </Col>
            <Col span={12}>
                <Col span={24} style={{padding: 0}}>
                    <label style={{paddingLeft: "3px"}}>QUANTIDADE</label>
                </Col>
                <Col span={24} style={{padding: 0}}>
                    <Input
                        id={"quantidade"}
                        name={"quantidade"}
                        style={{width: 265}}
                        onChange={event => {
                            if (!isNaN(parseInt(event.target.value))) {
                                setQuantidade(event.target.value);
                            } else if (event.target.value === "") {
                                setQuantidade(event.target.value);
                            }
                        }}
                        value={quantidade}
                    />
                </Col>
            </Col>
            <Col span={12}>
                <Col span={24}>
                    <label style={{paddingLeft: "3px"}}>VALOR TOTAL</label>
                </Col>
                <Col span={24}>
                    <Input
                        id={"valorTotal"}
                        name={"valorTotal"}
                        style={{width: 250}}
                        readOnly={true}
                        value={valorTotal?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
                    />
                </Col>
            </Col>
        </Row>
    );
}