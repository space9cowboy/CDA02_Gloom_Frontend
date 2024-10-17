import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: { params: { instrumentId: string } }) {
  const { instrumentId } = params;

  try {
    const { data } = await axios.get(`http://localhost:8000/api/instruments/${instrumentId}`, {
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
