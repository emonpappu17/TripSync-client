"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="space-y-6 container mx-auto px-4 max-w-6xl mb-24 mt-14">
            {/* Search bar skeleton */}
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-24 rounded-md" />
                    <Skeleton className="h-10 w-24 rounded-md" />
                </div>
            </div>

            {/* Grid of user cards skeleton */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="h-full overflow-hidden p-0">
                        <CardContent className="p-0">
                            {/* Header with avatar skeleton */}
                            <div className="relative h-32 bg-muted">
                                <div className="absolute -bottom-12 left-6">
                                    <Skeleton className="w-24 h-24 rounded-full border-4 border-background" />
                                </div>
                            </div>

                            {/* Content skeleton */}
                            <div className="pt-14 pb-6 px-6 space-y-4">
                                <Skeleton className="h-6 w-2/3" />
                                <Skeleton className="h-4 w-1/2" />

                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-12" />
                                    <Skeleton className="h-4 w-20" />
                                </div>

                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />

                                <div className="flex gap-4">
                                    <Skeleton className="h-4 w-12" />
                                    <Skeleton className="h-4 w-12" />
                                </div>

                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-16 rounded-md" />
                                    <Skeleton className="h-6 w-16 rounded-md" />
                                    <Skeleton className="h-6 w-16 rounded-md" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination skeleton */}
            <div className="flex justify-center mt-8">
                <Skeleton className="h-10 w-64 rounded-md" />
            </div>
        </div>
    );
}
