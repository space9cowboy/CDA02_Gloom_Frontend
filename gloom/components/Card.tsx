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
<BackgroundGradient className="rounded-[22px] max-w-[27rem]  bg-white dark:bg-zinc-900 shadow-lg h-full">
    <div className="rounded-[22px] max-w-[27rem]  bg-white dark:bg-zinc-900  shadow-lg h-full font-sans">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-t-[20px]" // Taille uniforme de l'image
        />
        
        <div className="p-4">
            <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
              {title}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {truncatedDescription}
            </p>
            <p className="text-sm text-gray-500">Marque: {truncate(brand, 15)}</p>
            <p className="text-sm text-gray-500">Modèle: {truncate(model, 15)}</p>
            <p className="text-sm text-gray-500">Localisation: {truncate(location, 15)}</p>
            <p className="text-sm text-gray-500">Statut: {truncate(status, 15)}</p>
            <p className="text-gray-700 mt-2">Vendu par: {truncate(seller, 15)}</p>

            <div className="flex items-center justify-between mt-4">
            {/* Icône Favoris avec nombre */}
            <div className="flex items-center space-x-1 text-gray-700 cursor-pointer" >
            <IconHeart className="w-5 h-5 text-red-500" />
            {/* <span>{favoritesCount}</span> */}
            </div>

        {/* Bouton Acheter */}
            <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black text-xs font-bold dark:bg-zinc-800">
            <span>Acheter</span>
            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                {price} €
            </span>
            </button>
             </div>
        </div>
        
    </div>
    
      </BackgroundGradient>
  );
}
