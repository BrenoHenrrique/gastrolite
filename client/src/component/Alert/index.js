import React, {useEffect, useState} from "react";
import {Alert} from "antd";
import "./style.css";

export default function HandleMessage({response}) {

    const [showMessage, setShowMessage] = useState(false);
    const [entity, setEntity] = useState(null);

    useEffect(() => {
        if (response) {
            setEntity(response);
        }
    }, [response]);

    useEffect(() => {
        if (entity) {
            setShowMessage(true);
            setTimeout(() => {
                setEntity(null);
            }, 5000);
        } else {
            setShowMessage(false);
        }
    }, [entity]);

    return (
        <>
            {showMessage && entity &&
                <div className={"alert-container"}>
                    <Alert type={entity.status} message={entity.message}/>
                </div>
            }
        </>
    );
}