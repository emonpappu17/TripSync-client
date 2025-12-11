/* eslint-disable @typescript-eslint/no-explicit-any */

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { calculateDuration, formatCurrency, formatDate } from '@/lib/utils';
import { Calendar, MapPin, Plus, UserCheck, Users } from 'lucide-react';
import Link from 'next/link';
import { getMyTravelPlans } from '@/services/travel-plan';
import { ITravelPlan } from '@/types/travelPlan.interface';
import TravelPlanActions from '@/components/modules/travelPlan/TravelPlanActions';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function MyTravelPlansPage() {
    const res = await getMyTravelPlans();
    const plans = res.data as ITravelPlan[]

    return (
        <div className='min-h-screen py-8'>
            <div className="space-y-6 container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left Section */}
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">My Travel Plans</h1>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Manage your upcoming adventures
                        </p>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-wrap md:flex-nowrap gap-3">
                        <Link href="/my-matches" className="flex-1 md:flex-none">
                            <Button variant="outline" size="lg" className="w-full md:w-auto">
                                <UserCheck className="mr-2 h-4 w-4" />
                                My Matches
                            </Button>
                        </Link>
                        <Link href="/travel-plans/create" className="flex-1 md:flex-none">
                            <Button size="lg" className="w-full md:w-auto">
                                <Plus className="mr-2 h-4 w-4" />
                                Create New Plan
                            </Button>
                        </Link>
                    </div>
                </div>


                {plans?.length === 0 ? (
                    <Card className="p-12 text-center">
                        <MapPin className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No travel plans yet</h3>
                        <p className="text-muted-foreground mb-6">
                            Start planning your next adventure and find travel buddies!
                        </p>
                        <Link href="/travel-plans/create">
                            <Button size="lg">Create Your First Plan</Button>
                        </Link>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {plans?.map((plan: ITravelPlan) => (
                            <Card key={plan.id} className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Image */}
                                    {plan.image && (
                                        <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                            <Image
                                                src={plan.image.trimStart()}
                                                alt={plan.title}
                                                width={192}
                                                height={192}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div className="flex-1">
                                                <Link href={`/travel-plans/${plan.id}`}>
                                                    <h3 className="text-xl font-semibold hover:text-primary transition-colors mb-2">
                                                        {plan.title}
                                                    </h3>
                                                </Link>
                                                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                                    <span className="flex items-center">
                                                        <MapPin className="mr-1 h-4 w-4" />
                                                        {plan.destination}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Calendar className="mr-1 h-4 w-4" />
                                                        {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Users className="mr-1 h-4 w-4" />
                                                        {calculateDuration(plan.startDate, plan.endDate)} days
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant={
                                                    plan.status === 'PLANNING' ? 'secondary' :
                                                        plan.status === 'UPCOMING' ? 'default' :
                                                            plan.status === 'ONGOING' ? 'default' :
                                                                plan.status === 'COMPLETED' ? 'secondary' :
                                                                    'secondary'
                                                }>
                                                    {plan.status}
                                                </Badge>
                                                <TravelPlanActions planId={plan.id} />
                                            </div>
                                        </div>

                                        {plan.description && (
                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                                {plan.description}
                                            </p>
                                        )}

                                        {/* Request and Match Counts */}
                                        <div className="flex items-center gap-4 mb-4">
                                            {plan._count && (
                                                <>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Users className="h-4 w-4 text-muted-foreground" />
                                                        <span className="font-medium">{plan._count.requests}</span>
                                                        <span className="text-muted-foreground">Requests</span>
                                                    </div>
                                                    {/* Add this if you have match count in the response */}
                                                    {plan._count.travelMatches !== undefined && (
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <UserCheck className="h-4 w-4 text-green-600" />
                                                            <span className="font-medium text-green-600">
                                                                {plan._count.travelMatches}
                                                            </span>
                                                            <span className="text-muted-foreground">Matched</span>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-sm">
                                                {plan.budgetMin && (
                                                    <span>
                                                        Budget: {formatCurrency(plan.budgetMin)} - {formatCurrency(plan.budgetMax || plan.budgetMin)}
                                                    </span>
                                                )}
                                                <Badge variant="outline">{plan.travelType}</Badge>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/travel-plans/${plan.id}`}>
                                                    <Button variant="outline" size="sm">View Details</Button>
                                                </Link>
                                                <Link href={`/travel-plans/edit/${plan.id}`}>
                                                    <Button size="sm">Edit</Button>
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