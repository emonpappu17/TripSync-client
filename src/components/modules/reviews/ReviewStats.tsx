import { Users } from 'lucide-react';
import { RatingStars } from './RatingStars';

interface ReviewStatsProps {
    averageRating: number;
    totalReviews: number;
    className?: string;
}

export function ReviewStats({
    averageRating,
    totalReviews,
    className,
}: ReviewStatsProps) {
    return (
        <div className={className}>
            <div className="flex items-center gap-2 mb-2">
                <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
                <div>
                    <RatingStars rating={averageRating} size="lg" />
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Users className="w-3 h-3" />
                        {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                    </p>
                </div>
            </div>
        </div>
    );
}