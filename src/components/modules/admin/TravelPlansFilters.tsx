"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, Calendar } from "lucide-react";

export default function TravelPlansFilters() {
    const router = useRouter();
    const params = useSearchParams();

    const update = (key: string, value: string) => {
        const newParams = new URLSearchParams(params.toString());
        if (!value || value === "all") newParams.delete(key);
        else newParams.set(key, value);
        newParams.set("page", "1");
        router.push(`/admin/travel-plans?${newParams.toString()}`);
    };

    return (
        <div className="bg-card rounded-lg border shadow-sm p-6 my-6">
            <div className="space-y-4">
                {/* Search Input - Full Width */}
                <div className="w-full">
                    <label className="text-sm font-medium mb-2 block">
                        Search Travel Plans
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by title or destination..."
                            defaultValue={params.get("search") || ""}
                            onChange={(e) => update("search", e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Filter Selects - Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Trip Status
                        </label>
                        <Select
                            defaultValue={params.get("status") || "all"}
                            onValueChange={(v) => update("status", v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="PLANNING">Planning</SelectItem>
                                <SelectItem value="UPCOMING">Upcoming</SelectItem>
                                <SelectItem value="ONGOING">Ongoing</SelectItem>
                                <SelectItem value="COMPLETED">Completed</SelectItem>
                                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Visibility
                        </label>
                        <Select
                            defaultValue={params.get("isPublic") || "all"}
                            onValueChange={(v) => update("isPublic", v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Plans" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Plans</SelectItem>
                                <SelectItem value="true">Public</SelectItem>
                                <SelectItem value="false">Private</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                        onClick={() => router.push("/admin/travel-plans")}
                        variant="outline"
                        className="w-full sm:w-auto"
                    >
                        Reset All
                    </Button>
                </div>
            </div>
        </div>
    );
}