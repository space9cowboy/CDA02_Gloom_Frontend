import axios from "axios";
import { NextResponse } from "next/server";
import { INSTRUMENTS_ROUTES } from "@/utils/api-routes"

export async function GET(req: any, { params }: { params: { categoryName: string } }) {
  const { categoryName } = params;

  try {
    const { data } = await axios.get( INSTRUMENTS_ROUTES.GET_INSTRUMENT_BY_CATEGORY + "/" + categoryName, {
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'instrument:", error);
    return NextResponse.error();
  }
}
