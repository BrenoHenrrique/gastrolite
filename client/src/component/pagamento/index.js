import React from "react";
import CustomModal from "../custom-modal";

export default function Pagamento({visible, handleOk, handleCancel}) {
    return (
        <CustomModal
            title={"Finalizar Compra"}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}
            centered={true}
            okText={"FINALIZAR"}
            cancelText={"CANCELAR"}
            body={body}
        />
    );
}

const body = () => {
    return (
        <>
            <div>

            </div>
        </>
    )
}