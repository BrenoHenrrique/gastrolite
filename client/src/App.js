import React from 'react';
import {BrowserRouter} from "react-router-dom";
import "./global.css";
import "antd/dist/antd.css";
import Root from "./view/Root";

const App = () => (
    <BrowserRouter>
        <Root/>
    </BrowserRouter>
);

export default App;
