import React, {useEffect, useState} from "react";
import HandleMessage from "../../component/Alert";
import ButtonNew from "../../component/button-new";
import ButtonHistory from "../../component/button-history";
import HeaderTable from "../../component/custom-table/header-table";
import CustomTable from "../../component/custom-table";
import CustomModal from "../../component/custom-modal";
import ConfirmModal from "../../component/confirm-modal";
import {ServiceInsumos} from "../../service/serviceInsumos";
import ModalBodyStock from "./utilsDownStock";
import ModalBody from "./utilsModalNew";
import {Spin} from "antd";
import "./style.css";

export default function Insumos() {

    const [header, setHeader] = useState(null);
    const [itens, setItens] = useState(null);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [entityEdit, setEntityEdit] = useState(null);
    const [entityDelete, setEntitydelete] = useState(null);
    const [entityDownStock, setEntityDownStock] = useState(null);
    const [entity, setEntity] = useState(null);
    const [response, setResponse] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [unidades, setUnidades] = useState([]);
    const [showModalDownStock, setShowModalDownStock] = useState(false);
    const [callBackStock, setCallBackStock] = useState(null);

    useEffect(() => {
        getList("");
    }, []);

    useEffect(() => {
        if (value) {
            setLoading(true);
            getList();
        }
    }, [value]);

    async function getList() {
        await ServiceInsumos.list(value).then(res => {
            const {columns, entities, unidades} = res;
            setHeader(columns);
            setItens(entities);
            setUnidades(unidades);
            setLoading(false);
        });
    }

    const callBackEdit = (entity) => {
        setEntityEdit(entity);
        setShowModal(true);
    }

    const callBackDelete = (entity) => {
        setEntitydelete(entity);
        setShowConfirm(true);
    }

    const callDownStock = (entity) => {
        setEntityDownStock(entity);
        setShowModalDownStock(true);
    }

    const openNewModal = () => {
        setShowModal(true);
        setEntityEdit(null);
        setEntity(null);
        setEntityDownStock(null);
    }

    async function handleSubmit() {
        await ServiceInsumos.save(entity).then(res => {
            getList();
            setResponse(res);
            setLoading(true);
        });
    }

    async function handleEdit() {
        await ServiceInsumos.update({id: entityEdit.id, ...entity}).then(res => {
            getList();
            setResponse(res);
            setLoading(true);
        });
    }

    async function handleDelete(entity) {
        await ServiceInsumos.delete(entity).then(res => {
            getList();
            setResponse(res);
            setLoading(true);
        });
    }

    async function handleDownStock() {
        console.log(callBackStock)
    }

    return (
        <Spin spinning={loading}>
            <h2 className={"title-screen"}>Insumos</h2>
            <HandleMessage response={response}/>
            <section className={"listaInsumos-container-principal"}>
                <div className={"listaInsumos-container-customTable"}>
                    <header className={"customTable-container-header"}>
                        <ButtonHistory onClick={() => {}}/>
                        <ButtonNew onClick={openNewModal}/>
                        <HeaderTable
                            headerBody={header ? [header[0]] : []}
                            widthInput={750}
                            onClick={setValue}
                        />
                    </header>
                    <CustomTable
                        header={header}
                        itens={itens}
                        callBackEdit={callBackEdit}
                        callBackDelete={callBackDelete}
                        callDownStock={callDownStock}
                    />
                </div>
            </section>

            {showModal && <CustomModal
                visible={showModal}
                title={entityEdit ? "EDITAR" : "NOVO"}
                onOk={() => entityEdit ? handleEdit() : handleSubmit()}
                onCancel={setShowModal}
                width={600}
                okText={"SALVAR"}
                cancelText={"CANCELAR"}
                centered={true}
                body={
                    <ModalBody
                        unidades={unidades}
                        entityEdit={entityEdit}
                        entity={setEntity}
                    />
                }
            />}

            {showModalDownStock && <CustomModal
                visible={showModalDownStock}
                title={"BAIXA NO ESTOQUE"}
                onOk={() => handleDownStock()}
                onCancel={setShowModalDownStock}
                width={600}
                okText={"SALVAR"}
                cancelText={"CANCELAR"}
                centered={true}
                body={
                    <ModalBodyStock
                        entityDownStock={entityDownStock}
                        callBackStock={setCallBackStock}
                    />
                }
            />}

            {showConfirm &&
            <ConfirmModal
                visible={showConfirm}
                onOk={() => handleDelete(entityDelete)}
                onCancel={setShowConfirm}
            />}
        </Spin>
    );
}
