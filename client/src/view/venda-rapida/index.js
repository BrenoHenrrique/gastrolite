import React, {useEffect, useState} from "react";
import FormProdEntregas from "../entrega/inputs-produto";
import TableCompra from "../../component/table-compra";
import {ServiceCardapio} from "../../service/serviceCardapio";
import {ServiceVendaRapida} from "../../service/serviceVendaRapida";
import "./style.css";

export default function VendaRapida() {

    const columns = ["CODIGO", "ITEM", "QUANTIDADE", "VALOR UNIDADE", "VALOR SOMA"];
    const [idSale, setSale] = useState(null);
    const [entity, setEntity] = useState(null);
    const [idProduct, setIdproduct] = useState(null);
    const [itens, setItens] = useState([]);
    const [itemFound, setItemFound] = useState(null);

    useEffect(() => {
        createVenda();
    }, []);

    const createVenda = () => {
        ServiceVendaRapida.create().then(response => {
            sessionStorage.setItem("sale", JSON.stringify(response.id));
            setSale(response.id);
        });
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

    async function saveItem() {
        let entitySave = {
            idVenda: idSale,
            ...entity
        }
        await ServiceVendaRapida.save(entitySave);
        await ServiceVendaRapida.list(idSale).then(response => {
            setItens(response.itens);
        });
    }

    return (
        <>
            <h2 className={"title-screen"}>Venda Rápida</h2>
            <main className={"vendaRapida-container-principal"}>
                <div className={"vendaRapida-container-superior"}>
                    <label>Total</label>
                    <p>R$ 171,20</p>
                </div>
                <div className={"vendaRapida-container-produto"}>
                    <FormProdEntregas
                        saveItem={saveItem}
                        handleId={setIdproduct}
                        searchProduct={searchProduct}
                        itemFound={itemFound}
                        entityCallBack={setEntity}
                    />
                </div>
                <div className={"vendaRapida-container-table"}>
                    <TableCompra
                        columns={columns}
                        itens={itens}
                    />
                </div>
            </main>
        </>
    );
}