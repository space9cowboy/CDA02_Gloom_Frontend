"use client"
import { SidebarDashboard } from "@/components/Sidebar";
import { Header, HeaderLog } from "@/components/Header";
import { useEffect, useState } from "react";

export default function Auth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier s'il y a un token dans le sessionStorage
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // L'utilisateur est authentifié
    }
  }, []);

    return (
      <div className="flex flex-col items-center justify-center h-screen">
      {isAuthenticated ? <HeaderLog /> : <Header />}
      
      <SidebarDashboard />
      
      </div>
    );
  }