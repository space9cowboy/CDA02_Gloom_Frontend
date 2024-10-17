import { INSTRUMENTS_ROUTES } from "@/utils/api-routes"

export const dynamic = 'force-static'
 
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

