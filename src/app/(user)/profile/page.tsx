/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { getMyReviews } from '@/services/review';
import { getMyTravelPlans } from '@/services/travel-plan';
import { ArrowLeft, Award, Calendar, Edit, Mail, MapPin, Star, Users } from 'lucide-react';
import Link from 'next/link';

const ProfilePage = async () => {
    const profileUser = await getUserInfo()
    const userPlans = await getMyTravelPlans();
    const userReviews = await getMyReviews();
    const isOwnProfile = true
    // console.log({ profileUser });
    // console.log({ userPlans });
    console.log({ userReviews });
    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <Button
                    variant="ghost"
                    // onClick={() => navigate(-1)}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-24">
                            <div className="text-center mb-6">
                                <div className="relative inline-block mb-4">
                                    <Avatar className="w-32 h-32 border-4 border-primary/20">
                                        <AvatarImage
                                            src={profileUser?.profileImage || "/default-avatar.png"} // fallback image
                                        />
                                        <AvatarFallback>
                                            {profileUser?.fullName?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    {profileUser?.isVerified && (
                                        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                                            <Star className="w-5 h-5 text-white fill-white" />
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-2xl font-bold mb-1">
                                    {profileUser?.fullName || "Unknown Traveler"}
                                </h1>
                                <p className="text-muted-foreground flex items-center justify-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {profileUser?.currentLocation || "Location not set"}
                                </p>

                                {profileUser?.isVerified && (
                                    <Badge className="mt-3 gradient-accent text-white border-0">
                                        Premium Member
                                    </Badge>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {profileUser?.stats?.travelPlansCount ?? 0}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Trips</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {profileUser?.stats?.averageRating ?? 0}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Rating</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {profileUser?.stats?.reviewsReceivedCount ?? 0}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Reviews</div>
                                </div>
                            </div>

                            {/* Actions */}
                            {isOwnProfile ? (
                                <Link href="/profile/edit">
                                    <Button className="w-full" variant="outline">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                </Link>
                            ) : (
                                <div className="space-y-3">
                                    <Button className="w-full gradient-hero">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Send Message
                                    </Button>
                                    <Link href="/pricing">
                                        <Button className="w-full" variant="outline">
                                            Upgrade to Premium
                                        </Button>
                                    </Link>
                                </div>
                            )}

                            {/* Bio */}
                            <div className="mt-6 pt-6 border-t">
                                <h3 className="font-semibold mb-2">About</h3>
                                <p className="text-sm text-muted-foreground">
                                    {profileUser?.bio || "This traveler hasn’t shared a bio yet."}
                                </p>
                            </div>

                            {/* Interests */}
                            <div className="mt-6 pt-6 border-t">
                                <h3 className="font-semibold mb-3">Interests</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(profileUser?.interests?.length
                                        ? profileUser.interests
                                        : ["Exploring", "Photography", "Food Tours"]
                                    ).map((interest: string) => (
                                        <Badge key={interest} variant="secondary">
                                            {interest}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Visited Countries */}
                            <div className="mt-6 pt-6 border-t">
                                <h3 className="font-semibold mb-3">Visited Countries</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(profileUser?.visitedCountries?.length
                                        ? profileUser.visitedCountries
                                        : ["None yet"]
                                    ).map((country: string) => (
                                        <Badge key={country} variant="outline">
                                            {country}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>


                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Travel Plans */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-primary" />
                                {isOwnProfile ? 'My' : 'Upcoming'} Travel Plans
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
                        <div>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;