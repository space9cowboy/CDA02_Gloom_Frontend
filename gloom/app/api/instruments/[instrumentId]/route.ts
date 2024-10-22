import axios from "axios";
import { NextResponse } from "next/server";
import { INSTRUMENTS_ROUTES } from "@/utils/api-routes"

export async function GET(req: any, { params }: { params: { instrumentId: string } }) {
  const { instrumentId } = params;

  try {
    const { data } = await axios.get( INSTRUMENTS_ROUTES.GET_ALL_INSTRUMENT  + "/" + instrumentId, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'instrument:", error);
    return NextResponse.error();
  }
}

export async function PUT(req: Request, { params }: { params: { instrumentId: string } }) {
  const { instrumentId } = params;

  try {
    // Extraire les données du body de la requête
    const body = await req.json();

    // Effectuer la requête PUT avec axios pour mettre à jour l'instrument
    const { data } = await axios.put(INSTRUMENTS_ROUTES.GET_ALL_INSTRUMENT + "/" + instrumentId, body, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Authorization': req.headers.get('Authorization') || '', // Inclure le token si nécessaire
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'instrument:", error);
    return NextResponse.error();
  }
}


export async function DELETE(req: Request, { params }: { params: { instrumentId: string } }) {
  const { instrumentId } = params;

  try {
    // Effectuer la requête DELETE avec axios pour supprimer l'instrument
    const { data } = await axios.delete(INSTRUMENTS_ROUTES.GET_ALL_INSTRUMENT + "/" + instrumentId, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Authorization': req.headers.get('Authorization') || '', // Inclure le token si nécessaire
      },
    });

    return NextResponse.json({ message: 'Instrument deleted successfully', data });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'instrument:", error);
    return NextResponse.error();
  }
}