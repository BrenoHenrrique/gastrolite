import React, {useEffect, useState} from "react";
import {Col, Input, InputNumber, Row} from "antd";

export default function ModalBodyStock({entityDownStock, callBackStock}) {

    const [valorBaixa, setValorBaixa] = useState(0);

    useEffect(() => {
        callBackStock({valor: valorBaixa});
    }, [valorBaixa]);

    const onChange = (value) => {
        let total = value * entityDownStock.valorUnidade;
        setValorBaixa(total);
    }

    return (
        <Row gutter={[24, 12]}>
            <Col offset={19}>
                <label
                    style={{fontSize: "23px", color: "red"}}
                >{valorBaixa?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</label>
            </Col>
            <Col span={16}>
                <Col span={24}>
                    <label style={{paddingLeft: "3px"}}>NOME</label>
                </Col>
                <Col span={24}>
                    <Input
                        readOnly={true}
                        value={entityDownStock.nome}
                    />
                </Col>
            </Col>
            <Col span={8}>
                <Col span={24}>
                    <label style={{paddingLeft: "3px"}}>BAIXA</label>
                </Col>
                <Col span={24}>
                    <InputNumber
                        min={1}
                        max={entityDownStock.quantidade}
                        defaultValue={1}
                        onChange={onChange}
                    />
                </Col>
            </Col>
        </Row>
    );
}