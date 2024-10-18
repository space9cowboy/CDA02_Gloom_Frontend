"use client";
import { useState } from "react";
import Link from "next/link";

// Exemple de données de catégories - tu devrais les remplacer par ta propre source de données
const categories = [
  {
    id: 1,
    name: "Guitares",
    subCategories: [
      { id: 8, name: "Guitare Acoustique" },
      { id: 9, name: "Guitare Électrique" },
    ],
  },
  {
    id: 2,
    name: "Basses",
    subCategories: [
      { id: 10, name: "Basses Acoustique" },
      { id: 11, name: "Basses Électrique" },
    ],
  },
  {
    id: 3,
    name: "Batteries",
    subCategories: [
      { id: 12, name: "Batterie Électronique" },
      { id: 13, name: "Batterie Acoustique" },
      { id: 14, name: "Percussions" },
    ],
  },
  {
    id: 4,
    name: "Instruments à vent",
    subCategories: [
      { id: 15, name: "Saxophone" },
      { id: 16, name: "Trompette" },
      { id: 17, name: "Trombone" },
    ],
  },
  {
    id: 5,
    name: "Accessoires",
    subCategories: [],
  },
  {
    id: 6,
    name: "Claviers",
    subCategories: [],
  },
  {
    id: 7,
    name: "Vinyl",
    subCategories: [],
  },
];

export default function SidebarCategory() {
  // État pour gérer les menus déroulants
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  const toggleCategory = (id: number) => {
    if (openCategory === id) {
      setOpenCategory(null); // Fermer si déjà ouvert
    } else {
      setOpenCategory(id); // Ouvrir la catégorie
    }
  };

  return (
    <div className="w-[20rem] bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Catégories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            {/* Catégorie parent */}
            <div
              className="cursor-pointer flex justify-between items-center hover:bg-gray-700 p-2 rounded-md"
              onClick={() => toggleCategory(category.id)}
            >
              <span>{category.name}</span>
              {category.subCategories.length > 0 && (
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    openCategory === category.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              )}
            </div>

            {/* Sous-catégories */}
            {openCategory === category.id && category.subCategories.length > 0 && (
              <ul className="ml-4 mt-2 space-y-1">
                {category.subCategories.map((subCategory) => (
                  <li key={subCategory.id}>
                    <Link
                      href={`/instrument/category/${subCategory.name}`}
                      className="block p-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md"
                    >
                      {subCategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Si pas de sous-catégories */}
            {category.subCategories.length === 0 && (
              <Link
                href={`/instrument/category/${category.name}`}
                className="block p-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md"
              >
                {category.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
