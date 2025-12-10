/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserActionsDropdown } from "./UserActionsDropdown";
// import { UserActionsDropdown } from "@/components/modules/admin/UserActionsDropdown";

export default function UsersTable({ data, meta }: any) {
    if (!data?.length) {
        return <div className="text-center py-12 text-muted-foreground">No users found</div>;
    }

    return (
        <div className="bg-card rounded-lg border mt-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Verified</TableHead>
                        <TableHead>Travel Plans</TableHead>
                        <TableHead>Reviews</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((user: any) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={user.profileImage} />
                                        <AvatarFallback>
                                            {user.fullName?.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{user.fullName || "No name"}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {user.currentLocation || "No location"}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell>{user.email}</TableCell>

                            <TableCell>
                                <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                                    {user.role}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                <Badge variant={user.isActive ? "default" : "destructive"}>
                                    {user.isActive ? "Active" : "Blocked"}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                {user.isVerified ? (
                                    <Badge className="bg-green-600">Verified</Badge>
                                ) : (
                                    <Badge variant="outline">Not Verified</Badge>
                                )}
                            </TableCell>

                            <TableCell>{user._count?.travelPlans || 0}</TableCell>
                            <TableCell>{user._count?.reviewsReceived || 0}</TableCell>

                            {/* ✅ CLIENT ACTIONS */}
                            <TableCell className="text-right">
                                <UserActionsDropdown user={user} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
