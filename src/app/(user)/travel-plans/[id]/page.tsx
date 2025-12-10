// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react/no-unescaped-entities */
// import RequestButton from "@/components/modules/travelPlan/RequestButton";
// import { BackButton } from "@/components/shared/BackButton";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { getUserInfo } from "@/services/auth/getUserInfo";
// import { getTravelPlanById } from "@/services/travel-plan";
// import {
//     Calendar,
//     DollarSign,
//     ExternalLink,
//     Heart,
//     Mail,
//     MapPin,
//     MessageCircle,
//     User,
//     Users
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// const DetailTravelPlanPage = async ({
//     params,
// }: {
//     params: Promise<{ id: string }>;
// }) => {
//     const { id } = await params;
//     const res = await getTravelPlanById(id);
//     const currentUser = await getUserInfo();

//     // console.log({ currentUser });
//     // const plan = res.data
//     const plan = res.data;

//     console.log({ plan });

//     // Check if current user is the plan owner by comparing IDs
//     // const isOwner = false;
//     const isOwner = currentUser?.id === plan.userId;

//     // ✅ Check if current user has already requested this plan
//     const isRequested = plan.requests.some(
//         (req: any) => req.requesterId === currentUser?.id
//         // (req: any) => req.requesterId === currentUser?.id && req.status !== 'CANCELLED'
//         // || req.requesterId === currentUser?.id && req.status
//     );

//     const acceptedCount = plan.requests.filter(
//         (req: any) => req.status === "ACCEPTED"
//     ).length;

//     console.log({ acceptedCount });

//     console.log({ isRequested });

//     // Get plan owner data from nested user object
//     const planOwner = plan.user;

//     // Calculate trip duration
//     const startDate = new Date(plan.startDate);
//     const endDate = new Date(plan.endDate);
//     const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

//     // Format budget range
//     const budgetRange = `$${plan.budgetMin} - $${plan.budgetMax}`;

//     return (
//         <div className="min-h-screen py-8 bg-linear-to-b from-background to-muted/20">
//             <div className="container mx-auto px-4 max-w-5xl">
//                 <BackButton />

//                 <div className="grid lg:grid-cols-3 gap-8 mt-6">
//                     {/* Main Content */}
//                     <div className="lg:col-span-2 space-y-6">
//                         {/* Hero Image */}
//                         <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
//                             <Image
//                                 src={plan.image || "/placeholder-travel.jpg"}
//                                 alt={plan.destination}
//                                 width={800}          // ✅ you must provide width
//                                 height={600}         // ✅ and height
//                                 className="w-full h-full object-cover"
//                             />
//                             <div className="absolute top-4 right-4 flex gap-2">
//                                 <Badge className="bg-white/90 backdrop-blur-sm text-foreground shadow-lg">
//                                     {plan.travelType}
//                                 </Badge>
//                                 <Badge
//                                     variant={plan.status === 'PLANNING' ? 'default' : 'secondary'}
//                                     className="bg-white/90 backdrop-blur-sm text-foreground shadow-lg"
//                                 >
//                                     {plan.status}
//                                 </Badge>
//                             </div>
//                             {isOwner && (
//                                 <div className="absolute top-4 left-4">
//                                     <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground shadow-lg">
//                                         Your Trip
//                                     </Badge>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Title and Location */}
//                         <div>
//                             <h1 className="text-4xl font-bold mb-2">{plan.destination}</h1>
//                             <div className="flex items-center gap-4 text-muted-foreground">
//                                 <p className="flex items-center gap-2">
//                                     <MapPin className="w-5 h-5" />
//                                     {plan.country}
//                                 </p>
//                                 <p className="flex items-center gap-2">
//                                     <Calendar className="w-5 h-5" />
//                                     {duration} {duration === 1 ? 'day' : 'days'}
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Host Info - Compact Version */}
//                         <Card className="p-6 hover:shadow-lg transition-shadow">
//                             <div className="flex items-start justify-between gap-4">
//                                 <div className="flex items-center gap-4 flex-1">
//                                     <Avatar className="w-16 h-16 ring-2 ring-primary/10">
//                                         <AvatarImage
//                                             src={planOwner?.profileImage as string}
//                                             alt={planOwner?.fullName || 'User'}
//                                         />
//                                         <AvatarFallback className="text-lg">
//                                             {planOwner?.fullName?.[0]?.toUpperCase() || 'U'}
//                                         </AvatarFallback>
//                                     </Avatar>
//                                     <div className="flex-1">
//                                         <p className="text-sm text-muted-foreground mb-1">
//                                             {isOwner ? 'You are hosting this trip' : 'Hosted by'}
//                                         </p>
//                                         <h3 className="font-semibold text-lg">
//                                             {planOwner?.fullName || 'Anonymous User'}
//                                         </h3>
//                                         {planOwner?.bio && (
//                                             <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
//                                                 {planOwner.bio}
//                                             </p>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <Link href={isOwner ? '/profile' : `/profile/${plan.userId}`}>
//                                     <Button variant="outline" size="sm">
//                                         <User className="w-4 h-4 mr-2" />
//                                         View Profile
//                                         <ExternalLink className="w-3 h-3 ml-2" />
//                                     </Button>
//                                 </Link>
//                             </div>
//                         </Card>

