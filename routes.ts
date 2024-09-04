/**
 * An Array of routes that are accesible to the public
 * These dosen´t require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/"
];


/**
 * An Array of routes that are use for authentication
 * These will redirect login users to /settings
 * @type {string[]}
 */

export const authRoutes =[
    "/auth/login",
    "/auth/register"
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