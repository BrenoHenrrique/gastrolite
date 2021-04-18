import React, {useEffect, useState} from "react";
import {Col, Input, Row, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import {ServiceLocais} from "../../../service/serviceLocais";
import {ServiceFuncionarios} from "../../../service/serviceFuncionarios";
import "./style.css";

export default function ModalBody({cliente, total, entregador, pagoCompra, taxaEntrega}) {

    const {Option} = Select;
    const [pago, setPago] = useState(null);
    const [locais, setLocais] = useState(null);
    const [entregadores, setEntregadores] = useState(null);
    const [observacoes, setObservacoes] = useState(null);
    const [totalCompra, setTotalCompra] = useState(0.0);

    useEffect(() => {
        ServiceLocais.list({}).then((response) => {
            setLocais(response.entities);
        });
        ServiceFuncionarios.list({field: "função", value: "entregador"}).then((response) => {
            setEntregadores(response.entities);
        });
        setTotalCompra(total);
        setPago(null);
        setObservacoes(null);
    }, []);

    useEffect(() => {
        if (pago) {
            pagoCompra(pago);
        }
    }, [pago]);

    const handleLocais = (taxa) => {
        let total = totalCompra + parseFloat(taxa);
        taxaEntrega(taxa)
        setTotalCompra(total);
    }

    const handleentregador = (nome) => {
        entregador(nome);
    }

    return (
        <Row gutter={24}>
            <Col span={11}>
                <Col style={{marginBottom: "5px"}}>
                    <label>LOCAL</label>
                </Col>
                <Col style={{marginBottom: "5px"}}>
                    {locais &&
                    <Select
                        style={{width: "100%", marginBottom: "10px"}}
                        onChange={handleLocais}
                    >
                        {locais.map((local) => {
                            return (
                                <Option key={local.id} value={local.taxa}>{local.nome.toUpperCase()}</Option>
                            )
                        })}
                    </Select>}
                </Col>
                <Col style={{marginBottom: "5px"}}>
                    <label>ENTREGADOR</label>
                </Col>
                <Col style={{marginBottom: "5px"}}>
                    {entregadores &&
                    <Select
                        style={{width: "100%", marginBottom: "10px"}}
                        onChange={handleentregador}
                    >
                        {entregadores.map((entregador) => {
                            return (
                                <Option
                                    key={entregador.id}
                                    value={entregador.nome}
                                >{entregador.nome.toUpperCase()}</Option>
                            )
                        })}
                    </Select>}
                </Col>
                <Col style={{marginBottom: "5px"}}>
                    <label>OBSERVAÇÕES</label>
                </Col>
                <Col>
                    <TextArea
                        style={{width: "100%", marginBottom: "10px"}}
                        onChange={e => setObservacoes(e.target.value)}
                        value={observacoes}
                    />
                </Col>
                <Col style={{marginBottom: "5px"}}>
                    <label>CLIENTE</label>
                </Col>
                <Col>
                    <Input readOnly={true} value={cliente.nome}/>
                </Col>
            </Col>
            <Col span={2}/>
            <Col span={11}>
                <Col style={{marginBottom: "5px"}}>
                    <label className={"utils-entrega-label-valores"}>TOTAL</label>
                </Col>
                <Col>
                    <Input
                        className={"utils-entrega-valores"}
                        readOnly={true}
                        value={totalCompra}
                    />
                </Col>
                <Col style={{marginBottom: "5px"}}>
                    <label className={"utils-entrega-label-valores"}>PAGO</label>
                </Col>
                <Col>
                    <Input
                        style={{color: "green"}}
                        type={"number"}
                        className={"utils-entrega-valores"}
                        onChange={e => setPago(parseFloat(e.target.value))}
                    />
                </Col>
                <Col style={{marginBottom: "5px"}}>
                    <label
                        style={{marginBottom: 0}}
                        className={"utils-entrega-label-valores"}
                    >TROCO</label>
                </Col>
                <Col>
                    <Input
                        style={{color: "red", marginBottom: 0}}
                        className={"utils-entrega-valores"}
                        readOnly={true}
                        value={pago ? pago - totalCompra : ""}
                    />
                </Col>
            </Col>
        </Row>
    )
}