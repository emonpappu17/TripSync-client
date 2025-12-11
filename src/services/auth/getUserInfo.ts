/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";
import { IUser } from "@/types/user.interface";


// export const getUserInfo = async (): Promise<IUser | any> => {
//     let userInfo: IUser | any;
//     try {

//         const response = await serverFetch.get("/user/me", {
//             cache: "force-cache",
//             next: { tags: ["user-info"] }
//         })

//         const result = await response.json();

//         if (result.success) {
//             // const accessToken = await getCookie("accessToken");

//             // if (!accessToken) {
//             //     throw new Error("No access token found");
//             // }

//             // const verifiedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;



//             // userInfo = {
//             //     fullName: verifiedToken.name || "Unknown User",
//             //     email: verifiedToken.email,
//             //     role: verifiedToken.role,
//             // }

//             userInfo = result.data;

//             return userInfo;
//         }

//         // userInfo = {
//         //     fullName: result.data.fullName || "Unknown User",
//         //     ...result.data
//         // };

//         return userInfo;
//     } catch (error: any) {
//         console.log(error);
//         return null
//         // return {
//         //     id: "",
//         //     name: "Unknown User",
//         //     email: "",
//         //     role: "USER",
//         // };
//     }
// }


export const getUserInfo = async (): Promise<IUser | any> => {
    try {
        const response = await serverFetch.get("/user/me", {
            revalidate: 300, // Cache for 5 minutes
            tags: ["user-info"],
        });

        const result = await response.json();

        if (result.success && result.data) {
            return result.data;
        }

        return null;
    } catch (error: any) {
        console.error("getUserInfo error:", error);
        return null;
    }
};
