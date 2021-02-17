import React, {useEffect, useState} from "react";
import CustomTable from "../../component/custom-table";
import HeaderTable from "../../component/custom-table/header-table";
import {ServiceCardapio} from "../../service/serviceCardapio";
import CustomModal from "../../component/custom-modal";
import ModalBody from "./utils";
import "./style.css";

export default function Cardapio() {

    const [header, setHeader] = useState(null);
    const [itens, setItens] = useState(null);
    const [entityEdit, setEntityEdit] = useState(null);
    const [entity, setEntity] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getList();
    }, []);


    async function getList() {
        await ServiceCardapio.list().then(res => {
            setHeader(res.columns);
            setItens(res.entities);
        });
    }

    const callBackEdit = (entity) => {
        setEntityEdit(entity);
        setShowModal(true);
    }

    const callBackDelete = (entity) => {

    }

    return (
        <>
            <h2 className={"title-screen"}>Cardápio</h2>
            <section className={"listaCardapio-container-principal"}>
                <div className={"listaCardapio-container-customTable"}>
                    <header className={"customTable-container-header"}>
                        <HeaderTable
                            headerBody={header}
                            widthInput={window.innerWidth < 1300 ? 200 : window.innerWidth > 1400 && window.innerWidth < 1500 ? 250 : 300}
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
            <CustomModal
                visible={showModal}
                title={"EDITAR"}
                onOk={() => {}}
                onCancel={setShowModal}
                width={600}
                okText={"LOGAR"}
                cancelText={"FECHAR"}
                centered={true}
                body={<ModalBody entityEdit={entityEdit}/>}
            />
        </>
    );
}