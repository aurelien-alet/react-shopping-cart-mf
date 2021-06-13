import React from 'react'
import {hydrate} from 'react-dom'
import Cart from "./components/Cart";

hydrate(
    <Cart cartItems={[{id: 3, image: "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg", name: "Cucumber - 1 Kg", price: 48, quantity: 1}]}></Cart>,
    document.getElementById("root-cart")
)