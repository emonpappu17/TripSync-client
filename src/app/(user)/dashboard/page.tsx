/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { serverFetch } from '@/lib/server-fetch';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { ArrowRight, Calendar, MapPin, Star, Users } from 'lucide-react';
import Link from 'next/link';

// Force dynamic rendering for real-time data
export const dynamic = 'force-dynamic';

async function getDashboardData() {
    const [myPlans, receivedRequests, sentRequests] = await Promise.all([

        serverFetch.get(`/travelPlan/my/plans?limit=5`),

        serverFetch.get(`/travelRequest/received?status=PENDING&limit=10`),
        serverFetch.get(`/travelRequest/sent?limit=5`)

    ]);
    const plan = await myPlans.json()
    const requests = await receivedRequests.json()
    const requests2 = await sentRequests.json()
    return {
        myPlans: plan?.data || [],
        receivedRequests: requests?.data || [],
        sentRequests: requests2?.data || [],
        stats: {
            activePlans: plan?.meta?.total || 0,
            pendingRequests: requests?.meta?.total || 0,
            sentRequests: requests2.meta?.total || 0,
        },
    };
}

export default async function DashboardPage() {
    const currentUser = await getUserInfo();

    const data = await getDashboardData();


    return (
        <div className="space-y-6 container mx-auto px-4 max-w-6xl mb-24 mt-14">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {currentUser?.fullName}! 👋
                </h1>
                <p className="text-muted-foreground">
                    Here's what's happening with your trips
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.stats.activePlans}</div>
                        <Link href="/travel-plans">
                            <Button variant="link" className="px-0 text-sm">
                                View all <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.stats.pendingRequests}</div>
                        <Link href="/requests/received">
                            <Button variant="link" className="px-0 text-sm">
                                Review <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Sent Requests</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.stats.sentRequests}</div>
                        <Link href="/requests/sent">
                            <Button variant="link" className="px-0 text-sm">
                                Track <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Plans */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Travel Plans</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {data.myPlans.length === 0 ? (
                            <div className="text-center py-8">
                                <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-sm text-muted-foreground mb-4">
                                    No travel plans yet
                                </p>
                                <Link href="/travel-plans/create">
                                    <Button>Create Your First Plan</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {data.myPlans.map((plan: any) => (
                                    <Link
                                        key={plan.id}
                                        href={`/travel-plans/${plan.id}`}
                                        className="block p-4 rounded-lg border hover:bg-accent transition-colors"
                                    >
                                        <h3 className="font-semibold mb-1">{plan.title}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {plan.destination} • {new Date(plan.startDate).toLocaleDateString()}
                                        </p>
                                    </Link>
                                ))}
                                <Link href="/travel-plans">
                                    <Button variant="outline" className="w-full">
                                        View All Plans
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pending Requests */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {data.receivedRequests.length === 0 ? (
                            <div className="text-center py-8">
                                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-sm text-muted-foreground mb-4">
                                    No pending requests
                                </p>
                                <Link href="/explore">
                                    <Button variant="outline">Explore Travelers</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {data.receivedRequests.slice(0, 3).map((request: any) => (
                                    <div
                                        key={request.id}
                                        className="p-4 rounded-lg border"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold">
                                                {request.requester?.profile?.fullName}
                                            </h3>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(request.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {request.message || 'Wants to join your trip'}
                                        </p>
                                        <Link href={`/requests/received`}>
                                            <Button size="sm" variant="outline" className="w-full">
                                                Review Request
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                                <Link href="/requests/received">
                                    <Button variant="outline" className="w-full">
                                        View All Requests
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/travel-plans/create">
                            <Button variant="outline" className="w-full h-auto flex-col py-6">
                                <MapPin className="h-8 w-8 mb-2" />
                                <span className="text-sm">Create Plan</span>
                            </Button>
                        </Link>
                        <Link href="/explore">
                            <Button variant="outline" className="w-full h-auto flex-col py-6">
                                <Users className="h-8 w-8 mb-2" />
                                <span className="text-sm">Find Buddies</span>
                            </Button>
                        </Link>
                        <Link href="/profile/edit">
                            <Button variant="outline" className="w-full h-auto flex-col py-6">
                                <Star className="h-8 w-8 mb-2" />
                                <span className="text-sm">Edit Profile</span>
                            </Button>
                        </Link>
                        <Link href="#">
                            <Button variant="outline" className="w-full h-auto flex-col py-6">
                                <Calendar className="h-8 w-8 mb-2" />
                                <span className="text-sm">Upgrade</span>
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}