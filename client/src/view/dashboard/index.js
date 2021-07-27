import React, {useEffect, useState} from "react";
import {ServiceDashboard} from "../../service/serviceDashboard";
import {Spin} from "antd";
import GanhosHoje from "./Hoje/ganhos";
import GastosHoje from "./Hoje/gastos";
import "./style.css";

export default function Dashboard() {

    const [entities, setEntities] = useState(null);
    const [totalHoje, setTotalHoje] = useState(0);
    const [gastosHoje, setGastosHoje] = useState(0);

    useEffect(() => {
        list();
    }, []);

    useEffect(() => {
        if (entities) {
            const {totalHoje, gastosHoje} = entities;
            setTotalHoje(totalHoje);
            setGastosHoje(gastosHoje);
        }
    }, [entities]);

    const list = async () => {
        await ServiceDashboard.list().then((response) => {
            setEntities(response);
        });
    }

    return (
        <Spin spinning={!entities}>
            <main className={"dashboard-container-principal"}>
                <h2 className={"title-screen"}>Painel de Controle</h2>
                <aside className={"aside-container-top"}>
                    <div className={"today-card-container"}>
                        <GanhosHoje totalHoje={totalHoje?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) || "R$ 0"}/>
                    </div>
                    <div className={"today-card-container"}>
                        <GastosHoje gastosHoje={gastosHoje?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) || "R$ 0"}/>
                    </div>
                    {/*<div className={"chart-week-container"}>*/}
                    {/*    <canvas id="chart-week"/>*/}
                    {/*</div>*/}
                </aside>
                {/*<aside className={"aside-container-bottom"}>*/}
                {/*    <div className={"chart-month-container"}>*/}
                {/*        <canvas id="chart-month"/>*/}
                {/*    </div>*/}
                {/*    <div className={"chart-year-container"}>*/}
                {/*        <canvas id="chart-year"/>*/}
                {/*    </div>*/}
                {/*</aside>*/}
            </main>
        </Spin>
    );
}