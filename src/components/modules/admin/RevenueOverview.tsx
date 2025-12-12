/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface RevenueOverviewProps {
    stats: any;
}

export default function RevenueOverview({ stats }: RevenueOverviewProps) {
    const revenue = stats?.revenue || {};
    const isGrowthPositive = (revenue.growth || 0) >= 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                    Monthly revenue comparison and growth
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Total Revenue */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-linear-to-r from-purple-50 to-blue-50 border">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                            <p className="text-3xl font-bold">
                                ${revenue.total?.toLocaleString() || 0}
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-purple-100">
                            <DollarSign className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>

                    {/* Monthly Comparison */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg border">
                            <p className="text-xs text-muted-foreground mb-1">This Month</p>
                            <p className="text-xl font-bold">
                                ${revenue.thisMonth?.toLocaleString() || 0}
                            </p>
                        </div>
                        <div className="p-4 rounded-lg border">
                            <p className="text-xs text-muted-foreground mb-1">Last Month</p>
                            <p className="text-xl font-bold">
                                ${revenue.lastMonth?.toLocaleString() || 0}
                            </p>
                        </div>
                    </div>

                    {/* Growth Indicator */}
                    <div className={`flex items-center gap-2 p-4 rounded-lg ${isGrowthPositive ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                        } border`}>
                        {isGrowthPositive ? (
                            <TrendingUp className="h-5 w-5 text-green-600" />
                        ) : (
                            <TrendingDown className="h-5 w-5 text-red-600" />
                        )}
                        <div className="flex-1">
                            <p className="text-sm font-medium">
                                {isGrowthPositive ? 'Growth' : 'Decline'} from last month
                            </p>
                            <p className={`text-2xl font-bold ${isGrowthPositive ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {isGrowthPositive ? '+' : ''}{revenue.growth?.toFixed(1) || 0}%
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}