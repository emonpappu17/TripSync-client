/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/my-matches/page.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { calculateDuration, formatDate } from '@/lib/utils';
import { Calendar, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
// import { getMyMatches, getMatchStatistics } from '@/actions/travelMatch.action';
// import { ITravelMatch } from '@/types/travelMatch.interface';
import MessageButton from '@/components/modules/travelPlan/MessageButton';
import { getMatchStatistics, getMyMatches } from '@/services/travel-match';

export const dynamic = 'force-dynamic';

export default async function MyMatchesPage() {
    const [matchesRes, statsRes] = await Promise.all([
        getMyMatches(),
        getMatchStatistics(),
    ]);

    const matches = (matchesRes?.data || []);
    // const matches = (matchesRes?.data || []) as ITravelMatch[];
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
                    <Card className="p-12 text-center">
                        <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No travel matches yet</h3>
                        <p className="text-muted-foreground mb-6">
                            Browse travel plans and connect with fellow travelers!
                        </p>
                        <Link href="/travel-plans">
                            <Button size="lg">Explore Travel Plans</Button>
                        </Link>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {matches.map((match: any) => (
                            <Card key={match.id} className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Travel Plan Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <Link href={`/travel-plans/${match.travelPlan.id}`}>
                                                    <h3 className="text-xl font-semibold hover:text-primary transition-colors mb-2">
                                                        {match.travelPlan.title}
                                                    </h3>
                                                </Link>
                                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                                    <span className="flex items-center">
                                                        <MapPin className="mr-1 h-4 w-4" />
                                                        {match.travelPlan.destination}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Calendar className="mr-1 h-4 w-4" />
                                                        {formatDate(match.travelPlan.startDate)} - {formatDate(match.travelPlan.endDate)}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Users className="mr-1 h-4 w-4" />
                                                        {calculateDuration(match.travelPlan.startDate, match.travelPlan.endDate)} days
                                                    </span>
                                                </div>
                                            </div>
                                            <Badge variant={match.isPlanOwner ? "default" : "secondary"}>
                                                {match.isPlanOwner ? "Your Plan" : "Joined"}
                                            </Badge>
                                        </div>

                                        {/* Travel Buddy Info */}
                                        {match.buddy && (
                                            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={match.buddy.profileImage || ''} />
                                                    <AvatarFallback>
                                                        {match.buddy.fullName.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <Link href={`/profile/${match.buddy.id}`}>
                                                        <h4 className="font-semibold hover:text-primary transition-colors">
                                                            {match.buddy.fullName}
                                                        </h4>
                                                    </Link>
                                                    {match.buddy.bio && (
                                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                                            {match.buddy.bio}
                                                        </p>
                                                    )}
                                                    {match.buddy.interests && match.buddy.interests.length > 0 && (
                                                        <div className="flex gap-1 mt-1">
                                                            {match.buddy.interests.slice(0, 3).map((interest: any, idx: any) => (
                                                                <Badge key={idx} variant="outline" className="text-xs">
                                                                    {interest}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    {/* <Link href={`/messages/${match.buddy.id}`}>
                                                        <Button size="sm" variant="outline">
                                                            <MessageCircle className="h-4 w-4 mr-1" />
                                                            Message
                                                        </Button>
                                                    </Link> */}
                                                    {/* <Button size="sm" variant="outline" onClick={() => toast.success('This feature will be added soon!!')}>
                                                        <MessageCircle className="h-4 w-4 mr-1" />
                                                        Message
                                                    </Button> */}
                                                    <MessageButton></MessageButton>
                                                    <Link href={`/profile/${match.buddy.id}`}>
                                                        <Button size="sm">View Profile</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="text-xs text-muted-foreground">
                                                Matched on {formatDate(match.createdAt)}
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/travel-plans/${match.travelPlan.id}`}>
                                                    <Button variant="outline" size="sm">View Plan</Button>
                                                </Link>
                                                <Link href={`/my-matches/${match.id}`}>
                                                    <Button size="sm">Match Details</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}