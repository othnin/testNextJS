import { cookies } from "next/headers";
import { NextResponse } from "next/server";


const DJANGO_API_WAITLISTS_URL = "http://127.0.0.1:8001/api/waitlists/"

export async function GET(request){
    // Read token from server cookie store (set by your login route)
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth-token')?.value ?? null;
    console.log("api/waitlist/route.jsx")
    console.log('waitlists: auth token present?', !!authToken)

    if (!authToken){
        return NextResponse.json({ detail: 'Authentication required' }, {status:401})
    }

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            // only attach Authorization if we have a token
            "Authorization": `Bearer ${authToken}`
        }
    }

    const response = await fetch(DJANGO_API_WAITLISTS_URL, options)
    const result = await response.json()
    let status = response.status
    return NextResponse.json({...result}, {status:status})

}