//                         {/* Description */}
//                         <Card className="p-6">
//                             <h2 className="text-xl font-bold mb-4">About This Trip</h2>
//                             <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
//                                 {plan.description || 'No description provided for this trip.'}
//                             </p>
//                         </Card>

//                         {/* Interests & Activities */}
//                         {plan.activities && plan.activities.length > 0 && (
//                             <Card className="p-6">
//                                 <h2 className="text-xl font-bold mb-4">Planned Activities</h2>
//                                 <div className="flex flex-wrap gap-2">
//                                     {plan.activities.map((activity: any, index: any) => (
//                                         <Badge
//                                             key={`${activity}-${index}`}
//                                             variant="secondary"
//                                             className="text-sm py-1.5 px-3"
//                                         >
//                                             {activity}
//                                         </Badge>
//                                     ))}
//                                 </div>
//                             </Card>
//                         )}

//                         {/* Host's Interests */}
//                         {planOwner?.interests && planOwner.interests.length > 0 && (
//                             <Card className="p-6">
//                                 <h2 className="text-xl font-bold mb-4">Host's Interests</h2>
//                                 <div className="flex flex-wrap gap-2">
//                                     {planOwner.interests.map((interest: any, index: any) => (
//                                         <Badge
//                                             key={`${interest}-${index}`}
//                                             variant="outline"
//                                             className="text-sm py-1.5 px-3"
//                                         >
//                                             {interest}
//                                         </Badge>
//                                     ))}
//                                 </div>
//                             </Card>
//                         )}
//                     </div>

//                     {/* Sidebar */}
//                     <div className="space-y-6">
//                         {/* Trip Details Card */}
//                         <Card className="p-6 sticky top-24 shadow-lg">
//                             <h2 className="text-xl font-bold mb-6">Trip Details</h2>

