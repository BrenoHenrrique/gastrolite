import React from "react";
import {Button} from "antd";
import "./style.css";

export default function ButtonHistory({onClick}) {

    const handleOnClick = () => {
        onClick();
    }

    return(
        <div className={"buttonHistory-container"}>
            <Button
                onClick={() => handleOnClick()}
                type={"primary"}
            >HISTÓRICO BAIXA</Button>
        </div>
    );
}