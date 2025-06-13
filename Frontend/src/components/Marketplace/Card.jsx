import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/infoSlice.js"; // Adjust the import path as necessary

export default function Card({ name, price, imageUrl }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);

  const handleAddToCart = () => {
    dispatch(addToCart({ name, price, imageUrl, quantity }));
  };

  return (
    <div className="bg-[#5EA664] text-white rounded-2xl  h-80 w-full flex flex-col items-center shadow-lg mx-auto shadow-2xl">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-t-2xl rounded-b-none"
      />
      <div className="text-lg mb-2">{name}</div>
      <div className="flex items-center space-x-3 mb-2">
        <button
          onClick={decrement}
          className="bg-black text-white rounded-full w-8 h-8 flex justify-center items-center"
        >
          −
        </button>
        <div className="bg-yellow-100 text-black px-2 py-1 rounded-full text-sm">
          Q: {quantity}
        </div>
        <button
          onClick={increment}
          className="bg-black text-white rounded-full w-8 h-8 flex justify-center items-center"
        >
          +
        </button>
      </div>
      <div className="text-md mb-3">Rs.{price}</div>
      <button
        onClick={handleAddToCart}
        className="bg-white text-[#5EA664] font-semibold py-1 px-4 rounded-full hover:bg-yellow-200"
      >
        Add to Cart
      </button>
    </div>
  );
}
