"use client";
import { useEffect, useState } from 'react';
import { Card } from '@/components/Card'; // Assurez-vous d'importer correctement le composant Card

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
        const res = await fetch('/api/instruments');
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
          <Card
            id={instrument.id}
            key={instrument.id}
            image={instrument.image}
            title={instrument.title}
            description={instrument.description}
            price={instrument.price}
            seller={instrument.seller.username}
            brand={instrument.brand}
            model={instrument.model}
            location={instrument.location}
            status={instrument.status}
          />
        ))}
      </div>
    </div>
  );
}
