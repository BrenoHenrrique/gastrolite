import React, {useEffect, useState} from "react";
import {Col, Input, Row, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import {ServiceLocais} from "../../../service/serviceLocais";
import {ServiceFuncionarios} from "../../../service/serviceFuncionarios";
import "./style.css";

export default function ModalBody({total, entregador, pagoCompra, taxaEntrega, observacoes, tipoPagamento, bairro}) {

    const {Option} = Select;
    const [obs, setObs] = useState(null);
    const [pago, setPago] = useState(null);
    const [entryLocal, setEntryLocal] = useState(null);
    const [locais, setLocais] = useState(null);
    const [totalCompra, setTotalCompra] = useState(0.0);
    const [entregadores, setEntregadores] = useState(null);
    const [handleTipoPag, setHandleTipoPag] = useState(null);

    useEffect(() => {
        ServiceLocais.list({}).then((response) => {
            setLocais(response.entities);
        });
        ServiceFuncionarios.list({field: "função", value: "entregador"}).then((response) => {
            setEntregadores(response.entities);
        });
        setTotalCompra(total);
        setPago(null);
        setObs(null);
    }, []);

    useEffect(() => {
        if (pago) {
            pagoCompra(pago);
        }
    }, [pago]);

    useEffect(() => {
        observacoes(obs);
    }, [obs]);

    useEffect(() => {
        handleTipoPag && handleTipoPag !== "DINHEIRO" && setPago(totalCompra);
    }, [handleTipoPag, totalCompra])

    useEffect(() => {
        if (entryLocal) {
            setTotalCompra(total + parseFloat(entryLocal.taxa));
        }
    }, [entryLocal]);

    const handleLocais = (id) => {
        let entry = locais.find((local) => local.id === id);
        let total = totalCompra + parseFloat(entry.taxa);
        setEntryLocal(entry);
        const taxa = parseFloat(entry.taxa)
        taxaEntrega(taxa);
        bairro(entry.nome);
        setTotalCompra(total);
    }

    const handleEntregador = (nome) => {
        entregador(nome);
    }

    const handleTipoCompra = (value) => {
        tipoPagamento(value);
        setHandleTipoPag(value);
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
                        placeholder={"ESCOLHA O BAIRRO"}
                        onChange={handleLocais}
                    >
                        {locais.map((local) => {
                            return (
                                <Option
                                    key={local.id}
                                    value={local.id}
                                >{local.nome.toUpperCase()}</Option>
                            )
                        })}
                    </Select>}
                </Col>
                <Col style={{marginBottom: "5px"}}>
                    <label>ENTREGADOR</label>
                </Col>
                <Col
                    style={{marginBottom: "5px"}}
                    placeholder={"ENTREGADOR"}
                >
                    {entregadores &&
                    <Select
                        style={{width: "100%", marginBottom: "10px"}}
                        onChange={handleEntregador}
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
                    <label>TIPO COMPRA</label>
                </Col>
                <Col style={{marginBottom: "5px"}}>
                    <Select
                        style={{width: "100%", marginBottom: "10px"}}
                        placeholder={"FORMA DE PAGAMENTO"}
                        onChange={handleTipoCompra}
                    >
                        <Option value={"DINHEIRO"}>DINHEIRO</Option>
                        <Option value={"CARTAO"}>CARTÃO</Option>
                        <Option value={"PIX"}>PIX</Option>
                    </Select>
                </Col>
                <Col style={{marginBottom: "5px"}}>
                    <label>OBSERVAÇÕES</label>
                </Col>
                <Col>
                    <TextArea
                        style={{width: "100%", marginBottom: "10px"}}
                        onChange={e => setObs(e.target.value)}
                    />
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
                        readOnly={handleTipoPag !== "DINHEIRO"}
                        onChange={e => setPago(parseFloat(e.target.value))}
                        value={pago}
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