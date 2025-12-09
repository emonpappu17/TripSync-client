/* eslint-disable @typescript-eslint/no-explicit-any */
// import { requireAuth } from '@/lib/server/auth';
// import { serverFetch } from '@/lib/server/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { ReviewStats } from '@/components/reviews/ReviewStats';
// import { ReviewList } from '@/components/reviews/ReviewList';
// import { WriteReviewButton } from '@/components/reviews/WriteReviewButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { WriteReviewButton } from '@/components/modules/reviews/WriteReviewButton';
import { ReviewStats } from '@/components/modules/reviews/ReviewStats';
import { ReviewList } from '@/components/modules/reviews/ReviewList';
import { getUsrById } from '@/services/user';
import { getUserReviews } from '@/services/review';
import { getUserInfo } from '@/services/auth/getUserInfo';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ userId: string }>;
    searchParams: { page?: string };
}

// async function getUserReviews(userId: string, page = 1) {
//     const response = await serverFetch<any>(
//         `/reviews/user/${userId}?page=${page}&limit=10`
//     );
//     return response;
// }

// async function getUserProfile(userId: string) {
//     const response = await serverFetch<any>(`/users/${userId}`);
//     return response.data;
// }

export default async function UserReviewsPage({ params, searchParams }: PageProps) {
    const { userId } = await params;
    const paramPage = await searchParams;
    // const currentUser = await requireAuth();
    const currentUser = await getUserInfo();
    const page = parseInt(paramPage.page || '1');

    const [profile, reviewsData] = await Promise.all([
        getUsrById(userId),
        getUserReviews(userId),
        // getUserReviews(userId, page),
    ]);

    const { data: reviews, meta } = reviewsData;
    const isOwnProfile = currentUser.id === userId;

    return (
        <div className="space-y-6 container mx-auto px-4 max-w-6xl mb-24 mt-14">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={`/profile/${userId}`}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Profile
                        </Button>
                    </Link>
                </div>
                {!isOwnProfile && (
                    <WriteReviewButton
                        toUserId={userId}
                        toUserName={profile.fullName}
                        variant="default"
                    />
                )}
            </div>

            <div>
                <h1 className="text-3xl font-bold mb-2">
                    Reviews for {profile.fullName}
                </h1>
                <p className="text-muted-foreground">
                    See what other travelers say about their experience
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
                    <ReviewList
                        reviews={reviews}
                        currentUserId={currentUser.id}
                        canEdit={false}
                    />
                </CardContent>
            </Card>

            {/* Pagination */}
            {meta.totalPages > 1 && (
                <div className="flex justify-center gap-2">
                    {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                        <Link key={p} href={`/reviews/${userId}?page=${p}`}>
                            <Button variant={p === page ? 'default' : 'outline'} size="sm">
                                {p}
                            </Button>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}