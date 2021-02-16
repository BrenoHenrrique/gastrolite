import React, {useState, useEffect, useContext} from "react";
import Logo from "../../images/gastrolite-logo.svg";
import {ServiceLogin} from "../../service/serviceLogin";
import {isAuthenticated} from "../../service/auth";
import {Redirect} from "react-router-dom";
import {UserContext} from "../../service/UserContext";
import "./style.css";
import {validateFields} from "../../component/InterfaceCliente";

export default function Login() {

    const {setIsLogged} = useContext(UserContext);
    const [user, setUser] = useState(null);
    const [pass, setPass] = useState(null);
    const [entity, setEntity] = useState(null);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if (auth) {
            setIsLogged(true);
        }
    }, [auth]);

    useEffect(() => {
        sessionStorage.removeItem("auth");
    }, []);

    useEffect(() => {
        setEntity({"nome": user, "senha": pass});
    }, [pass, user]);

    async function handleSubmit(event) {
        event.preventDefault();
        const inputUser = document.querySelector(".input-user");
        const inputPass = document.querySelector(".input-pass");
        if (validateFields([inputUser, inputPass])) {
            if (entity !== null) {
                await ServiceLogin.validate(entity).then(response => {
                    const {entityInstance} = response;
                    if (entityInstance) {
                        sessionStorage.setItem("auth", JSON.stringify(entityInstance));
                    }
                });
                if (isAuthenticated()) {
                    setAuth(true);
                }
            }
        }
    }

    return (
        <main className={"login-container-principal"}>
            <div className={"login-container-form"}>
                <div className={"login-logo"}>
                    <img
                        alt={"Logo GastroLite"}
                        src={Logo}
                    />
                </div>
                <div className={"login-container-acesso"}>
                    <label className={"login-label-acesso"}>Acesse sua conta</label>
                </div>
                <div className={"login-form-fields"}>
                    <form
                        method={"post"}
                        onSubmit={handleSubmit}
                    >
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