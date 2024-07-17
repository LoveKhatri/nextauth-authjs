import { auth } from "@/auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    console.log(`User is logged in: ${isLoggedIn}`);
})

// Optionally, don't invoke Middleware on some paths
// ? The auth function will be invoked for all the routes which match the config
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}