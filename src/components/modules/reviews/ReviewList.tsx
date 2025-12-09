/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useState } from 'react';
// import { ReviewCard } from './ReviewCard';
// import { ReviewModal } from './ReviewModal';
// import { IReview } from '@/types/review.interface';
import { Button } from '@/components/ui/button';
import { ReviewModal } from './ReviewModal';
import { ReviewCard } from './ReviewCard';

interface ReviewListProps {
    reviews: any[];
    currentUserId?: string;
    canEdit?: boolean;
}

export function ReviewList({ reviews, currentUserId, canEdit }: ReviewListProps) {
    const [editingReview, setEditingReview] = useState<any | null>(null);

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No reviews yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <ReviewCard
                    key={review.id}
                    review={review}
                    canEdit={canEdit && review.fromReviewerId === currentUserId}
                    onEdit={setEditingReview}
                />
            ))}

            {editingReview && (
                <ReviewModal
                    isOpen={true}
                    onClose={() => setEditingReview(null)}
                    toUserId={editingReview.toReviewerId}
                    toUserName="User" // You might want to pass this
                    existingReview={editingReview}
                />
            )}
        </div>
    );
}