/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { getTravelPlanById } from "@/services/adminTravelPlan";
import {
    CalendarDays,
    MapPin,
    Users,
    DollarSign,
    Clock,
    Loader2,
    Globe
} from "lucide-react";
import { format } from "date-fns";
import { getTravelPlanById } from "@/services/admin.travelPlanManage";
import Image from "next/image";

interface TravelPlanDetailsModalProps {
    planId: string | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TravelPlanDetailsModal({ planId, open, onOpenChange }: TravelPlanDetailsModalProps) {
    const [plan, setPlan] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && planId) {
            fetchPlanDetails();
        }
    }, [open, planId]);

    const fetchPlanDetails = async () => {
        if (!planId) return;

        setLoading(true);
        const result = await getTravelPlanById(planId);
        if (result?.success) {
            setPlan(result.data);
        }
        setLoading(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PLANNING": return "bg-blue-600";
            case "UPCOMING": return "bg-purple-600";
            case "ONGOING": return "bg-green-600";
            case "COMPLETED": return "bg-gray-600";
            case "CANCELLED": return "bg-red-600";
            default: return "bg-gray-600";
        }
    };

    const acceptedRequests = plan?.requests?.filter((r: any) => r.status === "ACCEPTED") || [];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh]  p-5">
                <DialogHeader>
                    <DialogTitle>Travel Plan Details</DialogTitle>
                    <DialogDescription>
                        Complete information about this travel plan
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                ) : plan ? (
                    <ScrollArea className="max-h-[calc(90vh-120px)] pr-4 ">
                        <div className="space-y-6">
                            {/* Trip Image */}
                            {plan.image && (
                                // <div className="w-full h-48 rounded-lg overflow-hidden">
                                //     <img
                                //         src={plan.image}
                                //         alt={plan.title}
                                //         className="w-full h-full object-cover"
                                //     />
                                // </div>

                                <div className="w-full h-48 rounded-lg overflow-hidden relative">
                                    <Image
                                        src={plan.image}
                                        alt={plan.title}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            {/* Title and Status */}
                            <div>
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <h3 className="text-2xl font-bold">{plan.title}</h3>
                                    <Badge className={getStatusColor(plan.status)}>
                                        {plan.status}
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground">{plan.description}</p>
                            </div>

                            <Separator />

                            {/* Basic Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Destination */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Destination</p>
                                        <p className="font-medium">{plan.destination}</p>
                                        <p className="text-sm text-muted-foreground">{plan.country}</p>
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <CalendarDays className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Travel Dates</p>
                                        <p className="font-medium">
                                            {format(new Date(plan.startDate), "MMM dd, yyyy")}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            to {format(new Date(plan.endDate), "MMM dd, yyyy")}
                                        </p>
                                    </div>
                                </div>

                                {/* Budget */}
                                {(plan.budgetMin || plan.budgetMax) && (
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-muted">
                                            <DollarSign className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Budget Range</p>
                                            <p className="font-medium">
                                                ${plan.budgetMin || 0} - ${plan.budgetMax || 0}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Travel Type */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Travel Type</p>
                                        <p className="font-medium">{plan.travelType || "Not specified"}</p>
                                        {plan.maxTravelers && (
                                            <p className="text-sm text-muted-foreground">
                                                Max {plan.maxTravelers} travelers
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Visibility */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Visibility</p>
                                        <Badge variant={plan.isPublic ? "default" : "secondary"}>
                                            {plan.isPublic ? "Public" : "Private"}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Created */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Created</p>
                                        <p className="font-medium">
                                            {format(new Date(plan.createdAt), "MMM dd, yyyy")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Activities */}
                            {plan.activities && plan.activities.length > 0 && (
                                <>
                                    <Separator />
                                    <div>
                                        <h4 className="font-semibold mb-3">Planned Activities</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {plan.activities.map((activity: string, index: number) => (
                                                <Badge key={index} variant="outline">
                                                    {activity}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            <Separator />

                            {/* Organizer Info */}
                            <div>
                                <h4 className="font-semibold mb-3">Trip Organizer</h4>
                                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={plan.user?.profileImage} />
                                        <AvatarFallback>
                                            {plan.user?.fullName?.slice(0, 2).toUpperCase() || "??"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-medium">{plan.user?.fullName || "Unknown User"}</p>
                                            {plan.user?.isVerified && (
                                                <Badge className="bg-green-600">Verified</Badge>
                                            )}
                                        </div>
                                        {plan.user?.bio && (
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {plan.user.bio}
                                            </p>
                                        )}
                                        {plan.user?.interests && plan.user.interests.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {plan.user.interests.map((interest: string, index: number) => (
                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                        {interest}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Join Requests */}
                            <Separator />
                            <div>
                                <h4 className="font-semibold mb-3">
                                    Join Requests ({plan._count?.requests || 0})
                                </h4>

                                {acceptedRequests.length > 0 ? (
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {acceptedRequests.length} accepted travelers
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {acceptedRequests.map((request: any) => (
                                                <div
                                                    key={request.requesterId}
                                                    className="flex items-center gap-3 p-3 rounded-lg border"
                                                >
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={request.requester?.profileImage} />
                                                        <AvatarFallback>
                                                            {request.requester?.fullName?.slice(0, 2).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate">
                                                            {request.requester?.fullName}
                                                        </p>
                                                        <Badge variant="outline" className="text-xs bg-green-50">
                                                            Accepted
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No accepted requests yet
                                    </p>
                                )}
                            </div>
                        </div>
                    </ScrollArea>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        No details available
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}