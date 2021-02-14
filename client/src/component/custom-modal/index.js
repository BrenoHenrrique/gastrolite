import React from "react";
import {GrFormClose} from "react-icons/gr"
import "./style.css";

export default function CustomModal({open, title, modalBody, width, height}) {

    const handleClose = () => {
        open(false);
    }

    return (
        <section className={"customModal-container"}>
            <>
                <div
                    className={"customModal-body"}
                    style={{width: width, height: height}}
                >
                    <header className={"customModal-header"}>
                        <GrFormClose
                            onClick={() => handleClose()}
                        />
                        <div className={"customModal-container-title"}>
                            <h2>{title}</h2>
                        </div>
                    </header>
                    {modalBody.map((body, index) => {
                        return (
                            <div key={index} className={"customModal-container-fields"}>
                                <label>{body.toUpperCase()}</label>
                                <input key={index}/>
                            </div>
                        );
                    })}
                    <footer className={"customModal-footer"}>
                        <button
                            className={"customModal-footer-salvar"}
                            onClick={() => {}}
                        >SALVAR</button>
                        <button
                            className={"customModal-footer-cancelar"}
                            onClick={() => handleClose()}
                        >CANCELAR</button>
                    </footer>
                </div>
            </>
        </section>
    );
}