// Commentez temporairement tout le contenu du middleware pour tester
// export async function middleware(request: NextRequest) {
//   const requestHeaders = new Headers(request.headers)
//   requestHeaders.set("x-url", request.url)

//   // Create a Supabase client
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return request.cookies.get(name)?.value
//         },
//         set(name: string, value: string, options: any) {
//           request.cookies.set({
//             name,
//             value,
//             ...options,
//           })
//           requestHeaders.set("Set-Cookie", request.cookies.toString())
//         },
//         remove(name: string, options: any) {
//           request.cookies.set({
//             name,
//             value: "",
//             ...options,
//           })
//           requestHeaders.set("Set-Cookie", request.cookies.toString())
//         },
//       },
//     },
//   )

//   // Check if the user is authenticated
//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   // Auth routes that don't require authentication
//   const authRoutes = ["/login", "/register", "/forgot-password"]
//   const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

//   // If the user is not authenticated and trying to access a protected route
//   if (!session && !isAuthRoute && !request.nextUrl.pathname.startsWith("/_next")) {
//     const redirectUrl = new URL("/login", request.url)
//     redirectUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname)
//     return NextResponse.redirect(redirectUrl)
//   }

//   // If the user is authenticated and trying to access an auth route
//   if (session && isAuthRoute) {
//     return NextResponse.redirect(new URL("/dashboard", request.url))
//   }

//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   })
// }

// Utilisez une configuration minimale pour le test
export const config = {
  matcher: [], // Désactive le middleware temporairement
}
