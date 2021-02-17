import React from "react";
import {Modal} from "antd";

export default function CustomModal({body, visible, title, width, onCancel, cancelText, okText, afterClose, centered, onOk}) {

    const handleOk = () => {
        onOk();
        onCancel(false);
    }

    const handleCancel = () => {
        onCancel(false);
    }

    return (
        <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={width}
            cancelText={cancelText}
            okText={okText}
            afterClose={afterClose}
            centered={centered}
        >
            {body}
        </Modal>
    );
}