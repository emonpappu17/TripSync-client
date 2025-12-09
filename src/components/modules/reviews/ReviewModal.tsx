/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
// import { ReviewForm } from './ReviewForm';
import { createReview, updateReview } from '@/services/review';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ReviewForm } from './ReviewForm';
// import { IReview } from '@/types/review.interface';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    toUserId: string;
    toUserName: string;
    travelPlanId?: string;
    existingReview?: any;
}

export function ReviewModal({
    isOpen,
    onClose,
    toUserId,
    toUserName,
    travelPlanId,
    existingReview,
}: ReviewModalProps) {
    const router = useRouter();

    const handleSubmit = async (data: {
        rating: number;
        comment: string;
        isPublic: boolean;
    }) => {
        try {
            if (existingReview) {
                // Update existing review
                await updateReview(existingReview.id, data);
                toast.success('Review updated successfully');
            } else {
                // Create new review
                await createReview({
                    toReviewerId: toUserId,
                    travelPlanId,
                    ...data,
                });
                toast.success('Review submitted successfully');
            }
            onClose();
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || 'Failed to submit review');
            throw error;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {existingReview ? 'Edit Review' : 'Write a Review'}
                    </DialogTitle>
                    <DialogDescription>
                        {existingReview
                            ? 'Update your review for'
                            : 'Share your experience traveling with'}{' '}
                        <span className="font-semibold">{toUserName}</span>
                    </DialogDescription>
                </DialogHeader>
                <ReviewForm
                    initialData={
                        existingReview
                            ? {
                                rating: existingReview.rating,
                                comment: existingReview.comment,
                                isPublic: existingReview.isPublic,
                            }
                            : undefined
                    }
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                    submitLabel={existingReview ? 'Update Review' : 'Submit Review'}
                />
            </DialogContent>
        </Dialog>
    );
}