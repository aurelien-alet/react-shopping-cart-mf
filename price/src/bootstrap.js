import React from "react";
import {hydrate} from "react-dom";
import Price from "./components/Price";

hydrate(
  <Price price={48} id={1}></Price>, 
  document.getElementById("root-price")
);