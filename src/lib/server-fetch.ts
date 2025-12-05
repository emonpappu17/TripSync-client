// import { getNewAccessToken } from "@/services/auth/auth.service";
// import { getCookie } from "@/services/auth/tokenHandlers";

import { getCookie } from "@/services/auth/tokenHandlers";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const serverFetchHelper = async (endpoint: string, options: RequestInit): Promise<Response> => {
    const { headers, ...restOptions } = options;

    const accessToken = await getCookie("accessToken");
    // const accessToken = null;

    // to stop recursion loop
    // if (endpoint !== "/auth/refresh-token") {
    //     // console.log("form server fetch for new access token");
    //     await getNewAccessToken();
    // }

    const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
        headers: {
            Cookie: accessToken ? `accessToken=${accessToken}` : "",
            ...headers,
        },
        ...restOptions
    });

    return response;
}

export const serverFetch = {
    get: async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: "GET",
            ...options,
        });
    },

    post: async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: "POST",
            ...options,
        });
    },

    put: async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: "PUT",
            ...options,
        });
    },

    patch: async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: "PATCH",
            ...options,
        });
    },

    delete: async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: "DELETE",
            ...options,
        });
    },
};