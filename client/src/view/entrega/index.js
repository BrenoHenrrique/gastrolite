import React, {useState} from "react";
import FormProdEntregas from "./inputs-produto";
import FormClientEntregas from "./inputs-cliente";
import TableCompra from "../../component/table-compra";
import {ServiceVendaRapida} from "../../service/serviceVendaRapida";
import {ServiceCardapio} from "../../service/serviceCardapio";
import "./style.css";

export default function Entregas() {

    const [showConfirm, setShowConfirm] = useState(false);
    const [idRemove, setIdRemove] = useState(null);
    const [idProduct, setIdproduct] = useState(null);
    const [itemFound, setItemFound] = useState(null);
    const [idSale, setSale] = useState(null);
    const [entity, setEntity] = useState(null);
    const [total, setTotal] = useState(0);
    const [itens, setItens] = useState([]);
    const columns = ["CODIGO", "ITEM", "QUANTIDADE", "VALOR UNIDADE", "VALOR SOMA"]

    const listItens = async () => {
        await ServiceVendaRapida.list(idSale).then(response => {
            setItens(response.itens);
        });
    }

    async function saveItem() {
        let entitySave = {
            idVenda: idSale,
            ...entity
        }
        await ServiceVendaRapida.save(entitySave);
        await listItens();
    }

    async function searchProduct() {
        let entity = {
            field: "id Produto",
            value: idProduct
        }
        await ServiceCardapio.list(entity).then(res => {
            setItemFound(res.entities);
        });
    }

    const handleClick = (id) => {
        setShowConfirm(true);
        setIdRemove(id);
    }

    const handleTotal = (value) => {
        setTotal(value ?? 0);
    }

    return (
        <main className={"entregas-container-principal"}>
            <h2 className={"title-screen"}>Entregas</h2>
            <div className={"entregas-div-superior"}>
                <label>Total</label>
                <p>R$ 373,77</p>
            </div>
            <div className={"entregas-container-produto"}>
                <FormProdEntregas
                    saveItem={saveItem}
                    handleId={setIdproduct}
                    searchProduct={searchProduct}
                    itemFound={itemFound}
                    entityCallBack={setEntity}
                    handleFinalizar={{}}
                />
            </div>
            <div className={"entregas-container-cliente"}>
                <div className={"entregas-div-table"}>
                    <TableCompra
                        columns={columns}
                        itens={itens}
                        handleClick={handleClick}
                        totalVenda={handleTotal}
                    />
                </div>
                <FormClientEntregas/>
            </div>
        </main>
    )
}