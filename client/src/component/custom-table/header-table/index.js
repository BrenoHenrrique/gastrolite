import React, {useState} from "react";
import CustomModal from "../../custom-modal";
import "./style.css";

export default function HeaderTable({headerBody, widthInput, heightModal}) {

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = (event) => {
        setShowModal(event)
    }

    return (
        <>
            <div className={"headerTable-container-botNovo"}>
                <button onClick={() => setShowModal(true)}>NOVO</button>
            </div>
            <section className={"headerTable-container-principal"}>
                {headerBody.map((body, index) => {
                    return (
                        <div key={index} className={"headerTable-container-fields"}>
                            <label>{body.toUpperCase()}</label>
                            <input key={index} style={{width: widthInput}}/>
                        </div>
                    );
                })}
                <div className={"headerTable-container-bot"}>
                    <button>PESQUISAR</button>
                </div>
            </section>
            {showModal &&
            <CustomModal
                open={handleCloseModal}
                title={"Cadastro"}
                modalBody={headerBody}
                width={500}
                height={heightModal}
            />}
        </>
    );
}