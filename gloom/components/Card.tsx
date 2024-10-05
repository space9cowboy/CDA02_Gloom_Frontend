"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";

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
  // Troncature de la description à 100 caractères
  const truncatedDescription = description.length > 100
    ? `${description.slice(0, 100)}...`
    : description;

  return (
<BackgroundGradient className="rounded-[22px] max-w-xs sm:max-w-sm  bg-white dark:bg-zinc-900 shadow-lg h-full">
    <div className="rounded-[22px] max-w-xs sm:max-w-sm   bg-white dark:bg-zinc-900 shadow-lg h-full">
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
            <p className="text-sm text-gray-500">Marque: {brand}</p>
            <p className="text-sm text-gray-500">Modèle: {model}</p>
            <p className="text-sm text-gray-500">Localisation: {location}</p>
            <p className="text-sm text-gray-500">Statut: {status}</p>
            <p className="text-gray-700 mt-2">Vendu par: {seller}</p>
            <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
              <span>Acheter </span>
              <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                {price} €
              </span>
            </button>
        </div>
    </div>
      </BackgroundGradient>
  );
}
