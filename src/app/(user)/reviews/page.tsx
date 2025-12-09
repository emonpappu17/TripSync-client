/* eslint-disable react/no-unescaped-entities */
import { ReviewList } from '@/components/modules/reviews/ReviewList';
import { ReviewStats } from '@/components/modules/reviews/ReviewStats';
// import { ReviewList } from '@/components/reviews/ReviewList';
// import { ReviewStats } from '@/components/reviews/ReviewStats';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { getMyReviews } from '@/services/review';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// async function getMyReviews() {
//     const response = await serverFetch<any>('/reviews/my-reviews?limit=100');
//     res
//     // const response = await serverFetch<any>('/reviews/my-reviews?limit=100');
//     return response;
// }

export default async function MyReviewsPage() {
    // const user = await requireAuth();
    const user = await getUserInfo();
    const { data: reviews, meta } = await getMyReviews();

    return (
        <div className="space-y-6 container mx-auto px-4 max-w-6xl mb-24 mt-14">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/profile">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Profile
                    </Button>
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-bold mb-2">My Reviews</h1>
                <p className="text-muted-foreground">
                    Reviews you've received from other travelers
                </p>
            </div>

            {/* Stats */}
            <Card>
                <CardHeader>
                    <CardTitle>Overall Rating</CardTitle>
                </CardHeader>
                <CardContent>
                    <ReviewStats
                        averageRating={meta.averageRating}
                        totalReviews={meta.total}
                    />
                </CardContent>
            </Card>

            {/* Reviews List */}
            <Card>
                <CardHeader>
                    <CardTitle>All Reviews ({meta.total})</CardTitle>
                </CardHeader>
                <CardContent>
                    <ReviewList reviews={reviews} currentUserId={user?.id} canEdit={false} />
                </CardContent>
            </Card>
        </div>
    );
}