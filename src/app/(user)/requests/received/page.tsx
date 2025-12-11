/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
// import { requireAuth } from '@/lib/server/auth';
// import { serverFetch } from '@/lib/server/api';
// import { RequestActionButtons } from '@/components/requests/RequestActionButtons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getReceivedRequests } from '@/services/travelRequest';
import {
    BadgeCheck,
    Calendar,
    Clock,
    Eye,
    Inbox,
    MapPin
} from 'lucide-react';
import Link from 'next/link';
import { getStatusColor } from '../sent/page';
import { RequestActionButtons } from '@/components/modules/travelRequest/RequestActionButtons';

export const dynamic = 'force-dynamic';

interface ReceivedRequest {
    id: string;
    travelPlanId: string;
    requesterId: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
    message: string;
    createdAt: string;
    requester: {
        fullName: string;
        profileImage: string;
        isVerified: boolean;
    };
    travelPlan: {
        id: string;
        title: string;
        destination: string;
        startDate: string;
        endDate: string;
    };
}

async function getReceivedRequestsData(searchParams: any) {
    const params = new URLSearchParams();
    if (searchParams.status) params.set('status', searchParams.status);
    if (searchParams.page) params.set('page', searchParams.page);
    params.set('limit', '10');

    const response = await getReceivedRequests(params)
    // const response = await serverFetch<any>(`/travel-requests/received?${params.toString()}`);
    return response;
}

export default async function ReceivedRequestsPage({
    searchParams,
}: {
    searchParams: Promise<any>;
}) {
    // await requireAuth();
    const params = (await searchParams) || {}

    const { data: requests, meta } = await getReceivedRequestsData(params);

    return (
        <div className="space-y-6 container mx-auto px-4 max-w-6xl mb-24 mt-14 min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold mb-2">Received Requests</h1>
                <p className="text-muted-foreground">
                    Review requests to join your trips
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b pb-4">
                <Link href="/requests/received">
                    <Button
                        variant={!params.status ? 'default' : 'ghost'}
                        size="sm"
                    >
                        All ({meta?.total || 0})
                    </Button>
                </Link>
                <Link href="/requests/received?status=PENDING">
                    <Button
                        variant={params.status === 'PENDING' ? 'default' : 'ghost'}
                        size="sm"
                    >
                        Pending
                    </Button>
                </Link>
                <Link href="/requests/received?status=ACCEPTED">
                    <Button
                        variant={params.status === 'ACCEPTED' ? 'default' : 'ghost'}
                        size="sm"
                    >
                        Accepted
                    </Button>
                </Link>
                <Link href="/requests/received?status=REJECTED">
                    <Button
                        variant={params.status === 'REJECTED' ? 'default' : 'ghost'}
                        size="sm"
                    >
                        Rejected
                    </Button>
                </Link>
            </div>

            {/* Requests List */}
            {requests?.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Inbox className="w-16 h-16 text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold mb-2">No requests found</p>
                        <p className="text-sm text-muted-foreground mb-4">
                            You haven't received any travel requests yet
                        </p>
                        <Link href="/travel-plans/create">
                            <Button>Create a Travel Plan</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {requests?.map((request: ReceivedRequest) => (
                        <Card key={request.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex gap-4">
                                    {/* Requester Avatar */}
                                    <Link href={`/profile/${request.requesterId}`}>
                                        <Avatar className="w-16 h-16 ring-2 ring-primary/10">
                                            <AvatarImage
                                                src={request.requester.profileImage}
                                                alt={request.requester.fullName}
                                            />
                                            <AvatarFallback>
                                                {request.requester.fullName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Link>

                                    {/* Content */}
                                    <div className="flex-1 space-y-3">
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                                                    {request.requester.fullName}
                                                    {request.requester.isVerified && (
                                                        <BadgeCheck className="w-5 h-5 text-primary" />
                                                    )}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Wants to join:{' '}
                                                    <span className="font-medium">
                                                        {request.travelPlan.title}
                                                    </span>
                                                </p>
                                            </div>
                                            <Badge className={getStatusColor(request.status)}>
                                                {request.status}
                                            </Badge>
                                        </div>

                                        {/* Trip Details */}
                                        <div className="flex flex-wrap gap-4 text-sm">
                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                <MapPin className="w-4 h-4" />
                                                <span>{request.travelPlan.destination}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                <Calendar className="w-4 h-4" />
                                                <span>
                                                    {new Date(request.travelPlan.startDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                    {' - '}
                                                    {new Date(request.travelPlan.endDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                <Clock className="w-4 h-4" />
                                                <span>
                                                    Received {new Date(request.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        {request.message && (
                                            <div className="bg-muted/50 rounded-lg p-3">
                                                <p className="text-sm">
                                                    <span className="font-medium">Message:</span>{' '}
                                                    "{request.message}"
                                                </p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-2">
                                            <Link href={`/profile/${request.requesterId}`}>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View Profile
                                                </Button>
                                            </Link>

                                            {request.status === 'PENDING' && (
                                                <RequestActionButtons requestId={request.id} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
                <div className="flex justify-center gap-2">
                    {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((page) => (
                        <Link key={page} href={`/requests/received?page=${page}`}>
                            <Button
                                variant={page === meta.page ? 'default' : 'outline'}
                                size="sm"
                            >
                                {page}
                            </Button>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}