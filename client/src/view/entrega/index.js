import React, {useEffect, useState} from "react";
import FormProdEntregas from "./inputs-produto";
import FormClientEntregas from "./inputs-cliente";
import TableCompra from "../../component/table-compra";
import {ServiceVendaRapida} from "../../service/serviceVendaRapida";
import {ServiceCardapio} from "../../service/serviceCardapio";
import {ServiceImprimir} from "../../service/serviceImprimir";
import {ServiceCliente} from "../../service/serviceCliente";
import ConfirmModal from "../../component/confirm-modal";
import HandleMessage from "../../component/Alert";
import "./style.css";

export default function Entregas() {

    const columns = ["CODIGO", "ITEM", "QUANTIDADE", "VALOR UNIDADE", "VALOR SOMA"];
    const [idSale, setSale] = useState(null);
    const [entity, setEntity] = useState(null);
    const [idProduct, setIdproduct] = useState(null);
    const [cellphone, setCellphone] = useState(null);
    const [itens, setItens] = useState([]);
    const [itemFound, setItemFound] = useState(null);
    const [clientFound, setClientFound] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [idRemove, setIdRemove] = useState(null);
    const [response, setResponse] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        createVenda();
    }, []);

    const createVenda = () => {
        ServiceVendaRapida.create().then(response => {
            sessionStorage.setItem("sale", JSON.stringify(response.id));
            setSale(response.id);
        });
    }

    const listItens = async () => {
        await ServiceVendaRapida.list(idSale).then(response => {
            setItens(response.entities);
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

    async function searchClient() {
        let entity = {
            field: "celular",
            value: cellphone
        }
        await ServiceCliente.list(entity).then(res => {
            setClientFound(res.entities);
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
        await ServiceImprimir.imprimir({idVenda: idSale}).then(async (res) => {
            setResponse(res);
        });
    }

    const handleTotal = (value) => {
        setTotal(value);
    }

    return (
        <main className={"entregas-container-principal"}>
            <h2 className={"title-screen"}>Entregas</h2>
            <HandleMessage response={response}/>
            <div className={"entregas-div-superior"}>
                <label>Total</label>
                <p>{`R$ ${total}`}</p>
            </div>
            <div className={"entregas-container-produto"}>
                <FormProdEntregas
                    saveItem={saveItem}
                    handleId={setIdproduct}
                    searchProduct={searchProduct}
                    itemFound={itemFound}
                    entityCallBack={setEntity}
                    disabledButton={!itens?.length}
                    handleFinalizar={() => finalizarCompra()}
                />
            </div>
            <div className={"entregas-container-cliente"}>
                <div className={"entregas-div-table"}>
                    <TableCompra
                        columns={columns}
                        itens={itens}
                        handleClick={handleClick}
                        totalVenda={handleTotal}
                    />
                </div>
                <FormClientEntregas
                    handleCell={setCellphone}
                    searchClient={searchClient}
                    clientFound={clientFound}
                    entityCallBack={setEntity}
                    disabledButton={!itens?.length}
                />
            </div>
            <ConfirmModal
                visible={showConfirm}
                onCancel={setShowConfirm}
                onOk={() => confirmOk()}
                body={<p>Deseja excluir este item?</p>}
            />
        </main>
    )
}