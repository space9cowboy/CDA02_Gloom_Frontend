import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { USERS_ROUTES } from "@/utils/api-routes"

export async function POST(req: NextRequest, { params }: { params: { sellerId: string } }) {
    
    const body = await req.json();
    const token = process.env.LOG_TOKEN; 


    console.log("Token from cookies: ", token); // Pour déboguer et vérifier si le token est bien récupéré

    // Vérification si le token existe
    if (!token) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const { sellerId } = params;

  try {
    const res = await fetch( USERS_ROUTES.POST_REVIEW  + "/" + sellerId, {
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