import React, { Component } from "react";
import Counter from "./Counter";
import "../scss/style.scss";

class Price extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let price = this.props.price;
    let id = this.props.id;
    let quantity = 0;
    return (
      <div className="price">
        <p className="product-price">{this.props.price}</p>
        <Counter id={this.props.id} />
      </div>
    );
  }
}

export default Price;
