import React, { Component } from "react";
import PropTypes from "prop-types";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.dispatchQuantity = this.dispatchQuantity.bind(this);
  }

  dispatchQuantity(quantity) {
    var quantityEvent = new CustomEvent("quantity-change-" + this.props.id, {
      detail: {
        quantity: quantity
      }
    });
    window.dispatchEvent(quantityEvent);
  }

  increment(e) {
    this.setState(
      prevState => ({
        value: Number(prevState.value) + 1
      }),
      function() {
        this.dispatchQuantity(this.state.value);
      }
    );
    e.preventDefault();
  }

  decrement(e) {
    e.preventDefault();
    if (this.state.value <= 1) {
      return this.state.value;
    } else {
      this.setState(
        prevState => ({
          value: Number(prevState.value) - 1
        }),
        function() {
          this.dispatchQuantity(this.state.value);
        }
      );
    }
  }

  feed(e) {
    this.setState(
      {
        value: this.feedQty.value
      },
      function() {
        this.dispatchQuantity(this.state.value);
      }
    );
  }

  render() {
    return (
      <div className="stepper-input">
        <a href="#" className="decrement" onClick={this.decrement}>
          –
        </a>
        <input
          ref={el => this.feedQty = el}
          type="number"
          className="quantity"
          value={this.state.value}
          onChange={this.feed.bind(this)}
        />
        <a href="#" className="increment" onClick={this.increment}>
          +
        </a>
      </div>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number
};

export default Counter;
