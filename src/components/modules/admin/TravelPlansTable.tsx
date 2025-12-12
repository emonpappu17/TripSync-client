/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { TravelPlanActionsDropdown } from "./TravelPlanActionsDropdown";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { TravelPlanActionsDropdown } from "./TravelPlanActionsDropdown";
import Image from "next/image";

export default function TravelPlansTable({ data, meta }: any) {
    if (!data?.length) {
        return <div className="text-center py-12 text-muted-foreground">No travel plans found</div>;
    }

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "PLANNING":
                return "secondary";
            case "UPCOMING":
                return "default";
            case "ONGOING":
                return "default";
            case "COMPLETED":
                return "outline";
            case "CANCELLED":
                return "destructive";
            default:
                return "secondary";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PLANNING":
                return "bg-blue-600 text-white";
            case "UPCOMING":
                return "bg-purple-600 text-white";
            case "ONGOING":
                return "bg-green-600 text-white";
            case "COMPLETED":
                return "bg-gray-600 text-white";
            case "CANCELLED":
                return "bg-red-600 text-white";
            default:
                return "bg-gray-600 text-white";
        }
    };

    return (
        <div className="bg-card rounded-lg border mt-6 overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[250px]">Trip Details</TableHead>
                            <TableHead className="min-w-[200px]">Organizer</TableHead>
                            <TableHead>Destination</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead>Requests</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((plan: any) => (
                            <TableRow key={plan.id}>
                                {/* Trip Details */}
                                <TableCell>
                                    <div className="flex items-start gap-3">
                                        {plan.image ? (
                                            <Image
                                                src={plan.image}
                                                alt={plan.title}
                                                width={64}   
                                                height={64} 
                                                className="rounded-lg object-cover"
                                            />

                                            // <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                                            //     <Image
                                            //         src={plan.image}
                                            //         alt={plan.title}
                                            //         fill
                                            //         className="object-cover"
                                            //     />
                                            // </div>

                                        ) : (
                                            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                                                <MapPin className="w-6 h-6 text-muted-foreground" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium truncate">{plan.title}</div>
                                            <div className="text-sm text-muted-foreground line-clamp-2">
                                                {plan.description || "No description"}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Organizer */}
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={plan.user?.profileImage} />
                                            <AvatarFallback>
                                                {plan.user?.fullName?.slice(0, 2).toUpperCase() || "??"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0">
                                            <div className="font-medium text-sm truncate">
                                                {plan.user?.fullName || "Unknown User"}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Destination */}
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                                        <div className="min-w-0">
                                            <div className="font-medium text-sm truncate">
                                                {plan.destination}
                                            </div>
                                            <div className="text-xs text-muted-foreground truncate">
                                                {plan.country}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Dates */}
                                <TableCell>
                                    <div className="flex items-start gap-2">
                                        <CalendarDays className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <div>{format(new Date(plan.startDate), "MMM dd, yyyy")}</div>
                                            <div className="text-muted-foreground">
                                                {format(new Date(plan.endDate), "MMM dd, yyyy")}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Status */}
                                <TableCell>
                                    <Badge
                                        variant={getStatusVariant(plan.status)}
                                        className={getStatusColor(plan.status)}
                                    >
                                        {plan.status}
                                    </Badge>
                                </TableCell>

                                {/* Visibility */}
                                <TableCell>
                                    <Badge variant={plan.isPublic ? "default" : "secondary"}>
                                        {plan.isPublic ? "Public" : "Private"}
                                    </Badge>
                                </TableCell>

                                {/* Requests */}
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">
                                            {plan._count?.requests || 0}
                                        </span>
                                    </div>
                                </TableCell>

                                {/* Actions */}
                                <TableCell className="text-right">
                                    <TravelPlanActionsDropdown plan={plan} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}