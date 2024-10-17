"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { IconHeart } from '@tabler/icons-react';

interface CardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  seller: string;
  brand: string;
  model: string;
  location: string;
  status: string;
}

export function Card({
  image,
  title,
  description,
  price,
  seller,
  brand,
  model,
  location,
  status,
}: CardProps) {
   // Troncature des champs à 15 caractères
   const truncate = (str: string, max: number) =>
    str.length > max ? `${str.slice(0, max)}...` : str;

  // Troncature de la description à 100 caractères
  const truncatedDescription = truncate(description, 40);

  return (
<BackgroundGradient className="rounded-[22px] max-w-[27rem] bg-white dark:bg-zinc-900 shadow-lg h-full">
  <div className="rounded-[22px] max-w-[27rem] bg-[#DCE4FD] dark:bg-zinc-900 shadow-lg h-full font-sans">
    {/* Image du produit */}
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover rounded-t-[20px]" // Taille uniforme de l'image
    />

    {/* Contenu du texte */}
    <div className="p-4">
      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">{brand}</p>
      <p className="text-lg font-bold text-green-800 dark:text-green-400">{title}</p>
      <p className="text-sm text-gray-500">{truncatedDescription}</p>
      <p className="text-sm text-gray-500">{seller}</p>
      
      {/* Prix */}
      <div className="mt-2">
        <span className="text-2xl font-bold text-[#012611] dark:text-green-300">{price} €</span>
      </div>

      {/* Bouton et Favoris */}
      <div className="flex items-center justify-between mt-4">
        {/* Icône Favoris avec nombre */}
        <div className="flex items-center space-x-1 text-gray-700 cursor-pointer">
          <IconHeart className="w-5 h-5 text-red-500" />
          {/* <span>{favoritesCount}</span> */}
        </div>

        {/* Bouton Voir le produit */}
        <button className="px-4 py-2 text-white bg-[#012611] rounded-3xl hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700">
          Voir le produit
        </button>
      </div>
    </div>
  </div>
</BackgroundGradient>

  );
}
