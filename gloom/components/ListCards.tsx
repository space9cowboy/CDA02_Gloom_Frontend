"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./Card";

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
  updatedAt: string;
}

export function ListCardsRecent() {
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

  // Trier les instruments par date de mise à jour (du plus récent au plus ancien)
  const sortedInstruments = instruments.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-8xl  p-[4rem] bg-white">
      <h2 className="max-w-7xl pl-4  text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans p-10">
        À la une
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedInstruments.slice(0, 4).map((instrument) => (
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

export function ListCardsGuitar() {
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
  
    // Filtrer par catégorie 'guitare' et trier par date de mise à jour
    const filteredInstruments = instruments
      .filter((instrument) => instrument.category.toLowerCase() === "vinyl")
      .sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
  
    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  
    return (
      <div id="vinyl" className="max-w-10xl  p-[4rem] bg-[#DCE4FD9] ">
       <h2 className="max-w-7xl pl-4  text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans pb-8">
        Vinyls
      </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredInstruments.slice(0, 4).map((instrument) => (
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

  export function ListCardsPiano() {
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
  
    // Filtrer par catégorie 'synthétiseur' et trier par date de mise à jour
    const filteredInstruments = instruments
      .filter((instrument) => instrument.category.toLowerCase() === "claviers")
      .sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
  
    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  
    return (
      <div className="max-w-10xl  p-[4rem] bg-white">
        <h2 className="max-w-7xl pl-4 text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans pb-8">
        Claviers
      </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredInstruments.slice(0, 4).map((instrument) => (
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