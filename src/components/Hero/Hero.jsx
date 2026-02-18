import React from "react";
import { details } from "./data";
import empty from "../../assets/images/illustration-empty-cart.svg";
import cart from "../../assets/images/icon-add-to-cart.svg";
const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-left">
        <h1>Desserts</h1>
        <div className="hero-menu">
          {details.map((item, index) => {
            return (
              <div key={index}>
                <img src={item.image.desktop} alt={item.name} />
                <div className="button-overall">
                  <button className="add-button">
                    {" "}
                    <div className="add-container">
                      <img className="cart-img" src={cart} alt="cart" />
                      <p className="button-text">Add to Cart</p>
                    </div>
                  </button>
                </div>
                <p className="menu-category">{item.category}</p>
                <p className="menu-name">{item.name}</p>
                <p className="menu-price">${item.price}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hero-right">
        <p className="cart-text">Your cart(0)</p>
        <div className="cart-container">
          <img src={empty} alt="" />
        </div>
        <p className="cart-appear">Your added items will appear here</p>
      </div>
    </section>
  );
};

export default Hero;
