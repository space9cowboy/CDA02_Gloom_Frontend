import { AUTH_ROUTES } from "@/utils/api-routes";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    // Récupérer les informations du corps de la requête
    const body = await req.json();
    
    // Vérifier que les champs nécessaires sont bien présents
    const { username, password } = body;

    if (!username || !password) {
      return new NextResponse(JSON.stringify({ message: "Nom d'utilisateur et mot de passe obligatoires." }), {
        status: 400,
      });
    }

    // Faire la requête vers l'API LOGIN avec les données reçues
    const res = await fetch(AUTH_ROUTES.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    // Gérer les erreurs de la requête API
    if (!res.ok) {
      const errorData = await res.json();
      return new NextResponse(JSON.stringify({ message: "Erreur de connexion", error: errorData }), {
        status: res.status,
      });
    }

    // Récupérer les données de la réponse
    const data = await res.json();

    // Extraire le token de la réponse (si c'est comme ça qu'il est renvoyé par l'API)
    const token = data.token;

    // Vérifier que le token existe
    if (!token) {
      return new NextResponse(JSON.stringify({ message: "Token manquant dans la réponse." }), {
        status: 500,
      });
    }

    // Mettre le token dans un cookie avec NextResponse
    const response = new NextResponse(JSON.stringify({ message: "Connexion réussie", data }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Définir le cookie avec le token (expire dans 7 jours)
    response.cookies.set('authToken', token, { 
      httpOnly: true, // Cookie non accessible depuis le client JavaScript
      secure: true,   // Assurer que le cookie n'est envoyé que sur HTTPS
      path: '/',      // Cookie disponible sur tout le site
      maxAge: 60 * 60 * 24 * 7, // Expire dans 7 jours
    });

    return response;

  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return new NextResponse(JSON.stringify({ message: "Erreur interne du serveur" }), {
      status: 500,
    });
  }
}