// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// // import { getAllUsers } from "@/actions/admin.actions";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// // import { UserActionsDropdown } from "@/components/admin/UserActionsDropdown";
// import { Loader2, Search } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { getAllUsers } from "@/services/admin";
// import { UserActionsDropdown } from "@/components/modules/admin/UserActionsDropdown";

// export default function AdminUsersPage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const [users, setUsers] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [meta, setMeta] = useState<any>(null);

//     // Filter states
//     const [search, setSearch] = useState(searchParams.get("search") || "");
//     const [role, setRole] = useState(searchParams.get("role") || "");
//     const [isActive, setIsActive] = useState(searchParams.get("isActive") || "");
//     const [isVerified, setIsVerified] = useState(searchParams.get("isVerified") || "");
//     const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

//     const fetchUsers = async () => {
//         setLoading(true);
//         const params = new URLSearchParams();

//         if (search) params.append("search", search);
//         if (role) params.append("role", role);
//         if (isActive) params.append("isActive", isActive);
//         if (isVerified) params.append("isVerified", isVerified);
//         params.append("page", page.toString());
//         params.append("limit", "10");

//         const result = await getAllUsers(params);

//         if (result.success) {
//             setUsers(result.data || []);
//             setMeta(result.meta);
//         }
//         setLoading(false);
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, [page]);

//     const handleSearch = () => {
//         setPage(1);
//         fetchUsers();
//     };

//     const handleReset = () => {
//         setSearch("");
//         setRole("");
//         setIsActive("");
//         setIsVerified("");
//         setPage(1);
//         router.push("/admin/users");
//     };

//     const getInitials = (name: string) => {
//         return name
//             .split(" ")
//             .map(n => n[0])
//             .join("")
//             .toUpperCase()
//             .slice(0, 2);
//     };

//     return (
//         <div className="container mx-auto py-6 px-4">
//             <div className="mb-6">
//                 <h1 className="text-3xl font-bold">Manage Users</h1>
//                 <p className="text-muted-foreground mt-2">
//                     View and manage all registered users
//                 </p>
//             </div>

//             {/* Filters */}
//             <div className="bg-card rounded-lg border p-4 mb-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//                     <div className="lg:col-span-2">
//                         <Input
//                             placeholder="Search by name or email..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                         />
//                     </div>

//                     <Select value={role} onValueChange={setRole}>
//                         <SelectTrigger>
//                             <SelectValue placeholder="Filter by Role" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="all">All Roles</SelectItem>
//                             <SelectItem value="USER">User</SelectItem>
//                             <SelectItem value="ADMIN">Admin</SelectItem>
//                         </SelectContent>
//                     </Select>

//                     <Select value={isActive} onValueChange={setIsActive}>
//                         <SelectTrigger>
//                             <SelectValue placeholder="Filter by Status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="all">All Status</SelectItem>
//                             <SelectItem value="true">Active</SelectItem>
//                             <SelectItem value="false">Blocked</SelectItem>
//                         </SelectContent>
//                     </Select>

//                     <Select value={isVerified} onValueChange={setIsVerified}>
//                         <SelectTrigger>
//                             <SelectValue placeholder="Verified Status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="all">All</SelectItem>
//                             <SelectItem value="true">Verified</SelectItem>
//                             <SelectItem value="false">Not Verified</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 <div className="flex gap-2 mt-4">
//                     <Button onClick={handleSearch} className="flex-1 md:flex-initial">
//                         <Search className="w-4 h-4 mr-2" />
//                         Search
//                     </Button>
//                     <Button onClick={handleReset} variant="outline">
//                         Reset
//                     </Button>
//                 </div>
//             </div>

