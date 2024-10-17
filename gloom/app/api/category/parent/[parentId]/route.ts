import axios from "axios";
import { NextResponse } from "next/server";
import { CATEGORY_ROUTES } from "@/utils/api-routes"

export async function GET(req: any, { params }: { params: { parentId: string } }) {
  const { parentId } = params;

  try {
    const { data } = await axios.get( CATEGORY_ROUTES.GET_CATEGORY_BY_PARENT + "/" + parentId, {
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
