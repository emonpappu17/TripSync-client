'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReviewModal } from './ReviewModal';
import { Star } from 'lucide-react';

interface WriteReviewButtonProps {
    toUserId: string;
    toUserName: string;
    travelPlanId?: string;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
    className?: string;
}

export function WriteReviewButton({
    toUserId,
    toUserName,
    travelPlanId,
    variant = 'default',
    size = 'default',
    className,
}: WriteReviewButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                variant={variant}
                size={size}
                onClick={() => setIsOpen(true)}
                className={className}
            >
                <Star className="w-4 h-4 mr-2" />
                Write a Review
            </Button>

            <ReviewModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                toUserId={toUserId}
                toUserName={toUserName}
                travelPlanId={travelPlanId}
            />
        </>
    );
}