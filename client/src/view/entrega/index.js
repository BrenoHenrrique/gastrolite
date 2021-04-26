import React, {useEffect, useState} from "react";
import FormProdEntregas from "./inputs-produto";
import FormClientEntregas from "./inputs-cliente";
import TableCompra from "../../component/table-compra";
import {ServiceEntrega} from "../../service/serviceEntrega";
import {ServiceCardapio} from "../../service/serviceCardapio";
import {ServiceImprimir} from "../../service/serviceImprimir";
import {ServiceCliente} from "../../service/serviceCliente";
import ConfirmModal from "../../component/confirm-modal";
import HandleMessage from "../../component/Alert";
import CustomModal from "../../component/custom-modal";
import ModalBody from "./modal-body/utils";
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
    const [total, setTotal] = useState(0.0);
    const [showPayment, setShowPayment] = useState(false);
    const [entregador, setEntregador] = useState(null);
    const [pago, setPago] = useState(null);
    const [taxa, setTaxa] = useState(null);
    const [clearFieldsForm, setClearFieldsForm] = useState(false);
    const [callBackCliente, setCallBackCliente] = useState(null);

    useEffect(() => {
        createVenda();
    }, []);

    const createVenda = () => {
        ServiceEntrega.create().then(response => {
            sessionStorage.setItem("sale", JSON.stringify(response.id));
            setSale(response.id);
            setClearFieldsForm(false);
        });
    }

    const listItens = async () => {
        await ServiceEntrega.list(idSale).then(response => {
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

    async function searchClient() {
        let entity = {
            field: "celular",
            value: cellphone
        }
        await ServiceCliente.list(entity).then(res => {
            if (res.entities.length === 1) {
                setClientFound(res.entities[0]);
            } else {
                setResponse({status: "error", message: "Não foi encontrado nenhum cliente com esse celular."});
            }
        });
    }

    async function saveItem() {
        let entitySave = {
            idVenda: idSale,
            ...entity
        }
        await ServiceEntrega.save(entitySave).then(async (res) => {
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
        await ServiceEntrega.delete(entityDelete).then(async (res) => {
            setResponse(res);
            await listItens();
        });
    }

    const showModalPayment = () => {
        let cliente = clientFound ?? callBackCliente;
        if (cliente.nome) {
            if (cliente.nome  && itens.length) {
                setShowPayment(true);
            } else {
                setResponse({status: "error", message: "Venda ao menos um item para finalizar a compra."});
            }
        } else {
            setResponse({status: "error", message: "Dados do cliente não pode ser vazio."});
        }
    }

    const finalizarCompra = async () => {
        let cliente = clientFound ?? callBackCliente;
        let entity = {
            idVenda: idSale,
            tipo: "entrega",
            entregador: entregador,
            pago: pago,
            taxa: taxa,
            cliente: {
                nome: cliente.nome,
                celular: cliente.celular,
                endereco: cliente.endereco,
                referencia: cliente.referencia
            }
        }
        await ServiceImprimir.imprimir(entity).then(async (res) => {
            setResponse(res);
        });
        resetStates();
        createVenda();
    }

    const handleTotal = (value) => {
        setTotal(value);
    }

    const resetStates = () => {
        setPago(null);
        setTaxa(null);
        setCellphone(null);
        setItemFound(null);
        setItens([]);
        setEntity(null);
        setEntregador(null);
        setIdRemove(null);
        setTotal(0.0);
        setIdproduct(null);
        setClearFieldsForm(true);
        setCallBackCliente(null);
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
                    handleFinalizar={() => showModalPayment()}
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
                    entityCallBack={setCallBackCliente}
                    disabledButton={!itens?.length}
                    clearFieldsForm={clearFieldsForm}
                />
            </div>
            <ConfirmModal
                visible={showConfirm}
                onCancel={setShowConfirm}
                onOk={() => confirmOk()}
                body={<p>Deseja excluir este item?</p>}
            />
            {showPayment && <CustomModal
                visible={showPayment}
                title={"FINALIZAR ENTREGA"}
                onOk={() => finalizarCompra()}
                onCancel={setShowPayment}
                width={600}
                okText={"FINALIZAR"}
                cancelText={"CANCELAR"}
                centered={true}
                maskClosable={false}
                body={
                    <ModalBody
                        cliente={clientFound ?? callBackCliente}
                        total={total}
                        entregador={setEntregador}
                        pagoCompra={setPago}
                        taxaEntrega={setTaxa}
                    />
                }
            />}
        </main>
    )
}