//             {/* Users Table */}
//             <div className="bg-card rounded-lg border">
//                 {loading ? (
//                     <div className="flex items-center justify-center py-12">
//                         <Loader2 className="w-8 h-8 animate-spin" />
//                     </div>
//                 ) : users.length === 0 ? (
//                     <div className="text-center py-12 text-muted-foreground">
//                         No users found
//                     </div>
//                 ) : (
//                     <>
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>User</TableHead>
//                                     <TableHead>Email</TableHead>
//                                     <TableHead>Role</TableHead>
//                                     <TableHead>Status</TableHead>
//                                     <TableHead>Verified</TableHead>
//                                     <TableHead>Travel Plans</TableHead>
//                                     <TableHead>Reviews</TableHead>
//                                     <TableHead className="text-right">Actions</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {users.map((user) => (
//                                     <TableRow key={user.id}>
//                                         <TableCell>
//                                             <div className="flex items-center gap-3">
//                                                 <Avatar>
//                                                     <AvatarImage src={user.profileImage} />
//                                                     <AvatarFallback>
//                                                         {getInitials(user.fullName || user.email)}
//                                                     </AvatarFallback>
//                                                 </Avatar>
//                                                 <div>
//                                                     <div className="font-medium">{user.fullName || "No name"}</div>
//                                                     <div className="text-sm text-muted-foreground">
//                                                         {user.currentLocation || "No location"}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </TableCell>
//                                         <TableCell>{user.email}</TableCell>
//                                         <TableCell>
//                                             <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
//                                                 {user.role}
//                                             </Badge>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Badge variant={user.isActive ? "default" : "destructive"}>
//                                                 {user.isActive ? "Active" : "Blocked"}
//                                             </Badge>
//                                         </TableCell>
//                                         <TableCell>
//                                             {user.isVerified ? (
//                                                 <Badge variant="default" className="bg-green-600">Verified</Badge>
//                                             ) : (
//                                                 <Badge variant="outline">Not Verified</Badge>
//                                             )}
//                                         </TableCell>
//                                         <TableCell>{user._count?.travelPlans || 0}</TableCell>
//                                         <TableCell>{user._count?.reviewsReceived || 0}</TableCell>
//                                         <TableCell className="text-right">
//                                             <UserActionsDropdown user={user} onAction={fetchUsers} />
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>

//                         {/* Pagination */}
//                         {meta && meta.totalPages > 1 && (
//                             <div className="flex items-center justify-between px-4 py-4 border-t">
//                                 <div className="text-sm text-muted-foreground">
//                                     Showing {((meta.page - 1) * meta.limit) + 1} to {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} users
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <Button
//                                         variant="outline"
//                                         size="sm"
//                                         onClick={() => setPage(p => Math.max(1, p - 1))}
//                                         disabled={page === 1}
//                                     >
//                                         Previous
//                                     </Button>
//                                     <Button
//                                         variant="outline"
//                                         size="sm"
//                                         onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
//                                         disabled={page === meta.totalPages}
//                                     >
//                                         Next
//                                     </Button>
//                                 </div>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }


import Filters from "@/components/modules/admin/Filters";
import Pagination from "@/components/modules/admin/Pagination";
import UsersTable from "@/components/modules/admin/UsersTable";
import { getAllUsers } from "@/services/admin";
// import UsersTable from "./UsersTable";
// import Filters from "./Filters";

interface IParams {
    search?: string;
    role?: string;
    isActive?: string;
    isVerified?: string;
    page?: string;
};

export default async function AdminUsersPage({
    searchParams,
}: {
    searchParams: Promise<IParams>
}) {
    const searchParamsRes = (await searchParams) || {}

    const params = new URLSearchParams();

    if (searchParamsRes.search) params.set("search", searchParamsRes.search);
    if (searchParamsRes.role) params.set("role", searchParamsRes.role);
    if (searchParamsRes.isActive) params.set("isActive", searchParamsRes.isActive);
    if (searchParamsRes.isVerified) params.set("isVerified", searchParamsRes.isVerified);
    params.set("page", searchParamsRes.page || "1");
    params.set("limit", "10");

    const result = await getAllUsers(params);
    console.log(result.meta.totalPages);
    return (
        <div className="container mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold">Manage Users</h1>
            <p className="text-muted-foreground mt-2">
                View and manage all registered users
            </p>

            {/* ✅ CLIENT FILTER ONLY */}
            <Filters />

            {/* ✅ SERVER TABLE */}
            <UsersTable data={result.data} meta={result.meta} />
            <Pagination totalPages={result.meta.totalPages} />
        </div>
    );
}
