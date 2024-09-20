/**
 * An Array of routes that are accesible to the public
 * These dosen´t require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/auth/new-verification"
];


/**
 * An Array of routes that are use for authentication
 * These will redirect login users to /settings
 * @type {string[]}
 */

export const authRoutes =[
    "/auth/login",
    "/auth/register",
    "/auth/reset",
    "/auth/new-password"
];

/**
 * The prefix for API Authentication Route
 * Routes that estart with this preix are used
 * for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";


/**
 * Default redirect path after loggin in 
 * @type {string}
 */

export const DEFUAL_LOGIN_REDIRECT= "/settings";