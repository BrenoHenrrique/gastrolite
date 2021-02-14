import React, {useState} from "react";
import HeaderTable from "./header-table";
import TableItens from "./table-itens";
import "./style.css";
import CustomModal from "../custom-modal";

export default function CustomTable() {

    const [showModal, setShowModal] = useState(false);

    const headerBody = ["id", "nome", "preço"]
    const itens = [
        {
            id: "123456789",
            nome: "ARROZ NAMORADO",
            preco: "3,60"
        },
        {
            id: "234567891",
            nome: "FEIJÃO PAI JOÃO",
            preco: "4,80",
        },
        {
            id: "345678912",
            nome: "AÇUCAR ESTRELA",
            preco: "2,15",
        }
    ]

    const handleCloseModal = (event) => {
        setShowModal(event)
    }

    return (
        <main className={"customTable-container-principal"}>
            <div className={"customTable-container-botNovo"}>
                <button onClick={() => setShowModal(!showModal)}>NOVO</button>
            </div>
            <header className={"customTable-container-header"}>
                <HeaderTable headerBody={headerBody}/>
            </header>
            <section className={"customTable-container-body"}>
                <TableItens columns={headerBody} itens={itens}/>
            </section>
            {showModal &&
            <CustomModal
                open={handleCloseModal}
                title={"Cadastro"}
                modalBody={headerBody}
                width={500}
                height={450}
            />}
        </main>
    );
}