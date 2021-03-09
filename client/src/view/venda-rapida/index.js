import React, {useEffect, useState} from "react";
import FormProdRapida from "../venda-rapida/inputs-produto";
import TableCompra from "../../component/table-compra";
import ConfirmModal from "../../component/confirm-modal";
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
    const [showConfirm, setShowConfirm] = useState(false);
    const [idRemove, setIdRemove] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        createVenda();
    }, []);

    const createVenda = () => {
        ServiceVendaRapida.create().then(response => {
            sessionStorage.setItem("sale", JSON.stringify(response.id));
            setSale(response.id);
        });
    }

    const listItens = async () => {
        await ServiceVendaRapida.list(idSale).then(response => {
            setItens(response.itens);
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
        await listItens();
    }

    const handleClick = (id) => {
        setShowConfirm(true);
        setIdRemove(id);
    }

    const confirmOk = async () => {
        let entityDelete = {idSale: idSale, idProduto: idRemove};
        await ServiceVendaRapida.delete(entityDelete);
        await listItens();
    }

    const handleTotal = (value) => {
        setTotal(value);
    }

    return (
        <>
            <h2 className={"title-screen"}>Venda Rápida</h2>
            <main className={"vendaRapida-container-principal"}>
                <div className={"vendaRapida-container-superior"}>
                    <label>Total</label>
                    <p>{`R$ ${total}`}</p>
                </div>
                <div className={"vendaRapida-container-produto"}>
                    <FormProdRapida
                        saveItem={saveItem}
                        handleId={setIdproduct}
                        searchProduct={searchProduct}
                        itemFound={itemFound}
                        entityCallBack={setEntity}
                        handleFinalizar={{}}
                    />
                </div>
                <div className={"vendaRapida-container-table"}>
                    <TableCompra
                        columns={columns}
                        itens={itens}
                        handleClick={handleClick}
                        totalVenda={handleTotal}
                    />
                </div>
            </main>
            <ConfirmModal
                visible={showConfirm}
                onCancel={setShowConfirm}
                onOk={() => confirmOk()}
                body={<p>Deseja excluir este item?</p>}
            />
        </>
    );
}