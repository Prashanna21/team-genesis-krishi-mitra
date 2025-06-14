import React, { useRef } from "react";

const CustomImage = ({ source, change }) => {
  const ref = useRef(null);

  const handleChange = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      change(file);
    }
  };

  return (
    <>
      <img
        src={source}
        onClick={() => ref.current.click()}
        className={`w-full h-128 rounded-xl bg-emerald-800 ${
          source === "/DetectionPageImg.jpg" ? "object-contain" : "object-cover"
        } cursor-pointer transition-all duration-300  hover:bg-emerald-900`}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={ref}
        className="hidden"
      />
    </>
  );
};

export default CustomImage;
