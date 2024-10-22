"use client"

import * as React from "react"
import { useEffect, useState } from "react";
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IconSearch } from '@tabler/icons-react';
// import jwt_decode from "jwt-decode";
import { decodeJwt } from "jose"; // Importation de jose pour décoder le JWT
import { useRouter } from "next/navigation"; // 
import axios from "axios";

import { cn } from "@/lib/utils"
//import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface UserPayload {
  username: string;
  email: string;
  // Ajoute d'autres propriétés si nécessaire
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Batteries",
    href: "/instrument/category/batteries",
    description:
      "Découvrez notre sélection de batteries",
  },
  {
    title: "Accessoires",
    href: "/instrument/category/accessoires",
    description:
      "Découvrez notre sélection d'accessoires pour vos instruments et plus",
  },
  {
    title: "Instruments à vent",
    href: "/instrument/category/instrument a vent",
    description:
      "Découvrez notre sélection d'instruments à vents",
  },
  {
    title: "Claviers",
    href: "/instrument/category/clavier",
    description: "Découvrez notre sélection de synthétiseur et de piano",
  },
  {
    title: "Guitares",
    href: "/instrument/category/guitare",
    description:
      "Découvrez notre sélection de guitares acoustiques et éléctriques",
  },
  {
    title: "Basses",
    href: "/instrument/category/basse",
    description:
      "Découvrez notre sélection de basses",
  },
]


