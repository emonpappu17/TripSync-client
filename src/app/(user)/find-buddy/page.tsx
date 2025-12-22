/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from '@/components/modules/admin/Pagination';
import SearchBuddy from '@/components/modules/explore/SearchBuddy';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getUsers } from '@/services/user';
import { Award, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export async function generateMetadata() {
    return {
        title: "Find Travel Buddy | Travel Sync",
        description: "Discover and find travel buddy from around the world",
    };
}

interface SearchParams {
    search?: string;
    page?: string;
}

const FindBuddyPage = async ({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) => {
    const { search, page } = (await searchParams) || {}
    // Build query string safely 
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page) params.set("page", page);
    const users = await getUsers(params.toString());

    return (
        <div className='space-y-6 container mx-auto px-4 max-w-6xl mb-24 mt-14'>
            <Suspense fallback={<div>Loading search...</div>}>
                <SearchBuddy></SearchBuddy>
            </Suspense>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users?.data?.length > 0 ? (
                    users.data.map((traveler: any) => (
                        <Link key={traveler.id} href={`/profile/${traveler.id}`}>
                            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group p-0">
                                <CardContent className="p-6 flex flex-col items-center text-center">
                                    {/* Avatar */}
                                    <div className="relative">
                                        <Avatar className="w-24 h-24 border-4 border-background">
                                            <AvatarImage src={traveler.profileImage} alt={traveler.fullName} />
                                            <AvatarFallback>
                                                {traveler.fullName?.charAt(0) || "?"}
                                            </AvatarFallback>
                                        </Avatar>
                                        {traveler.isVerified && (
                                            <Badge className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground">
                                                <Award className="w-3 h-3 mr-1" />
                                                Verified
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="mt-6 w-full">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                            {traveler.fullName}
                                        </h3>

                                        {traveler.currentLocation && (
                                            <div className="flex items-center justify-center text-muted-foreground text-sm mb-3">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {traveler.currentLocation}
                                            </div>
                                        )}

                                        {/* Rating */}
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 " />
                                                {/* <Star className="w-4 h-4 fill-accent text-accent" /> */}
                                                <span className="font-semibold">{traveler?.avgRating || 0}</span>
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                                ({traveler?.reviewsReceived.length || 0} reviews)
                                            </span>
                                        </div>

                                        {/* Bio */}
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                            {traveler.bio || "No bio available"}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex justify-center gap-6 mb-4 text-sm">
                                            <div>
                                                <span className="font-semibold text-foreground">
                                                    {traveler._count.travelPlans || 0}
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
                                        <div className="flex flex-wrap justify-center gap-2">
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

                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center text-center py-16">
                        <Star className="w-10 h-10 text-muted-foreground mb-4" />
                        <h2 className="text-lg font-semibold mb-2">No travel buddies found</h2>
                        <p className="text-muted-foreground mb-4">
                            Try adjusting your search or filters to discover more travelers.
                        </p>

                    </div>
                )}
            </div>

            <Pagination totalPages={users?.meta?.totalPages || 1} />
        </div>
    );
};

export default FindBuddyPage;



