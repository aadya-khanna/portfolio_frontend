import React from "react";


export default function Polaroid({ src, alt, caption, tilt = "right" }) {
  const rotation = tilt === "left" ? "rotate-[-5deg]" : "rotate-[5deg]";

  return (
    <div
      className={`relative bg-white rounded-sm shadow-md p-2 w-fit group transform ${rotation} hover:rotate-0 transition-all duration-300 hover:scale-105`}
    >
      <img
        src={src}
        alt={alt}
        className="w-40 h-52 object-cover"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 rounded-sm">
        <p className="text-[15px] text-white font-plein transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-center">
          {caption}
        </p>
      </div>
    </div>
  );
}