//                             <div className="space-y-4 mb-6">
//                                 <div className="flex items-start gap-3">
//                                     <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
//                                     <div>
//                                         <p className="font-medium">Dates</p>
//                                         <p className="text-sm text-muted-foreground">
//                                             {new Date(plan.startDate).toLocaleDateString('en-US', {
//                                                 month: 'short',
//                                                 day: 'numeric',
//                                                 year: 'numeric'
//                                             })}
//                                             {' - '}
//                                             {new Date(plan.endDate).toLocaleDateString('en-US', {
//                                                 month: 'short',
//                                                 day: 'numeric',
//                                                 year: 'numeric'
//                                             })}
//                                         </p>
//                                         <p className="text-xs text-muted-foreground mt-1">
//                                             {duration} {duration === 1 ? 'day' : 'days'}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <DollarSign className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
//                                     <div>
//                                         <p className="font-medium">Budget Range</p>
//                                         <p className="text-sm text-muted-foreground">{budgetRange}</p>
//                                         <p className="text-xs text-muted-foreground mt-1">Per person</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
//                                     <div>
//                                         <p className="font-medium">Spots Available</p>
//                                         <p className="text-sm text-muted-foreground">
//                                             {(plan.maxTravelers - acceptedCount)} {plan.maxTravelers - acceptedCount === 1 ? 'spot' : 'spots'} left
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <MessageCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
//                                     <div>
//                                         <p className="font-medium">Interest Level</p>
//                                         <p className="text-sm text-muted-foreground">
//                                             {plan._count?.requests || 0} {plan._count?.requests === 1 ? 'request' : 'requests'}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="space-y-3">
//                                 {isOwner ? (
//                                     <Link href="/profile">
//                                         <Button
//                                             className="w-full gradient-hero"
//                                             size="lg"
//                                         >
//                                             <User className="w-4 h-4 mr-2" />
//                                             View My Profile
//                                         </Button>
//                                     </Link>
//                                 ) : (
//                                     <RequestButton
//                                         acceptedCount={acceptedCount}
//                                         isCurrentUser={!!currentUser} maxTravelersNumber={plan.maxTravelers}
//                                         travelPlanId={plan.id}
//                                         isRequested={isRequested}
//                                     />
//                                 )}

//                                 {!isOwner && (
//                                     <>
//                                         <Button variant="outline" className="w-full" size="lg"
//                                         //  onClick={() => toast.success("This feature will add soon!")}
//                                         >
//                                             <Mail className="w-4 h-4 mr-2" />
//                                             Message Host
//                                         </Button>

//                                         <Button variant="ghost" className="w-full" size="lg"
//                                         // onClick={() => toast.success("This feature will add soon!")}
//                                         >
//                                             <Heart className="w-4 h-4 mr-2" />
//                                             Save Trip
//                                         </Button>
//                                     </>
//                                 )}
//                             </div>

//                             <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
//                                 <p>
//                                     {isOwner
//                                         ? 'Manage your trip from your profile'
//                                         : 'Free to connect and plan together'}
//                                 </p>
//                             </div>
//                         </Card>

//                         {/* Safety Tips Card - Only for non-owners */}
//                         {!isOwner && (
//                             <Card className="p-6 bg-muted/50">
//                                 <h3 className="font-semibold mb-2 text-sm">Safety Tips</h3>
//                                 <ul className="text-xs text-muted-foreground space-y-1">
//                                     <li>• Always meet in public places first</li>
//                                     <li>• Verify host identity before traveling</li>
//                                     <li>• Share your itinerary with friends/family</li>
//                                     <li>• Trust your instincts</li>
//                                 </ul>
//                             </Card>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DetailTravelPlanPage;


// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react/no-unescaped-entities */
// import RequestButton from "@/components/modules/travelPlan/RequestButton";
// import { TravelPlanMatches } from "@/components/modules/travelPlan/TravelPlanMatches";
// // import { TravelPlanMatches } from "@/components/modules/travelPlan/TravelPlanMatches";
// import { BackButton } from "@/components/shared/BackButton";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { getUserInfo } from "@/services/auth/getUserInfo";
// import { getTravelPlanById } from "@/services/travel-plan";
// import {
//     Calendar,
//     DollarSign,
//     ExternalLink,
//     Heart,
//     Mail,
//     MapPin,
//     MessageCircle,
//     User,
//     Users
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// const DetailTravelPlanPage = async ({
//     params,
// }: {
//     params: Promise<{ id: string }>;
// }) => {
//     const { id } = await params;
//     const res = await getTravelPlanById(id);
//     const currentUser = await getUserInfo();

//     const plan = res?.data;

//     // Check if current user is the plan owner by comparing IDs
//     const isOwner = currentUser?.id === plan.userId;

//     // ✅ Check if current user has already requested this plan
//     const isRequested = plan.requests.some(
//         (req: any) => req.requesterId === currentUser?.id
//     );

//     const acceptedCount = plan.requests.filter(
//         (req: any) => req.status === "ACCEPTED"
//     ).length;

//     // Get plan owner data from nested user object
//     const planOwner = plan.user;

