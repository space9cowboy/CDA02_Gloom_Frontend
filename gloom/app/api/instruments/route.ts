import { INSTRUMENTS_ROUTES } from "@/utils/api-routes"
export const dynamic = 'force-static'
import axios, { all } from "axios"
import { jwtVerify } from 'jose'; // Si tu utilises jose pour vérifier le token
import { cookies } from 'next/headers';

import { NextRequest, NextResponse } from "next/server";

 
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

export async function POST(req: NextRequest, token: any) {
  try {
    // Récupérer le body de la requête POST
    const body = await req.json();
    const token = process.env.LOG_TOKEN; 


    console.log("Token from cookies: ", token); // Pour déboguer et vérifier si le token est bien récupéré

    // Vérification si le token existe
    if (!token) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Continuer la requête POST avec le token
    const res = await fetch(INSTRUMENTS_ROUTES.POST_INSTRUMENT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Ajouter le token à la requête
        'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: JSON.stringify(body), // Envoi des données en format JSON
    });

    if (!res.ok) {
      return new NextResponse(JSON.stringify({ error: "Failed to create the instrument" }), { status: 500 });
    }

    const data = await res.json(); // Récupérer la réponse JSON
    return new NextResponse(JSON.stringify(data), { status: 201 }); // Retourner la réponse avec succès
  } catch (error) {
    console.error("Server Error:", error);
    return new NextResponse(JSON.stringify({ error: "Server Error" }), { status: 500 });
  }
}