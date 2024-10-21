"use client";
import { SidebarDashboard } from "@/components/Sidebar";
import { Header, HeaderLog } from "@/components/Header";
import { useEffect, useState } from "react";
import {
  IconHome2,
  IconCirclePlus,
  IconUserCircle,
  IconMessage,
  IconLogout,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { decodeJwt } from "jose";
import { Sidebar, SidebarBody, SidebarLink, SidebarButton } from "@/components/ui/sidebar";
import axios from "axios";
import { cn } from "@/lib/utils";

interface UserPayload {
  username: string;
}

export default function CreateAnnonce({ params }: { params: { username: string } }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",  // Le lien d'image
    category: "",
    status: "En vente",
    brand: "",
    model: "",
    location: "",
    is_sold: 0,
  });

  const links = [
    {
      label: "Dashboard",
      href: "./",
      icon: <IconHome2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Créer une annonce",
      href: "#",
      icon: <IconCirclePlus className="text-green-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Profile",
      href: "./profile",
      icon: <IconUserCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Messages",
      href: "./message",
      icon: <IconMessage className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    router.push("/auth/login");
  };

  const [userInfo, setUserInfo] = useState<UserPayload | null>();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState([]);

  // Gestion du token et récupération des informations de l'utilisateur
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = decodeJwt(token);
        const userPayload: UserPayload = {
          username: decoded.username as string,
        };
        setUserInfo(userPayload);
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userInfo?.username) {
        console.error("Username is undefined");
        return;
      }

      try {
        const res = await fetch(`/api/user/${userInfo.username}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });

        if (!res.ok) {
          throw new Error(`Error fetching instrument with id ${userInfo.username}`);
        }

        const data = await res.json();
        setUserProfile(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching instrument data:", error);
        setError("Error fetching instrument data");
        setLoading(false);
      }
    };

    if (userInfo?.username) {
      fetchUserProfile();
    }
  }, [userInfo?.username]);

  // Gestion de la récupération des catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/category");
        setCategories(res.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };
    fetchCategories();
  }, []);

    // Gestion des changements dans les champs du formulaire
    const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      try {
        // Récupérer le token depuis sessionStorage (ou d'une autre source si disponible)
        const token = sessionStorage.getItem("authToken");
        console.log(token)
    
        if (!token) {
          setError("Vous devez être connecté pour créer une annonce.");
          return;
        }
    
        // Envoyer la requête POST avec Axios
        const response = await axios.post(
          "/api/instruments", // Endpoint vers lequel envoyer les données
          formData, // Les données du formulaire (formData)
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
    
        // Vérification de la réponse
        if (response.status === 201) {
          router.push("/dashboard"); // Redirection après succès
        } else {
          setError("Erreur lors de la création de l'annonce.");
        }
      } catch (error) {
        console.error("Une erreur est survenue :", error);
        setError("Une erreur s'est produite lors de la création de l'annonce.");
      }
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        {isAuthenticated ? <HeaderLog /> : <Header />}
  
        <div className={cn("rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden", "h-screen")}>
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
                <SidebarButton label="Se déconnecter" onClick={handleLogout} icon={<IconLogout className="text-red-500 h-5 w-5 flex-shrink-0" />} className="text-red-500 hover:text-red-600" />
                {userProfile && (
                  <SidebarLink link={{ label: userProfile.username, href: "#", icon: <img src={userProfile.image} className="h-7 w-7 flex-shrink-0 rounded-full" alt="Avatar" /> }} />
                )}
              </div>
            </SidebarBody>
          </Sidebar>
  
          {/* Formulaire de création d'annonce */}
          <div className="container mx-auto p-6 bg-white rounded-md shadow-md">
            <h1 className="text-3xl font-bold mb-6">Déposer une annonce</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Titre"
                value={formData.title}
                onChange={handleChangeFormData}
                className="border border-gray-300 p-2 rounded w-full"
              />
              <input
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChangeFormData}
                className="border border-gray-300 p-2 rounded w-full"
              />
              <input
                type="number"
                name="price"
                placeholder="Prix"
                value={formData.price}
                onChange={handleChangeFormData}
                className="border border-gray-300 p-2 rounded w-full"
              />
              <input
                type="text"
                name="image"
                placeholder="Lien de l'image"
                value={formData.image}
                onChange={handleChangeFormData}
                className="border border-gray-300 p-2 rounded w-full"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChangeFormData}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="">Choisir une catégorie</option>
                {Array.isArray(categories) && categories.map((category: any) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="brand"
                placeholder="Marque"
                value={formData.brand}
                onChange={handleChangeFormData}
                className="border border-gray-300 p-2 rounded w-full"
              />
              <input
                type="text"
                name="model"
                placeholder="Modèle"
                value={formData.model}
                onChange={handleChangeFormData}
                className="border border-gray-300 p-2 rounded w-full"
              />
              <input
                type="text"
                name="location"
                placeholder="Localisation"
                value={formData.location}
                onChange={handleChangeFormData}
                className="border border-gray-300 p-2 rounded w-full"
              />
  
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">
                Poster l'annonce
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }
  