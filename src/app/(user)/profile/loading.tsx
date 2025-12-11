"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-6xl space-y-8">

                {/* Back Button Skeleton */}
                <div className="w-24 h-10">
                    <Skeleton className="h-10 w-24" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* LEFT: Profile Card Skeleton */}
                    <Card className="p-6 sticky top-24 space-y-6">

                        {/* Avatar */}
                        <div className="flex justify-center">
                            <Skeleton className="w-32 h-32 rounded-full" />
                        </div>

                        {/* Name & Location */}
                        <div className="space-y-2 text-center">
                            <Skeleton className="w-40 h-6 mx-auto" />
                            <Skeleton className="w-28 h-4 mx-auto" />
                            <Skeleton className="w-24 h-5 mx-auto mt-2" />
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pb-6 border-b">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        {/* Actions */}
                        <Skeleton className="h-10 w-full" />

                        {/* Bio */}
                        <div className="pt-6 border-t space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>

                        {/* Interests */}
                        <div className="pt-6 border-t space-y-3">
                            <Skeleton className="h-5 w-28" />
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-6 w-16" />
                            </div>
                        </div>

                        {/* Visited Countries */}
                        <div className="pt-6 border-t space-y-3">
                            <Skeleton className="h-5 w-40" />
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-6 w-16" />
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-14" />
                            </div>
                        </div>
                    </Card>

                    {/* RIGHT SIDE */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Travel Plans Section */}
                        <div className="space-y-4">
                            <Skeleton className="w-56 h-7" />

                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="p-6 space-y-4">
                                    <div className="flex gap-4">
                                        <Skeleton className="w-24 h-24 rounded-lg" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-6 w-1/2" />
                                            <Skeleton className="h-4 w-1/3" />
                                            <div className="flex gap-2">
                                                <Skeleton className="h-6 w-20" />
                                                <Skeleton className="h-6 w-28" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Reviews Section */}
                        <div className="space-y-4">
                            <Skeleton className="w-40 h-7" />

                            {[1, 2].map((i) => (
                                <Card key={i} className="p-6 space-y-4">
                                    <div className="flex gap-3">
                                        <Skeleton className="w-10 h-10 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-5 w-32" />
                                            <Skeleton className="h-4 w-48" />
                                        </div>
                                    </div>

                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
