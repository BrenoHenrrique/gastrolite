import React from "react";
import "./style.css";
import {Button, Input} from "antd";

export default function HeaderTable({headerBody, widthInput}) {

    return (
        <section className={"headerTable-container-principal"}>
            {headerBody?.map((body, index) => {
                return (
                    <div key={index} className={"headerTable-container-fields"}>
                        <label>{body.toUpperCase()}</label>
                        <Input key={index} style={{width: widthInput}}/>
                    </div>
                );
            })}
            <div className={"headerTable-container-bot"}>
                <Button>PESQUISAR</Button>
            </div>
        </section>
    );
}