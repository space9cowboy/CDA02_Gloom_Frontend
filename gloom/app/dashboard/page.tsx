"use client"
import { SidebarDashboard } from "@/components/Sidebar";
import { Header, HeaderLog } from "@/components/Header";
import { useEffect, useState } from "react";
import {
  IconUserCircle,
  IconLogout,
  IconUserBolt,
  IconHome2,
  IconCirclePlus,
  IconMessage,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation"
import { decodeJwt } from "jose"; 
import { Sidebar, SidebarBody, SidebarLink, SidebarButton } from "@/components/ui/sidebar";
import DashboardProfile from "./profile/page";
import CreateAnnonce from "./create-annonce/page";
import { InstrumentCard } from "@/components/InstrumentCard";


interface UserPayload {
  username: string;
}
 
export default function Dashboard({ params }: { params: { username: string } }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconHome2 className="text-green-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Créer une annonce",
      href: "dashboard/create-annonce",
      icon: (
        <IconCirclePlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "dashboard/profile",
      icon: (
        <IconUserCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: "Messages",
      href: "dashboard/message",
      icon: (
        <IconMessage className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    
  ];

  const [open, setOpen] = useState(false);
  
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    router.push("/auth/login");
  };

  const [userInfo, setUserInfo] = useState<UserPayload | null>();
  const [userProfile, setUserProfile] = useState<any>(null);

  const [instruments, setInstruments] = useState<any[]>([]);
  const [instrumentsBuys, setInstrumentsBuys] = useState<any[]>([]);
  const [instrumentsSelled, setInstrumentsSelled] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string>("dashboard"); // État pour la page actuelle
  
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
        };

        setUserInfo(userPayload); // Mettre les infos utilisateur dans l'état
        
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
      }

    }
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`/api/user/${userInfo?.username}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        });

        if (!res.ok) {
          throw new Error(`Error fetching instrument with id ${params.username}`);
        }

        const data = await res.json();
        console.log(data);
        setUserProfile(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching instrument data:", error);
        setError("Error fetching instrument data");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userInfo?.username]);

  useEffect(() => {
    // Assurez-vous que instrument et seller existent avant de faire l'appel à l'API pour les suggestions
    if (userProfile && userProfile.id) {
      const fetchInstrumentsSelled = async () => {
        try {
          const res = await fetch(`/api/instruments/seller/${userProfile.id}`, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
          });

          if (!res.ok) {
            throw new Error(`Error fetching instruments for seller ${userProfile.id}`);
          }

          const data = await res.json();
          const filteredInstrumentsSelled = data.filter((instrumentSelled: any) => instrumentSelled.isSold === true || instrumentSelled.isSold === 1);
          setInstrumentsSelled(filteredInstrumentsSelled);
        } catch (error) {
          console.error("Error fetching instrument suggestions:", error);
          setError("Error fetching instrument suggestions");
        }
      };

      fetchInstrumentsSelled();
    }
  }, [userProfile]);

  console.log("selled :", instrumentsSelled)


  useEffect(() => {
    // Vérifier s'il y a un token dans le sessionStorage
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // L'utilisateur est authentifié
    }
  }, []);

  useEffect(() => {
    // Assurez-vous que instrument et seller existent avant de faire l'appel à l'API pour les suggestions
    if (userProfile && userProfile.id) {
      const fetchSuggestions = async () => {
        try {
          const res = await fetch(`/api/instruments/seller/${userProfile.id}`, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
          });

          if (!res.ok) {
            throw new Error(`Error fetching instruments for seller ${userProfile.id}`);
          }

          const data = await res.json();
         
        // Limiter à 3 suggestions
        setInstruments(data);
        } catch (error) {
          console.error("Error fetching instrument suggestions:", error);
          setError("Error fetching instrument suggestions");
        }
      };

      fetchSuggestions();
    }
  }, [userProfile]);

  console.log("test dashboard", instruments)

  useEffect(() => {
    // Assurez-vous que instrument et seller existent avant de faire l'appel à l'API pour les suggestions
    if (userProfile && userProfile.id) {
      const fetchSuggestions = async () => {
        try {
          const res = await fetch(`/api/instruments/buyer/${userProfile.id}`, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
          });

          if (!res.ok) {
            throw new Error(`Error fetching instruments for buyer ${userProfile.id}`);
          }

          const data = await res.json();
         
        // Limiter à 3 suggestions
        setInstrumentsBuys(data);
        } catch (error) {
          console.error("Error fetching instrument suggestions:", error);
          setError("Error fetching instrument suggestions");
        }
      };

      fetchSuggestions();
    }
  }, [userProfile]);

  console.log("test dashboard", instruments)



    return (
      <div className="flex flex-col items-center justify-center h-screen">
      {isAuthenticated ? <HeaderLog /> : <Header />}
      
      <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen flex-1  border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <div className="pb-5">
          <SidebarButton 
            label="Se déconnecter"
            onClick={handleLogout}
            icon={<IconLogout className="text-red-500 h-5 w-5 flex-shrink-0" />}
            className="text-red-500 hover:text-red-600"
          />
          </div>
            
          { userProfile && (
              <SidebarLink
                link={{
                  label: userProfile.username,
                  href: "#",
                  icon: (
                    <img
                      src={userProfile.image}
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
              
              
            )}
           
          </div>
        </SidebarBody>
        
      </Sidebar>
      {/* Afficher le composant en fonction de la page sélectionnée */}
      
      <div className=" overflow-y-auto">
  <div className="flex flex-col w-full p-6 space-y-8 min-h-screen ">
    {/* Message au-dessus de la liste des instruments */}
    <h2 className="text-xl font-bold text-center mb-4">
      Voici vos instruments disponibles
    </h2>
    {/* Grille pour afficher les cartes avec des espacements */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {instruments.length > 0 ? (
        instruments.map((instrument) => (
          <InstrumentCard key={instrument.id} instrument={instrument} />
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          Aucun instrument disponible pour l'instant.
        </p>
      )}
    </div>
  </div>

  <div className="flex flex-col w-full p-6 space-y-8 min-h-16">
    {/* Message au-dessus de la liste des instruments */}
    <h2 className="text-xl font-bold text-center mb-4">
      Historique des achats
    </h2>
    {/* Grille pour afficher les cartes avec des espacements */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {instrumentsBuys.length > 0 ? (
        instrumentsBuys.map((instrument) => (
          <InstrumentCard key={instrument.id} instrument={instrument} />
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          Aucun instrument disponible pour l'instant.
        </p>
      )}
    </div>
    
    
    
  </div>

  <div className="flex flex-col w-full p-6 space-y-8 min-h-16">
    {/* Message au-dessus de la liste des instruments */}
    <h2 className="text-xl font-bold text-center mb-4">
      Historique des ventes
    </h2>
    {/* Grille pour afficher les cartes avec des espacements */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {instrumentsSelled.length > 0 ? (
        instrumentsSelled.map((instrument) => (
          <InstrumentCard key={instrument.id} instrument={instrument} />
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          Aucun instrument disponible pour l'instant.
        </p>
      )}
    </div>
    
    
    
  </div>

  
  
          </div>
        </div>
      </div>
    );
  }