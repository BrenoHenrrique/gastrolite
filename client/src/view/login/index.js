import React, {useState, useEffect} from "react";
import Logo from "../../images/gastrolite-logo.svg";
import {ServiceLogin} from "../../service/serviceLogin";
import {isAuthenticated} from "../../service/auth";
import {Redirect} from "react-router-dom";
import "./style.css";

export default function Login() {

    const [user, setUser] = useState(null);
    const [pass, setPass] = useState(null);
    const [entity, setEntity] = useState(null);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        sessionStorage.removeItem("auth");
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setEntity({"nome": user, "senha": pass});
        if (entity !== null) {
            await ServiceLogin.validate(entity).then(response => {
                const {entityInstance} = response;
                sessionStorage.setItem("auth", JSON.stringify(entityInstance));
            });
            if (isAuthenticated()) {
                setAuth(true);
            }
        }
    }

    return (
        <main className={"login-div-principal"}>
            <div className={"login-div-form"}>
                <div className={"login-logo"}>
                    <img
                        alt={"Logo GastroLite"}
                        src={Logo}
                    />
                </div>
                <div className={"login-div-acesso"}>
                    <label className={"login-label-acesso"}>Acesse sua conta</label>
                </div>
                <div className={"login-form-fields"}>
                    <form onSubmit={handleSubmit}>
                        <input
                            type={"text"}
                            className={"input-user"}
                            placeholder={"Usuário"}
                            name={"user"}
                            onChange={event => setUser(event.target.value)}
                            value={user}
                        />
                        <input
                            type={"password"}
                            className={"input-pass"}
                            placeholder={"Senha"}
                            name={"pass"}
                            onKeyPress={event => (event.keyCode === 13 || event.which === 13) && handleSubmit(event)}
                            onChange={event => setPass(event.target.value)}
                            value={pass}
                        />
                        <button
                            type={"submit"}
                            className={"login-bot-submit"}
                        >ENTRAR
                        </button>
                        {auth && <Redirect to={"/"}/>}
                    </form>
                </div>
            </div>
        </main>
    );
}