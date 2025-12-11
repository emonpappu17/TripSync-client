import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
    ArrowRight,
    Calendar,
    DollarSign,
    Heart,
    MapPin,
    Users
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface TravelPlanCardProps {
    plan: {
        id: string;
        userId: string;
        title: string;
        description: string;
        destination: string;
        country: string;
        startDate: string;
        endDate: string;
        budgetMin: number;
        budgetMax: number;
        travelType: string;
        maxTravelers: number;
        status: string;
        image: string;
        activities: string[];
        _count: {
            requests: number;
        };
    };
    // matchScore?: number;
    className?: string;
}

export default function TravelPlanCard({
    plan,
    // matchScore = 90,
    className
}: TravelPlanCardProps) {
    // Calculate trip duration
    const startDate = new Date(plan.startDate);
    const endDate = new Date(plan.endDate);
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    // Format dates
    const formattedStartDate = startDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const formattedEndDate = endDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    // Format budget
    const budgetRange = `$${plan.budgetMin.toLocaleString()} - $${plan.budgetMax.toLocaleString()}`;

    // Check if trip is full
    const isFull = plan.maxTravelers === 0;

    return (
        <Card
            className={cn(
                "group p-0 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20",
                className
            )}
        >
            {/* ✅ Image Section */}
            <div className="relative w-full aspect-video overflow-hidden">
                <Image
                    src={plan.image || "/placeholder-travel.jpg"}
                    alt={plan.destination}
                    fill
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />

                {/* Overlay Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge className="bg-white/90 backdrop-blur-sm text-foreground shadow-lg">
                        {plan.travelType}
                    </Badge>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                    <Badge
                        variant={isFull ? "secondary" : "default"}
                        className="bg-white/90 backdrop-blur-sm text-foreground shadow-lg"
                    >
                        {isFull ? "Full" : `${plan.maxTravelers} spots`}
                    </Badge>
                </div>

                {/* Request Count Badge */}
                {plan._count.requests > 0 && (
                    <div className="absolute bottom-3 right-3">
                        <Badge className="bg-black/70 backdrop-blur-sm text-white">
                            <Users className="w-3 h-3 mr-1" />
                            {plan._count.requests} interested
                        </Badge>
                    </div>
                )}
            </div>

            {/* ✅ Content Section */}
            <CardContent className="p-5 flex flex-col flex-1">
                {/* ✅ All variable-height content */}
                <div className="flex-1 space-y-4">
                    {/* Title and Description */}
                    <div>
                        <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                            {plan.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {plan.description}
                        </p>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <div>
                            <p className="font-medium">{plan.destination}</p>
                            <p className="text-muted-foreground text-xs">{plan.country}</p>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="flex items-start gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <div>
                            <p className="font-medium">
                                {formattedStartDate} - {formattedEndDate}
                            </p>
                            <p className="text-muted-foreground text-xs">
                                {duration} {duration === 1 ? "day" : "days"}
                            </p>
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="flex items-start gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <div>
                            <p className="font-medium">{budgetRange}</p>
                            <p className="text-muted-foreground text-xs">Per person</p>
                        </div>
                    </div>

                    {/* Activities */}
                    {plan.activities && plan.activities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {plan.activities.slice(0, 3).map((activity, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs py-0.5 px-2"
                                >
                                    {activity}
                                </Badge>
                            ))}
                            {plan.activities.length > 3 && (
                                <Badge variant="secondary" className="text-xs py-0.5 px-2">
                                    +{plan.activities.length - 3} more
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                {/* ✅ Action Buttons – Perfectly Aligned */}
                <div className="flex gap-2 pt-5 mt-auto">
                    <Link href={`/travel-plans/${plan.id}`} className="flex-1">
                        <Button className="w-full group/btn" disabled={isFull}>
                            {isFull ? "View Details" : "View & Join"}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </Link>

                    <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                    >
                        <Heart className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}