/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecentActivityProps {
    stats: any;
}

export default function RecentActivity({ stats }: RecentActivityProps) {
    const activities = [
        {
            type: "request",
            title: "Pending Requests",
            count: stats?.requests?.pending || 0,
            description: "Join requests waiting for approval",
            color: "bg-yellow-100 text-yellow-800",
        },
        {
            type: "request",
            title: "Accepted Requests",
            count: stats?.requests?.accepted || 0,
            description: "Successfully matched travelers",
            color: "bg-green-100 text-green-800",
        },
        {
            type: "request",
            title: "Rejected Requests",
            count: stats?.requests?.rejected || 0,
            description: "Declined join requests",
            color: "bg-red-100 text-red-800",
        },
        {
            type: "plan",
            title: "Completed Trips",
            count: stats?.travelPlans?.completed || 0,
            description: "Successfully completed travel plans",
            color: "bg-blue-100 text-blue-800",
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Activity Overview</CardTitle>
                <CardDescription>
                    Recent platform activity and statistics
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium text-sm">{activity.title}</h4>
                                    <Badge className={activity.color}>
                                        {activity.count}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {activity.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}