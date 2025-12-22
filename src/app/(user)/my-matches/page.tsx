/* eslint-disable @typescript-eslint/no-explicit-any */

import { WriteReviewButton } from '@/components/modules/reviews/WriteReviewButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { calculateDuration, formatDate } from '@/lib/utils';
import { getMatchStatistics, getMyMatches } from '@/services/travel-match';
import { Calendar, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata() {
    return {
        title: "My matches | Travel Sync",
        description: "Discover your matches and travel buddies",
    };
}

export const dynamic = 'force-dynamic';

export default async function MyMatchesPage() {
    const [matchesRes, statsRes] = await Promise.all([
        getMyMatches(),
        getMatchStatistics(),
    ]);

    const matches = (matchesRes?.data || []);
    const stats = statsRes?.data || {
        activeMatches: 0,
        plansWithMatches: 0,
        totalMatches: 0,
        inactiveMatches: 0,
    };

    return (
        <div className='min-h-screen py-8'>
            <div className="space-y-6 container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">My Travel Matches</h1>
                        <p className="text-muted-foreground">Your confirmed travel buddies</p>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="p-4">
                        <div className="text-2xl font-bold">{stats.activeMatches}</div>
                        <div className="text-sm text-muted-foreground">Active Matches</div>
                    </Card>
                    <Card className="p-4">
                        <div className="text-2xl font-bold">{stats.plansWithMatches}</div>
                        <div className="text-sm text-muted-foreground">Plans with Buddies</div>
                    </Card>
                    <Card className="p-4">
                        <div className="text-2xl font-bold">{stats.totalMatches}</div>
                        <div className="text-sm text-muted-foreground">Total Matches</div>
                    </Card>
                    <Card className="p-4">
                        <div className="text-2xl font-bold">{stats.inactiveMatches}</div>
                        <div className="text-sm text-muted-foreground">Past Matches</div>
                    </Card>
                </div>

                {/* Matches List */}
                {matches.length === 0 ? (
                    <Card className="flex flex-col items-center justify-center p-10 text-center">
                        <Users className="h-14 w-14 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            No travel matches yet
                        </h3>
                        <p className="max-w-md text-muted-foreground mb-6">
                            Browse travel plans, connect with fellow travelers, and start your
                            next journey.
                        </p>
                        <Link href="/travel-plans">
                            <Button size="lg">Explore Travel Plans</Button>
                        </Link>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {matches.map((match: any) => (
                            <Card
                                key={match.id}
                                className="p-5 md:p-6 transition-all hover:shadow-lg"
                            >
                                <CardContent className="p-0">
                                    <div className="flex flex-col gap-6">
                                        {/*  Travel Plan Info  */}
                                        <div>
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                                <div>
                                                    <Link href={`/travel-plans/${match.travelPlan.id}`}>
                                                        <h3 className="text-lg md:text-xl font-semibold hover:text-primary transition-colors">
                                                            {match.travelPlan.title}
                                                        </h3>
                                                    </Link>

                                                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="h-4 w-4" />
                                                            {match.travelPlan.destination}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4" />
                                                            {formatDate(match.travelPlan.startDate)} –{" "}
                                                            {formatDate(match.travelPlan.endDate)}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Users className="h-4 w-4" />
                                                            {calculateDuration(
                                                                match.travelPlan.startDate,
                                                                match.travelPlan.endDate
                                                            )}{" "}
                                                            days
                                                        </span>

                                                        <Badge
                                                            variant={
                                                                match.travelPlan.status === "ONGOING"
                                                                    ? "default"
                                                                    : match.travelPlan.status === "COMPLETED"
                                                                        ? "secondary"
                                                                        : "outline"
                                                            }
                                                        >
                                                            {match.travelPlan.status}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <Badge
                                                    className="w-fit"
                                                    variant={
                                                        match.isPlanOwner ? "default" : "secondary"
                                                    }
                                                >
                                                    {match.isPlanOwner ? "Your Plan" : "Joined"}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/*  Travel Buddy  */}
                                        {match.buddy && (
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-lg bg-muted/50 p-4">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage
                                                        src={match.buddy.profileImage || ""}
                                                    />
                                                    <AvatarFallback>
                                                        {match.buddy.fullName
                                                            ?.charAt(0)
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div className="flex-1">
                                                    <Link href={`/profile/${match.buddy.id}`}>
                                                        <h4 className="font-semibold hover:text-primary transition-colors">
                                                            {match.buddy.fullName}
                                                        </h4>
                                                    </Link>

                                                    {match.buddy.bio && (
                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                            {match.buddy.bio}
                                                        </p>
                                                    )}

                                                    {match.buddy.interests?.length > 0 && (
                                                        <div className="mt-1 flex flex-wrap gap-1">
                                                            {match.buddy.interests
                                                                .slice(0, 3)
                                                                .map(
                                                                    (interest: string, idx: number) => (
                                                                        <Badge
                                                                            key={idx}
                                                                            variant="outline"
                                                                            className="text-xs"
                                                                        >
                                                                            {interest}
                                                                        </Badge>
                                                                    )
                                                                )}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-2">
                                                    <Link href={`/profile/${match.buddy.id}`}>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                        >
                                                            View Profile
                                                        </Button>
                                                    </Link>

                                                    {match.travelPlan.status ===
                                                        "COMPLETED" && (
                                                            // <Link
                                                            //     href={`/reviews/new?buddyId=${match.buddy.id}&planId=${match.travelPlan.id}`}
                                                            // >
                                                            //     <Button size="sm">
                                                            //         Give Review
                                                            //     </Button>
                                                            // </Link>

                                                            <WriteReviewButton
                                                                toUserId={match.buddy.id}
                                                                toUserName={match.buddy.fullName}
                                                                travelPlanId={match.travelPlan.id}
                                                            />
                                                        )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Footer Actions */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <p className="text-xs text-muted-foreground">
                                                Matched on {formatDate(match.createdAt)}
                                            </p>

                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <Link
                                                    href={`/travel-plans/${match.travelPlan.id}`}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        View Plan
                                                    </Button>
                                                </Link>
                                                <Link href={`/my-matches/${match.id}`}>
                                                    <Button size="sm">
                                                        Match Details
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}