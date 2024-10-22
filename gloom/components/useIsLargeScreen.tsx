import { useState, useEffect } from "react";

function useIsLargeScreen() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Définir la taille initiale de l'écran
    setIsLargeScreen(window.matchMedia("(min-width: 768px)").matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsLargeScreen(e.matches);
    };

    const mediaQuery = window.matchMedia("(min-width: 768px)");

    mediaQuery.addEventListener("change", handleResize);

    // Clean up l'événement à la désactivation du composant
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return {
    isLargeScreen
  };
}

export default useIsLargeScreen;
