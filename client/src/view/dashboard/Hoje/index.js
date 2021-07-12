import React, {useState} from "react";
import {Tooltip} from "antd";
import {BsGraphUp, IoNewspaperOutline} from "react-icons/all";
import CustomModal from "../../../component/custom-modal";
import {ServiceImprimir} from "../../../service/serviceImprimir";
import {ServiceDashboard} from "../../../service/serviceDashboard";
import ModalBody from "./utils";
import "./style.css";

export default function Hoje({totalHoje}) {

    const [showModal, setShowModal] = useState(false);

    const imprimir = async () => {
        await ServiceImprimir.imprimirGanhosHoje();
    }

    return (
        <>
            <p>SEUS GANHOS HOJE</p>
            <label>{totalHoje}</label>
            <div className={"dashboard-tootip-view"}>
                <Tooltip title={"Imprimir Estatísticas"}>
                    <IoNewspaperOutline
                        size={35}
                        onClick={() => imprimir()}
                    />
                </Tooltip>
                <Tooltip title={"Visualizar Estatísticas"}>
                    <BsGraphUp
                        size={35}
                        onClick={() => setShowModal(true)}
                    />
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
                    <ModalBody/>
                }
            />
        </>
    );
}