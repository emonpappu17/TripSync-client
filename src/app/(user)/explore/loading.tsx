import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6 container mx-auto px-4 max-w-6xl mb-24 mt-14 animate-in fade-in">
            {/* Page Title Skeleton */}
            <div>
                <Skeleton className="h-7 w-64 rounded-md" />
                <Skeleton className="h-4 w-80 mt-2 rounded-md" />
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* ---------- Sidebar Filters Skeleton ---------- */}
                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-5 space-y-6">
                        <Skeleton className="h-5 w-28" />

                        {/* Field blocks */}
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}

                        {/* Slider Skeleton */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-full rounded-full" />
                        </div>

                        {/* Buttons */}
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                {/* ---------- Travel Plans List Skeleton ---------- */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Results Header */}
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-28" />
                    </div>

                    {/* Travel Card Skeleton Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <TravelCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------------- Travel Plan Card Skeleton ---------------- */

function TravelCardSkeleton() {
    return (
        <div className="border rounded-lg overflow-hidden animate-pulse">
            {/* Image */}
            <Skeleton className="w-full aspect-video" />

            <div className="p-5 space-y-4">
                {/* Title */}
                <Skeleton className="h-5 w-52" />

                {/* Description */}
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />

                {/* Location */}
                <div className="flex gap-2 items-start">
                    <Skeleton className="h-4 w-4 rounded-sm" />
                    <div className="space-y-1 w-full">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>

                {/* Dates */}
                <div className="flex gap-2 items-start">
                    <Skeleton className="h-4 w-4 rounded-sm" />
                    <div className="space-y-1 w-full">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>

                {/* Budget */}
                <div className="flex gap-2 items-start">
                    <Skeleton className="h-4 w-4 rounded-sm" />
                    <div className="space-y-1 w-full">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>

                {/* Activities */}
                <div className="flex gap-2 flex-wrap pt-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-4">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                </div>
            </div>
        </div>
    );
}
