/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// 'use client';

// import { useEffect, useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { Users, MessageCircle, Loader2 } from 'lucide-react';
// import Link from 'next/link';
// // import { getMatchesByPlanId } from '@/actions/travelMatch.action';
// // import { ITravelMatch } from '@/types/travelMatch.interface';
// import { toast } from 'sonner';
// import { getMatchesByPlanId } from '@/services/travel-match';

// interface Props {
//     planId: string;
//     currentUserId?: string;
// }

// export function TravelPlanMatches({ planId, currentUserId }: Props) {
//     const [matches, setMatches] = useState<any[]>([]);
//     // const [matches, setMatches] = useState<ITravelMatch[]>([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchMatches = async () => {
//             try {
//                 const res = await getMatchesByPlanId(planId);

//                 // console.log({ res });

//                 if (res.success) {
//                     setMatches(res.data || []);
//                 } else if (res.message && !res.message.includes('403') && !res.message.includes('Forbidden')) {
//                     toast.error('Failed to load matches');
//                 }
//             } catch (error: any) {
//                 // Silently fail if user doesn't have access
//                 console.log('Failed to load matches:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchMatches();
//     }, [planId]);

//     if (isLoading) {
//         return (
//             <Card className="p-6">
//                 <div className="flex items-center justify-center py-8">
//                     <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//                 </div>
//             </Card>
//         );
//     }

//     if (matches.length === 0) {
//         return (
//             <Card className="p-6">
//                 <div className="flex items-center gap-2">
//                     <Users className="h-5 w-5" />
//                     <h3 className="text-lg font-semibold">Travel Buddies</h3>
//                 </div>
//                 <p className="text-sm text-muted-foreground text-center py-4">
//                     No confirmed travel buddies yet
//                 </p>
//             </Card>
//         );
//     }


//     console.log('matches===>', matches);
//     return (
//         <Card className="p-6">
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                     <Users className="h-5 w-5" />
//                     <h3 className="text-lg font-semibold">Travel Buddies</h3>
//                     <Badge variant="secondary">{matches.length}</Badge>
//                 </div>
//             </div>

//             <Separator className="" />

//             <div className="space-y-2">
//                 {matches.map((match) => {
//                     // For each match, show both users
//                     const users = [match.user1, match.user2].filter(Boolean);

//                     return users.map((user) => {
//                         if (!user || user.id === currentUserId) return null;

//                         return (
//                             <div
//                                 key={user.id}
//                                 className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
//                             >
//                                 <Avatar className="h-12 w-12">
//                                     <AvatarImage src={user.profileImage || ''} />
//                                     <AvatarFallback>
//                                         {user.fullName.charAt(0).toUpperCase()}
//                                     </AvatarFallback>
//                                 </Avatar>

//                                 <div className="flex-1 min-w-0">
//                                     <Link href={`/profile/${user.id}`}>
//                                         <h4 className="font-semibold hover:text-primary transition-colors truncate">
//                                             {user.fullName}
//                                         </h4>
//                                     </Link>
//                                     {user.bio && (
//                                         <p className="text-sm text-muted-foreground line-clamp-1">
//                                             {user.bio}
//                                         </p>
//                                     )}
//                                     {user.interests && user.interests.length > 0 && (
//                                         <div className="flex gap-1 mt-1">
//                                             {user.interests.slice(0, 2).map((interest: any, idx: any) => (
//                                                 <Badge key={idx} variant="outline" className="text-xs">
//                                                     {interest}
//                                                 </Badge>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>

//                                 <div className="flex gap-2">
//                                     {/* <Link href={`/messages/${user.id}`}>
//                                         <Button size="sm" variant="outline">
//                                             <MessageCircle className="h-4 w-4" />
//                                         </Button>
//                                     </Link> */}
//                                     <Button size="sm" variant="outline" onClick={() => toast.success("This feature will be added in future!!")}>
//                                         <MessageCircle className="h-4 w-4" />
//                                     </Button>
//                                     <Link href={`/profile/${user.id}`}>
//                                         <Button size="sm">Profile</Button>
//                                     </Link>
//                                 </div>
//                             </div>
//                         );
//                     });
//                 })}
//             </div>
//         </Card>
//     );
// }


'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Users, MessageCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { getMatchesByPlanId } from '@/services/travel-match';

interface Props {
    planId: string;
    currentUserId?: string;
}

export function TravelPlanMatches({ planId, currentUserId }: Props) {
    const [matches, setMatches] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await getMatchesByPlanId(planId);
                if (res.success) {
                    setMatches(res.data || []);
                } else if (res.message && !res.message.includes('403') && !res.message.includes('Forbidden')) {
                    toast.error('Failed to load matches');
                }
            } catch (error: any) {
                console.log('Failed to load matches:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMatches();
    }, [planId]);

    if (isLoading) {
        return (
            <Card className="p-6">
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </Card>
        );
    }

    // Collect all users from matches
    const allUsers = matches.flatMap((match) => [match.user1, match.user2]).filter(Boolean);

    // Filter out current user
    const filteredUsers = allUsers.filter((u) => u.id !== currentUserId);

    // Deduplicate by id
    const uniqueUsers = Array.from(new Map(filteredUsers.map((u) => [u.id, u])).values());

    if (uniqueUsers.length === 0) {
        return (
            <Card className="p-6">
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Travel Buddies</h3>
                </div>
                <p className="text-sm text-muted-foreground text-center py-4">
                    No confirmed travel buddies yet
                </p>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Travel Buddies</h3>
                    <Badge variant="secondary">{uniqueUsers.length}</Badge>
                </div>
            </div>

            <Separator />

            <div className="space-y-2">
                {uniqueUsers.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={user.profileImage || ''} />
                            <AvatarFallback>{user.fullName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                            <Link href={`/profile/${user.id}`}>
                                <h4 className="font-semibold hover:text-primary transition-colors truncate">
                                    {user.fullName}
                                </h4>
                            </Link>
                            {user.bio && (
                                <p className="text-sm text-muted-foreground line-clamp-1">{user.bio}</p>
                            )}
                            {user.interests && user.interests.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                    {user.interests.slice(0, 2).map((interest: any, idx: number) => (
                                        <Badge key={idx} variant="outline" className="text-xs">
                                            {interest}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toast.success('This feature will be added in future!!')}
                            >
                                <MessageCircle className="h-4 w-4" />
                            </Button>
                            <Link href={`/profile/${user.id}`}>
                                <Button size="sm">Profile</Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
