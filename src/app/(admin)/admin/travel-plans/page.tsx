import TravelPlansFilters from "@/components/modules/admin/TravelPlansFilters";
import Pagination from "@/components/modules/admin/Pagination";
import TravelPlansTable from "@/components/modules/admin/TravelPlansTable";
import { getAllTravelPlans } from "@/services/admin.travelPlanManage";

interface IParams {
    search?: string;
    status?: string;
    isPublic?: string;
    page?: string;
}

export default async function AdminTravelPlansPage({
    searchParams,
}: {
    searchParams: Promise<IParams>
}) {
    const searchParamsRes = (await searchParams) || {}

    const params = new URLSearchParams();

    if (searchParamsRes.search) params.set("search", searchParamsRes.search);
    if (searchParamsRes.status) params.set("status", searchParamsRes.status);
    if (searchParamsRes.isPublic) params.set("isPublic", searchParamsRes.isPublic);
    params.set("page", searchParamsRes.page || "1");
    params.set("limit", "10");

    const result = await getAllTravelPlans(params);

    return (
        <div className="container mx-auto py-6 px-4 min-h-screen max-w-7xl">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Manage Travel Plans</h1>
                <p className="text-muted-foreground mt-2">
                    View and manage all travel plans created by users
                </p>
            </div>

            {/* Filters */}
            <TravelPlansFilters />

            {/* Travel Plans Table */}
            <TravelPlansTable data={result?.data} meta={result?.meta} />

            {/* Pagination */}
            <Pagination totalPages={result?.meta?.totalPages || 1} />
        </div>
    );
}