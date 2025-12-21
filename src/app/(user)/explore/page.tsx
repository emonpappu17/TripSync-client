/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchFilters from '@/components/modules/explore/SearchFilters';
import TravelPlanCard from '@/components/modules/explore/TravelPlanCard';
import { getAllTravelPlans } from '@/services/travel-plan';
import { Suspense } from 'react';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata() {
    return {
        title: "Explore Travel Plans | Travel Sync",
        description: "Discover and explore travel plans from travelers around the world",
    };
}

interface SearchParams {
    destination?: string;
    startDate?: string;
    endDate?: string;
    travelType?: string;
    budgetMin?: string;
    budgetMax?: string;
    sortBy?: string;
    page?: string;
}

async function getTravelPlans(searchParams: SearchParams) {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
        if (value) params.append(key, value);
    });

    const response = await getAllTravelPlans(params);

    return response;
}


export default async function ExplorePage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {

    const params = (await searchParams) || {}
    const [
        travelPlans,

    ] = await Promise.all([
        getTravelPlans(params),
    ]);

    const hasFilters = Object.keys(params).length > 0;

    return (
        <div className="space-y-6 container mx-auto px-4 max-w-6xl mb-24 mt-14">
            <div>
                <h1 className="text-3xl font-bold mb-2">Explore Travel Buddies</h1>
                <p className="text-muted-foreground">
                    Find travelers heading to the same destination
                </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                    <Suspense fallback={<div>Loading filters...</div>}>
                        <SearchFilters />
                    </Suspense>
                </div>

                {/* Results */}
                <div className="lg:col-span-3 space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">
                                {hasFilters ? 'Search Results' : 'All Travel Plans'}
                            </h2>
                            <span className="text-sm text-muted-foreground">
                                {travelPlans?.meta?.total || 0} plans found
                            </span>
                        </div>

                        {travelPlans?.data?.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">
                                    No travel plans found. Try adjusting your filters.
                                </p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4">
                                {travelPlans?.data?.map((result: any) => (
                                    <TravelPlanCard
                                        key={result.id}
                                        plan={result}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