//     // Calculate trip duration
//     const startDate = new Date(plan.startDate);
//     const endDate = new Date(plan.endDate);
//     const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

//     // Format budget range
//     const budgetRange = `$${plan.budgetMin} - $${plan.budgetMax}`;

//     return (
//         <div className="min-h-screen py-8 bg-linear-to-b from-background to-muted/20">
//             <div className="container mx-auto px-4 max-w-5xl">
//                 <BackButton />

//                 <div className="grid lg:grid-cols-3 gap-8 mt-6">
//                     {/* Main Content */}
//                     <div className="lg:col-span-2 space-y-6">
//                         {/* Hero Image */}
//                         <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
//                             <Image
//                                 src={plan.image || "/placeholder-travel.jpg"}
//                                 alt={plan.destination}
//                                 width={800}
//                                 height={600}
//                                 className="w-full h-full object-cover"
//                             />
//                             <div className="absolute top-4 right-4 flex gap-2">
//                                 <Badge className="bg-white/90 backdrop-blur-sm text-foreground shadow-lg">
//                                     {plan.travelType}
//                                 </Badge>
//                                 <Badge
//                                     variant={plan.status === 'PLANNING' ? 'default' : 'secondary'}
//                                     className="bg-white/90 backdrop-blur-sm text-foreground shadow-lg"
//                                 >
//                                     {plan.status}
//                                 </Badge>
//                             </div>
//                             {isOwner && (
//                                 <div className="absolute top-4 left-4">
//                                     <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground shadow-lg">
//                                         Your Trip
//                                     </Badge>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Title and Location */}
//                         <div>
//                             <h1 className="text-4xl font-bold mb-2">{plan.destination}</h1>
//                             <div className="flex items-center gap-4 text-muted-foreground">
//                                 <p className="flex items-center gap-2">
//                                     <MapPin className="w-5 h-5" />
//                                     {plan.country}
//                                 </p>
//                                 <p className="flex items-center gap-2">
//                                     <Calendar className="w-5 h-5" />
//                                     {duration} {duration === 1 ? 'day' : 'days'}
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Host Info - Compact Version */}
//                         <Card className="p-6 hover:shadow-lg transition-shadow">
//                             <div className="flex items-start justify-between gap-4">
//                                 <div className="flex items-center gap-4 flex-1">
//                                     <Avatar className="w-16 h-16 ring-2 ring-primary/10">
//                                         <AvatarImage
//                                             src={planOwner?.profileImage as string}
//                                             alt={planOwner?.fullName || 'User'}
//                                         />
//                                         <AvatarFallback className="text-lg">
//                                             {planOwner?.fullName?.[0]?.toUpperCase() || 'U'}
//                                         </AvatarFallback>
//                                     </Avatar>
//                                     <div className="flex-1">
//                                         <p className="text-sm text-muted-foreground mb-1">
//                                             {isOwner ? 'You are hosting this trip' : 'Hosted by'}
//                                         </p>
//                                         <h3 className="font-semibold text-lg">
//                                             {planOwner?.fullName || 'Anonymous User'}
//                                         </h3>
//                                         {planOwner?.bio && (
//                                             <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
//                                                 {planOwner.bio}
//                                             </p>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <Link href={isOwner ? '/profile' : `/profile/${plan.userId}`}>
//                                     <Button variant="outline" size="sm">
//                                         <User className="w-4 h-4 mr-2" />
//                                         View Profile
//                                         <ExternalLink className="w-3 h-3 ml-2" />
//                                     </Button>
//                                 </Link>
//                             </div>
//                         </Card>

//                         {/* ✨ NEW: Travel Buddies Section */}
//                         {currentUser && (
//                             <TravelPlanMatches 
//                                 planId={plan.id} 
//                                 currentUserId={currentUser?.id}
//                             />
//                         )}

//                         {/* Description */}
//                         <Card className="p-6">
//                             <h2 className="text-xl font-bold mb-4">About This Trip</h2>
//                             <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
//                                 {plan.description || 'No description provided for this trip.'}
//                             </p>
//                         </Card>

