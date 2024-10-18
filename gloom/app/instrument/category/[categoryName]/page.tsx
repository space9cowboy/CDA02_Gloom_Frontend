"use client"
import { useEffect, useState } from 'react';
import { HeaderLog, Header } from '@/components/Header';
import SidebarCategory from '@/components/SidebarCategory';

export default function CategoryName({ params }: { params: { categoryName: string } }) {
    const [instruments, setInstruments] = useState<any[]>([]); // Initialiser comme un tableau vide
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const fetchInstrument = async () => {
        try {
          const res = await fetch(`/api/instruments/category/${params.categoryName}`, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
          });
  
          if (!res.ok) {
            throw new Error(`Error fetching instruments for category ${params.categoryName}`);
          }
  
          const data = await res.json();
          setInstruments(data); // Assigner les données
          setLoading(false);
        } catch (error) {
          console.error("Error fetching instrument data:", error);
          setError("Error fetching instrument data");
          setLoading(false);
        }
      };
  
      fetchInstrument();
    }, [params.categoryName]);


  useEffect(() => {
    // Vérifier s'il y a un token dans le sessionStorage
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // L'utilisateur est authentifié
    }
  }, []);
  
    if (loading) {
      return <div className="text-center mt-10">Loading...</div>;
    }
  
    if (error) {
      return <div className="text-center mt-10 text-red-500">{error}</div>;
    }
  
    return (
        <div className="flex flex-col items-center justify-start h-screen">
        {isAuthenticated ? <HeaderLog /> : <Header />}
        <div className="flex h-screen w-screen">
            <SidebarCategory />

        <div className="w-[100%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {instruments.length > 0 ? (
            instruments.map((instrument: any) => (
                <div key={instrument.id} className="bg-white shadow-md rounded-lg p-6">
                <img 
                    src={instrument.image} 
                    alt={instrument.title} 
                    className="w-full h-64 object-cover rounded-lg mb-4" 
                />
                <h1 className="text-2xl font-bold mb-2">{instrument.title}</h1>
                <div className="text-lg font-semibold mb-4">Prix : {instrument.price} €</div>
                </div>
            ))
            ) : (
            <div className="text-center col-span-4">Aucun instrument trouvé pour cette catégorie</div>
            )}
        </div>
        </div>
        </div>
    );
}
