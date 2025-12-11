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
        <div className="bg-card rounded-lg border p-2 my-6">
            <div className="flex flex-wrap md:flex-nowrap gap-4 items-end overflow-x-auto p-2">
                {/* Search */}
                <div className="flex flex-col min-w-[200px] flex-1">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                        <Search className="h-4 w-4" /> Search Travel Plans
                    </label>
                    <Input
                        placeholder="Search by title or destination..."
                        defaultValue={params.get("search") || ""}
                        onChange={(e) => update("search", e.target.value)}
                    />
                </div>

                {/* Trip Status */}
                <div className="flex flex-col min-w-[150px]">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4" /> Trip Status
                    </label>
                    <Select
                        defaultValue={params.get("status") || "all"}
                        onValueChange={(v) => update("status", v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="PLANNING">Planning</SelectItem>
                            <SelectItem value="UPCOMING">Upcoming</SelectItem>
                            <SelectItem value="ONGOING">Ongoing</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Visibility */}
                <div className="flex flex-col min-w-[150px]">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4" /> Visibility
                    </label>
                    <Select
                        defaultValue={params.get("isPublic") || "all"}
                        onValueChange={(v) => update("isPublic", v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="true">Public</SelectItem>
                            <SelectItem value="false">Private</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Reset Button */}
                <div className="flex flex-col min-w-[120px]">
                    <label className="text-sm font-medium text-transparent mb-1">Reset</label>
                    <Button
                        variant="outline"
                        onClick={() => router.push("/admin/travel-plans")}
                        className="w-full"
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </div>

    );
}