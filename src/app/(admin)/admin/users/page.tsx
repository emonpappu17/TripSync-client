import Filters from "@/components/modules/admin/Filters";
import Pagination from "@/components/modules/admin/Pagination";
import UsersTable from "@/components/modules/admin/UsersTable";
import { getAllUsers } from "@/services/admin.userManage";
// import UsersTable from "./UsersTable";
// import Filters from "./Filters";

interface IParams {
    search?: string;
    role?: string;
    isActive?: string;
    isVerified?: string;
    page?: string;
};

export default async function AdminUsersPage({
    searchParams,
}: {
    searchParams: Promise<IParams>
}) {
    const searchParamsRes = (await searchParams) || {}

    const params = new URLSearchParams();

    if (searchParamsRes.search) params.set("search", searchParamsRes.search);
    if (searchParamsRes.role) params.set("role", searchParamsRes.role);
    if (searchParamsRes.isActive) params.set("isActive", searchParamsRes.isActive);
    if (searchParamsRes.isVerified) params.set("isVerified", searchParamsRes.isVerified);
    params.set("page", searchParamsRes.page || "1");
    params.set("limit", "10");

    const result = await getAllUsers(params);
    // console.log(result.meta.totalPages);
    return (
        <div className="container mx-auto py-6 px-4 min-h-screen max-w-7xl">
            <h1 className="text-3xl font-bold">Manage Users</h1>
            <p className="text-muted-foreground mt-2">
                View and manage all registered users
            </p>

            {/* CLIENT FILTER ONLY */}
            <Filters />

            {/* SERVER TABLE */}
            <UsersTable data={result?.data} meta={result?.meta} />
            <Pagination totalPages={result?.meta?.totalPages} />
        </div>
    );
}
