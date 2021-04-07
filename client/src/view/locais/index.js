import React, {useEffect, useState} from "react";
import {ServiceLocais} from "../../service/serviceLocais";
import {Spin} from "antd";
import HandleMessage from "../../component/Alert";
import ButtonNew from "../../component/button-new";
import HeaderTable from "../../component/custom-table/header-table";
import CustomTable from "../../component/custom-table";
import CustomModal from "../../component/custom-modal";
import ModalBody from "./utils";
import ConfirmModal from "../../component/confirm-modal";

export default function Locais() {

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
        await ServiceLocais.list(value).then(res => {
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
        await ServiceLocais.save(entity).then(res => {
            getList();
            setResponse(res);
            setLoading(true);
        });
    }

    async function handleEdit() {
        await ServiceLocais.update({id: entityEdit.id, ...entity}).then(res => {
            getList();
            setResponse(res);
            setLoading(true);
        });
    }

    async function handleDelete(entity) {
        await ServiceLocais.delete(entity).then(res => {
            getList();
            setResponse(res);
            setLoading(true);
        });
    }

    return (
        <Spin spinning={loading}>
            <h2 className={"title-screen"}>Locais de Entrega</h2>
            <HandleMessage response={response}/>
            <section className={"clientes-container-principal"}>
                <ButtonNew onClick={openNewModal}/>
                <header>
                    <ButtonNew onClick={openNewModal}/>
                    <HeaderTable
                        headerBody={header}
                        widthInput={window.innerWidth < 1300 ? 250 : window.innerWidth > 1400 && window.innerWidth < 1500 ? 300 : 350}
                        onClick={setValue}
                    />
                </header>
                <CustomTable
                    header={header}
                    itens={itens}
                    callBackEdit={callBackEdit}
                    callBackDelete={callBackDelete}
                />
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
                        entityEdit={entityEdit}
                        entity={setEntity}
                    />
                }
            />}

            {showConfirm &&
            <ConfirmModal
                title={"DELETAR"}
                visible={showConfirm}
                onOk={() => handleDelete(entityDelete)}
                onCancel={setShowConfirm}
                body={
                    <p>Deseja deletar este item?</p>
                }
            />}
        </Spin>
    )
}