//                         {/* Interests & Activities */}
//                         {plan.activities && plan.activities.length > 0 && (
//                             <Card className="p-6">
//                                 <h2 className="text-xl font-bold mb-4">Planned Activities</h2>
//                                 <div className="flex flex-wrap gap-2">
//                                     {plan.activities.map((activity: any, index: any) => (
//                                         <Badge
//                                             key={`${activity}-${index}`}
//                                             variant="secondary"
//                                             className="text-sm py-1.5 px-3"
//                                         >
//                                             {activity}
//                                         </Badge>
//                                     ))}
//                                 </div>
//                             </Card>
//                         )}

//                         {/* Host's Interests */}
//                         {planOwner?.interests && planOwner.interests.length > 0 && (
//                             <Card className="p-6">
//                                 <h2 className="text-xl font-bold mb-4">Host's Interests</h2>
//                                 <div className="flex flex-wrap gap-2">
//                                     {planOwner.interests.map((interest: any, index: any) => (
//                                         <Badge
//                                             key={`${interest}-${index}`}
//                                             variant="outline"
//                                             className="text-sm py-1.5 px-3"
//                                         >
//                                             {interest}
//                                         </Badge>
//                                     ))}
//                                 </div>
//                             </Card>
//                         )}
//                     </div>

//                     {/* Sidebar */}
//                     <div className="space-y-6">
//                         {/* Trip Details Card */}
//                         <Card className="p-6 sticky top-24 shadow-lg">
//                             <h2 className="text-xl font-bold mb-6">Trip Details</h2>

//                             <div className="space-y-4 mb-6">
//                                 <div className="flex items-start gap-3">
//                                     <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
//                                     <div>
//                                         <p className="font-medium">Dates</p>
//                                         <p className="text-sm text-muted-foreground">
//                                             {new Date(plan.startDate).toLocaleDateString('en-US', {
//                                                 month: 'short',
//                                                 day: 'numeric',
//                                                 year: 'numeric'
//                                             })}
//                                             {' - '}
//                                             {new Date(plan.endDate).toLocaleDateString('en-US', {
//                                                 month: 'short',
//                                                 day: 'numeric',
//                                                 year: 'numeric'
//                                             })}
//                                         </p>
//                                         <p className="text-xs text-muted-foreground mt-1">
//                                             {duration} {duration === 1 ? 'day' : 'days'}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <DollarSign className="w-5 h-5 text-primary mt-0.5 shrink-0" />
//                                     <div>
//                                         <p className="font-medium">Budget Range</p>
//                                         <p className="text-sm text-muted-foreground">{budgetRange}</p>
//                                         <p className="text-xs text-muted-foreground mt-1">Per person</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
//                                     <div>
//                                         <p className="font-medium">Spots Available</p>
//                                         <p className="text-sm text-muted-foreground">
//                                             {(plan.maxTravelers - acceptedCount)} {plan.maxTravelers - acceptedCount === 1 ? 'spot' : 'spots'} left
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <MessageCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
//                                     <div>
//                                         <p className="font-medium">Interest Level</p>
//                                         <p className="text-sm text-muted-foreground">
//                                             {plan._count?.requests || 0} {plan._count?.requests === 1 ? 'request' : 'requests'}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="space-y-3">
//                                 {isOwner ? (
//                                     <>
//                                         <Link href="/profile">
//                                             <Button
//                                                 className="w-full gradient-hero"
//                                                 size="lg"
//                                             >
//                                                 <User className="w-4 h-4 mr-2" />
//                                                 View My Profile
//                                             </Button>
//                                         </Link>
//                                         {/* ✨ NEW: Link to My Matches for plan owner */}
//                                         <Link href="/my-matches">
//                                             <Button
//                                                 variant="outline"
//                                                 className="w-full"
//                                                 size="lg"
//                                             >
//                                                 <Users className="w-4 h-4 mr-2" />
//                                                 View All Matches
//                                             </Button>
//                                         </Link>
//                                     </>
//                                 ) : (
//                                     <RequestButton
//                                         acceptedCount={acceptedCount}
//                                         isCurrentUser={!!currentUser} 
//                                         maxTravelersNumber={plan.maxTravelers}
//                                         travelPlanId={plan.id}
//                                         isRequested={isRequested}
//                                     />
//                                 )}

