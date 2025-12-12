/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileCard from '@/components/modules/profile/ProfileCard';
import { ReviewList } from '@/components/modules/reviews/ReviewList';
import { ReviewStats } from '@/components/modules/reviews/ReviewStats';
import { WriteReviewButton } from '@/components/modules/reviews/WriteReviewButton';
import { BackButton } from '@/components/shared/BackButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { getUserReviews} from '@/services/review';
import { getTravelPlanByUserId } from '@/services/travel-plan';
import { getUsrById } from '@/services/user';
import { IUser } from '@/types/user.interface';
import { Calendar, Eye, Users } from 'lucide-react';
import Link from 'next/link';
const DetailProfilePage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const profileUser = await getUsrById(id)
    const userPlans = await getTravelPlanByUserId(id);
    // const userReviews = await getUserReviews);
    const userReviews = await getUserReviews(id);

    // console.log({ profileUser, userPlans, userReviews });
    const currentUser = await getUserInfo();

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <BackButton label='Back'></BackButton>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <ProfileCard
                        profileUser={profileUser?.data as IUser}
                        isOwnProfile={false}
                    />

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Travel Plans */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-primary" />
                                {false ? 'My' : 'Upcoming'} Travel Plans
                            </h2>

                            {userPlans?.data?.length > 0 ? (
                                <div className="space-y-4">
                                    {userPlans?.data?.map((plan: any) => (
                                        <Link key={plan.id} href={`/travel-plans/${plan.id}`}>
                                            <Card className="p-6 hover:shadow-medium transition-smooth mb-4">
                                                <div className="flex gap-4">
                                                    <img
                                                        src={plan.image}
                                                        alt={plan.destination}
                                                        className="w-24 h-24 rounded-lg object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold mb-1">{plan.destination}, {plan.country}</h3>
                                                        <p className="text-sm text-muted-foreground mb-2">
                                                            {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                                                        </p>
                                                        <div className="flex gap-2">
                                                            <Badge>{plan.travelType}</Badge>
                                                            <Badge variant="secondary">
                                                                <Users className="w-3 h-3 mr-1" />
                                                                {plan.maxTravelers} members
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <Card className="p-8 text-center">
                                    <p className="text-muted-foreground">No active travel plans</p>
                                </Card>
                            )}
                        </div>

                        {/* Reviews */}
                        {/* <div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Award className="w-6 h-6 text-primary" />
                                Reviews ({userReviews?.data?.length})
                            </h2>

                            {userReviews?.data?.length > 0 ? (
                                <div className="space-y-4">
                                    {userReviews?.data?.map((review: any) => (
                                        <Card key={review.id} className="p-6">
                                            <div className="flex gap-3 mb-3">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarImage src={review.formReviewer.profileImage} />
                                                    <AvatarFallback>{review.formReviewer.fullName}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-semibold">{review.formReviewer.fullName}</h4>
                                                        <div className="flex gap-0.5">
                                                            {Array.from({ length: review.rating }).map((_, i) => (
                                                                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-2">
                                                        Trip to {review.tourPlanReview.destination} • {new Date(review.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground">{review.comment}</p>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <Card className="p-8 text-center">
                                    <p className="text-muted-foreground">No reviews yet</p>
                                </Card>
                            )}
                        </div> */}


                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Reviews & Ratings</CardTitle>
                                </div>
                                <div className="flex gap-2">
                                    {/* {!isOwnProfile && (
                                        <WriteReviewButton
                                            toUserId={id}
                                            toUserName={profileUser.fullName}
                                            variant="outline"
                                            size="sm"
                                        />
                                    )} */}
                                    <WriteReviewButton
                                        toUserId={id}
                                        toUserName={profileUser?.fullName}
                                        variant="outline"
                                        size="sm"
                                    />
                                    {userReviews?.meta.total > 0 && (
                                        <Link href={`/reviews/${id}`}>
                                            <Button variant="outline" size="sm">
                                                <Eye className="w-4 h-4 mr-2" />
                                                View All ({userReviews?.meta.total})
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Stats */}
                                <ReviewStats
                                    averageRating={userReviews?.meta.averageRating}
                                    totalReviews={userReviews?.meta.total}
                                />

                                {/* Recent Reviews */}
                                {userReviews?.data.length > 0 ? (
                                    <>
                                        <div>
                                            <h3 className="font-semibold mb-4">Recent Reviews</h3>
                                            <ReviewList
                                                reviews={userReviews?.data}
                                                currentUserId={currentUser.id}
                                                canEdit={false}
                                            />
                                        </div>
                                        {userReviews?.meta.total > 5 && (
                                            <div className="text-center pt-4">
                                                <Link href={`/reviews/${id}`}>
                                                    <Button variant="outline">
                                                        View All {userReviews?.meta.total} Reviews
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground mb-4">
                                            No reviews yet
                                        </p>
                                        {/* {!isOwnProfile && (
                                            <WriteReviewButton
                                                toUserId={id}
                                                toUserName={profile.fullName}
                                            />
                                        )} */}
                                        <WriteReviewButton
                                            toUserId={id}
                                            toUserName={profileUser?.data.fullName}
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProfilePage;