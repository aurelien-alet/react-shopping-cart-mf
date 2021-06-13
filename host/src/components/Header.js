import React, { Component } from "react";
import { findDOMNode } from "react-dom";

// import Cart from 'cart/Cart';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DynamicCart: null,
      showCart: false,
      cart: this.props.cartItems,
      mobileSearch: false
    };
  }
  handleCart = async (e) => {
    e.preventDefault();
    this.setState({
      showCart: !this.state.showCart
    });
    const Cart = await import('cart/Cart');
    this.setState({
      DynamicCart: Cart.default
    });
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  handleMobileSearch(e) {
    e.preventDefault();
    this.setState({
      mobileSearch: true
    });
  }
  handleSearchNav(e) {
    e.preventDefault();
    this.setState(
      {
        mobileSearch: false
      },
      function() {
        this.refs.searchBox.value = "";
        this.props.handleMobileSearch();
      }
    );
  }
  handleClickOutside(event) {
    const cartNode = findDOMNode(this.refs.cartPreview);
    const buttonNode = findDOMNode(this.refs.cartButton);
    if (cartNode && cartNode.classList.contains("active")) {
      if (!cartNode || !cartNode.contains(event.target)) {
        this.setState({
          showCart: false
        });
        event.stopPropagation();
      }
    }
  }
  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }
  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }
  render() {
    const { DynamicCart } = this.state;
    return (
      <header>
        <div className="container">
          <div className="brand">
            <img
              className="logo"
              src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png"
              alt="Veggy Brand Logo"
            />
          </div>

          <div className="search">
            <a
              className="mobile-search"
              href="#"
              onClick={this.handleMobileSearch.bind(this)}
            >
              <img
                src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png"
                alt="search"
              />
            </a>
            <form
              action="#"
              method="get"
              className={
                this.state.mobileSearch ? "search-form active" : "search-form"
              }
            >
              <a
                className="back-button"
                href="#"
                onClick={this.handleSearchNav.bind(this)}
              >
                <img
                  src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png"
                  alt="back"
                />
              </a>
              <input
                type="search"
                ref="searchBox"
                placeholder="Search for Vegetables and Fruits"
                className="search-keyword"
                onChange={this.props.handleSearch}
              />
              <button
                className="search-button"
                type="submit"
                onClick={this.handleSubmit.bind(this)}
              />
            </form>
          </div>

          <div className="cart">
            <div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>No. of items</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.totalItems}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Sub Total</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.total}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a
              className="cart-icon"
              href="#"
              onClick={this.handleCart.bind(this)}
              ref="cartButton"
            >
              <img
                className={this.props.cartBounce ? "tada" : " "}
                src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png"
                alt="Cart"
              />
              {this.props.totalItems ? (
                <span className="cart-count">{this.props.totalItems}</span>
              ) : (
                ""
              )}
            </a>
            {this.state.showCart &&
              <div
                className={"cart-preview active"}
                ref="cartPreview"
              >
                {/* <Cart
                  cartItems={this.props.cartItems}
                ></Cart> */}
                { DynamicCart && <DynamicCart cartItems={this.props.cartItems}></DynamicCart> }
                <div className="action-block">
                  <button
                    type="button"
                    className={this.state.cart.length > 0 ? " " : "disabled"}
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
