import React, {useEffect, useState} from "react";
import CustomTable from "../../../component/custom-table";
import {ServiceDashboard} from "../../../service/serviceDashboard";

export default function ModalBody({totalHoje}) {

    const [header, setHeader] = useState(null);
    const [itens, setItens] = useState(null);
    const [totalPix, setTotalPix] = useState(0);
    const [totalCartao, setTotalCartao] = useState(0);
    const [totalDinheiro, setTotalDinheiro] = useState(0);

    useEffect(() => {
        entitiesToday();
    }, []);

    useEffect(() => {
        if (itens?.length) {
            let pix = 0;
            let cartao = 0;
            let dinheiro = 0;
            itens.forEach((item) => {
                const {tipoDePagamento, total} = item;
                if (tipoDePagamento === "PIX") {
                    pix += total;
                    setTotalPix(pix)
                } else if (tipoDePagamento === "CARTAO") {
                    cartao += total;
                    setTotalCartao(cartao)
                } else {
                    dinheiro += total;
                    setTotalDinheiro(dinheiro)
                }
            });
        } else {
            setTotalPix(0);
            setTotalCartao(0);
            setTotalDinheiro(0);
        }
    }, [itens]);

    const entitiesToday = async () => {
        await ServiceDashboard.entitiesToday().then((response) => {
            const {entities, header} = response;
            setItens(entities);
            setHeader(header);
        });
    }

    return (
        <>
            <div className={"modalBody-fields-values"}>
                <div>
                    <label>Ganhos Totais</label>
                    <strong>{totalHoje}</strong>
                </div>
                <div>
                    <label>Ganhos em Dinheiro</label>
                    <strong>{totalDinheiro?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) || "R$ 0"}</strong>
                </div>
                <div>
                    <label>Ganhos em Cartão</label>
                    <strong>{totalCartao?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) || "R$ 0"}</strong>
                </div>
                <div>
                    <label>Ganhos em PIX</label>
                    <strong>{totalPix?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) || "R$ 0"}</strong>
                </div>
            </div>
            {itens && header && <CustomTable
                header={header}
                itens={itens}
            />}
        </>
    )
}