import TravelPlanForm from "@/components/modules/travelPlan/TravelPlanForm";
import { BackButton } from "@/components/shared/BackButton";
import { Card } from "@/components/ui/card";
import { getTravelPlanById } from "@/services/travel-plan";
import { ITravelPlan } from "@/types/travelPlan.interface";

const EditTravelPlanPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}
) => {
    const { id } = await params
   
    const res = await getTravelPlanById(id);
    const plan = res.data as ITravelPlan

   
    return (
        <div className="min-h-screen py-8 mb-24">
            <div className="container mx-auto px-4 max-w-3xl">
                <BackButton label="Back" />
                <Card className="p-8">
                    <h1 className="text-3xl font-bold mb-2">Update your travel details</h1>
                    <TravelPlanForm  plan={plan}/>
                </Card>
            </div>
        </div>
    );
};

export default EditTravelPlanPage;