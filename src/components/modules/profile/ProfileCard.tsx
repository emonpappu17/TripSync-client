import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IUser } from '@/types/user.interface';
import { Award, Edit, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

const ProfileCard = ({ profileUser, isOwnProfile }: { profileUser: IUser, isOwnProfile: boolean }) => {
    // console.log({ profileUser });
    return (
        <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
                <div className="text-center">
                    <div className="relative inline-block mb-6">
                        {/* Main Avatar */}
                        <Avatar className="w-32 h-32 ring-4 ring-primary/10 transition-all duration-300 hover:ring-primary/30">
                            <AvatarImage
                                src={profileUser?.profileImage || "/default-avatar.png"}
                                className="object-cover"
                            />
                            <AvatarFallback className="text-6xl font-medium bg-linear-to-br from-blue-500 to-purple-600 text-white">
                                {profileUser?.fullName?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>

                        {/* Verified Badge — consistent with card design */}
                        {profileUser?.isVerified && (
                            <Badge className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                Verified
                            </Badge>
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
                        <Badge className="mt-3 bg-accent text-accent-foreground border-0">
                            Premium Member
                        </Badge>
                    )}

                    {!profileUser?.isVerified && isOwnProfile && (
                        <Link href="/subscription">
                            <Button className="mt-4 w-full gradient-hero shadow-md hover:opacity-90 transition">
                                Get Verified
                            </Button>
                        </Link>
                    )}
                </div>


                {/* Stats */}
                <div className="grid grid-cols-3 gap-4  pb-6 border-b">
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
                        <Button className="w-full gradient-hero"
                        >
                            <Mail className="w-4 h-4 mr-2" />
                            Send Message
                        </Button>

                    </div>
                )}

                {/* Bio */}
                <div className=" pt-6 border-t">
                    <h3 className="font-semibold mb-2">About</h3>
                    <p className="text-sm text-muted-foreground">
                        {profileUser?.bio || "This traveler hasn’t shared a bio yet."}
                    </p>
                </div>

                {/* Interests */}
                <div className=" pt-6 border-t">
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
                <div className=" pt-6 border-t">
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
    );
};

export default ProfileCard;