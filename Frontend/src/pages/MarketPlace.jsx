import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Marketplace/Card";
import { removeFromCart } from "../app/infoSlice.js";
import { FaCartShopping } from "react-icons/fa6";

const vegetableData = [
  {
    id: 1,
    name: "Tomato",
    price: 40,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Bright_red_tomato_and_cross_section02.jpg",
  },
  {
    id: 2,
    name: "Potato",
    price: 30,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/Potato_with_cross_section.jpg",
  },
  {
    id: 3,
    name: "Carrot",
    price: 50,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Carrot.jpg",
  },
  {
    id: 4,
    name: "Broccoli",
    price: 80,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/03/Broccoli_and_cross_section_edit.jpg",
  },
  {
    id: 5,
    name: "Onion",
    price: 35,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/Onion_on_White.JPG",
  },
  {
    id: 6,
    name: "Cabbage",
    price: 25,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/5e/Cabbage_and_cross_section.jpg",
  },
  {
    id: 7,
    name: "Capsicum",
    price: 60,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/Yellow_capsicum.jpg",
  },
  {
    id: 8,
    name: "Cucumber",
    price: 20,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/96/Cucumber_on_white.jpg",
  },
  {
    id: 9,
    name: "Spinach",
    price: 45,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/Spinach_leaves.jpg",
  },
  {
    id: 10,
    name: "Brinjal",
    price: 55,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Eggplant.jpg",
  },
];

const MarketPlace = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const [isCartVisible, setCartVisible] = useState(false);

  const handleRemove = (name) => {
    dispatch(removeFromCart(name));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen">
      {/* Cart Icon Button */}
      <div className="fixed bottom-4 right-2 z-50">
        <button
          className="relative bg-[#222222] text-white p-4 rounded-full shadow-lg hover:bg-green-700"
          onClick={() => setCartVisible(!isCartVisible)}
        >
          <FaCartShopping />
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
              {totalQuantity}
            </span>
          )}
        </button>
      </div>

      {/* Marketplace Grid */}
      <div className="p-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {vegetableData.map((veg) => (
          <Card
            key={veg.id}
            name={veg.name}
            price={veg.price}
            imageUrl={veg.imageUrl}
            className="mx-auto"
          />
        ))}
      </div>

      {/* Cart Sidebar */}
      {isCartVisible && (
        <div className="fixed top-18 right-0 w-full sm:w-96 h-full bg-white border-l shadow-lg p-6 z-40 overflow-y-auto ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">🛒 Cart</h2>
            <button
              className="text-gray-500 hover:text-black text-xl"
              onClick={() => setCartVisible(false)}
            >
              ✖
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="space-y-3">
                {cartItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(item.name)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 font-bold text-lg">Total: ₹{total}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketPlace;
