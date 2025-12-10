/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { blockUser, deleteUser, unblockUser, verifyUser } from "@/actions/admin.actions";
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
import { Textarea } from "@/components/ui/textarea";
import { blockUser, deleteUser, unblockUser, verifyUser } from "@/services/admin";
import {
    Ban,
    Eye,
    Loader2,
    MoreVertical,
    ShieldCheck,
    ShieldOff,
    Trash2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface UserActionsDropdownProps {
    user: any;
    onAction?: () => void;
}

export function UserActionsDropdown({ user, onAction }: UserActionsDropdownProps) {
    // const { toast } = useToast();
    const router = useRouter();
    const [showDialog, setShowDialog] = useState(false);
    const [actionType, setActionType] = useState<"BLOCK" | "UNBLOCK" | "DELETE" | "VERIFY" | null>(null);
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAction = async () => {
        if (!actionType) return;

        setLoading(true);
        let result;

        switch (actionType) {
            case "BLOCK":
                result = await blockUser(user.id, reason);
                break;
            case "UNBLOCK":
                result = await unblockUser(user.id, reason);
                break;
            case "DELETE":
                result = await deleteUser(user.id, reason);
                break;
            case "VERIFY":
                result = await verifyUser(user.id, reason);
                break;
        }

        setLoading(false);

        if (result?.success) {
            toast.success(result.message || `User ${actionType.toLowerCase()}ed successfully`,
            );
            setShowDialog(false);
            setReason("");
            setActionType(null);
            onAction?.();
        } else {
            toast.error(result?.message || "Failed to perform action",);
        }
    };

    const openDialog = (type: typeof actionType) => {
        setActionType(type);
        setShowDialog(true);
    };

    const getDialogContent = () => {
        switch (actionType) {
            case "BLOCK":
                return {
                    title: "Block User",
                    description: `Are you sure you want to block ${user.fullName || user.email}? This will prevent them from accessing the platform.`,
                    actionText: "Block User",
                    variant: "destructive" as const,
                };
            case "UNBLOCK":
                return {
                    title: "Unblock User",
                    description: `Are you sure you want to unblock ${user.fullName || user.email}? This will restore their access to the platform.`,
                    actionText: "Unblock User",
                    variant: "default" as const,
                };
            case "DELETE":
                return {
                    title: "Delete User",
                    description: `Are you sure you want to delete ${user.fullName || user.email}? This action will soft delete the user account.`,
                    actionText: "Delete User",
                    variant: "destructive" as const,
                };
            case "VERIFY":
                return {
                    title: "Verify User",
                    description: `Are you sure you want to verify ${user.fullName || user.email}? This will grant them a verified badge.`,
                    actionText: "Verify User",
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

                    <DropdownMenuItem onClick={() => router.push(`/profile/${user.id}`)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                    </DropdownMenuItem>

                    {!user.isVerified && (
                        <DropdownMenuItem onClick={() => openDialog("VERIFY")}>
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            Verify User
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    {user.isActive ? (
                        <DropdownMenuItem
                            onClick={() => openDialog("BLOCK")}
                            className="text-orange-600"
                        >
                            <Ban className="w-4 h-4 mr-2" />
                            Block User
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem onClick={() => openDialog("UNBLOCK")}>
                            <ShieldOff className="w-4 h-4 mr-2" />
                            Unblock User
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                        onClick={() => openDialog("DELETE")}
                        className="text-red-600"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete User
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

                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason (Optional)</Label>
                        <Textarea
                            id="reason"
                            placeholder="Enter reason for this action..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={3}
                        />
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
        </>
    );
}