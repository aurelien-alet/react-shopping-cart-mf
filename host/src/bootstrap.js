import React from 'react'
import {hydrate} from 'react-dom'
import App from "./components/APp";

hydrate(
    <App></App>,
    document.getElementById("root")
)