import React, {useState} from "react";
import {Button, Input, DatePicker} from "antd";
import "moment/locale/pt-br";
import "./style.css";

export default function HeaderTable({headerBody, widthInput, onClick}) {

    const {RangePicker} = DatePicker;
    const [value, setValue] = useState(null);

    const handleRangeDate = (value) => {
        console.log(value)
    }

    const formatDatePickLabel = (value) => {
        let diaExtenso = value.format("dddd");
        let diaMes = value.format("DD");
        let mes = value.format("MMMM");
        let ano = value.format("YYYY");
        return `${diaExtenso} ${diaMes} de ${mes} ${ano}`;
    }

    return (
        <section className={"headerTable-container-principal"}>
            {headerBody?.map((body, index) => {
                return (
                    <>
                        {body !== "data" ?
                            <div key={index} className={"headerTable-container-fields"}>
                                <label>{body.toUpperCase()}</label>
                                <Input
                                    key={index}
                                    style={{width: widthInput}}
                                    onChange={event => setValue({field: body, value: event.target.value})}
                                    value={value?.value}
                                />
                            </div>
                            :
                            <div key={index} className={"headerTable-container-fields-date"}>
                                <label style={{marginLeft: 5}}>{body.toUpperCase()}</label>
                                <RangePicker
                                    style={{margin: "0 5px"}}
                                    showToday={false}
                                    onChange={handleRangeDate}
                                    format={formatDatePickLabel}
                                />
                            </div>
                        }
                    </>

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