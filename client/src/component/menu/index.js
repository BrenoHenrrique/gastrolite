import React, {useState, useEffect, useContext} from "react";
import Logo from "../../images/gastrolite-logo.svg";
import {getUserLogged} from "../../service/auth";
import {IoMdClose} from "react-icons/io";
import {AiOutlineMenu} from "react-icons/ai";
import {Redirect, Link} from "react-router-dom";
import {UserContext} from "../../service/UserContext";
import "./style.css";

export default function Menu() {

    const {setIsLogged} = useContext(UserContext);
    const [userLogged, setUserLogged] = useState(null);
    const [logout, setLogout] = useState(false);
    const [openMenu, setOpenMenu] = useState(true);

    useEffect(() => {
        setUserLogged(getUserLogged());
    }, []);

    useEffect(() => {
        window.addEventListener("click", function(event) {
            if (event) {
                if (event.path[0].id === "menu-icone-open" || event.path[1].id === "menu-icone-open") {
                    setOpenMenu(false);
                } else {
                    setOpenMenu(true);
                }
            }
        });
    });

    function changeStates() {
        setLogout(true);
        setIsLogged(false);
    }

    return (
        <header className={"menu-header"}>
            <div className={"menu-div-principal"}>
                <div className={"menu-div-logo"}>
                    <img
                        alt={"logo menu"}
                        src={Logo}
                        height={50}
                        width={125}
                    />
                </div>
                <div
                    className={"menu-div-usuario"}
                    onClick={() => <Link to={"/"}/>}
                >
                    <label className={"menu-label-usuario"}>{userLogged?.nome.toUpperCase()}</label>
                </div>
                <div className={"menu-div-bot"}>
                    <button
                        className={"menu-bot"}
                        onClick={() => changeStates()}
                    >SAIR
                    </button>
                    {logout && <Redirect to={"/login"}/>}
                </div>
                <div className={"menu-div-icone"}>
                    {openMenu ? <AiOutlineMenu id={"menu-icone-open"} size={25} onClick={() => setOpenMenu(false)}/> :
                        <IoMdClose id={"menu-icone-close"} size={25} onClick={() => setOpenMenu(true)}/>}
                </div>
            </div>
            <div className={openMenu ? "menu-itens" : "menu-itens-drop"}>
                <Link to={"/"}>PÁGINA INICIAL</Link>
                <Link to={"/entregas"}>ENTREGAS</Link>
                <Link to={"/vendaRapida"}>VENDA RÁPIDA</Link>
                <Link to={"/mesas"}>MESAS</Link>
                <Link to={"/funcionarios"}>FUNCIONÁRIOS</Link>
                <Link to={"/estatisticas"}>ESTATÍSTICAS</Link>
                <Link to={"/perfil"}>MEU PERFIL</Link>
            </div>
        </header>
    );
}