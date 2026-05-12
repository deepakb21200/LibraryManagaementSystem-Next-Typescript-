// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// const privateRoutes = ["/login", "/resetPassword"]
// const protectedRoutes = [
//   "/dashboard", "/addBook", "/books",
//   "/studentsList", "/students", "/addStudent",
//   "/issueBook", "/returnBook", "/analytics",
//   "/chart", "/resetPasswordScreen"
// ]

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value
//   const path = request.nextUrl.pathname

//   // PrivateRoute logic
//   if (privateRoutes.includes(path) && token) {
//     return NextResponse.redirect(new URL("/dashboard", request.url))
//   }

//   // ProtectedRoute logic
//   const isProtected = protectedRoutes.some(route => path.startsWith(route))
//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL("/login", request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }