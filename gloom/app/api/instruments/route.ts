import { INSTRUMENTS_ROUTES } from "@/utils/api-routes"
export const dynamic = 'force-static'
import axios from "axios"
 
export async function GET() {
  const res = await fetch( INSTRUMENTS_ROUTES.GET_ALL_INSTRUMENT, {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
  const data = await res.json()
  
  return Response.json({ data })
}


export async function POST(request: Request) {
  try {
    const body = await request.json(); // Récupérer le body de la requête POST

    // Récupérer le token depuis l'environnement ou le request header si applicable
    const token = request.headers.get('Authorization');

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Effectuer la requête avec axios, en ajoutant le token dans l'en-tête
    const res = await fetch(INSTRUMENTS_ROUTES.POST_INSTRUMENT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token, // Ajouter le token JWT dans les headers
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: JSON.stringify(body), // Envoi des données en format JSON
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Failed to create the instrument" }), { status: 500 });
    }

    const data = await res.json(); // Récupérer la réponse JSON
    return new Response(JSON.stringify(data), { status: 201 }); // Retourner la réponse avec un statut de succès
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
  }
}