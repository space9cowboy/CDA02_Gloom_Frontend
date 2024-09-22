"use client"
import { useEffect, useState } from "react";
import { GetAllUsers } from "@/services/service";

export default function Auth() {
  // Déclare un état local pour stocker les utilisateurs
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Pour indiquer si les données sont en cours de chargement
  const [error, setError] = useState<string | null>(null); // Gérer les erreurs

  // Utiliser useEffect pour récupérer les utilisateurs lors du montage du composant
  useEffect(() => {
    GetAllUsers()
      .then((data) => {
        // setUsers(data);
        console.log(data);
         // Stocker les utilisateurs dans l'état
        setLoading(false); // Indiquer que le chargement est terminé
      })
      .catch((err) => {
        setError(err); // Gérer l'erreur si l'appel échoue
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Liste des utilisateurs</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index} className="mb-2">
              {user.username} - {user.email}
            </li>
          ))
        ) : (
          <li>Aucun utilisateur trouvé.</li>
        )}
      </ul>
    </div>
  );
}
