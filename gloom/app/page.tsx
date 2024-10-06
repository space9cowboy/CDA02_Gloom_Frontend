"use client"
import { useEffect, useState } from "react";
import { Title } from "@/components/Title";
import { Header, HeaderLog } from "@/components/Header";
import { Category } from "@/components/Category";
import { ListCardsGuitar, ListCardsPiano, ListCardsRecent } from "@/components/ListCards";
import { Footer } from "@/components/Footer";
import { Carrousel } from "@/components/Carrousel";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier s'il y a un token dans le sessionStorage
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // L'utilisateur est authentifié
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Utilise HeaderLog si l'utilisateur est authentifié, sinon Header */}
      {isAuthenticated ? <HeaderLog /> : <Header />}
      <Category />
      <Title />
      <ListCardsRecent />
      <Carrousel />
      <ListCardsGuitar />
      <ListCardsPiano />
      <Footer />
    </div>
  );
}
