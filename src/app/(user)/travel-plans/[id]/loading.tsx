"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen py-8 bg-linear-to-b from-background to-muted/20">
            <div className="container mx-auto px-4 max-w-5xl space-y-6">

                {/* Back Button Skeleton */}
                <Skeleton className="h-8 w-28 rounded-md" />

                <div className="grid lg:grid-cols-3 gap-8 mt-4">

                    {/* LEFT SIDE — MAIN CONTENT */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Hero Image */}
                        <div className="relative">
                            <Skeleton className="w-full h-80 rounded-2xl" />

                            {/* Badge skeletons */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                        </div>

                        {/* Title + Location */}
                        <div className="space-y-3">
                            <Skeleton className="h-8 w-64 rounded-md" />
                            <div className="flex gap-4">
                                <Skeleton className="h-5 w-40 rounded-md" />
                                <Skeleton className="h-5 w-28 rounded-md" />
                            </div>
                        </div>

                        {/* Host Card */}
                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <Skeleton className="w-16 h-16 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-5 w-48" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                                <Skeleton className="h-9 w-28 rounded-md" />
                            </div>
                        </Card>

                        {/* Matches Section */}
                        <Card className="p-6">
                            <Skeleton className="h-6 w-40 mb-4" />
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Skeleton className="w-12 h-12 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-40" />
                                            <Skeleton className="h-3 w-32" />
                                        </div>
                                        <Skeleton className="w-20 h-8 rounded-md" />
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Description */}
                        <Card className="p-6">
                            <Skeleton className="h-6 w-40 mb-3" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-11/12" />
                            <Skeleton className="h-4 w-10/12" />
                        </Card>

                        {/* Activities */}
                        <Card className="p-6 space-y-3">
                            <Skeleton className="h-6 w-48" />
                            <div className="flex gap-2 flex-wrap">
                                {[1, 2, 3, 4].map((i) => (
                                    <Skeleton key={i} className="h-7 w-20 rounded-full" />
                                ))}
                            </div>
                        </Card>

                        {/* Interests */}
                        <Card className="p-6 space-y-3">
                            <Skeleton className="h-6 w-52" />
                            <div className="flex gap-2 flex-wrap">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-7 w-24 rounded-full" />
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div>
                        <Card className="p-6 space-y-6 sticky top-24">

                            <Skeleton className="h-6 w-40" />

                            {/* Trip Details */}
                            <div className="space-y-4 mt-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <Skeleton className="h-6 w-6 rounded-md" />
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Button */}
                            <Skeleton className="h-11 w-full rounded-md" />

                            {/* Safety Tips */}
                            <Card className="p-4 space-y-2 bg-muted/40">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-40" />
                                <Skeleton className="h-3 w-36" />
                                <Skeleton className="h-3 w-44" />
                            </Card>

                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
