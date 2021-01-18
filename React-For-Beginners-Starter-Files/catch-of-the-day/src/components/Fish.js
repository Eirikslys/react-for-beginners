import React from 'react';
import {formatPrice} from "../helpers";

class Fish extends React.Component {
  render() {
    const { image, name, price, desc, status } = this.props.details
    const isAvailable = status === "available";
    console.log(isAvailable)
    return (
      <li className="menu-fish">
        <img src={image} alt={this.props.details.name}/>
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable}>{isAvailable ? "Add To Cart" : "Sold Out!"}</button>
      </li>
    )
  }
}

export default Fish