export function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Nouveautés</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-cover bg-center p-6 no-underline outline-none focus:shadow-md bg-[url('https://images.unsplash.com/photo-1541667558913-5510fb3c7bd9?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
                    href="#vinyl"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium text-white">
                      Vinyles
                    </div>
                    <p className="text-sm leading-tight text-white">
                    Découvrez notre sélection de vynils de différentes époques
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="#basse" title="Basses">
                  Découvrez notre sélection de basses
              </ListItem>
              <ListItem href="#instrument-a-vent" title="Instruments à vent">
                  Découvrez notre sélection d'instruments à vent
              </ListItem>
              <ListItem href="#guitare" title="Guitares">
                  Découvrez notre sélection de guitares
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Catégories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/instrument/category/accessoires" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Accessoires
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function Header() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [instruments, setInstruments] = useState<any[]>([]); // Stocker tous les instruments
  const [filteredInstruments, setFilteredInstruments] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    axios
      .get("/api/instruments")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setInstruments(response.data.data); // Stocker les instruments à partir de response.data.data
        } else {
          console.error("Les données reçues ne sont pas un tableau d'instruments.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des instruments :", error);
      });
  }, []);
  

  useEffect(() => {
    if (searchTerm.length > 0 && Array.isArray(instruments)) {
      const filteredResults = instruments.filter((instrument) =>
        instrument.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInstruments(filteredResults);
      setShowDropdown(true);
    } else {
      setFilteredInstruments([]);
      setShowDropdown(false);
    }
  }, [searchTerm, instruments]);
  


  // Fonction pour gérer la redirection vers la page d'un instrument
  const handleRedirectInstrument = (instrumentId: number) => {
    router.push(`/instrument/${instrumentId}`);
    setShowDropdown(false); // Masquer la liste déroulante après la sélection
  };

  const handleRedirect = () => {
    router.push("/auth/signup"); // Redirection vers /dashboard
  };



  return (
    <div className="sticky bg-white top-0 w-full h-16 flex items-center justify-between px-4 z-[999]">
      <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-teal-300 via-green-700 to-neutral-700 bg-clip-text text-transparent font-special">
          GLOOM
        </Link>
      <Navbar />
      <div className="hidden md:flex w-full max-w-[35rem] items-center space-x-2 relative">
        {/* Barre de recherche */}
        <Input
          type="Search"
          placeholder="Recherche..."
          className="rounded-3xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" className="flex items-center space-x-2 bg-[#012611] text-white rounded-lg">
          <IconSearch size={20} />
        </Button>

        {/* Liste déroulante pour afficher les résultats */}
        {showDropdown && filteredInstruments.length > 0 && (
          <div className="absolute top-12 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
            {filteredInstruments.map((instrument) => (
              <div
                key={instrument.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRedirectInstrument(instrument.id)}
              >
                <p className="text-sm font-semibold">{instrument.title}</p>
                <p className="text-xs text-gray-500">{instrument.price} €</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <Button className="bg-[green] text-white rounded-2xl" type="button" onClick={() => router.push("/auth/signup")}>
          S'inscrire
        </Button>
        <Button className="bg-black text-white rounded-2xl" type="button" onClick={() => router.push("/auth/login")}>
          Ajouter une annonce
        </Button>
      </div>
    </div>
  );
}

export function HeaderMobile() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [instruments, setInstruments] = useState<any[]>([]); // Stocker tous les instruments
  const [filteredInstruments, setFilteredInstruments] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    axios
      .get("/api/instruments")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setInstruments(response.data.data); // Stocker les instruments à partir de response.data.data
        } else {
          console.error("Les données reçues ne sont pas un tableau d'instruments.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des instruments :", error);
      });
  }, []);
  

  useEffect(() => {
    if (searchTerm.length > 0 && Array.isArray(instruments)) {
      const filteredResults = instruments.filter((instrument) =>
        instrument.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInstruments(filteredResults);
      setShowDropdown(true);
    } else {
      setFilteredInstruments([]);
      setShowDropdown(false);
    }
  }, [searchTerm, instruments]);
  


  // Fonction pour gérer la redirection vers la page d'un instrument
  const handleRedirectInstrument = (instrumentId: number) => {
    router.push(`/instrument/${instrumentId}`);
    setShowDropdown(false); // Masquer la liste déroulante après la sélection
  };

  const handleRedirect = () => {
    router.push("/auth/signup"); // Redirection vers /dashboard
  };



  return (
    <div className="sticky bg-white top-0 w-full h-16 flex items-center justify-between px-4 z-[999]">
      <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-teal-300 via-green-700 to-neutral-700 bg-clip-text text-transparent font-special">
          GLOOM
        </Link>
     
        
      <div className="flex gap-4">
        <Button className="bg-black text-white rounded-2xl" type="button" onClick={() => router.push("/auth/login")}>
          Ajouter une annonce
        </Button>
      </div>
    </div>
  );
}

  export function HeaderLog() {
    const [userInfo, setUserInfo] = useState<UserPayload | null>(null);
    const router = useRouter(); // Initialiser le router pour gérer les redirections
  
    useEffect(() => {
      // Récupérer le token depuis le sessionStorage
      const token = sessionStorage.getItem("authToken");
  
      if (token) {
        try {
          // Décoder le token pour extraire les informations
          const decoded = decodeJwt(token); // Utilise decodeJwt pour décoder le JWT
  
          // Le JWT décodé contient les informations dans son payload
          const userPayload: UserPayload = {
            username: decoded.username as string,
            email: decoded.email as string,
          };
  
          setUserInfo(userPayload); // Mettre les infos utilisateur dans l'état
        } catch (error) {
          console.error("Erreur lors du décodage du token:", error);
        }
      }
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [instruments, setInstruments] = useState<any[]>([]); // Stocker tous les instruments
    const [filteredInstruments, setFilteredInstruments] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
  
    useEffect(() => {
      axios
        .get("/api/instruments")
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setInstruments(response.data.data); // Stocker les instruments à partir de response.data.data
          } else {
            console.error("Les données reçues ne sont pas un tableau d'instruments.");
          }
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des instruments :", error);
        });
    }, []);
    
    
    useEffect(() => {
      if (searchTerm.length > 0 && Array.isArray(instruments)) {
        const filteredResults = instruments.filter((instrument) =>
          instrument.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredInstruments(filteredResults);
        setShowDropdown(true);
  
      } else {
        setFilteredInstruments([]);
        setShowDropdown(false);
      }
    }, [searchTerm, instruments]);
    
  
  // Fonction pour gérer la redirection vers la page d'un instrument
  const handleRedirectInstrument = (instrumentId: number) => {
    router.push(`/instrument/${instrumentId}`);
    setShowDropdown(false); // Masquer la liste déroulante après la sélection
  };

  
    // Fonction pour rediriger vers /dashboard
    const handleRedirect = () => {
      router.push("/dashboard"); // Redirection vers /dashboard
    };

    return (
      <div className="sticky bg-white top-0 w-full h-16 flex items-center justify-between px-4 z-[999]">
        <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-green-500 to-green-700 bg-clip-text text-transparent font-special">
          GLOOM
        </Link>
        <Navbar />
        <div className="flex w-full max-w-[35rem] items-center space-x-2">
        <div className="flex w-full max-w-[35rem] items-center space-x-2 relative">
        {/* Barre de recherche */}
        <Input
          type="Search"
          placeholder="Search"
          className="rounded-3xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" className="flex items-center space-x-2 bg-[#012611] text-white rounded-lg">
          <IconSearch size={20} />
        </Button>

        {/* Liste déroulante pour afficher les résultats */}
        {showDropdown && filteredInstruments.length > 0 && (
          <div className="absolute top-12 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
            {filteredInstruments.map((instrument) => (
              <div
                key={instrument.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRedirectInstrument(instrument.id)}
              >
                <p className="text-sm font-semibold">{instrument.title}</p>
                <p className="text-xs text-gray-500">{instrument.price} €</p>
              </div>
            ))}
          </div>
        )}
      </div>
        </div>
        <div className="flex gap-4">
          <Button className="bg-black text-white rounded-2xl"  type="button" onClick={() => router.push("/dashboard/create-annonce")}>
            Ajouter une annonce
          </Button>
          <Button
            className="text-green-800 bg-white rounded-2xl hover:bg-green-800 hover:rounded-2xl hover:text-white"
            type="button"
            onClick={handleRedirect} // Ajouter l'événement onClick pour la redirection
          >
            {userInfo ? "Bonjour, " + userInfo.username : "Chargement..."}
          </Button>
        </div>
      </div>
    );
  }


  export function HeaderMobileLog() {
    const [userInfo, setUserInfo] = useState<UserPayload | null>(null);
    const router = useRouter(); // Initialiser le router pour gérer les redirections
  
    useEffect(() => {
      // Récupérer le token depuis le sessionStorage
      const token = sessionStorage.getItem("authToken");
  
      if (token) {
        try {
          // Décoder le token pour extraire les informations
          const decoded = decodeJwt(token); // Utilise decodeJwt pour décoder le JWT
  
          // Le JWT décodé contient les informations dans son payload
          const userPayload: UserPayload = {
            username: decoded.username as string,
            email: decoded.email as string,
          };
  
          setUserInfo(userPayload); // Mettre les infos utilisateur dans l'état
        } catch (error) {
          console.error("Erreur lors du décodage du token:", error);
        }
      }
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [instruments, setInstruments] = useState<any[]>([]); // Stocker tous les instruments
    const [filteredInstruments, setFilteredInstruments] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
  
    useEffect(() => {
      axios
        .get("/api/instruments")
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setInstruments(response.data.data); // Stocker les instruments à partir de response.data.data
          } else {
            console.error("Les données reçues ne sont pas un tableau d'instruments.");
          }
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des instruments :", error);
        });
    }, []);
    
    
    useEffect(() => {
      if (searchTerm.length > 0 && Array.isArray(instruments)) {
        const filteredResults = instruments.filter((instrument) =>
          instrument.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredInstruments(filteredResults);
        setShowDropdown(true);
  
      } else {
        setFilteredInstruments([]);
        setShowDropdown(false);
      }
    }, [searchTerm, instruments]);
    
  
  // Fonction pour gérer la redirection vers la page d'un instrument
  const handleRedirectInstrument = (instrumentId: number) => {
    router.push(`/instrument/${instrumentId}`);
    setShowDropdown(false); // Masquer la liste déroulante après la sélection
  };

  
    // Fonction pour rediriger vers /dashboard
    const handleRedirect = () => {
      router.push("/dashboard"); // Redirection vers /dashboard
    };

    return (
      <div className="sticky bg-white top-0 w-full h-16 flex items-center justify-between px-4 z-[999]">
        <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-green-500 to-green-700 bg-clip-text text-transparent font-special">
          GLOOM
        </Link>
        <div className="flex gap-4">
        <Button
            className="text-green-800 bg-white rounded-2xl hover:bg-green-800 hover:rounded-2xl hover:text-white"
            type="button"
            onClick={handleRedirect} // Ajouter l'événement onClick pour la redirection
          >
            {userInfo ? "Bonjour, " + userInfo.username : "Chargement..."}
          </Button>
        </div>
      </div>
    );
  }
  
