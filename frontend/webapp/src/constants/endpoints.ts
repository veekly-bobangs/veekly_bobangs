export const PAGE_PATHS = {
    HOME: '/',
    MAP: '/map',
    SETTINGS: '/settings',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
};

export const PAGE_NAMES = {
    HOME: 'Home',
    MAP: 'Map',
    SETTINGS: 'Settings',
};

export const API_ENDPOINTS = {
    GET_DEALS_STATIC: '/get',
    GET_DEALS: 'api/get',
    REGISTER: '/api/register',
    AUTH_CALLBACK: '/api/auth/callback',
    LOGIN: '/api/login',
    FORGOT_PASSWORD: '/api/forgot-password',
};

export function getPageNameFromPagePath(path: string): string {
    // Directly return the corresponding page name based on the path
    const pathToNameMap: { [key: string]: string } = {
        [PAGE_PATHS.HOME]: PAGE_NAMES.HOME,
        [PAGE_PATHS.MAP]: PAGE_NAMES.MAP,
        [PAGE_PATHS.SETTINGS]: PAGE_NAMES.SETTINGS,
    };

    // Default to an empty string or a default value if the path is not found
    return pathToNameMap[path] || 'Unknown';
}
