import React, {useEffect, useState} from "react";
import CustomTable from "../../../component/custom-table";
import {ServiceDashboard} from "../../../service/serviceDashboard";

export default function ModalBody() {

    const [header, setHeader] = useState(null);
    const [itens, setItens] = useState(null);

    useEffect(() => {
        entitiesToday();
    }, []);

    const entitiesToday = async () => {
        await ServiceDashboard.entitiesToday().then((response) => {
            const {pagamentosHoje, header} = response;
            setItens(pagamentosHoje);
            setHeader(header);
        });
    }

    return (
        <>
            {itens && header && <CustomTable
                header={header}
                itens={itens}
            />}
        </>
    )
}