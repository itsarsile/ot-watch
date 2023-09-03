import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        console.log("mw init")
        if (request.nextUrl.pathname.startsWith("/api/users") && request.nextauth.token?.role !== "ADMIN") {
            NextResponse.json({message: "Unauthorized"}, { status: 401 })
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
)

export const config = { matcher: "/dashboard",}