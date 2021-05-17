import React from "react";
import ReactDOM from "react-dom";
import Product from "./components/Product";


ReactDOM.render(
  <Product 
    price={48}
    name={"Cucumber - 1 Kg"}
    image={"https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg"}
    id={1}
  ></Product>, 
  document.getElementById("root-products")
);