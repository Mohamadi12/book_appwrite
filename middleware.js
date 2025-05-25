import { NextResponse } from "next/server"

export async function middleware(request) {
    const isAuthenticated = false; 

    if(!isAuthenticated) {
        // Redirect to the login page if the user is not authenticated
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/bookings']
}
