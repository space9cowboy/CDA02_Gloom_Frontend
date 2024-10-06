import { AUTH_ROUTES } from "@/utils/api-routes"

// Pour forcer la génération statique, si nécessaire
export const dynamic = 'force-static'

export async function POST(req: Request) {
  try {
    // Récupérer les informations du corps de la requête
    const body = await req.json();
    
    // Vérifier que toutes les informations sont bien présentes
    const { email, password, username, type } = body;

    if (!email || !password || !username || !type) {
      return new Response(JSON.stringify({ message: "Tous les champs sont obligatoires." }), {
        status: 400,
      });
    }

    // Faire la requête vers l'API SIGNUP avec les données reçues
    const res = await fetch(AUTH_ROUTES.SIGNUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: JSON.stringify({
        email,
        password,
        username,
        type,
      }),
    });

    // Gérer les erreurs de la requête API
    if (!res.ok) {
      const errorData = await res.json();
      return new Response(JSON.stringify({ message: "Erreur d'inscription", error: errorData }), {
        status: res.status,
      });
    }

    // Récupérer les données de la réponse
    const data = await res.json();

    // Retourner les données dans la réponse
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return new Response(JSON.stringify({ message: "Erreur interne du serveur" }), {
      status: 500,
    });
  }
}
