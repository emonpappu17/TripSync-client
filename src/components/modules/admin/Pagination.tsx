// "use client";

// import { Button } from "@/components/ui/button";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface PaginationProps {
//     totalPages: number;
// }

// export default function Pagination({ totalPages }: PaginationProps) {
//     const router = useRouter();
//     const params = useSearchParams();

//     const page = Number(params.get("page")) || 1;

//     const goToPage = (pageNumber: number) => {
//         const newParams = new URLSearchParams(params.toString());
//         newParams.set("page", String(pageNumber));
//         router.push(`/admin/users?${newParams.toString()}`);
//     };

//     if (totalPages <= 0) return null;
//     // console.log({ totalPages });
//     return (
//         <div className="flex items-center justify-between mt-6">

//             {/* ✅ Page Info */}
//             <p className="text-sm text-muted-foreground">
//                 Page <span className="font-medium">{page}</span> of{" "}
//                 <span className="font-medium">{totalPages}</span>
//             </p>

//             {/* ✅ Controls */}
//             <div className="flex items-center gap-2">

//                 <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => goToPage(page - 1)}
//                     disabled={page === 1}
//                 >
//                     <ChevronLeft className="h-4 w-4" />
//                 </Button>

//                 {/* ✅ Page Numbers (Smart Range) */}
//                 {Array.from({ length: totalPages }).map((_, i) => {
//                     const p = i + 1;
//                     if (
//                         p === 1 ||
//                         p === totalPages ||
//                         (p >= page - 1 && p <= page + 1)
//                     ) {
//                         return (
//                             <Button
//                                 key={p}
//                                 size="icon"
//                                 variant={p === page ? "default" : "outline"}
//                                 onClick={() => goToPage(p)}
//                             >
//                                 {p}
//                             </Button>
//                         );
//                     }

//                     if (p === page - 2 || p === page + 2) {
//                         return <span key={p}>…</span>;
//                     }

//                     return null;
//                 })}

//                 <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => goToPage(page + 1)}
//                     disabled={page === totalPages}
//                 >
//                     <ChevronRight className="h-4 w-4" />
//                 </Button>
//             </div>
//         </div>
//     );
// }



"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname(); // Get current route

    const page = Number(params.get("page")) || 1;

    const goToPage = (pageNumber: number) => {
        const newParams = new URLSearchParams(params.toString());
        newParams.set("page", String(pageNumber));

        // Use current pathname instead of hardcoded route
        router.push(`${pathname}?${newParams.toString()}`);
    };

    if (totalPages <= 0) return null;

    return (
        <div className="flex items-center justify-between mt-6">
            {/* Page Info */}
            <p className="text-sm text-muted-foreground">
                Page <span className="font-medium">{page}</span> of{" "}
                <span className="font-medium">{totalPages}</span>
            </p>

            {/* Controls */}
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Numbers (Smart Range) */}
                {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    if (
                        p === 1 ||
                        p === totalPages ||
                        (p >= page - 1 && p <= page + 1)
                    ) {
                        return (
                            <Button
                                key={p}
                                size="icon"
                                variant={p === page ? "default" : "outline"}
                                onClick={() => goToPage(p)}
                            >
                                {p}
                            </Button>
                        );
                    }

                    if (p === page - 2 || p === page + 2) {
                        return <span key={p}>…</span>;
                    }

                    return null;
                })}

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}