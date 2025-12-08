import TravelPlanForm from "@/components/modules/travelPlan/TravelPlanForm";
import { getTravelPlanById } from "@/services/travel-plan";
import { ITravelPlan } from "@/types/travelPlan.interface";

const EditTravelPlanPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}
) => {
    const { id } = await params
    // console.log({ id });
    const res = await getTravelPlanById(id);
    const plan = res.data as ITravelPlan

    // console.log({ plan });
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Edit Travel Plan</h1>
                <p className="text-muted-foreground">Update your travel details</p>
            </div>

            <TravelPlanForm plan={plan} />
        </div>
    );
};

export default EditTravelPlanPage;