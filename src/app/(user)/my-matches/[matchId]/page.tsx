/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { calculateDuration, formatDate } from '@/lib/utils';
import { Calendar, MapPin, Users, Mail, MessageCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { getMatchById } from '@/services/travel-match';
import { DeactivateMatchButton } from '@/components/modules/travelPlan/DeactivateMatchButton';
// import { ITravelMatch } from '@/types/travelMatch.interface';
// import { DeactivateMatchButton } from '@/components/modules/travelMatch/DeactivateMatchButton';

export const dynamic = 'force-dynamic';

// interface Props {
//     params: {
//         matchId: string;
//     };
// }

export default async function MatchDetailPage({
    params,
}: {
    params: Promise<{ matchId: string }>;
}) {
    const { matchId } = await params;

    const res = await getMatchById(matchId);
    const match = res.data;
    // const match = res.data as ITravelMatch;

    return (
        <div className='min-h-screen py-8'>
            <div className="space-y-6 container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Match Details</h1>
                        <p className="text-muted-foreground">Your travel buddy information</p>
                    </div>
                    <Link href="/my-matches">
                        <Button variant="outline">← Back to Matches</Button>
                    </Link>
                </div>

                {/* Travel Plan Card */}
                <Card className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">{match.travelPlan.title}</h2>
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
                            {match.isPlanOwner ? "Your Plan" : "Joined Plan"}
                        </Badge>
                    </div>

                    <Separator className="my-4" />

                    <Link href={`/travel-plans/${match.travelPlan.id}`}>
                        <Button className="w-full md:w-auto">View Full Travel Plan</Button>
                    </Link>
                </Card>

                {/* Travel Buddy Card */}
                {match.buddy && (
                    <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Your Travel Buddy</h3>

                        <div className="flex flex-col md:flex-row gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={match.buddy.profileImage || ''} />
                                <AvatarFallback className="text-2xl">
                                    {match.buddy.fullName.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <Link href={`/profile/${match.buddy.id}`}>
                                    <h4 className="text-2xl font-semibold hover:text-primary transition-colors mb-2">
                                        {match.buddy.fullName}
                                    </h4>
                                </Link>

                                {match.buddy.bio && (
                                    <p className="text-muted-foreground mb-4">{match.buddy.bio}</p>
                                )}

                                <div className="space-y-2 mb-4">
                                    {/* <div className="flex items-center gap-2 text-sm">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span className="capitalize">{match.buddy.gender}</span>
                                    </div> */}
                                    {match.buddy.email && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <a
                                                href={`mailto:${match.buddy.email}`}
                                                className="hover:underline"
                                            >
                                                {match.buddy.email}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {match.buddy.interests && match.buddy.interests.length > 0 && (
                                    <div>
                                        <h5 className="text-sm font-semibold mb-2">Interests</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {match.buddy.interests.map((interest: any, idx: any) => (
                                                <Badge key={idx} variant="outline">
                                                    {interest}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-2 mt-6">
                                    <Link href={`/messages/${match.buddy.id}`} className="flex-1">
                                        <Button className="w-full">
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            Send Message
                                        </Button>
                                    </Link>
                                    <Link href={`/profile/${match.buddy.id}`}>
                                        <Button variant="outline">View Full Profile</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Match Information Card */}
                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Match Information</h3>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Matched On:</span>
                            <span className="font-medium">{formatDate(match.createdAt)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge variant={match.isActive ? "default" : "secondary"}>
                                {match.isActive ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Your Role:</span>
                            <span className="font-medium">
                                {match.isPlanOwner ? "Plan Creator" : "Travel Buddy"}
                            </span>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div className="text-sm text-muted-foreground">
                            <p className="font-medium mb-1">About Matches</p>
                            <p>
                                This match was created when your travel request was accepted.
                                You can coordinate with your buddy via messages and share travel plans.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Danger Zone */}
                {match.isActive && (
                    <Card className="p-6 border-destructive/50">
                        <h3 className="text-xl font-semibold mb-2 text-destructive">Danger Zone</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Deactivating this match will remove the connection between you and your travel buddy.
                            This action cannot be undone.
                        </p>
                        <DeactivateMatchButton matchId={match.id} />
                    </Card>
                )}
            </div>
        </div>
    );
}