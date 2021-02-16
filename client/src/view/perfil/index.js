import React, {useState} from "react";
import "./style.css";
import CustomModal from "../../component/custom-modal";

export default function Perfil({status}) {

    const [open, setOpen] = useState(true);
    const modalBody = ["Nome", "Usuário", "Senha", "Confirme sua Senha"]

    const handleClose = (event) => {
        setOpen(event);
        status(event);
    }

    return (
        <>
            {open && <CustomModal
                open={handleClose}
                title={"Meu Perfil"}
                modalBody={modalBody}
                width={500}
                height={565}
            />}
        </>
    );
}