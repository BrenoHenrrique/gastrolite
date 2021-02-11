import React, {useState} from "react";
import Layout from "./Layout";
import Login from "./login";
import {UserContext} from "../service/UserContext";
import {isAuthenticated} from "../service/auth";

export default function Root() {

    const [isLogged, setIsLogged] = useState(isAuthenticated());

    return (
        <UserContext.Provider value={{isLogged, setIsLogged}}>
            {isLogged === true || isLogged === null ? <Layout/> :  <Login/>}
        </UserContext.Provider>
    );
}