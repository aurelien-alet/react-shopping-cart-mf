import React, { Component } from "react";
import CartScrollBar from "./CartScrollBar";
import EmptyCart from "../empty-states/EmptyCart";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import "../scss/style.scss";

class Cart extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cartItems,
    };
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
  }

  handleRemoveProduct(id, e) {
    var removeFromCartEvent = new CustomEvent("remove-from-cart", {
      detail: {
        id: id,
      }
    });
    window.dispatchEvent(removeFromCartEvent);

    e.preventDefault();
  }

  render() {
    let cartItems;
    cartItems = this.state.cart.map(product => {
      return (
        <li className="cart-item" key={product.name}>
          <img className="product-image" src={product.image} />
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
          <div className="product-total">
            <p className="quantity">
              {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
            </p>
            <p className="amount">{product.quantity * product.price}</p>
          </div>
          <a
            className="product-remove"
            href="#"
            onClick={this.handleRemoveProduct.bind(this, product.id)}
          >
            ×
          </a>
        </li>
      );
    });
    let view;
    if (cartItems.length <= 0) {
      view = <EmptyCart />;
    } else {
      view = (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="ul"
          className="cart-items"
        >
          {cartItems}
        </CSSTransitionGroup>
      );
    }
    return (
      <CartScrollBar>{view}</CartScrollBar>
    );
  }
}

export default Cart;
