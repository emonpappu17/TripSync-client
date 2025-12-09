/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { RatingStars } from './RatingStars';
// import { IReview } from '@/types/review.interface';
import { Edit, Trash2, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { deleteReview } from '@/services/review';

interface ReviewCardProps {
    review: any;
    canEdit?: boolean;
    onEdit?: (review: any) => void;
}

export function ReviewCard({ review, canEdit, onEdit }: ReviewCardProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteReview(review.id);
            toast.success('Review deleted successfully');
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete review');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex gap-4">
                    {/* Reviewer Avatar */}
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={review.formReviewer.profileImage} />
                        <AvatarFallback>
                            {review.formReviewer.fullName[0]}
                        </AvatarFallback>
                    </Avatar>

                    {/* Content */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h4 className="font-semibold">{review.formReviewer.fullName}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <RatingStars rating={review.rating} size="sm" />
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            {canEdit && (
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEdit?.(review)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="sm" disabled={isDeleting}>
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Review?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your review.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleDelete}>
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            )}
                        </div>

                        {/* Trip Info */}
                        {review.tourPlanReview && (
                            <Badge variant="secondary" className="mb-2">
                                <MapPin className="w-3 h-3 mr-1" />
                                {review.tourPlanReview.destination}, {review.tourPlanReview.country}
                            </Badge>
                        )}

                        {/* Comment */}
                        <p className="text-sm text-muted-foreground mt-2">
                            {review.comment}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}