/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RatingStars } from './RatingStars';
import { Loader2 } from 'lucide-react';

interface ReviewFormProps {
  initialData?: {
    rating: number;
    comment: string;
    isPublic: boolean;
  };
  onSubmit: (data: {
    rating: number;
    comment: string;
    isPublic: boolean;
  }) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function ReviewForm({
  initialData = { rating: 0, comment: '', isPublic: true },
  onSubmit,
  onCancel,
  submitLabel = 'Submit Review',
}: ReviewFormProps) {
  const [rating, setRating] = useState(initialData.rating);
  const [comment, setComment] = useState(initialData.comment);
  const [isPublic, setIsPublic] = useState(initialData.isPublic);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      return;
    }

    if (!comment.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit({ rating, comment: comment.trim(), isPublic });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating */}
      <div className="space-y-2">
        <Label>Your Rating *</Label>
        <RatingStars
          rating={rating}
          interactive
          size="lg"
          onRatingChange={setRating}
        />
        {rating === 0 && (
          <p className="text-xs text-muted-foreground">
            Please select a rating
          </p>
        )}
      </div>

      {/* Comment */}
      <div className="space-y-2">
        <Label htmlFor="comment">Your Review *</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience traveling with this person..."
          rows={6}
          required
        />
        <p className="text-xs text-muted-foreground">
          {comment.length} / 500 characters
        </p>
      </div>

      {/* Public/Private */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Make review public</Label>
          <p className="text-xs text-muted-foreground">
            Others can see this review on the user's profile
          </p>
        </div>
        <Switch checked={isPublic} onCheckedChange={setIsPublic} />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading || rating === 0 || !comment.trim()}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}