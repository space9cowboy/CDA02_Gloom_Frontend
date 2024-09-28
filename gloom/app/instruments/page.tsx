"use client"
import { useEffect, useState } from 'react';

interface Instrument {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  status: string;
  brand: string;
  model: string;
  location: string;
  seller: {
    username: string;
    email: string;
  };
}

export default function Instruments() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/instruments');
        const data = await res.json();
        setInstruments(data.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch instruments:', err);
        setError('Failed to fetch instruments');
        setLoading(false);
      }
    };

    fetchInstruments();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Instruments Disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {instruments.map((instrument) => (
          <div key={instrument.id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={instrument.image}
              alt={instrument.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{instrument.title}</h2>
              <p className="text-gray-600">{instrument.description}</p>
              <p className="text-lg font-bold text-green-600">{instrument.price} €</p>
              <p className="text-sm text-gray-500">Marque: {instrument.brand}</p>
              <p className="text-sm text-gray-500">Modèle: {instrument.model}</p>
              <p className="text-sm text-gray-500">Localisation: {instrument.location}</p>
              <p className="text-sm text-gray-500">Statut: {instrument.status}</p>
              <p className="mt-4 text-gray-700">
                Vendu par: <span className="font-semibold">{instrument.seller.username}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
