"use client"
import { useEffect, useState } from 'react';

export default function InstrumentDetails({ params }: { params: { instrumentId: string } }) {
  const [instrument, setInstrument] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstrument = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/instruments/${params.instrumentId}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        });

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

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {instrument && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{instrument.title}</h1>
          <img src={instrument.image} alt={instrument.title} className="w-full h-64 object-cover rounded-lg mb-4" />
          <p className="text-gray-600 mb-4">{instrument.description}</p>
          <div className="mb-4">
            <span className="font-bold">Prix :</span> {instrument.price} €
          </div>
          <div className="mb-4">
            <span className="font-bold">Marque :</span> {instrument.brand}
          </div>
          <div className="mb-4">
            <span className="font-bold">Modèle :</span> {instrument.model}
          </div>
          <div className="mb-4">
            <span className="font-bold">Catégorie :</span> {instrument.category}
          </div>
          <div className="mb-4">
            <span className="font-bold">État :</span> {instrument.status}
          </div>
          <div className="mb-4">
            <span className="font-bold">Localisation :</span> {instrument.location}
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mt-6">
            <h2 className="text-2xl font-bold mb-4">Vendeur</h2>
            <p className="text-gray-700">Nom d'utilisateur : {instrument.seller.username}</p>
            <p className="text-gray-700">Email : {instrument.seller.email}</p>

            {instrument.seller.reviewsSend.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-bold">Avis envoyés</h3>
                {instrument.seller.reviewsSend.map((review: any) => (
                  <div key={review.id} className="bg-white p-2 rounded shadow-sm mt-2">
                    <p>{review.comment}</p>
                    <p className="text-sm text-gray-500">Note : {review.rating}</p>
                  </div>
                ))}
              </div>
            )}

            {instrument.seller.favoris.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-bold">Favoris</h3>
                {instrument.seller.favoris.map((fav: any) => (
                  <div key={fav.id} className="bg-white p-2 rounded shadow-sm mt-2">
                    <p className="font-bold">{fav.title}</p>
                    <p>{fav.description}</p>
                    <p className="text-sm text-gray-500">Prix : {fav.price} €</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
