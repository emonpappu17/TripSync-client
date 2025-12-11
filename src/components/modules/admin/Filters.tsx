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
import { Search, UserCog, ShieldCheck, CheckCircle } from "lucide-react";

export default function Filters() {
    const router = useRouter();
    const params = useSearchParams();

    const update = (key: string, value: string) => {
        const newParams = new URLSearchParams(params.toString());
        if (!value || value === "all") newParams.delete(key);
        else newParams.set(key, value);
        newParams.set("page", "1");
        router.push(`/admin/users?${newParams.toString()}`);
    };

    return (
        <div className="bg-card rounded-lg border p-2 my-6">
            <div className="flex flex-wrap md:flex-nowrap gap-4 items-end overflow-x-auto p-2">
                {/* Search */}
                <div className="flex flex-col min-w-[200px] flex-1">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                        <Search className="h-4 w-4" /> Search
                    </label>
                    <Input
                        placeholder="Search by name or email..."
                        onChange={(e) => update("search", e.target.value)}
                    />
                </div>

                {/* Role */}
                <div className="flex flex-col min-w-[150px]">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                        <UserCog className="h-4 w-4" /> Role
                    </label>
                    <Select onValueChange={(v) => update("role", v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="USER">User</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Status */}
                <div className="flex flex-col min-w-[150px]">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                        <ShieldCheck className="h-4 w-4" /> Status
                    </label>
                    <Select onValueChange={(v) => update("isActive", v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="true">Active</SelectItem>
                            <SelectItem value="false">Blocked</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Verified */}
                <div className="flex flex-col min-w-[150px]">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4" /> Verified
                    </label>
                    <Select onValueChange={(v) => update("isVerified", v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select verification" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="true">Verified</SelectItem>
                            <SelectItem value="false">Not Verified</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Reset Button */}
                <div className="flex flex-col min-w-[120px]">
                    <label className="text-sm font-medium text-transparent mb-1">Reset</label>
                    <Button
                        variant="outline"
                        onClick={() => router.push("/admin/users")}
                        className="w-full"
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
}
