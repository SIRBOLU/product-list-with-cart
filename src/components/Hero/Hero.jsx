// import React from "react";
// import { details } from "./data";
// import empty from "../../assets/images/illustration-empty-cart.svg";
// import cart from "../../assets/images/icon-add-to-cart.svg";
// const Hero = () => {
//   return (
//     <section className="hero-container">
//       <div className="hero-left">
//         <h1>Desserts</h1>
//         <div className="hero-menu">
//           {details.map((item, index) => {
//             return (
//               <div key={index}>
//                 <img src={item.image.desktop} alt={item.name} />
//                 <div className="button-overall">
//                   <button className="add-button">
//                     {" "}
//                     <div className="add-container">
//                       <img className="cart-img" src={cart} alt="cart" />
//                       <p className="button-text">Add to Cart</p>
//                     </div>
//                   </button>
//                 </div>
//                 <p className="menu-category">{item.category}</p>
//                 <p className="menu-name">{item.name}</p>
//                 <p className="menu-price">${item.price}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <div className="hero-right">
//         <p className="cart-text">Your cart(0)</p>
//         <div className="cart-container">
//           <img src={empty} alt="" />
//         </div>
//         <p className="cart-appear">Your added items will appear here</p>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React, { useState } from "react";
import { details } from "./data";
import empty from "../../assets/images/illustration-empty-cart.svg";
import cartIcon from "../../assets/images/icon-add-to-cart.svg";

const Hero = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Add item to cart
  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((ci) => ci.name === item.name);

      if (existingItem) {
        return prevItems.map((ci) =>
          ci.name === item.name ? { ...ci, quantity: ci.quantity + 1 } : ci,
        );
      }

      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Decrease quantity
  const decreaseQuantity = (item) => {
    setCartItems((prevItems) =>
      prevItems
        .map((ci) =>
          ci.name === item.name ? { ...ci, quantity: ci.quantity - 1 } : ci,
        )
        .filter((ci) => ci.quantity > 0),
    );
  };

  // Total item count
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Total price (force number safety)
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * Number(item.price),
    0,
  );

  return (
    <>
      <section className="hero-container">
        <div className="hero-left">
          <h1>Desserts</h1>

          <div className="hero-menu">
            {details.map((item) => {
              const existingItem = cartItems.find(
                (ci) => ci.name === item.name,
              );

              return (
                <div key={item.name} className="menu-card">
                  <img
                    src={item.image?.desktop || item.image}
                    alt={item.name}
                  />

                  <div className="button-overall">
                    {existingItem ? (
                      <div className="quantity-control">
                        <button onClick={() => decreaseQuantity(item)}>
                          -
                        </button>

                        <span>{existingItem.quantity}</span>

                        <button onClick={() => handleAddToCart(item)}>+</button>
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
                    <p>{item.name}</p>
                    <p>
                      {item.quantity}x @ ${Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  <p>${(item.quantity * Number(item.price)).toFixed(2)}</p>
                </div>
              ))}

              <div className="cart-total">
                <p>Order Total</p>
                <p>${totalPrice.toFixed(2)}</p>
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
            <h2>Order Confirmed</h2>
            <p>We hope you enjoy your food!</p>

            {cartItems.map((item) => (
              <div key={item.name} className="cart-item">
                <div>
                  <p>{item.name}</p>
                  <p>
                    {item.quantity}x @ ${Number(item.price).toFixed(2)}
                  </p>
                </div>

                <p>${(item.quantity * Number(item.price)).toFixed(2)}</p>
              </div>
            ))}

            <div className="cart-total">
              <p>Order Total</p>
              <p>${totalPrice.toFixed(2)}</p>
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

// import React, { useState } from "react";
// import { details } from "./data";
// import empty from "../../assets/images/illustration-empty-cart.svg";
// import cartIcon from "../../assets/images/icon-add-to-cart.svg";

// const Hero = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [orderConfirmed, setOrderConfirmed] = useState(false);

//   const addToCart = (item) => {
//     const existing = cartItems.find((cartItem) => cartItem.name === item.name);

//     if (existing) {
//       setCartItems(
//         cartItems.map((cartItem) =>
//           cartItem.name === item.name
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem,
//         ),
//       );
//     } else {
//       setCartItems([...cartItems, { ...item, quantity: 1 }]);
//     }
//   };

//   const decreaseQuantity = (item) => {
//     const updated = cartItems
//       .map((cartItem) =>
//         cartItem.name === item.name
//           ? { ...cartItem, quantity: cartItem.quantity - 1 }
//           : cartItem,
//       )
//       .filter((cartItem) => cartItem.quantity > 0);

//     setCartItems(updated);
//   };

//   const totalItems = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0,
//   );

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.quantity * item.price,
//     0,
//   );

//   return (
//     <>
//       <section className="hero-container">
//         <div className="hero-left">
//           <h1>Desserts</h1>

//           <div className="hero-menu">
//             {details.map((item) => {
//               const cartItem = cartItems.find((c) => c.name === item.name);

//               return (
//                 <div key={item.name} className="menu-card">
//                   <img src={item.image.desktop} alt={item.name} />

//                   {cartItem ? (
//                     <div className="quantity-control">
//                       <button onClick={() => decreaseQuantity(item)}>-</button>

//                       <span>{cartItem.quantity}</span>

//                       <button onClick={() => addToCart(item)}>+</button>
//                     </div>
//                   ) : (
//                     <button
//                       className="add-button"
//                       onClick={() => addToCart(item)}
//                     >
//                       <img src={cartIcon} alt="cart" />
//                       Add to Cart
//                     </button>
//                   )}

//                   <p>{item.category}</p>
//                   <p>{item.name}</p>
//                   <p>${item.price.toFixed(2)}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="hero-right">
//           <h3>Your Cart ({totalItems})</h3>

//           {cartItems.length === 0 ? (
//             <>
//               <img src={empty} alt="empty cart" />
//               <p>Your added items will appear here</p>
//             </>
//           ) : (
//             <>
//               {cartItems.map((item) => (
//                 <div key={item.name} className="cart-item">
//                   <div>
//                     <p>{item.name}</p>
//                     <p>
//                       {item.quantity} x ${item.price.toFixed(2)}
//                     </p>
//                   </div>

//                   <p>${(item.quantity * item.price).toFixed(2)}</p>
//                 </div>
//               ))}

//               <div className="cart-total">
//                 <p>Order Total</p>
//                 <p>${totalPrice.toFixed(2)}</p>
//               </div>

//               <button onClick={() => setOrderConfirmed(true)}>
//                 Confirm Order
//               </button>
//             </>
//           )}
//         </div>
//       </section>

//       {orderConfirmed && (
//         <div className="modal">
//           <h2>Order Confirmed 🎉</h2>
//           <p>Enjoy your desserts!</p>

//           <button
//             onClick={() => {
//               setCartItems([]);
//               setOrderConfirmed(false);
//             }}
//           >
//             Start New Order
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Hero;
