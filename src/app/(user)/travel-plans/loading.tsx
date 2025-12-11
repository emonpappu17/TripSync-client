"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen py-8">
            <div className="space-y-6 container mx-auto px-4 max-w-6xl">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>

                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-32 rounded-lg" />
                        <Skeleton className="h-10 w-40 rounded-lg" />
                    </div>
                </div>

                {/* Skeleton Travel Plan Cards */}
                <div className="space-y-6">
                    {/* Repeat Skeleton Cards */}
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">

                                {/* Image */}
                                <Skeleton className="w-full md:w-48 h-48 rounded-lg" />

                                <div className="flex-1 space-y-4">

                                    {/* Title & Meta */}
                                    <div className="flex justify-between gap-4">
                                        <div className="space-y-3 w-full">
                                            <Skeleton className="h-6 w-3/4" />
                                            <div className="flex gap-3 flex-wrap">
                                                <Skeleton className="h-4 w-28" />
                                                <Skeleton className="h-4 w-32" />
                                                <Skeleton className="h-4 w-24" />
                                            </div>
                                        </div>

                                        <div className="flex gap-2 items-start">
                                            <Skeleton className="h-6 w-20 rounded-full" />
                                            <Skeleton className="h-8 w-8 rounded-md" />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />

                                    {/* Request / Match Count */}
                                    <div className="flex gap-6">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-3">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-6 w-20 rounded-full" />
                                        </div>

                                        <div className="flex gap-2">
                                            <Skeleton className="h-9 w-28 rounded-md" />
                                            <Skeleton className="h-9 w-20 rounded-md" />
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
