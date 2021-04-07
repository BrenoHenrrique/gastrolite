import React from "react";
import CustomModal from "../custom-modal";

export default function ConfirmModal({title, visible, onCancel, onOk, body}) {
    return (
      <CustomModal
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        okText={"CONFIRMAR"}
        cancelText={"CANCELAR"}
        centered={true}
        title={title ?? "MODAL ESCOLHA"}
        width={500}
        body={body ?? <p>Deseja concluir esta ação?</p>}
      />
    );
}