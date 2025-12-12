/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, DollarSign, Star, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatsCardsProps {
    stats: any;
}

export default function StatsCards({ stats }: StatsCardsProps) {
    const statsData = [
        {
            title: "Total Users",
            value: stats?.users?.total || 0,
            subtitle: `${stats?.users?.active || 0} active users`,
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            badge: stats?.users?.premium || 0,
            badgeLabel: "Premium",
        },
        {
            title: "Travel Plans",
            value: stats?.travelPlans?.total || 0,
            subtitle: `${stats?.travelPlans?.active || 0} active`,
            icon: MapPin,
            color: "text-green-600",
            bgColor: "bg-green-100",
            badge: stats?.travelPlans?.thisMonth || 0,
            badgeLabel: "This Month",
        },
        {
            title: "Total Revenue",
            value: `$${stats?.revenue?.total?.toLocaleString() || 0}`,
            subtitle: `$${stats?.revenue?.thisMonth?.toLocaleString() || 0} this month`,
            icon: DollarSign,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
            growth: stats?.revenue?.growth || 0,
        },
        {
            title: "Reviews",
            value: stats?.reviews?.total || 0,
            subtitle: `${stats?.reviews?.averageRating || 0} avg rating`,
            icon: Star,
            color: "text-yellow-600",
            bgColor: "bg-yellow-100",
            badge: stats?.reviews?.thisMonth || 0,
            badgeLabel: "This Month",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => {
                const Icon = stat.icon;
                const isPositiveGrowth = (stat.growth || 0) >= 0;

                return (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-xs text-muted-foreground">
                                    {stat.subtitle}
                                </p>
                                {stat.badge !== undefined && (
                                    <Badge variant="secondary" className="text-xs">
                                        +{stat.badge} {stat.badgeLabel}
                                    </Badge>
                                )}
                                {stat.growth !== undefined && (
                                    <div className={`flex items-center gap-1 text-xs ${isPositiveGrowth ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {isPositiveGrowth ? (
                                            <TrendingUp className="h-3 w-3" />
                                        ) : (
                                            <TrendingDown className="h-3 w-3" />
                                        )}
                                        <span>{Math.abs(stat.growth).toFixed(1)}%</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}