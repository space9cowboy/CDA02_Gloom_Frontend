"use client";
import { useEffect, useState } from "react";
import { Title } from "@/components/Title";
import { Header, HeaderLog } from "@/components/Header";
import { HeaderMobile, HeaderMobileLog } from "@/components/Header"; // Importer les headers mobiles
import { Category } from "@/components/Category";
import { ListCardsGuitar, ListCardsPiano, ListCardsRecent } from "@/components/ListCards";
import { Footer } from "@/components/Footer";
import { Carrousel } from "@/components/Carrousel";
import useIsLargeScreen from "@/components/useIsLargeScreen"; // Importer le hook

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isLargeScreen } = useIsLargeScreen(); // Utiliser le hook pour détecter la taille de l'écran

  useEffect(() => {
    // Vérifier s'il y a un token dans le sessionStorage
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // L'utilisateur est authentifié
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Utilise HeaderMobileLog si l'utilisateur est authentifié et que l'écran est petit, sinon HeaderMobile */}
      {/* Utilise HeaderLog si l'utilisateur est authentifié et que l'écran est large, sinon Header */}
      {isLargeScreen ? (
        isAuthenticated ? <HeaderLog /> : <Header />
      ) : (
        isAuthenticated ? <HeaderMobileLog /> : <HeaderMobile />
      )}

      <Title />
      <Carrousel />
      <ListCardsRecent />
      <ListCardsGuitar />
      <ListCardsPiano />
      <Footer />
    </div>
  );
}
