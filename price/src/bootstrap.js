import React from "react";
import ReactDOM from "react-dom";
import Price from "./components/Price";


ReactDOM.render(
  <Price 
    price={48}
    id={1}
  ></Price>, 
  document.getElementById("root-products")
);