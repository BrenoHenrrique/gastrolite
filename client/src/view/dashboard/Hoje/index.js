import React, {useState} from "react";
import {Tooltip} from "antd";
import {AiOutlineEye} from "react-icons/all";
import CustomModal from "../../../component/custom-modal";
import ModalBody from "./utils";
import "./style.css";

export default function Hoje({totalHoje}) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p>SEUS GANHOS HOJE</p>
            <label>{totalHoje}</label>
            <div className={"dashboard-tootip-view"}>
                <Tooltip title={"Visualizar estatísticas"}>
                    <AiOutlineEye
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
                width={600}
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