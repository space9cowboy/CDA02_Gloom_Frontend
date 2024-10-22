import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Utiliser pour rediriger après suppression

export const InstrumentUpdateCard = ({ instrument }: { instrument: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: instrument.title,
    description: instrument.description,
    price: instrument.price,
    image: instrument.image,
    brand: instrument.brand,
  });
  const router = useRouter(); // Utilisé pour la redirection après suppression

  // Gestion des changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gestion de la soumission pour mise à jour
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/instruments/${instrument.id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`, // Ajouter un token si besoin
        },
      });

      if (response.status === 200) {
        console.log("Instrument mis à jour avec succès:", response.data);
        setIsModalOpen(false); // Fermer la modale après mise à jour
        router.push("/"); // Rediriger après la suppression
      
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'instrument:", error);
    }
  };

  // Gestion de la suppression de l'instrument
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/instruments/${instrument.id}`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`, // Ajouter un token si besoin
        },
      });

      if (response.status === 200) {
        console.log("Instrument supprimé avec succès.");
        router.push("/"); // Rediriger après la suppression
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'instrument:", error);
    }
  };

  return (
    <>
      <div className={`relative bg-white text-black rounded-lg shadow-lg overflow-hidden max-h-[420px] ${instrument.isSold ? "opacity-50" : ""}`}>
        <img
          src={instrument.image}
          alt={instrument.title}
          className="w-full h-48 object-cover"
        />

        {/* Pastille "Vendu" */}
        {instrument.isSold && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Vendu
          </div>
        )}

        <div className="p-4">
          <p className="text-sm text-gray-500">{instrument.brand}</p>
          <h3 className="text-lg font-semibold text-gray-800">{instrument.title}</h3>
          <p className="text-sm text-gray-600 mt-2 mb-4 truncate">{instrument.description}</p>
          <p className="text-xl font-bold text-green-600">{instrument.price}€</p>

          <div className="flex justify-between items-center mt-4">
            {/* Lien vers le produit (grisé si vendu) */}
            <a href={`/instrument/${instrument.id}`} className={`py-2 px-4 rounded-full transition ${
              instrument.isSold
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}>
              {instrument.isSold ? "Produit indisponible" : "Voir le produit"}
            </a>

            {/* Bouton favori */}
            <button
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              disabled={instrument.isSold}
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>

            {/* Bouton pour ouvrir la modale de modification */}
            <button
              className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
              onClick={() => setIsModalOpen(true)}
            >
              Modifier
            </button>

            {/* Bouton pour supprimer l'instrument */}
            <button
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              onClick={handleDelete}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>

      {/* Modale de modification */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Modifier l'instrument</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Titre"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Prix"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Lien de l'image"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Marque"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
