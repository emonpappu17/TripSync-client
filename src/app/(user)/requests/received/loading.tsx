"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="space-y-8 container mx-auto px-4 max-w-6xl mb-24 mt-14">

            {/* Header */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-4 w-80" />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b pb-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-20 rounded-md" />
                ))}
            </div>

            {/* Request Cards Skeleton */}
            <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card
                        key={i}
                        className="rounded-xl shadow-sm border hover:shadow transition-all"
                    >
                        <CardContent className="p-6">
                            <div className="flex gap-4">

                                {/* Avatar */}
                                <Skeleton className="w-16 h-16 rounded-full" />

                                {/* Content */}
                                <div className="flex-1 space-y-4">

                                    {/* Header */}
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <Skeleton className="h-5 w-40" />
                                            <Skeleton className="h-4 w-52" />
                                        </div>
                                        <Skeleton className="h-6 w-20 rounded-md" />
                                    </div>

                                    {/* Trip details */}
                                    <div className="flex flex-wrap gap-4 text-sm">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-4 w-36" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>

                                    {/* Message */}
                                    <Skeleton className="h-16 w-full rounded-lg" />

                                    {/* Action buttons */}
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-32 rounded-md" />
                                        <Skeleton className="h-8 w-32 rounded-md" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 pt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-8 rounded-md" />
                ))}
            </div>
        </div>
    );
}
