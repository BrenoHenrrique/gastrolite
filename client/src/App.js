import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes/routes";
import "./global.css";

const App = () => (
    <BrowserRouter>
        <Routes/>
    </BrowserRouter>
);

export default App;
