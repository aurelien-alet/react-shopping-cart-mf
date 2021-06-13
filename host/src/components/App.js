import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";
import Products from "./Products";
import Footer from "./Footer";
import dataProducts from "../data/dataProducts";
import "../scss/style.scss";

class App extends Component {
    constructor() {
      super();
      this.state = {
        products: dataProducts,
        cart: [],
        totalItems: 0,
        totalAmount: 0,
        term: "",
        category: "",
        cartBounce: false,
        quickViewProduct: {},
        modalActive: false
      };
      this.handleSearch = this.handleSearch.bind(this);
      this.handleMobileSearch = this.handleMobileSearch.bind(this);
      this.handleCategory = this.handleCategory.bind(this);
      this.handleAddToCart = this.handleAddToCart.bind(this);
      this.sumTotalItems = this.sumTotalItems.bind(this);
      this.sumTotalAmount = this.sumTotalAmount.bind(this);
      this.checkProduct = this.checkProduct.bind(this);
      this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    }
  
    componentDidMount() {
      window.addEventListener("add-to-cart", this.handleAddToCart);
      window.addEventListener("remove-from-cart", this.handleRemoveProduct);
    }
  
    componentWillUnmount() {
      window.removeEventListener("add-to-cart", this.handleAddToCart);
      window.removeEventListener("remove-from-cart", this.handleRemoveProduct);
    }
  
    // Search by Keyword
    handleSearch(event) {
      this.setState({ term: event.target.value });
    }
    // Mobile Search Reset
    handleMobileSearch() {
      this.setState({ term: "" });
    }
    // Filter by Category
    handleCategory(event) {
      this.setState({ category: event.target.value });
      console.log(this.state.category);
    }
    // Add to Cart
    handleAddToCart(event) {
      let selectedProducts = event.detail;
      let cartItem = this.state.cart;
      let productID = selectedProducts.id;
      let productQty = selectedProducts.quantity;
      if (this.checkProduct(productID)) {
        console.log("hi");
        let index = cartItem.findIndex(x => x.id == productID);
        cartItem[index].quantity =
          Number(cartItem[index].quantity) + Number(productQty);
        this.setState({
          cart: cartItem
        });
      } else {
        cartItem.push(selectedProducts);
      }
      this.setState({
        cart: cartItem,
        cartBounce: true
      });
      setTimeout(
        function() {
          this.setState({
            cartBounce: false,
            quantity: 1
          });
          console.log(this.state.quantity);
          console.log(this.state.cart);
        }.bind(this),
        1000
      );
      this.sumTotalItems(this.state.cart);
      this.sumTotalAmount(this.state.cart);
    }
    handleRemoveProduct(event) {
      let cart = this.state.cart;
      let index = cart.findIndex(x => x.id == event.detail.id);
      cart.splice(index, 1);
      this.setState({
        cart: cart
      });
      this.sumTotalItems(this.state.cart);
      this.sumTotalAmount(this.state.cart);
    }
    checkProduct(productID) {
      let cart = this.state.cart;
      return cart.some(function(item) {
        return item.id === productID;
      });
    }
    sumTotalItems() {
      let total = 0;
      let cart = this.state.cart;
      total = cart.length;
      this.setState({
        totalItems: total
      });
    }
    sumTotalAmount() {
      let total = 0;
      let cart = this.state.cart;
      for (var i = 0; i < cart.length; i++) {
        total += cart[i].price * parseInt(cart[i].quantity);
      }
      this.setState({
        totalAmount: total
      });
    }
  
    render() {
      return (
        <div className="container">
          <Header
            cartBounce={this.state.cartBounce}
            total={this.state.totalAmount}
            totalItems={this.state.totalItems}
            cartItems={this.state.cart}
            removeProduct={this.handleRemoveProduct}
            handleSearch={this.handleSearch}
            handleMobileSearch={this.handleMobileSearch}
            handleCategory={this.handleCategory}
            categoryTerm={this.state.category}
            updateQuantity={this.updateQuantity}
            productQuantity={this.state.moq}
            />
          <Products
            productsList={this.state.products}
            searchTerm={this.state.term}
            />
          <Footer />
        </div>
      );
    }
  }

export default App;
