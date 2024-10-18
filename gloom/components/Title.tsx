"use client";
import React, { useState, useEffect } from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { useRouter } from "next/navigation"; //

export function Title() {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Ajout de l'état d'authentification

  const images = [
    "https://images.unsplash.com/photo-1684915521123-efdc534ee444?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1470019693664-1d202d2c0907?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1682745685000-e608a614bef5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1536387737404-8a6338574dd7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1664194583959-c44d377a7835?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1520037105415-d38a9c4a821a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1593697972646-2f348871bd56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1682391039938-e9782294c1a3?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1681683967405-7efef2cd810c?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  // Fonction pour sélectionner une image aléatoire
  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  useEffect(() => {
    // Vérification de l'authentification (si le token est présent dans sessionStorage)
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }

    // Initialisation avec une image aléatoire
    setBackgroundImage(getRandomImage());

    // Changement d'image toutes les 5 secondes
    const interval = setInterval(() => {
      setBackgroundImage(getRandomImage());
    }, 5000); // Change toutes les 5 secondes

    // Nettoyage de l'intervalle
    return () => clearInterval(interval);
  }, []);

  const words = [
    {
      text: "Bienvenue",
      className: "text-neutral-50 dark:text-neutral-50",
    },
    {
      text: "sur",
      className: "text-neutral-50 dark:text-neutral-50",
    },
    {
      text: "Gloom 𝄞 -",
      className: "text-lime-600 dark:text-blue-500",
    },
    {
      text: "Achetez, vendez, jouez. 💵🎸🎹🎺",
      className: "text-lime-700 dark:text-blue-500",
    },
  ];
  const router = useRouter();

  const handleRedirectSignup = () => {
    router.push("/auth/signup"); // Redirection vers /dashboard
  };
  const handleRedirectLogin = () => {
    router.push("/auth/login"); // Redirection vers /dashboard
  };
  return (
    <div className="relative w-full h-[60vh]">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Couche d'opacité */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Contenu */}
      <div className="relative flex flex-col items-center justify-center h-full z-10 ">
        <TypewriterEffectSmooth words={words} />
        {/* Afficher les boutons uniquement si l'utilisateur n'est pas authentifié */}
        {!isAuthenticated && (
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-6">
            <button className="w-40 h-10 rounded-xl bg-black border dark:border-white text-white text-sm" onClick={handleRedirectSignup}>
              S'inscrire
            </button>
            <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm" onClick={handleRedirectLogin}>
              Se connecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
