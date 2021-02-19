import React, {useState} from "react";
import {Button, Input} from "antd";
import "./style.css";

export default function HeaderTable({headerBody, widthInput, onClick}) {

    const [value, setValue] = useState(null);

    return (
        <section className={"headerTable-container-principal"}>
            {headerBody?.map((body, index) => {
                return (
                    <div key={index} className={"headerTable-container-fields"}>
                        <label>{body.toUpperCase()}</label>
                        <Input
                            key={index}
                            style={{width: widthInput}}
                            onChange={event => setValue({field: body, value: event.target.value})}
                        />
                    </div>
                );
            })}
            <div className={"headerTable-container-bot"}>
                <Button
                    onClick={() => onClick(value)}
                >PESQUISAR</Button>
            </div>
        </section>
    );
}