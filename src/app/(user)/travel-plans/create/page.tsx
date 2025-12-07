
// import { requireAuth } from '@/lib/server/auth';
// import TravelPlanForm from '@/components/travel-plans/TravelPlanForm';

import TravelPlanForm from "@/components/modules/travelPlan/TravelPlanForm";
import { BackButton } from "@/components/shared/BackButton";
import { Card } from "@/components/ui/card";

export default async function CreateTravelPlanPage() {
    // await requireAuth();

    return (
        // <div className="max-w-4xl mx-auto space-y-6">
        //     <div>
        //         <h1 className="text-3xl font-bold mb-2">Create Travel Plan</h1>
        //         <p className="text-muted-foreground">
        //             Share your travel plans and find companions for your journey
        //         </p>
        //     </div>

        //     <TravelPlanForm />
        // </div>

        <div className="min-h-screen py-8 mb-24">
            <div className="container mx-auto px-4 max-w-3xl">
                <BackButton label="Back" />
                <Card className="p-8">
                    <h1 className="text-3xl font-bold mb-2">Create Travel Plan</h1>
                    <TravelPlanForm />
                </Card>
            </div>
        </div>
    );
}