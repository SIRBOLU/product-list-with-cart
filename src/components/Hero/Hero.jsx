import { useState } from "react";
import { details } from "./data";
import empty from "../../assets/images/illustration-empty-cart.svg";
import cartIcon from "../../assets/images/icon-add-to-cart.svg";
import carbon from "../../assets/images/icon-carbon-neutral.svg";
import remove from "../../assets/images/icon-remove-item.svg";
import confirmOrder from "../../assets/images/icon-order-confirmed.svg";

const Hero = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Add item to cart
  const handleAddToCart = (item) => {
    let updatedCart = [...cartItems];
    let itemFound = false;

    for (let i = 0; i < updatedCart.length; i++) {
      if (updatedCart[i].name === item.name) {
        updatedCart[i].quantity += 1;
        itemFound = true;
        break;
      }
    }

    if (!itemFound) {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCartItems(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (item) => {
    let updatedCart = [];

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name === item.name) {
        let newQuantity = cartItems[i].quantity - 1;

        if (newQuantity > 0) {
          updatedCart.push({ ...cartItems[i], quantity: newQuantity });
        }
      } else {
        updatedCart.push(cartItems[i]);
      }
    }

    setCartItems(updatedCart);
  };

  // Remove item completely
  const handleRemoveItem = (item) => {
    let updatedCart = [];

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name !== item.name) {
        updatedCart.push(cartItems[i]);
      }
    }

    setCartItems(updatedCart);
  };

  // Total item count
  let totalItems = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalItems += cartItems[i].quantity;
  }

  // Total price
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].quantity * Number(cartItems[i].price);
  }

  return (
    <>
      <section className="hero-container">
        <div className="hero-left">
          <h1>Desserts</h1>

          <div className="hero-menu">
            {details.map((item) => {
              let existingItem = null;

              for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i].name === item.name) {
                  existingItem = cartItems[i];
                  break;
                }
              }

              return (
                <div key={item.name} className="menu-card">
                  <div
                    className={`menu-image ${
                      existingItem ? "active-image" : ""
                    }`}
                  >
                    <img
                      src={item.image?.desktop || item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="button-overall">
                    {existingItem ? (
                      <div className="quantity-control">
                        <button
                          className="sign"
                          onClick={() => decreaseQuantity(item)}
                        >
                          -
                        </button>

                        <span className="sign">{existingItem.quantity}</span>

                        <button
                          className="sign"
                          onClick={() => handleAddToCart(item)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="add-button"
                        onClick={() => handleAddToCart(item)}
                      >
                        <div className="add-container">
                          <img className="cart-img" src={cartIcon} alt="cart" />
                          <p className="button-text">Add to Cart</p>
                        </div>
                      </button>
                    )}
                  </div>

                  <p className="menu-category">{item.category}</p>
                  <p className="menu-name">{item.name}</p>
                  <p className="menu-price">${Number(item.price).toFixed(2)}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hero-right">
          <p className="cart-text">Your Cart ({totalItems})</p>

          {cartItems.length === 0 ? (
            <>
              <div className="cart-container">
                <img src={empty} alt="Empty cart" />
              </div>
              <p className="cart-appear">Your added items will appear here</p>
            </>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.name} className="cart-item">
                  <div>
                    <p className="cart-item-name">{item.name}</p>
                    <p>
                      <span className="multiply">{item.quantity}x</span>{" "}
                      <span className="middle">
                        @ ${Number(item.price).toFixed(2)}
                      </span>
                      <span className="total-amount">
                        ${(item.quantity * Number(item.price)).toFixed(2)}
                      </span>
                    </p>
                  </div>

                  <div>
                    <button
                      className="remove-container"
                      onClick={() => handleRemoveItem(item)}
                    >
                      <img src={remove} alt="remove" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-total">
                <p className="cart-total-order">Order Total</p>
                <p className="cart-total-price">${totalPrice.toFixed(2)}</p>
              </div>

              <div className="carbon-container">
                <img src={carbon} alt="carbon" width={30} height={30} />
                <p className="carbon-text">
                  This is a <span className="carbon-span">carbon-neutral</span>{" "}
                  delivery
                </p>
              </div>

              <button
                className="confirm-button"
                onClick={() => setOrderConfirmed(true)}
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
      </section>

      {orderConfirmed && (
        <div className="modal-overlay">
          <div className="modal">
            <img src={confirmOrder} alt="order" width={40} height={40} />
            <h2>Order Confirmed</h2>
            <p className="hope">We hope you enjoy your food!</p>

            <div className="cart-item-confirm">
              <div className="modal-scroll">
                {cartItems.map((item) => (
                  <div key={item.name} className="cart-item">
                    <div className="cart-item-split">
                      <img
                        src={item.image.thumbnail}
                        alt="img"
                        width={50}
                        height={50}
                      />
                      <div>
                        <p className="cart-item-name">{item.name}</p>
                        <p>
                          <span className="multiply">{item.quantity}x</span>{" "}
                          <span className="middle">
                            @ ${Number(item.price).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>

                    <p className="total-amount">
                      ${(item.quantity * Number(item.price)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <p className="cart-total-order">Order Total</p>
                <p className="cart-total-price">${totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <button
              className="confirm-button"
              onClick={() => {
                setCartItems([]);
                setOrderConfirmed(false);
              }}
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
