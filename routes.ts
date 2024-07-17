/**
 * Routes accessible to public
 * These routes don't require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
]

/**
 * Routes used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
]

/**
 * The prefix for api auth routes
 * Routes under this prefix are used for authentication
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";