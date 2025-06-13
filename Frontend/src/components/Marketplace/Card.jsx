import React, { useState } from "react";

export default function Card({ name, price, imageUrl }) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="bg-[#5EA664] text-white rounded-2xl p-4 h-80 w-64 mx-auto flex flex-col items-center shadow-lg">
      <div className="rounded-xl mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-36 h-36 rounded-2xl object-cover"
        />
      </div>
      <div className="text-lg mb-2">{name}</div>
      <div className="flex items-center space-x-4 mb-2">
        <button
          onClick={decrement}
          className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-xl"
        >
          −
        </button>
        <div className="bg-yellow-100 text-black px-4 py-1 rounded-full">
          Q:{quantity}
        </div>
        <button
          onClick={increment}
          className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-xl"
        >
          +
        </button>
      </div>
      <div className="text-md">Rs.{price}</div>
    </div>
  );
}
