/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

// import { requireAuth } from '@/lib/server/auth';
// import { serverFetch } from '@/lib/server/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Calendar,
    MapPin,
    Clock,
    Send,
    Eye,
    X
} from 'lucide-react';
import Link from 'next/link';
import { serverFetch } from '@/lib/server-fetch';
// import { CancelRequestButton } from '@/components/requests/CancelRequestButton';

export const dynamic = 'force-dynamic';

interface SentRequest {
    id: string;
    travelPlanId: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
    message: string;
    createdAt: string;
    receiver: {
        fullName: string;
        profileImage: string;
    };
    travelPlan: {
        id: string;
        title: string;
        destination: string;
        startDate: string;
        endDate: string;
    };
}

async function getSentRequests(searchParams: any) {
    const params = new URLSearchParams();
    if (searchParams.status) params.set('status', searchParams.status);
    if (searchParams.page) params.set('page', searchParams.page);
    params.set('limit', '10');

    const response = await serverFetch.get(`/travel-requests/sent?${params.toString()}`);
    return response;
}

function getStatusColor(status: string) {
    switch (status) {
        case 'PENDING':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'ACCEPTED':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'REJECTED':
            return 'bg-red-100 text-red-800 border-red-200';
        case 'CANCELLED':
            return 'bg-gray-100 text-gray-800 border-gray-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
}

export default async function SentRequestsPage({
    searchParams,
}: {
    searchParams: any;
}) {
    // await requireAuth();
    const { data: requests, meta } = await getSentRequests(searchParams);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold mb-2">Sent Requests</h1>
                <p className="text-muted-foreground">
                    Track your travel buddy requests
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b">
                <Link href="/requests/sent">
                    <Button
                        variant={!searchParams.status ? 'default' : 'ghost'}
                        size="sm"
                    >
                        All ({meta?.total || 0})
                    </Button>
                </Link>
                <Link href="/requests/sent?status=PENDING">
                    <Button
                        variant={searchParams.status === 'PENDING' ? 'default' : 'ghost'}
                        size="sm"
                    >
                        Pending
                    </Button>
                </Link>
                <Link href="/requests/sent?status=ACCEPTED">
                    <Button
                        variant={searchParams.status === 'ACCEPTED' ? 'default' : 'ghost'}
                        size="sm"
                    >
                        Accepted
                    </Button>
                </Link>
                <Link href="/requests/sent?status=REJECTED">
                    <Button
                        variant={searchParams.status === 'REJECTED' ? 'default' : 'ghost'}
                        size="sm"
                    >
                        Rejected
                    </Button>
                </Link>
            </div>

            {/* Requests List */}
            {requests.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Send className="w-16 h-16 text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold mb-2">No requests found</p>
                        <p className="text-sm text-muted-foreground mb-4">
                            You haven't sent any travel requests yet
                        </p>
                        <Link href="/explore">
                            <Button>Explore Travel Plans</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {requests.map((request: SentRequest) => (
                        <Card key={request.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex gap-4">
                                    {/* Host Avatar */}
                                    <Link href={`/profile/${request.receiver}`}>
                                        <Avatar className="w-16 h-16 ring-2 ring-primary/10">
                                            <AvatarImage
                                                src={request.receiver.profileImage}
                                                alt={request.receiver.fullName}
                                            />
                                            <AvatarFallback>
                                                {request.receiver.fullName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Link>

                                    {/* Content */}
                                    <div className="flex-1 space-y-3">
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg mb-1">
                                                    {request.travelPlan.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Request to{' '}
                                                    <span className="font-medium">
                                                        {request.receiver.fullName}
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
                                                    Sent {new Date(request.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        {request.message && (
                                            <div className="bg-muted/50 rounded-lg p-3">
                                                <p className="text-sm text-muted-foreground">
                                                    <span className="font-medium text-foreground">
                                                        Your message:
                                                    </span>{' '}
                                                    "{request.message}"
                                                </p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-2">
                                            <Link href={`/travel-plans/${request.travelPlan.id}`}>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View Trip
                                                </Button>
                                            </Link>

                                            {/* {request.status === 'PENDING' && (
                                                <CancelRequestButton requestId={request.id} />
                                            )} */}
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
                        <Link key={page} href={`/requests/sent?page=${page}`}>
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