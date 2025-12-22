import { getCookie } from "@/services/auth/tokenHandlers";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

interface FetchOptions extends RequestInit {
    revalidate?: number | false;
    tags?: string[];
}

const serverFetchHelper = async (endpoint: string, options: FetchOptions = {}): Promise<Response> => {
    const { headers, revalidate, tags, ...restOptions } = options;

    const accessToken = await getCookie("accessToken");

    // Build Next.js cache options
    const nextOptions: NextFetchRequestConfig = {};

    if (revalidate !== undefined) {
        nextOptions.revalidate = revalidate;
    }

    if (tags && tags.length > 0) {
        nextOptions.tags = tags;
    }

    const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
        headers: {
            Cookie: accessToken ? `accessToken=${accessToken}` : "",
            ...headers,
        },
        next: nextOptions,
        ...restOptions,
    });

    return response;
}

export const serverFetch = {
    get: async (endpoint: string, options: FetchOptions = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: "GET",
            ...options,
        });
    },

    post: async (endpoint: string, options: FetchOptions = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: "POST",
            cache: "no-store", // Mutations should never cache
            ...options,
        });
    },

    put: async (endpoint: string, options: FetchOptions = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: "PUT",
            cache: "no-store",
            ...options,
        });
    },

    patch: async (endpoint: string, options: FetchOptions = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: "PATCH",
            cache: "no-store",
            ...options,
        });
    },

    delete: async (endpoint: string, options: FetchOptions = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: "DELETE",
            cache: "no-store",
            ...options,
        });
    },
};

type NextFetchRequestConfig = {
    revalidate?: number | false;
    tags?: string[];
};