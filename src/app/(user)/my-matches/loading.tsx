"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen py-8">
            <div className="space-y-6 container mx-auto px-4 max-w-6xl">

                {/* Header */}
                <div className="space-y-2">
                    <Skeleton className="h-8 w-56" />
                    <Skeleton className="h-4 w-72" />
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="p-4 space-y-2">
                            <Skeleton className="h-8 w-14" />
                            <Skeleton className="h-4 w-24" />
                        </Card>
                    ))}
                </div>

                {/* Matches Skeleton */}
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">

                                {/* Main Content */}
                                <div className="flex-1 space-y-5">

                                    {/* Title + badge row */}
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-3 w-full">
                                            <Skeleton className="h-6 w-2/3" />

                                            <div className="flex flex-wrap gap-3 mt-2">
                                                <Skeleton className="h-4 w-28" />
                                                <Skeleton className="h-4 w-32" />
                                                <Skeleton className="h-4 w-20" />
                                            </div>
                                        </div>

                                        <Skeleton className="h-6 w-20 rounded-full" />
                                    </div>

                                    {/* Buddy Card */}
                                    <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-lg">

                                        {/* Avatar */}
                                        <Skeleton className="h-12 w-12 rounded-full" />

                                        {/* Right Side */}
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-5 w-40" />
                                            <Skeleton className="h-4 w-64" />

                                            <div className="flex gap-2 mt-2">
                                                <Skeleton className="h-5 w-16 rounded-full" />
                                                <Skeleton className="h-5 w-14 rounded-full" />
                                                <Skeleton className="h-5 w-20 rounded-full" />
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-2">
                                            <Skeleton className="h-9 w-24 rounded-md" />
                                            <Skeleton className="h-9 w-28 rounded-md" />
                                        </div>
                                    </div>

                                    {/* Footer Row */}
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-4 w-40" />
                                        <div className="flex gap-2">
                                            <Skeleton className="h-8 w-24 rounded-md" />
                                            <Skeleton className="h-8 w-32 rounded-md" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Card>
                    ))}
                </div>

            </div>
        </div>
    );
}
