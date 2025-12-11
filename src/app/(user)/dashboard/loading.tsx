"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="space-y-6 container mx-auto px-4 max-w-6xl mb-24 mt-14">

            {/* Welcome Section */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="space-y-4 p-4">
                        <CardHeader className="flex justify-between items-center pb-2">
                            <CardTitle className="text-sm font-medium">
                                <Skeleton className="h-4 w-24" />
                            </CardTitle>
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-4 w-24" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Plans & Pending Requests */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Plans */}
                <Card className="space-y-4 p-4">
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-5 w-40" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 border rounded-lg space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-48" />
                            </div>
                        ))}
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>

                {/* Pending Requests */}
                <Card className="space-y-4 p-4">
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-5 w-40" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 border rounded-lg space-y-2">
                                <div className="flex justify-between items-center mb-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-8 w-full" />
                            </div>
                        ))}
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card className="space-y-4 p-4">
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-5 w-32" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col items-center space-y-2 py-6 border rounded-lg">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
