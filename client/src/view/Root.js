import React, {useState} from "react";
import Layout from "./Layout";
import Login from "./login";
import {UserContext} from "../service/UserContext";

export default function Root() {

    const [isLogged, setIsLogged] = useState(false);
    console.log(isLogged)

    return (
        <UserContext.Provider value={{isLogged, setIsLogged}}>
            {isLogged ? <Layout/> :  <Login/>}
        </UserContext.Provider>
    );
}