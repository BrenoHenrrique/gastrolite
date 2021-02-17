import React, {useState} from "react";
import "./style.css";

export default function Perfil({status}) {

    const [open, setOpen] = useState(true);

    const handleClose = (event) => {
        setOpen(event);
        status(event);
    }

    return (
        <>

        </>
    );
}