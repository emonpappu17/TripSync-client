/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTravelPlanByAdmin } from "@/services/admin.travelPlanManage";
import {
    Eye,
    Loader2,
    MoreVertical,
    Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { TravelPlanDetailsModal } from "./TravelPlanDetailsModal";

interface TravelPlanActionsDropdownProps {
    plan: any;
}

export function TravelPlanActionsDropdown({ plan }: TravelPlanActionsDropdownProps) {
    const router = useRouter();
    const [showDialog, setShowDialog] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reason, setReason] = useState("");

    const handleDelete = async () => {
        setLoading(true);
        const result = await deleteTravelPlanByAdmin(plan.id, reason);
        setLoading(false);

        if (result?.success) {
            toast.success(result.message || "Travel plan deleted successfully");
            setShowDialog(false);
            setReason("");
            router.refresh();
        } else {
            toast.error(result?.message || "Failed to delete travel plan");
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => setShowDetailsModal(true)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() => setShowDialog(true)}
                        className="text-red-600"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Plan
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Travel Plan</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{plan.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={loading}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Delete Plan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Details Modal */}
            <TravelPlanDetailsModal
                planId={plan.id}
                open={showDetailsModal}
                onOpenChange={setShowDetailsModal}
            />
        </>
    );
}
