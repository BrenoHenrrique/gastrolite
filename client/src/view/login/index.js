import React, {useState} from "react";
import Logo from "../../images/gastrolite-logo.svg";
import "./style.css";

export default function Login() {

    const [user, setUser] = useState(null);
    const [pass, setPass] = useState(null);

    function handleSubmit() {

    }

    return (
        <header className={"login-div-principal"}>
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
                            type={"text"}
                            className={"input-pass"}
                            placeholder={"Senha"}
                            name={"pass"}
                            onChange={event => setPass(event.target.value)}
                            value={pass}
                        />
                        <button
                            type={"submit"}
                            className={"login-bot-submit"}
                        >ENTRAR</button>
                    </form>
                </div>
            </div>
        </header>
    )
}