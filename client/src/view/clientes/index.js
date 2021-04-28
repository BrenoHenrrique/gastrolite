import React, {useEffect, useState} from "react";
import CustomTable from "../../component/custom-table";
import HeaderTable from "../../component/custom-table/header-table";
import {ServiceCliente} from "../../service/serviceCliente";
import ButtonNew from "../../component/button-new";
import CustomModal from "../../component/custom-modal";
import ModalBody from "../clientes/utils";
import ConfirmModal from "../../component/confirm-modal";
import HandleMessage from "../../component/Alert";
import {Spin} from "antd";
import "./style.css";

export default function Clientes() {

    const [header, setHeader] = useState(null);
    const [itens, setItens] = useState(null);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [entityEdit, setEntityEdit] = useState(null);
    const [entityDelete, setEntitydelete] = useState(null);
    const [entity, setEntity] = useState(null);
    const [response, setResponse] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

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
        await ServiceCliente.list(value).then(res => {
            setHeader(res.columns);
            setItens(res.entities);
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

    const openNewModal = () => {
        setShowModal(true);
        setEntityEdit(null);
        setEntity(null);
    }

    async function handleSubmit() {
        await ServiceCliente.save(entity).then(res => {
            getList();
            setResponse(res);
            setLoading(true);
        });
    }

    async function handleEdit() {
        await ServiceCliente.update({id: entityEdit.id, ...entity}).then(res => {
            getList();
            setResponse(res);
            setLoading(true);
        });
    }

    async function handleDelete(entity) {
        await ServiceCliente.delete(entity).then(res => {
            getList();
            setResponse(res);
            setLoading(true);
        });
    }

    return (
        <Spin spinning={loading}>
            <h2 className={"title-screen"}>Clientes</h2>
            <HandleMessage response={response}/>
            <section className={"clientes-container-principal"}>
                <div className={"clientes-container-customTable"}>
                    <header>
                        <ButtonNew onClick={openNewModal}/>
                        <HeaderTable
                            headerBody={header}
                            widthInput={window.innerWidth < 1300 ? 150 : window.innerWidth > 1400 && window.innerWidth < 1500 ? 200 : 250}
                            onClick={setValue}
                        />
                    </header>
                    <CustomTable
                        header={header}
                        itens={itens}
                        callBackEdit={callBackEdit}
                        callBackDelete={callBackDelete}
                    />
                </div>
            </section>
            {showModal && <CustomModal
                visible={showModal}
                title={"EDITAR"}
                onOk={() => entityEdit ? handleEdit() : handleSubmit()}
                onCancel={setShowModal}
                width={600}
                okText={"SALVAR"}
                cancelText={"CANCELAR"}
                centered={true}
                body={
                    <ModalBody
                        entityEdit={entityEdit}
                        entity={setEntity}
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