"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    Users,
    MapPin,
    ClipboardList,
    MessageSquare,
    DollarSign,
    Settings
} from "lucide-react";
import { toast } from "sonner";

export default function QuickActions() {
    const router = useRouter();

    const actions = [
        {
            title: "Manage Users",
            description: "View and manage all users",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            onClick: () => router.push("/admin/users"),
        },
        {
            title: "Travel Plans",
            description: "Manage all travel plans",
            icon: MapPin,
            color: "text-green-600",
            bgColor: "bg-green-100",
            onClick: () => router.push("/admin/travel-plans"),
        },
        {
            title: "Join Requests",
            description: "View pending requests",
            icon: ClipboardList,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
            onClick: () => toast.success("Feature coming soon!"),
        },
        {
            title: "Reviews",
            description: "Monitor user reviews",
            icon: MessageSquare,
            color: "text-yellow-600",
            bgColor: "bg-yellow-100",
            onClick: () => toast.success("Feature coming soon!"),
        },
        {
            title: "Payments",
            description: "View payment history",
            icon: DollarSign,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
            onClick: () => toast.success("Feature coming soon!"),
        },
        {
            title: "Settings",
            description: "Platform settings",
            icon: Settings,
            color: "text-gray-600",
            bgColor: "bg-gray-100",
            onClick: () => toast.success("Feature coming soon!"),
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                    Common administrative tasks
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {actions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <Button
                                key={index}
                                variant="outline"
                                className="h-auto flex-col items-start p-4 hover:border-primary"
                                onClick={action.onClick}
                            >
                                <div className="flex items-center gap-3 w-full mb-2">
                                    <div className={`p-2 rounded-lg ${action.bgColor}`}>
                                        <Icon className={`h-4 w-4 ${action.color}`} />
                                    </div>
                                    <span className="font-medium text-sm">
                                        {action.title}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground text-left w-full">
                                    {action.description}
                                </p>
                            </Button>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}