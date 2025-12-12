import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { getDashboardStats } from "@/services/admin.travelPlanManage";
import StatsCards from "@/components/modules/admin/StatsCards";
import QuickActions from "@/components/modules/admin/QuickActions";
import RevenueOverview from "@/components/modules/admin/RevenueOverview";
import RecentActivity from "@/components/modules/admin/RecentActivity";

export default async function AdminDashboardPage() {
    const result = await getDashboardStats();
    const stats = result?.data || {};

    return (
        <div className="container mx-auto py-6 px-4 min-h-screen max-w-7xl">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>

            {/* Stats Cards */}
            <StatsCards stats={stats} />

            {/* Main Content Grid */}
            <div className="grid gap-6 mt-6 lg:grid-cols-3">
                {/* Left Column - 2/3 width */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Actions */}
                    <QuickActions />

                    {/* Revenue Overview */}
                    <RevenueOverview stats={stats} />
                </div>

                {/* Right Column - 1/3 width */}
                <div className="space-y-6">
                    {/* Recent Activity */}
                    <RecentActivity stats={stats} />

                    {/* Platform Stats Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Platform Health</CardTitle>
                            <CardDescription>
                                Overall platform metrics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">User Engagement</span>
                                    <span className="text-sm font-medium">
                                        {stats?.users?.active && stats?.users?.total
                                            ? `${Math.round((stats.users.active / stats.users.total) * 100)}%`
                                            : '0%'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Active Plans</span>
                                    <span className="text-sm font-medium">
                                        {stats?.travelPlans?.active || 0}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Premium Users</span>
                                    <span className="text-sm font-medium">
                                        {stats?.users?.premium || 0}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Avg. Rating</span>
                                    <span className="text-sm font-medium">
                                        ⭐ {stats?.reviews?.averageRating || 0}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}