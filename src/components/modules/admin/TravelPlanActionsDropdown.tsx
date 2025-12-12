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
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { deleteTravelPlanByAdmin, toggleTravelPlanVisibility, updateTravelPlanStatus } from "@/services/admin.travelPlanManage";
import {
    Eye,
    Loader2,
    MoreVertical,
    Trash2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { TravelPlanDetailsModal } from "./TravelPlanDetailsModal";

interface TravelPlanActionsDropdownProps {
    plan: any;
}

export function TravelPlanActionsDropdown({ plan }: TravelPlanActionsDropdownProps) {
    // const { toast } = useToast();
    const router = useRouter();
    const [showDialog, setShowDialog] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [actionType, setActionType] = useState<"DELETE" | "STATUS" | "VISIBILITY" | null>(null);
    const [reason, setReason] = useState("");
    const [newStatus, setNewStatus] = useState(plan.status);
    const [loading, setLoading] = useState(false);

    const handleAction = async () => {
        if (!actionType) return;

        setLoading(true);
        let result;

        switch (actionType) {
            case "DELETE":
                result = await deleteTravelPlanByAdmin(plan.id, reason);
                break;
            case "STATUS":
                result = await updateTravelPlanStatus(plan.id, newStatus);
                break;
            case "VISIBILITY":
                result = await toggleTravelPlanVisibility(plan.id, !plan.isPublic);
                break;
        }

        setLoading(false);

        if (result?.success) {
            toast.success(result.message || "Action completed successfully");
            setShowDialog(false);
            setReason("");
            setActionType(null);
            router.refresh();
        } else {
            toast.error(result?.message || "Failed to perform action");
        }
    };

    const openDialog = (type: typeof actionType) => {
        setActionType(type);
        setShowDialog(true);
    };

    const getDialogContent = () => {
        switch (actionType) {
            case "DELETE":
                return {
                    title: "Delete Travel Plan",
                    description: `Are you sure you want to delete "${plan.title}"? This action cannot be undone.`,
                    actionText: "Delete Plan",
                    variant: "destructive" as const,
                };
            case "STATUS":
                return {
                    title: "Update Trip Status",
                    description: `Change the status of "${plan.title}"`,
                    actionText: "Update Status",
                    variant: "default" as const,
                };
            case "VISIBILITY":
                return {
                    title: `Make Plan ${plan.isPublic ? "Private" : "Public"}`,
                    description: `Are you sure you want to make "${plan.title}" ${plan.isPublic ? "private" : "public"}?`,
                    actionText: `Make ${plan.isPublic ? "Private" : "Public"}`,
                    variant: "default" as const,
                };
            default:
                return {
                    title: "",
                    description: "",
                    actionText: "",
                    variant: "default" as const,
                };
        }
    };

    const dialogContent = getDialogContent();

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

                    {/* <DropdownMenuItem onClick={() => openDialog("STATUS")}>
                        <Calendar className="w-4 h-4 mr-2" />
                        Update Status
                    </DropdownMenuItem> */}

                    {/* <DropdownMenuItem onClick={() => openDialog("VISIBILITY")}>
                        {plan.isPublic ? (
                            <EyeOff className="w-4 h-4 mr-2" />
                        ) : (
                            <Eye className="w-4 h-4 mr-2" />
                        )}
                        Make {plan.isPublic ? "Private" : "Public"}
                    </DropdownMenuItem> */}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() => openDialog("DELETE")}
                        className="text-red-600"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Plan
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialogContent.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="space-y-4">
                        {actionType === "STATUS" && (
                            <div className="space-y-2">
                                <Label htmlFor="status">New Status</Label>
                                <Select value={newStatus} onValueChange={setNewStatus}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PLANNING">Planning</SelectItem>
                                        <SelectItem value="UPCOMING">Upcoming</SelectItem>
                                        <SelectItem value="ONGOING">Ongoing</SelectItem>
                                        <SelectItem value="COMPLETED">Completed</SelectItem>
                                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {actionType === "DELETE" && (
                            <div className="space-y-2">
                                <Label htmlFor="reason">Reason (Optional)</Label>
                                <Textarea
                                    id="reason"
                                    placeholder="Enter reason for deletion..."
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    rows={3}
                                />
                            </div>
                        )}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleAction}
                            disabled={loading}
                            className={dialogContent.variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
                        >
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {dialogContent.actionText}
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