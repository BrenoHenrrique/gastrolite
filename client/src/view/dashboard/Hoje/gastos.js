import React, {useState} from "react";
import {ServiceImprimir} from "../../../service/serviceImprimir";
import {Tooltip} from "antd";
import {BsGraphUp, IoNewspaperOutline} from "react-icons/all";
import CustomModal from "../../../component/custom-modal";
import ModalBody from "./utils";

export default function GastosHoje({gastosHoje}) {
    const [showModal, setShowModal] = useState(false);

    const imprimir = async () => {
        await ServiceImprimir.imprimirGanhosHoje();
    }

    return (
        <>
            <p>SEUS GASTOS HOJE</p>
            <label id={"label-gastos"}>{gastosHoje}</label>
            <div className={"dashboard-tootip-view"}>
                <Tooltip title={"Imprimir Estatísticas"}>
                    {/*<IoNewspaperOutline*/}
                    {/*    size={35}*/}
                    {/*    onClick={() => imprimir()}*/}
                    {/*/>*/}
                </Tooltip>
                <Tooltip title={"Visualizar Estatísticas"}>
                    {/*<BsGraphUp*/}
                    {/*    size={35}*/}
                    {/*    onClick={() => setShowModal(true)}*/}
                    {/*/>*/}
                </Tooltip>
            </div>
            <CustomModal
                title={"Estatísticas Hoje"}
                visible={showModal}
                onCancel={setShowModal}
                maskClosable={false}
                width={800}
                okText={"OK"}
                cancelText={"SAIR"}
                centered={true}
                body={
                    <ModalBody totalHoje={gastosHoje}/>
                }
            />
        </>
    );
}