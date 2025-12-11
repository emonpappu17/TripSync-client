"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="container mx-auto py-6 px-4 min-h-screen max-w-7xl space-y-6">

            {/* Page Header */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
            </div>

            {/* Filters Skeleton */}
            <div className="flex flex-wrap gap-4 mt-4">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-10 w-36 rounded-md" />
                ))}
            </div>

            {/* Table Skeleton */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-5 w-40" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <div className="min-w-[900px]">
                        {/* Table Header */}
                        <div className="grid grid-cols-8 gap-4 py-2 border-b">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <Skeleton key={i} className="h-4 w-full" />
                            ))}
                        </div>

                        {/* Table Rows */}
                        {Array.from({ length: 5 }).map((_, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="grid grid-cols-8 gap-4 py-4 border-b last:border-b-0"
                            >
                                {Array.from({ length: 8 }).map((_, cellIndex) => (
                                    <Skeleton key={cellIndex} className="h-4 w-full" />
                                ))}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Pagination Skeleton */}
            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-10 rounded-md" />
                ))}
            </div>
        </div>
    );
}
