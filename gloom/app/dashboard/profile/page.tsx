"use client"
import { SidebarDashboard } from "@/components/Sidebar";
import { Header, HeaderLog } from "@/components/Header";
import { useEffect, useState } from "react";
import {
  IconLogout,
  IconUserCircle,
  IconHome2,
  IconCirclePlus,
  IconMessage,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation"
import { decodeJwt } from "jose"; 
import { Sidebar, SidebarBody, SidebarLink, SidebarButton } from "@/components/ui/sidebar";

interface UserPayload {
  username: string;
}

interface UserProfile {
  username: string;
  email: string;
  image: string;
  reviewsReceived: Review[]; // Liste des reviews reçues
}

interface Review {
  id: number;
  comment: string;
  rating: number;
  reviewer: string; // Nom de l'utilisateur qui a donné l'avis
}

 
export default function DashboardProfile({ params }: { params: { username: string } }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const links = [
    {
        label: "Dashboard",
        href: "./",
        icon: (
          <IconHome2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: "Créer une annonce",
        href: "./create-annonce",
        icon: (
          <IconCirclePlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: "Profile",
        href: "#",
        icon: (
          <IconUserCircle className="text-green-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: "Messages",
        href: "./message",
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string>("dashboard"); // État pour la page actuelle
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newProfile, setNewProfile] = useState({
    username: "",
    email: "",
    image: "",
  });
  const router = useRouter(); // Initialiser le router pour gérer les redirections

  useEffect(() => {
    // Récupérer le token depuis le sessionStorage
    const token = sessionStorage.getItem("authToken");

    if (token) {
      try {
        // Décoder le token pour extraire les informations
        const decoded = decodeJwt(token); // Utilise decodeJwt pour décoder le JWT
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
        console.log(data);setUserProfile({
          ...data,
          reviewsReceived: data.reviewsReceived || [], // Initialise reviewsReceived à un tableau vide s'il n'existe pas
        });
        setNewProfile({
          username: data.username,
          email: data.email,
          image: data.image,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching instrument data:", error);
        setError("Error fetching instrument data");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userInfo?.username]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page); // Mettre à jour la page actuelle
  };


  const handleSaveClick = async () => {
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfile),
      });
      if (!res.ok) {
        throw new Error("Failed to update profile");
      }
      const updatedProfile = await res.json();
      setUserProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      setError("Failed to update profile");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    // Vérifier s'il y a un token dans le sessionStorage
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // L'utilisateur est authentifié
    }
  }, []);

  console.log(userProfile)

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
      <div className="container mx-auto p-6 max-h-screen overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Mon profil</h1>
        
        {/* Profil utilisateur */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                name="username"
                value={newProfile.username}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Nom d'utilisateur"
              />
              <input
                type="email"
                name="email"
                value={newProfile.email}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Email"
              />
              <input
                type="text"
                name="image"
                value={newProfile.image}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="URL de l'image"
              />
              <button
                onClick={handleSaveClick}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Sauvegarder
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center space-x-4">
              <img
                  src={userProfile?.image}
                  alt="Avatar"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold">{userProfile?.username}</h2>
                  <p className="text-gray-500">{userProfile?.email}</p>
                </div>
              </div>
              <button
                onClick={handleEditClick}
                className="mt-4 bg-gray-200 text-black px-4 py-2 rounded-md"
              >
                Modifier le profil
              </button>
            </>
          )}
        </div>

        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Mes avis reçus</h2>
            {userProfile?.reviewsReceive.length > 0 ? (
              <ul className="space-y-4">
                {userProfile.reviewsReceive.map((review: Review) => (
                  <li key={review.id} className="bg-white shadow p-4 rounded-lg flex justify-between">
                    <div>
                      <p className="text-gray-700 font-semibold">{review.comment}</p>
                      <p className="text-gray-500 text-sm">Note : {review.rating} ★</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun avis reçu pour le moment.</p>
            )}
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Mes avis envoyés</h2>
            {userProfile?.reviewsSend.length > 0 ? (
              <ul className="space-y-4">
                {userProfile.reviewsSend.map((review: Review) => (
                  <li key={review.id} className="bg-white shadow p-4 rounded-lg flex justify-between">
                    <div>
                      <p className="text-gray-700 font-semibold">{review.comment}</p>
                      <p className="text-gray-500 text-sm">Note : {review.rating} ★</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun avis envoyé pour le moment.</p>
            )}
          </div>
      </div>
    </div>
      
      </div>
    );
  }