import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen py-8">
            <div className="space-y-6 container mx-auto px-4 max-w-4xl">

                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="h-4 w-56" />
                    </div>
                    <Skeleton className="h-9 w-32 rounded-md" />
                </div>

                {/* Travel Plan Card Skeleton */}
                <Card className="p-6 space-y-6">
                    <div className="flex items-start justify-between">
                        <div className="space-y-3">
                            <Skeleton className="h-6 w-60" />
                            <div className="flex flex-wrap gap-3">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                        </div>

                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>

                    <Skeleton className="h-px w-full" />

                    <Skeleton className="h-10 w-full md:w-48 rounded-md" />
                </Card>

                {/* Travel Buddy Card Skeleton */}
                <Card className="p-6 space-y-6">
                    <Skeleton className="h-6 w-48" />

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Avatar */}
                        <Skeleton className="h-24 w-24 rounded-full" />

                        {/* Info Column */}
                        <div className="flex-1 space-y-4">
                            <Skeleton className="h-6 w-52" />

                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-4 w-56" />

                            {/* Email */}
                            <Skeleton className="h-4 w-40" />

                            {/* Interests */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Skeleton className="h-6 w-20 rounded-md" />
                                <Skeleton className="h-6 w-16 rounded-md" />
                                <Skeleton className="h-6 w-24 rounded-md" />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2 pt-2">
                                <Skeleton className="h-10 w-full rounded-md" />
                                <Skeleton className="h-10 w-36 rounded-md" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Match Info Card Skeleton */}
                <Card className="p-6 space-y-6">
                    <Skeleton className="h-6 w-48" />

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-28" />
                        </div>
                    </div>

                    <Skeleton className="h-px w-full" />

                    <div className="flex gap-3">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <div className="space-y-2 w-full">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                </Card>

                {/* Danger Zone Skeleton */}
                <Card className="p-6 border-destructive/50 space-y-4">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-10 w-40 rounded-md" />
                </Card>
            </div>
        </div>
    );
}
