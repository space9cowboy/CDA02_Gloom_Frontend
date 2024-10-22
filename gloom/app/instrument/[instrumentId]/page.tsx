"use client";
import { useEffect, useState } from "react";
import { Header, HeaderLog } from "@/components/Header";
import { InstrumentCard } from "@/components/InstrumentCard";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/navigation';

// Modale de confirmation d'achat avec plus de détails
const PurchaseModal = ({ instrument, onClose, onConfirm }: any) => {
  const router = useRouter(); // Utiliser useRouter pour la redirection

  // Calculer les montants HT, commission, et TTC
  const commissionRate = 0.1; // Par exemple, 10% de commission
  const montantHT = instrument.price / (1 + commissionRate); // Prix HT
  const commissionGloom = instrument.price - montantHT; // Commission
  const montantTTC = instrument.price; // Prix TTC (correspond au prix de l'instrument)

  // État pour la note et l'avis
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  // Gérer la soumission de la transaction et de l'avis
  const handleConfirmPurchase = async () => {
    try {
      // Récupérer le token d'authentification depuis les cookies ou sessionStorage
      const token = sessionStorage.getItem("authToken");

      if (!token) {
        console.error("Token not found. User must be authenticated.");
        return;
      }

      // Faire une requête POST vers l'API /api/transactions pour la transaction
      const transactionResponse = await axios.post(
        '/api/transactions',
        {
          instrument_id: instrument.id,
          transaction_amount: montantTTC.toFixed(2), // Le montant TTC
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (transactionResponse.status === 201) {
        console.log('Transaction successful:', transactionResponse.data);

        // Une fois la transaction réussie, soumettre un avis sur le vendeur
        const reviewResponse = await axios.post(
          `/api/user/review/${instrument.seller.id}`, // POST vers l'API d'avis
          {
            rating, // Note donnée
            comment, // Commentaire de l'utilisateur
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (reviewResponse.status === 201) {
          console.log('Review submitted:', reviewResponse.data);
        } else {
          console.error('Failed to submit review:', reviewResponse.data);
        }

        onConfirm(); // Appeler la fonction onConfirm pour fermer la modale
        router.push('/dashboard'); // Rediriger vers /dashboard après succès
      } else {
        console.error('Transaction failed:', transactionResponse.data);
      }
    } catch (error) {
      console.error('Error confirming purchase or submitting review:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Logo GLOOM */}
        <div className="flex justify-center mb-4">
          <h1 className="text-3xl font-bold text-green-600">GLOOM</h1>
        </div>

        <h2 className="text-xl font-bold mb-4 text-center">Confirmer l'achat</h2>

        {/* Résumé du produit dans une petite card */}
        <div className="flex items-center space-x-4 mb-6 bg-gray-100 p-4 rounded-lg">
          <img
            src={instrument.image}
            alt={instrument.title}
            className="w-16 h-16 object-cover rounded-lg border"
          />
          <div>
            <h3 className="text-lg font-semibold">{instrument.title}</h3>
            <p className="text-gray-500">{instrument.brand}</p>
          </div>
        </div>

        {/* Informations détaillées sur le montant */}
        <div className="mb-4">
          <div className="flex justify-between">
            <p>Montant HT:</p>
            <p>{montantHT.toFixed(2)}€</p>
          </div>
          <div className="flex justify-between">
            <p>Commission GLOOM (10%):</p>
            <p>{commissionGloom.toFixed(2)}€</p>
          </div>
          <div className="flex justify-between font-bold">
            <p>Montant TTC:</p>
            <p>{montantTTC.toFixed(2)}€</p>
          </div>
        </div>

        {/* Zone de notation et d'avis */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Note (sur 5):
          </label>
          <input
            type="number"
            max={5}
            min={1}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-2 border rounded-lg"
          />

          <label className="block mt-4 text-sm font-medium text-gray-700">
            Avis:
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Écrivez votre avis ici..."
          />
        </div>

        {/* Image et informations du vendeur */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={instrument.seller.image}
            alt={instrument.seller.username}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-800">{instrument.seller.username}</h2>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mb-4">
          Voulez-vous vraiment acheter cet instrument ?
        </div>

        {/* Boutons de confirmation et annulation */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            Annuler
          </button>
          <button
            onClick={handleConfirmPurchase}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Confirmer l'achat
          </button>
        </div>
      </div>
    </div>
  );
};



export default function InstrumentDetails({ params }: { params: { instrumentId: string } }) {
  const [instrument, setInstrument] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // Pour la gestion de la modale

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
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
          const filteredSuggestions = data.filter((suggestion: any) => suggestion.id !== instrument.id && suggestion.isSold !== true);

          setSuggestions(filteredSuggestions.slice(0, 3));
        } catch (error) {
          console.error("Error fetching instrument suggestions:", error);
          setError("Error fetching instrument suggestions");
        }
      };

      fetchSuggestions();
    }
  }, [instrument]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmPurchase = () => {
    console.log("Transaction confirmée pour l'instrument:", instrument);
    setModalOpen(false);
    // Logique pour gérer la transaction
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {isAuthenticated ? <HeaderLog /> : <Header />}

      <div className="px-6 py-4 text-gray-600">
        <a href="/" className="text-gray-600 hover:text-gray-900">Accueil</a> / <span className="font-bold">{instrument.title}</span>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-start p-6 space-y-8 md:space-y-0 md:space-x-8">
        {instrument && (
          <>
            <div className="relative w-[400px] h-[400px] overflow-hidden rounded-lg shadow-lg">
              <img
                src={instrument.image}
                alt={instrument.title}
                className="w-full h-full object-cover"
              />
              {instrument.isSold && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Vendu
                </div>
              )}
            </div>
            <div className="w-full h-[400px] md:w-1/2 lg:w-2/3 bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={instrument.seller.image}
                  alt={instrument.seller.username}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{instrument.seller.username}</h2>
                </div>
              </div>

              <div className="space-y-4">
                <span className="bg-black text-white px-3 py-1 rounded-full text-sm inline-block">Bon état</span>
                <h1 className="text-4xl font-bold text-green-600">{instrument.title}</h1>
                <p className="text-lg text-gray-500">{instrument.brand}</p>
                <p className="text-gray-700">{instrument.description}</p>
              </div>
              <div className="flex items-center justify-between mt-8">
                <h2 className={`text-4xl font-bold ${instrument.isSold ? "text-gray-500" : "text-green-600"}`}>
                  {instrument.price}€
                </h2>
                <div className="flex items-center space-x-4">
                  <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition" disabled={instrument.isSold}>
                    {/* Bouton favori */}
                  </button>
                  <button
                    className={`py-2 px-6 rounded-full border transition ${instrument.isSold ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-black border-gray-300 hover:bg-gray-100"}`}
                    disabled={instrument.isSold}
                  >
                    Envoyer un message
                  </button>
                  <button
                    className={`py-2 px-6 rounded-full transition ${instrument.isSold ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`}
                    onClick={handleOpenModal}
                    disabled={instrument.isSold}
                  >
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

      {/* Modale de confirmation d'achat */}
      {isModalOpen && (
        <PurchaseModal
          instrument={instrument}
          onClose={handleCloseModal}
          onConfirm={handleConfirmPurchase}
        />
      )}
    </div>
  );
}
