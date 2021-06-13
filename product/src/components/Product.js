import React, { Component } from "react";
import QuickView from "./QuickView";

import "../scss/style.scss";

import Price from "price/Price";

class Product extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
      quickViewProduct: {},
      isAdded: false,
      modalActive: false,
      quantity: 1
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener("quantity-change-" + this.props.id, this.handleQuantityChange);
  }

  componentWillUnmount() {
    window.removeEventListener("quantity-change-" + this.props.id, this.handleQuantityChange);
  }

  handleQuantityChange(event) {
    this.setState(
      {
        quantity: event.detail.quantity
      }
    )
  }

  addToCart(image, name, price, id) {
    var addToCartEvent = new CustomEvent("add-to-cart", {
      detail: {
        image: image,
        name: name,
        price: price,
        id: id,
        quantity: this.state.quantity
      }
    });
    window.dispatchEvent(addToCartEvent);
    this.setState(
      {
        isAdded: true
      },
      function() {
        setTimeout(() => {
          this.setState({
            isAdded: false,
            selectedProduct: {}
          });
        }, 1500);
      }
    );
  }

  quickView(image, name, price, id) {
    this.setState(
      {
        quickViewProduct: {
          image: image,
          name: name,
          price: price,
          id: id
        }
      },
      function() {
        this.openModal(this.state.quickViewProduct);
      }
    );
  }

  // Open Modal
  openModal(product) {
    this.setState({
        quickViewProduct: product,
        modalActive: true
    });
  }

  // Close Modal
  closeModal() {
    this.setState({
      modalActive: false
    });
  }

  render() {
    let image = this.props.image;
    let name = this.props.name;
    let price = this.props.price;
    let id = this.props.id;
    return (
      <div className="product">
        <div className="product-image">
          <img
            src={image}
            alt={this.props.name}
            onClick={this.quickView.bind(
              this,
              image,
              name,
              price,
              id
            )}
          />
        </div>
        <h4 className="product-name">{this.props.name}</h4>
        <Price price={price} id={id}></Price>
        <div className="product-action">
          <button
            className={!this.state.isAdded ? "" : "added"}
            type="button"
            onClick={this.addToCart.bind(
              this,
              image,
              name,
              price,
              id
            )}
          >
            {!this.state.isAdded ? "ADD TO CART" : "✔ ADDED"}
          </button>
        </div>
        <QuickView
          product={this.state.quickViewProduct}
          openModal={this.state.modalActive}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

export default Product;
