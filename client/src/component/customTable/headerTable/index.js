import React from "react";
import "./style.css";

export default function HeaderTable({headerBody}) {

    return (
        <section className={"headerTable-container-principal"}>
            {headerBody.map((body, index) => {
                return (
                    <div key={index} className={"headerTable-container-fields"}>
                        <label>{body.toUpperCase()}</label>
                        <input key={index}/>
                    </div>
                );
            })}
            <div className={"headerTable-container-bot"}>
                <button>PESQUISAR</button>
            </div>
        </section>
    );
}