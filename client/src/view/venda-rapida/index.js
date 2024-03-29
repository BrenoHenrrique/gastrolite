import React, {useEffect, useState} from "react";
import FormProdRapida from "../venda-rapida/inputs-produto";
import TableCompra from "../../component/table-compra";
import ConfirmModal from "../../component/confirm-modal";
import {ServiceCardapio} from "../../service/serviceCardapio";
import {ServiceVendaRapida} from "../../service/serviceVendaRapida";
import HandleMessage from "../../component/Alert";
import {ServiceImprimir} from "../../service/serviceImprimir";
import "./style.css";
import {ServicePagamento} from "../../service/servicePagamento";

export default function VendaRapida() {

    const columns = ["CODIGO", "ITEM", "QUANTIDADE", "VALOR UNIDADE", "VALOR SOMA"];
    const [idSale, setSale] = useState(null);
    const [entity, setEntity] = useState(null);
    const [idProduct, setIdproduct] = useState(null);
    const [itens, setItens] = useState([]);
    const [itemFound, setItemFound] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [idRemove, setIdRemove] = useState(null);
    const [response, setResponse] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        createVenda();
    }, []);

    const createVenda = () => {
        ServiceVendaRapida.create().then(response => {
            localStorage.setItem("sale", JSON.stringify(response.id));
            setSale(response.id);
        });
    }

    const listItens = async () => {
        await ServiceVendaRapida.list(idSale).then(response => {
            const {entities} = response;
            setItens(entities);
        });
    }

    async function searchProduct() {
        let entity = {
            field: "id Produto",
            value: idProduct
        }
        await ServiceCardapio.list(entity).then(res => {
            setItemFound(res.entities);
        });
    }

    async function saveItem() {
        let entitySave = {
            idVenda: idSale,
            ...entity
        }
        await ServiceVendaRapida.save(entitySave).then(async (res) => {
            setResponse(res);
            await listItens();
        });
    }

    const handleClick = (id) => {
        setShowConfirm(true);
        setIdRemove(id);
    }

    const confirmOk = async () => {
        let entityDelete = {idSale: idSale, idProduto: idRemove};
        await ServiceVendaRapida.delete(entityDelete).then(async (res) => {
            setResponse(res);
            await listItens();
        });
    }

    const finalizarCompra = async () => {
        const entidade = {
            idVenda: idSale,
            tipo: "vendaRapida",
            cliente: entity?.cliente,
            observacoes: entity?.observacoes
        }
        await ServiceImprimir.imprimir(entidade).then(async (res) => {
            setResponse(res);
        });

        await ServicePagamento.save(entidade);

        resetStates();
        createVenda();
    }

    const handleTotal = (value) => {
        setTotal(value);
    }

    const resetStates = () => {
        setItemFound(null);
        setItens([]);
        setEntity(null);
        setIdRemove(null);
        setTotal(0.0);
        setIdproduct(null);
    }

    return (
        <main>
            <h2 className={"title-screen"}>Venda Rápida</h2>
            <HandleMessage response={response}/>
            <main className={"vendaRapida-container-principal"}>
                <div className={"vendaRapida-container-superior"}>
                    <label>Total</label>
                    <p>{`R$ ${total}`}</p>
                </div>
                <div className={"vendaRapida-container-produto"}>
                    <FormProdRapida
                        saveItem={saveItem}
                        handleId={setIdproduct}
                        searchProduct={searchProduct}
                        itemFound={itemFound}
                        entityCallBack={setEntity}
                        disabledButton={!itens?.length}
                        handleFinalizar={() => finalizarCompra()}
                    />
                </div>
                <div className={"vendaRapida-container-table"}>
                    <TableCompra
                        columns={columns}
                        itens={itens}
                        handleClick={handleClick}
                        totalVenda={handleTotal}
                    />
                </div>
            </main>
            <ConfirmModal
                visible={showConfirm}
                onCancel={setShowConfirm}
                onOk={() => confirmOk()}
                body={<p>Deseja excluir este item?</p>}
            />
        </main>
    );
}