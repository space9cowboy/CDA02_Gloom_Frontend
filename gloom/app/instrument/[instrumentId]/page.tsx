"use client";
import { useEffect, useState } from "react";
// import { FaHeart, FaStar } from "react-icons/fa";
import { Header, HeaderLog } from "@/components/Header";
import { InstrumentCard } from "@/components/InstrumentCard";
import Link from "next/link";

export default function InstrumentDetails({ params }: { params: { instrumentId: string } }) {
  const [instrument, setInstrument] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier s'il y a un token dans le sessionStorage
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // L'utilisateur est authentifié
    }
  }, []);

  useEffect(() => {
    const fetchInstrument = async () => {
      try {
        const res = await fetch(`/api/instruments/${params.instrumentId}`);
        if (!res.ok) {
          throw new Error(`Error fetching instrument with id ${params.instrumentId}`);
        }

        const data = await res.json();
        setInstrument(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching instrument data:", error);
        setError("Error fetching instrument data");
        setLoading(false);
      }
    };

    fetchInstrument();
  }, [params.instrumentId]);

  useEffect(() => {
    // Assurez-vous que instrument et seller existent avant de faire l'appel à l'API pour les suggestions
    if (instrument && instrument.seller && instrument.seller.id) {
      const fetchSuggestions = async () => {
        try {
          const res = await fetch(`/api/instruments/seller/${instrument.seller.id}`, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
          });

          if (!res.ok) {
            throw new Error(`Error fetching instruments for seller ${instrument.seller.id}`);
          }

          const data = await res.json();
          const filteredSuggestions = data.filter((suggestion: any) => suggestion.id !== instrument.id);

        // Limiter à 3 suggestions
        setSuggestions(filteredSuggestions.slice(0, 3));
        } catch (error) {
          console.error("Error fetching instrument suggestions:", error);
          setError("Error fetching instrument suggestions");
        }
      };

      fetchSuggestions();
    }
  }, [instrument]);

  console.log("test seller: ", suggestions)

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      {isAuthenticated ? <HeaderLog /> : <Header />}

      {/* Breadcrumb */}
      <div className="px-6 py-4 text-gray-600">
        <a href="/" className="text-gray-600 hover:text-gray-900">Accueil</a> / <span className="font-bold">{instrument.title}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row justify-center items-start p-6 space-y-8 md:space-y-0 md:space-x-8">
        {instrument && (
          <>
            {/* Left side - Image with navigation arrows */}
            <div className="w-[400px] h-[400px] overflow-hidden rounded-lg shadow-lg">
              <img
                src={instrument.image}
                alt={instrument.title}
                className="w-full h-full object-cover"
            />
            </div>
            {/* Right side - Instrument details */}
            <div className="w-full h-[400px] md:w-1/2 lg:w-2/3 bg-white p-8 rounded-lg shadow-lg">
              {/* Seller Info */}
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={instrument.seller.image}
                  alt={instrument.seller.username}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{instrument.seller.username}</h2>
                  {/* <div className="flex text-yellow-500">
                    {Array(5).fill(0).map((_, index) => (
                      // <FaStar key={index} className={index < instrument.seller.rating ? "text-yellow-500" : "text-gray-300"} />
                    ))}
                  </div> */}
                </div>
              </div>

              {/* Instrument Info */}
              <div className="space-y-4">
                <span className="bg-black text-white px-3 py-1 rounded-full text-sm inline-block">Bon état</span>
                <h1 className="text-4xl font-bold text-green-600">{instrument.title}</h1>
                <p className="text-lg text-gray-500">{instrument.brand}</p>
                <p className="text-gray-700">{instrument.description}</p>
              </div>

              {/* Price and actions */}
              <div className="flex items-center justify-between mt-8">
                <h2 className="text-4xl font-bold text-green-600">{instrument.price}€</h2>
                <div className="flex items-center space-x-4">
                  <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                    {/* <FaHeart className="text-green-600" /> */}
                  </button>
                  <button className="bg-white text-black py-2 px-6 rounded-full border border-gray-300 hover:bg-gray-100 transition">
                    Envoyer un message
                  </button>
                  <button className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition">
                    Acheter
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {suggestions.length > 0 && (
        <div className="px-6 py-10 bg-black text-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Suggestions</h2>
            <a href="#" className="text-sm underline hover:text-gray-300">Tout voir</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((instrument) => (
              <InstrumentCard key={instrument.id} instrument={instrument} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

