/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { blockUser, deleteUser, unblockUser } from "@/services/admin.userManage";
import {
    Ban,
    Eye,
    Loader2,
    MoreVertical,
    ShieldOff,
    Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface UserActionsDropdownProps {
    user: any;
    onAction?: () => void;
}

export function UserActionsDropdown({ user, onAction }: UserActionsDropdownProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleAction = async (type: "BLOCK" | "UNBLOCK" | "DELETE") => {
        setLoading(true);
        let result;

        switch (type) {
            case "BLOCK":
                result = await blockUser(user.id);
                break;
            case "UNBLOCK":
                result = await unblockUser(user.id);
                break;
            case "DELETE":
                result = await deleteUser(user.id);
                break;
        }

        setLoading(false);

        if (result?.success) {
            toast.success(result.message || `User ${type.toLowerCase()}ed successfully`);
            onAction?.();
        } else {
            toast.error(result?.message || "Failed to perform action");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MoreVertical className="w-4 h-4" />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => router.push(`/profile/${user.id}`)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {user.isActive ? (
                    <DropdownMenuItem
                        onClick={() => handleAction("BLOCK")}
                        className="text-orange-600"
                    >
                        <Ban className="w-4 h-4 mr-2" />
                        Block User
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem onClick={() => handleAction("UNBLOCK")}>
                        <ShieldOff className="w-4 h-4 mr-2" />
                        Unblock User
                    </DropdownMenuItem>
                )}

                <DropdownMenuItem
                    onClick={() => handleAction("DELETE")}
                    className="text-red-600"
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete User
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
