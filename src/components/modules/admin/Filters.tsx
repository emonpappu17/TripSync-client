// "use client";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function Filters() {
//     const router = useRouter();
//     const params = useSearchParams();

//     const update = (key: string, value: string) => {
//         const newParams = new URLSearchParams(params.toString());
//         if (!value || value === "all") newParams.delete(key);
//         else newParams.set(key, value);
//         newParams.set("page", "1");
//         router.push(`/admin/users?${newParams.toString()}`);
//     };

//     return (
//         <div className="bg-card rounded-lg border p-4 my-6 grid grid-cols-1 md:grid-cols-4 gap-4">
//             <Input placeholder="Search..." onBlur={(e) => update("search", e.target.value)} />

//             <Select onValueChange={(v) => update("role", v)}>
//                 <SelectTrigger><SelectValue placeholder="Role" /></SelectTrigger>
//                 <SelectContent>
//                     <SelectItem value="all">All</SelectItem>
//                     <SelectItem value="USER">User</SelectItem>
//                     <SelectItem value="ADMIN">Admin</SelectItem>
//                 </SelectContent>
//             </Select>

//             <Select onValueChange={(v) => update("isActive", v)}>
//                 <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
//                 <SelectContent>
//                     <SelectItem value="all">All</SelectItem>
//                     <SelectItem value="true">Active</SelectItem>
//                     <SelectItem value="false">Blocked</SelectItem>
//                 </SelectContent>
//             </Select>

//             <Select onValueChange={(v) => update("isVerified", v)}>
//                 <SelectTrigger><SelectValue placeholder="Verified" /></SelectTrigger>
//                 <SelectContent>
//                     <SelectItem value="all">All</SelectItem>
//                     <SelectItem value="true">Verified</SelectItem>
//                     <SelectItem value="false">Not Verified</SelectItem>
//                 </SelectContent>
//             </Select>
//         </div>
//     );
// }
// "use client";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Search, ShieldCheck, UserCog, RefreshCcw } from "lucide-react";

// export default function Filters() {
//   const router = useRouter();
//   const params = useSearchParams();

//   const update = (key: string, value: string) => {
//     const newParams = new URLSearchParams(params.toString());

//     if (!value || value === "all") newParams.delete(key);
//     else newParams.set(key, value);

//     newParams.set("page", "1");
//     router.push(`/admin/users?${newParams.toString()}`);
//   };

//   const clearFilters = () => {
//     router.push("/admin/users");
//   };

//   return (
//     <div className="bg-card rounded-xl border shadow-sm p-5 space-y-4">

//       {/* ✅ Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-base font-semibold">User Filters</h2>

//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={clearFilters}
//           className="text-muted-foreground hover:text-primary flex items-center gap-2"
//         >
//           <RefreshCcw className="w-4 h-4" />
//           Reset
//         </Button>
//       </div>

//       {/* ✅ Filter Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

//         {/* ✅ Search */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium text-muted-foreground">
//             Search User
//           </label>
//           <div className="relative">
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Name, email..."
//               className="pl-9"
//               defaultValue={params.get("search") || ""}
//               onBlur={(e) => update("search", e.target.value)}
//             />
//           </div>
//         </div>

//         {/* ✅ Role Filter */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium text-muted-foreground">
//             Role
//           </label>
//           <Select
//             defaultValue={params.get("role") || "all"}
//             onValueChange={(v) => update("role", v)}
//           >
//             <SelectTrigger>
//               <div className="flex items-center gap-2">
//                 <UserCog className="w-4 h-4 text-muted-foreground" />
//                 <SelectValue placeholder="Select role" />
//               </div>
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="USER">User</SelectItem>
//               <SelectItem value="ADMIN">Admin</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* ✅ Active Status */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium text-muted-foreground">
//             Account Status
//           </label>
//           <Select
//             defaultValue={params.get("isActive") || "all"}
//             onValueChange={(v) => update("isActive", v)}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="true">Active</SelectItem>
//               <SelectItem value="false">Blocked</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* ✅ Verification */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium text-muted-foreground">
//             Verification
//           </label>
//           <Select
//             defaultValue={params.get("isVerified") || "all"}
//             onValueChange={(v) => update("isVerified", v)}
//           >
//             <SelectTrigger>
//               <div className="flex items-center gap-2">
//                 <ShieldCheck className="w-4 h-4 text-muted-foreground" />
//                 <SelectValue placeholder="Verification" />
//               </div>
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="true">Verified</SelectItem>
//               <SelectItem value="false">Not Verified</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//       </div>
//     </div>
//   );
// }



// "use client";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Search, UserCog, ShieldCheck, CheckCircle } from "lucide-react";

// export default function Filters() {
//   const router = useRouter();
//   const params = useSearchParams();

//   const update = (key: string, value: string) => {
//     const newParams = new URLSearchParams(params.toString());
//     if (!value || value === "all") newParams.delete(key);
//     else newParams.set(key, value);
//     newParams.set("page", "1");
//     router.push(`/admin/users?${newParams.toString()}`);
//   };

//   return (
//     <div className="bg-card rounded-lg border p-6 my-6">
//       <h2 className="text-lg font-semibold mb-4">Filter Users</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {/* Search */}
//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//             <Search className="h-4 w-4" /> Search
//           </label>
//           <Input
//             placeholder="Search by name or email..."
//             onBlur={(e) => update("search", e.target.value)}
//             className="w-full"
//           />
//         </div>

//         {/* Role */}
//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//             <UserCog className="h-4 w-4" /> Role
//           </label>
//           <Select onValueChange={(v) => update("role", v)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select role" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="USER">User</SelectItem>
//               <SelectItem value="ADMIN">Admin</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Status */}
//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//             <ShieldCheck className="h-4 w-4" /> Status
//           </label>
//           <Select onValueChange={(v) => update("isActive", v)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="true">Active</SelectItem>
//               <SelectItem value="false">Blocked</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Verified */}
//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//             <CheckCircle className="h-4 w-4" /> Verified
//           </label>
//           <Select onValueChange={(v) => update("isVerified", v)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select verification" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="true">Verified</SelectItem>
//               <SelectItem value="false">Not Verified</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Reset Filters */}
//       <div className="flex justify-end mt-6">
//         <Button
//           variant="outline"
//           onClick={() => router.push("/admin/users")}
//           className="text-sm"
//         >
//           Reset Filters
//         </Button>
//       </div>
//     </div>
//   );
// }



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
                        onBlur={(e) => update("search", e.target.value)}
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