//                                 {!isOwner && (
//                                     <>
//                                         <Button variant="outline" className="w-full" size="lg">
//                                             <Mail className="w-4 h-4 mr-2" />
//                                             Message Host
//                                         </Button>

//                                         <Button variant="ghost" className="w-full" size="lg">
//                                             <Heart className="w-4 h-4 mr-2" />
//                                             Save Trip
//                                         </Button>
//                                     </>
//                                 )}
//                             </div>

//                             <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
//                                 <p>
//                                     {isOwner
//                                         ? 'Manage your trip from your profile'
//                                         : 'Free to connect and plan together'}
//                                 </p>
//                             </div>
//                         </Card>

//                         {/* Safety Tips Card - Only for non-owners */}
//                         {!isOwner && (
//                             <Card className="p-6 bg-muted/50">
//                                 <h3 className="font-semibold mb-2 text-sm">Safety Tips</h3>
//                                 <ul className="text-xs text-muted-foreground space-y-1">
//                                     <li>• Always meet in public places first</li>
//                                     <li>• Verify host identity before traveling</li>
//                                     <li>• Share your itinerary with friends/family</li>
//                                     <li>• Trust your instincts</li>
//                                 </ul>
//                             </Card>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DetailTravelPlanPage;



/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import RequestButton from "@/components/modules/travelPlan/RequestButton";
import { TravelPlanMatches } from "@/components/modules/travelPlan/TravelPlanMatches";
import { BackButton } from "@/components/shared/BackButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { checkMatch } from "@/services/travel-match";
import { getTravelPlanById } from "@/services/travel-plan";
import {
    Calendar,
    DollarSign,
    ExternalLink,
    Heart,
    Mail,
    MapPin,
    MessageCircle,
    User,
    Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DetailTravelPlanPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const res = await getTravelPlanById(id);
    const currentUser = await getUserInfo();
    const matchRes = await checkMatch(res?.data?.id, res?.data?.userId)
    const isMatched = matchRes?.data.isMatched;

    // console.log({ isMatched, matchRes });

    const plan = res?.data;

    const isOwner = currentUser?.id === plan?.userId;

    // console.log({ isOwner, plan });

    const isRequested = plan?.requests?.some(
        (req: any) => req.requesterId === currentUser?.id
    );

    const acceptedCount =
        plan?.requests?.filter((req: any) => req.status === "ACCEPTED").length || 0;

    const planOwner = plan?.user;

    const startDate = plan?.startDate ? new Date(plan.startDate) : null;
    const endDate = plan?.endDate ? new Date(plan.endDate) : null;
    const duration =
        startDate && endDate
            ? Math.ceil(
                (endDate.getTime() - startDate.getTime()) /
                (1000 * 60 * 60 * 24)
            )
            : 0;

    const budgetRange = `$${plan?.budgetMin} - $${plan?.budgetMax}`;

    return (
        <div className="min-h-screen py-8 bg-linear-to-b from-background to-muted/20">
            <div className="container mx-auto px-4 max-w-5xl">
                <BackButton />

                <div className="grid lg:grid-cols-3 gap-8 mt-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Hero Image */}
                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src={plan?.image || "/placeholder-travel.jpg"}
                                alt={plan?.destination || "Travel"}
                                width={800}
                                height={600}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Badge className="bg-white/90 backdrop-blur-sm text-foreground shadow-lg">
                                    {plan?.travelType}
                                </Badge>
                                <Badge
                                    variant={
                                        plan?.status === "PLANNING" ? "default" : "secondary"
                                    }
                                    className="bg-white/90 backdrop-blur-sm text-foreground shadow-lg"
                                >
                                    {plan?.status}
                                </Badge>
                            </div>
                            {isOwner && (
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground shadow-lg">
                                        Your Trip
                                    </Badge>
                                </div>
                            )}
                        </div>

                        {/* Title and Location */}
                        <div>
                            <h1 className="text-4xl font-bold mb-2">
                                {plan?.destination}
                            </h1>
                            <div className="flex items-center gap-4 text-muted-foreground">
                                <p className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    {plan?.country}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    {duration} {duration === 1 ? "day" : "days"}
                                </p>
                            </div>
                        </div>

                        {/* Host Info */}
                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-4 flex-1">
                                    <Avatar className="w-16 h-16 ring-2 ring-primary/10">
                                        <AvatarImage
                                            src={planOwner?.profileImage as string}
                                            alt={planOwner?.fullName || "User"}
                                        />
                                        <AvatarFallback className="text-lg">
                                            {planOwner?.fullName?.[0]?.toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground mb-1">
                                            {isOwner ? "You are hosting this trip" : "Hosted by"}
                                        </p>
                                        <h3 className="font-semibold text-lg">
                                            {planOwner?.fullName || "Anonymous User"}
                                        </h3>
                                        {planOwner?.bio && (
                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                {planOwner.bio}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <Link href={isOwner ? "/profile" : `/profile/${plan?.userId}`}>
                                    <Button variant="outline" size="sm">
                                        <User className="w-4 h-4 mr-2" />
                                        View Profile
                                        <ExternalLink className="w-3 h-3 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </Card>

                        {((currentUser && isOwner) || isMatched) && (
                            <TravelPlanMatches
                                planId={plan.id}
                                currentUserId={currentUser?.id}
                            />
                        )}
                        {/* {currentUser && plan?.id && (
                            <TravelPlanMatches
                                planId={plan.id}
                                currentUserId={currentUser?.id}
                            />
                        )} */}

                        {/* Description */}
                        <Card className="p-6">
                            <h2 className="text-xl font-bold ">About This Trip</h2>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                {plan?.description || "No description provided for this trip."}
                            </p>
                        </Card>

                        {/* Activities */}
                        {plan?.activities?.length > 0 && (
                            <Card className="p-6">
                                <h2 className="text-xl font-bold">Planned Activities</h2>
                                <div className="flex flex-wrap gap-2">
                                    {plan.activities.map((activity: any, index: any) => (
                                        <Badge
                                            key={`${activity}-${index}`}
                                            variant="secondary"
                                            className="text-sm py-1.5 px-3"
                                        >
                                            {activity}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Host Interests */}
                        {planOwner?.interests?.length > 0 && (
                            <Card className="p-6">
                                <h2 className="text-xl font-bold">Host's Interests</h2>
                                <div className="flex flex-wrap gap-2">
                                    {planOwner.interests.map((interest: any, index: any) => (
                                        <Badge
                                            key={`${interest}-${index}`}
                                            variant="outline"
                                            className="text-sm py-1.5 px-3"
                                        >
                                            {interest}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="p-6 sticky top-24 shadow-lg">
                            <h2 className="text-xl font-bold mb-6">Trip Details</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-medium">Dates</p>
                                        <p className="text-sm text-muted-foreground">
                                            {startDate?.toLocaleDateString("en-US")} -{" "}
                                            {endDate?.toLocaleDateString("en-US")}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <DollarSign className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-medium">Budget Range</p>
                                        <p className="text-sm text-muted-foreground">
                                            {budgetRange}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-medium">Spots Available</p>
                                        <p className="text-sm text-muted-foreground">
                                            {plan?.maxTravelers - acceptedCount} spots left
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MessageCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-medium">Interest Level</p>
                                        <p className="text-sm text-muted-foreground">
                                            {plan?._count?.requests || 0} requests
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {isOwner ? (
                                    <Link href="/profile">
                                        <Button className="w-full gradient-hero" size="lg">
                                            View My Profile
                                        </Button>
                                    </Link>
                                ) : (
                                    <RequestButton
                                        acceptedCount={acceptedCount}
                                        isCurrentUser={!!currentUser}
                                        maxTravelersNumber={plan?.maxTravelers}
                                        travelPlanId={plan?.id}
                                        isRequested={isRequested}
                                        isCompleted={plan.status ==="COMPLETED"}
                                    />
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailTravelPlanPage;
