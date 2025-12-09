
'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
    rating: number;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
    className?: string;
}

export function RatingStars({
    rating,
    maxRating = 5,
    size = 'md',
    interactive = false,
    onRatingChange,
    className,
}: RatingStarsProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    const handleClick = (value: number) => {
        if (interactive && onRatingChange) {
            onRatingChange(value);
        }
    };

    return (
        <div className={cn('flex gap-0.5', className)}>
            {Array.from({ length: maxRating }, (_, i) => {
                const starValue = i + 1;
                const isFilled = starValue <= rating;
                const isHalf = starValue - 0.5 === rating;

                return (
                    <button
                        key={i}
                        type="button"
                        onClick={() => handleClick(starValue)}
                        disabled={!interactive}
                        className={cn(
                            'transition-colors',
                            interactive && 'hover:scale-110 cursor-pointer',
                            !interactive && 'cursor-default'
                        )}
                    >
                        <Star
                            className={cn(
                                sizeClasses[size],
                                isFilled && 'fill-yellow-400 text-yellow-400',
                                isHalf && 'fill-yellow-200 text-yellow-400',
                                !isFilled && !isHalf && 'fill-none text-gray-300'
                            )}
                        />
                    </button>
                );
            })}
        </div>
    );
}