// components/shared/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
    label?: string;          // text shown on the button
    className?: string;      // extra styling
    onClick?: () => void;    // optional custom handler
    href?: string;           // optional route to navigate to
}

export function BackButton({
    label = "Back",
    className = "",
    onClick,
    href,
}: BackButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }
        if (href) {
            router.push(href);
        } else {
            router.back(); // default behavior
        }
    };

    return (
        <Button
            variant="ghost"
            onClick={handleClick}
            className={`flex items-center mb-6 ${className}`}
        >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {label}
        </Button>
    );
}
