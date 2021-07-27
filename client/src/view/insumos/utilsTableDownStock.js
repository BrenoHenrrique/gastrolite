import React, {useEffect, useState} from "react";
import {ServiceInsumos} from "../../service/serviceInsumos";
import HeaderTable from "../../component/custom-table/header-table";
import CustomTable from "../../component/custom-table";
import {Spin} from "antd";

export default function ModalBodyTableDownStock() {

    const [value, setValue] = useState(null);
    const [itens, setItens] = useState(null);
    const [header, setHeader] = useState(null);
    const [loading, setLoading] = useState(true);
    const [headerFilter, setHeaderFilter] = useState(null);

    useEffect(() => {
        getList("");
    }, []);

    useEffect(() => {
        if (value) {
            setLoading(true);
            getList();
        }
    }, [value]);

    const getList = async () => {
        await ServiceInsumos.listDownStock(value).then(res => {
            const {columns, entities} = res;
            let colunas = columns.filter((item) => item === "nome" || item === "data");
            setHeaderFilter(colunas);
            setHeader(columns);
            setItens(entities);
            setLoading(false);
        });
    }

    return (
        <Spin spinning={loading}>
            <header className={"customTable-container-header"}>
                <HeaderTable
                    headerBody={headerFilter || []}
                    widthInput={300}
                    onClick={setValue}
                />
            </header>
            <CustomTable
                header={header}
                itens={itens}
            />
        </Spin>
    )
}