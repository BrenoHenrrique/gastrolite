import React from "react";
import {Button} from "antd";
import "./style.css";

export default function ButtonNew({onClick}) {

    const handleOnClick = () => {
        onClick();
    }

    return(
      <div className={"buttonNew-container"}>
        <Button
            onClick={() => handleOnClick()}
            type={"primary"}
        >NOVO</Button>
      </div>
    );
}