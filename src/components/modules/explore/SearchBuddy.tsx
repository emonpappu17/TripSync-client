"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useState, useEffect } from "react";

const SearchBuddy = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    // Debounce effect: wait 400ms after user stops typing
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    // Trigger search only when debounced value changes
    useEffect(() => {
        const params = new URLSearchParams();
        if (debouncedSearch) {
            params.set("search", debouncedSearch);
        }

        startTransition(() => {
            router.push(`/find-buddy?${params.toString()}`);
        });
    }, [debouncedSearch, router]);

    const clearSearch = () => {
        setSearch("");
        startTransition(() => {
            router.push(`/find-buddy`);
        });
    };

    return (
        <Card>
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-2">
                    {/* Input with icon */}
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            id="search"
                            placeholder="Search by name, country"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Clear button */}
                    <div className="flex gap-2">
                        <Button
                            onClick={clearSearch}
                            variant="outline"
                            className="flex items-center gap-2 whitespace-nowrap"
                        >
                            <X className="w-4 h-4" />
                            Clear
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SearchBuddy;


