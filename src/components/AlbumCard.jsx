import React from "react";

export default function AlbumCard({ name, artist, image }) {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      <img
        src={image}
        alt={`${name} by ${artist}`}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute font-plein inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white text-center transition-opacity duration-300">
        <p className="font-bold">{name}</p>
        <p className="text-sm">{artist}</p>
      </div>
    </div>
  );
}
