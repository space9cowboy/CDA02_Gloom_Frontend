"use client";
import React, { useState, useEffect } from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { useRouter } from "next/navigation";
import useIsLargeScreen from "@/components/useIsLargeScreen"; // Importer le hook

export function Title() {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { isLargeScreen } = useIsLargeScreen(); // Utiliser le hook pour détecter la taille de l'écran

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

  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }

    setBackgroundImage(getRandomImage());

    const interval = setInterval(() => {
      setBackgroundImage(getRandomImage());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Changer les words en fonction de la taille de l'écran
  const words = isLargeScreen
    ? [
        {
          text: "Bienvenue sur Gloom 𝄞 -",
          className: "text-neutral-50 dark:text-neutral-50",
        },
        {
          text: "Achetez 💵, vendez 🫱🏼‍🫲🏾, jouez 🎸.",
          className: "text-lime-700 dark:text-blue-500",
        },
        {
          text: "Profitez de la musique en grand 🎶.",
          className: "text-lime-700 dark:text-blue-500",
        },
      ]
      : [
        {
          text: "Bienvenue",
          className: "text-neutral-50 dark:text-neutral-50 text-3xl",
        },
        {
          text: "sur Gloom 𝄞",
          className: "text-lime-600 dark:text-blue-500 text-3xl",
        },
      ];
  const router = useRouter();

  const handleRedirectSignup = () => {
    router.push("/auth/signup");
  };
  const handleRedirectLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div className="relative w-full h-[60vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh]">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Couche d'opacité */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Contenu */}
      <div className="relative flex flex-col items-center justify-center h-full z-10 px-4 md:px-8 lg:px-16 text-center">
        <TypewriterEffectSmooth words={words} />

        {!isAuthenticated && (
          <div className="mt-6">
            {isLargeScreen ? (
              // Afficher cette version sur les grands écrans
              <div className="flex space-x-4">
                <button className="w-60 h-14 text-lg bg-black border dark:border-white text-white rounded-xl" onClick={handleRedirectSignup}>
                  S'inscrire
                </button>
                <button className="w-60 h-14 text-lg bg-white text-black border border-black rounded-xl" onClick={handleRedirectLogin}>
                  Se connecter
                </button>
              </div>
            ) : (
              // Afficher cette version sur les petits écrans
              <div className="flex flex-col space-y-4">
                <button className="w-[150px] h-12 text-lg bg-black border dark:border-white text-white rounded-xl" onClick={handleRedirectSignup}>
                  S'inscrire
                </button>
                <button className="w-full h-12 text-lg bg-white text-black border border-black rounded-xl" onClick={handleRedirectLogin}>
                  Se connecter
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}