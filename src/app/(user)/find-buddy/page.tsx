/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from '@/components/modules/admin/Pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getUsers } from '@/services/user';
import { Award, MapPin, Star } from 'lucide-react';
import Link from 'next/link';

const FindBuddyPage = async () => {
    const users = await getUsers('');
    console.log({ users });
    return (
        <div className='space-y-6 container mx-auto px-4 max-w-6xl mb-24 mt-14'>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users?.data?.map((traveler: any) => (
                    <Link key={traveler.id} href={`/profile/${traveler.id}`}>
                        <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group p-0">
                            <CardContent className="p-0 ">
                                {/* Header with Avatar */}
                                <div className="relative h-32 bg-linear-to-br from-primary/20 to-accent/20 ">
                                    <div className="absolute -bottom-12 left-6">
                                        <Avatar className="w-24 h-24 border-4 border-background">
                                            <AvatarImage src={traveler.profileImage} alt={traveler.fullName} />
                                            <AvatarFallback>
                                                {traveler.fullName?.charAt(0) || "?"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    {traveler.isPremium && (
                                        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                                            <Award className="w-3 h-3 mr-1" />
                                            Premium
                                        </Badge>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="pt-14 pb-6 px-6">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {traveler.fullName}
                                    </h3>

                                    {traveler.currentLocation && (
                                        <div className="flex items-center text-muted-foreground text-sm mb-3">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {traveler.currentLocation}
                                        </div>
                                    )}

                                    {/* Rating */}
                                    {traveler.rating && (
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-accent text-accent" />
                                                <span className="font-semibold">{traveler.rating}</span>
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                                ({traveler.reviewCount || 0} reviews)
                                            </span>
                                        </div>
                                    )}

                                    {/* Bio */}
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {traveler.bio || "No bio available"}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex gap-4 mb-4 text-sm">
                                        <div>
                                            <span className="font-semibold text-foreground">
                                                {traveler.tripCount || 0}
                                            </span>
                                            <span className="text-muted-foreground ml-1">trips</span>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-foreground">
                                                {traveler.visitedCountries?.length || 0}
                                            </span>
                                            <span className="text-muted-foreground ml-1">countries</span>
                                        </div>
                                    </div>

                                    {/* Interests */}
                                    <div className="flex flex-wrap gap-2">
                                        {traveler.interests?.slice(0, 3).map((interest: any) => (
                                            <Badge key={interest} variant="secondary" className="text-xs">
                                                {interest}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}

            </div>
            <Pagination totalPages={users?.meta?.totalPages || 1} />

        </div>
    );
};

export default FindBuddyPage;



