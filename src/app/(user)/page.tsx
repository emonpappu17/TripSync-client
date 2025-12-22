import TravelBuddyLanding from '@/components/modules/home/TravelBuddyLanding ';
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-01/hero-section-01';
import { getAllTravelPlans } from '@/services/travel-plan';
import { getUsers } from '@/services/user';
// import { getAllTravelPlans } from '@/services/admin.travelPlanManage';

const page = async () => {
  const result = await getAllTravelPlans('limit=6');
  const res = await getUsers('limit=4');

  const plans = result.data;
  const users = res.data;
  // console.log({ users });
  return (
    <div>
      <HeroSection></HeroSection>
      <TravelBuddyLanding plans={plans} users={users} />
    </div>
  );
};

export default page;