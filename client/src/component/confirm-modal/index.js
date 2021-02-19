import React from "react";
import CustomModal from "../custom-modal";

export default function ConfirmModal({visible, onCancel, onOk}) {
    return (
      <CustomModal
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        okText={"CONFIRMAR"}
        cancelText={"CANCELAR"}
        centered={true}
        title={"MODAL ESCOLHA"}
        width={500}
        body={<p>Deseja concluir esta ação?</p>}
      />
    );
}