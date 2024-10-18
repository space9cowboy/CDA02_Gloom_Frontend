import axios from "axios";
import { NextResponse } from "next/server";
import { USERS_ROUTES } from "@/utils/api-routes"

export async function GET(req: any, { params }: { params: { username: string } }) {
  const { username } = params;

  try {
    const { data } = await axios.get( USERS_ROUTES.GET_PROFILE + "/" + username, {
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
