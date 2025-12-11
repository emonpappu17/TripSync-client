// /* eslint-disable @typescript-eslint/no-explicit-any */
// //   Get dashboard statistics

// import { serverFetch } from "@/lib/server-fetch";

// export async function getDashboardStats() {
//     try {
//         const response = await serverFetch.get('/admin/dashboard/stats');
//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch dashboard stats'}`
//         };
//     }
// }