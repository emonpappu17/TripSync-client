/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// 'use client';

// import { useFormState, useFormStatus } from 'react-dom';
// // import { createTravelPlanAction, updateTravelPlanAction } from '@/lib/actions/travel-plan';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Loader2, MapPin, Calendar, DollarSign } from 'lucide-react';
// // import { TRAVEL_TYPES } from '@/lib/constants';
// import { useEffect } from 'react';
// // import { toast } from '@/components/ui/use-toast';

// function SubmitButton({ isEdit }: { isEdit: boolean }) {
//     const { pending } = useFormStatus();

//     return (
//         <Button type="submit" disabled={pending} size="lg">
//             {pending ? (
//                 <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     {isEdit ? 'Updating...' : 'Creating...'}
//                 </>
//             ) : (
//                 <>{isEdit ? 'Update Plan' : 'Create Plan'}</>
//             )}
//         </Button>
//     );
// }

// interface TravelPlanFormProps {
//     plan?: any;
// }

// export default function TravelPlanForm({ plan }: TravelPlanFormProps) {
//     const isEdit = !!plan;
//     // const action = isEdit
//     //     ? updateTravelPlanAction.bind(null, plan.id)
//     //     : createTravelPlanAction;

//     // const [state, formAction] = useFormState(action, null);

//     const TRAVEL_TYPES = [
//         { value: 'SOLO', label: 'Solo' },
//         { value: 'TEAM', label: 'Team' },
//     ]

//     // useEffect(() => {
//     //     if (state?.success === false && state?.message) {
//     //         toast({
//     //             title: 'Error',
//     //             description: state.message,
//     //             variant: 'destructive',
//     //         });
//     //     } else if (state?.success === true) {
//     //         toast({
//     //             title: 'Success',
//     //             description: state.message,
//     //         });
//     //     }
//     // }, [state]);

//     return (
//         <form  className="space-y-6">
//             {/* {state?.success === false && state?.message && (
//                 <Alert variant="destructive">
//                     <AlertDescription>{state.message}</AlertDescription>
//                 </Alert>
//             )} */}

//             <Card>
//                 <CardHeader>
//                     <CardTitle className="flex items-center">
//                         <MapPin className="mr-2 h-5 w-5" />
//                         Basic Information
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                     <div>
//                         <Label htmlFor="title">Trip Title *</Label>
//                         <Input
//                             id="title"
//                             name="title"
//                             placeholder="e.g., Backpacking Southeast Asia"
//                             defaultValue={plan?.title}
//                             required
//                         />
//                         {/* {state?.errors?.title && (
//                             <p className="text-sm text-red-500 mt-1">{state.errors.title[0]}</p>
//                         )} */}
//                     </div>

//                     <div>
//                         <Label htmlFor="description">Description</Label>
//                         <Textarea
//                             id="description"
//                             name="description"
//                             placeholder="Describe your trip plans, what you want to do, and what kind of travel buddy you're looking for..."
//                             rows={4}
//                             defaultValue={plan?.description}
//                         />
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                             <Label htmlFor="destination">Destination *</Label>
//                             <Input
//                                 id="destination"
//                                 name="destination"
//                                 placeholder="e.g., Thailand"
//                                 defaultValue={plan?.destination}
//                                 required
//                             />
//                             {/* {state?.errors?.destination && (
//                                 <p className="text-sm text-red-500 mt-1">{state.errors.destination[0]}</p>
//                             )} */}
//                         </div>

//                         <div>
//                             <Label htmlFor="destinationCity">City</Label>
//                             <Input
//                                 id="destinationCity"
//                                 name="destinationCity"
//                                 placeholder="e.g., Bangkok"
//                                 defaultValue={plan?.destinationCity}
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <Label htmlFor="travelType">Travel Type *</Label>
//                         <Select name="travelType" defaultValue={plan?.travelType || 'SOLO'}>
//                             <SelectTrigger>
//                                 <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {TRAVEL_TYPES.map((type) => (
//                                     <SelectItem key={type.value} value={type.value}>
//                                         {type.label}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     </div>
//                 </CardContent>
//             </Card>

//             <Card>
//                 <CardHeader>
//                     <CardTitle className="flex items-center">
//                         <Calendar className="mr-2 h-5 w-5" />
//                         Dates & Details
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                     <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                             <Label htmlFor="startDate">Start Date *</Label>
//                             <Input
//                                 id="startDate"
//                                 name="startDate"
//                                 type="date"
//                                 defaultValue={plan?.startDate?.split('T')[0]}
//                                 required
//                             />
//                             {/* {state?.errors?.startDate && (
//                                 <p className="text-sm text-red-500 mt-1">{state.errors.startDate[0]}</p>
//                             )} */}
//                         </div>

//                         <div>
//                             <Label htmlFor="endDate">End Date *</Label>
//                             <Input
//                                 id="endDate"
//                                 name="endDate"
//                                 type="date"
//                                 defaultValue={plan?.endDate?.split('T')[0]}
//                                 required
//                             />
//                             {/* {state?.errors?.endDate && (
//                                 <p className="text-sm text-red-500 mt-1">{state.errors.endDate[0]}</p>
//                             )} */}
//                         </div>
//                     </div>

//                     <div>
//                         <Label htmlFor="maxTravelers">Max Travel Buddies</Label>
//                         <Input
//                             id="maxTravelers"
//                             name="maxTravelers"
//                             type="number"
//                             min="1"
//                             max="20"
//                             placeholder="How many people can join?"
//                             defaultValue={plan?.maxTravelers}
//                         />
//                         <p className="text-sm text-muted-foreground mt-1">
//                             Leave empty for unlimited
//                         </p>
//                     </div>
//                 </CardContent>
//             </Card>

//             <Card>
//                 <CardHeader>
//                     <CardTitle className="flex items-center">
//                         <DollarSign className="mr-2 h-5 w-5" />
//                         Budget
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                     <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                             <Label htmlFor="budgetMin">Minimum Budget (USD)</Label>
//                             <Input
//                                 id="budgetMin"
//                                 name="budgetMin"
//                                 type="number"
//                                 min="0"
//                                 step="100"
//                                 placeholder="e.g., 1000"
//                                 defaultValue={plan?.budgetMin}
//                             />
//                         </div>

//                         <div>
//                             <Label htmlFor="budgetMax">Maximum Budget (USD)</Label>
//                             <Input
//                                 id="budgetMax"
//                                 name="budgetMax"
//                                 type="number"
//                                 min="0"
//                                 step="100"
//                                 placeholder="e.g., 3000"
//                                 defaultValue={plan?.budgetMax}
//                             />
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>

//             <Card>
//                 <CardHeader>
//                     <CardTitle>Additional Info</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                     <div>
//                         <Label htmlFor="tags">Tags (comma-separated)</Label>
//                         <Input
//                             id="tags"
//                             name="tags"
//                             placeholder="e.g., hiking, photography, food"
//                             defaultValue={plan?.tags?.join(', ')}
//                         />
//                         <p className="text-sm text-muted-foreground mt-1">
//                             Help others find your trip with relevant tags
//                         </p>
//                     </div>
//                 </CardContent>
//             </Card>

//             <div className="flex gap-4">
//                 <SubmitButton isEdit={isEdit} />
//                 <Button type="button" variant="outline" onClick={() => window.history.back()}>
//                     Cancel
//                 </Button>
//             </div>
//         </form>
//     );
// }


// "use client";

// import { useActionState, useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { X, Calendar, MapPin, DollarSign, Tag } from "lucide-react";
// import { toast } from "sonner"; // Using sonner as per reference
// // import { createTravelPlanAction, updateTravelPlanAction } from "@/lib/actions/travel-plan";
// // import { TRAVEL_TYPES } from "@/lib/constants";
// import InputFieldError from "@/components/shared/InputFieldError"; // Assuming this exists based on reference
// import { redirect } from "next/navigation";

// // Define the shape of the plan props (simplified)
// interface TravelPlanFormProps {
//     plan?: any; // Replace 'any' with your actual ITravelPlan interface
// }

// export default function TravelPlanForm({ plan }: TravelPlanFormProps) {
//     const isEdit = !!plan;

//     const TRAVEL_TYPES = [
//         { value: 'SOLO', label: 'Solo' },
//         { value: 'TEAM', label: 'Team' },
//     ]

//     // -------------------
//     // STATE & ACTIONS
//     // -------------------
//     // const action = isEdit ? updateTravelPlanAction.bind(null, plan.id) : createTravelPlanAction;
//     // const [state, formAction, isPending] = useActionState(action, null);

//     // -------------------
//     // TAGS HANDLER (Inspired by Interests)
//     // -------------------
//     const [tags, setTags] = useState<string[]>(plan?.tags || []);
//     const [newTag, setNewTag] = useState("");

//     const addTag = () => {
//         const clean = newTag.trim();
//         if (clean && !tags.includes(clean)) {
//             setTags((prev) => [...prev, clean]);
//             setNewTag("");
//         }
//     };

//     const removeTag = (value: string) => {
//         setTags((prev) => prev.filter((t) => t !== value));
//     };

//     // -------------------
//     // FEEDBACK EFFECT
//     // -------------------
//     // useEffect(() => {
//     //     if (state?.success === false && state?.message) {
//     //         toast.error(state.message);
//     //     } else if (state?.success === true) {
//     //         toast.success(state.message);
//     //         // Optional: Redirect after success
//     //         // redirect("/plans"); 
//     //     }
//     // }, [state]);

//     return (
//         <form className="flex flex-col space-y-6 bg-card p-5 rounded-3xl">

//             {/* --- SECTION: BASIC INFO --- */}
//             <div className="space-y-4">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                     <MapPin className="w-5 h-5 text-primary" />
//                     Trip Overview
//                 </h3>

//                 {/* Title */}
//                 <div>
//                     <Label className="font-medium text-sm">Trip Title *</Label>
//                     <Input
//                         name="title"
//                         defaultValue={plan?.title || ""}
//                         placeholder="e.g., Backpacking Southeast Asia"
//                         className="mt-1"
//                     />
//                     {/* <InputFieldError state={state} field="title" /> */}
//                 </div>

//                 {/* Description */}
//                 <div>
//                     <Label className="font-medium text-sm">Description</Label>
//                     <Textarea
//                         name="description"
//                         defaultValue={plan?.description || ""}
//                         placeholder="Describe your plan..."
//                         className="mt-1 min-h-[100px]"
//                     />
//                     {/* <InputFieldError state={state} field="description" /> */}
//                 </div>

//                 {/* Destination & City Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <Label className="font-medium text-sm">Destination *</Label>
//                         <Input
//                             name="destination"
//                             defaultValue={plan?.destination || ""}
//                             placeholder="e.g., Thailand"
//                             className="mt-1"
//                         />
//                         {/* <InputFieldError state={state} field="destination" /> */}
//                     </div>
//                     <div>
//                         <Label className="font-medium text-sm">City</Label>
//                         <Input
//                             name="destinationCity"
//                             defaultValue={plan?.destinationCity || ""}
//                             placeholder="e.g., Bangkok"
//                             className="mt-1"
//                         />
//                     </div>
//                 </div>

//                 {/* Travel Type */}
//                 <div>
//                     <Label className="font-medium text-sm">Travel Style *</Label>
//                     <Select name="travelType" defaultValue={plan?.travelType || "SOLO"}>
//                         <SelectTrigger className="mt-1">
//                             <SelectValue placeholder="Select type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             {TRAVEL_TYPES.map((type) => (
//                                 <SelectItem key={type.value} value={type.value}>
//                                     {type.label}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 </div>
//             </div>

//             <div className="h-px bg-border" />

//             {/* --- SECTION: LOGISTICS --- */}
//             <div className="space-y-4">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                     <Calendar className="w-5 h-5 text-primary" />
//                     Dates & People
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <Label className="font-medium text-sm">Start Date *</Label>
//                         <Input
//                             name="startDate"
//                             type="date"
//                             defaultValue={plan?.startDate ? new Date(plan.startDate).toISOString().split('T')[0] : ""}
//                             className="mt-1"
//                         />
//                         {/* <InputFieldError state={state} field="startDate" /> */}
//                     </div>
//                     <div>
//                         <Label className="font-medium text-sm">End Date *</Label>
//                         <Input
//                             name="endDate"
//                             type="date"
//                             defaultValue={plan?.endDate ? new Date(plan.endDate).toISOString().split('T')[0] : ""}
//                             className="mt-1"
//                         />
//                         {/* <InputFieldError state={state} field="endDate" /> */}
//                     </div>
//                 </div>

//                 <div>
//                     <Label className="font-medium text-sm">Max Travel Buddies</Label>
//                     <Input
//                         name="maxTravelers"
//                         type="number"
//                         min="1"
//                         max="20"
//                         defaultValue={plan?.maxTravelers || ""}
//                         placeholder="Leave empty for unlimited"
//                         className="mt-1"
//                     />
//                 </div>
//             </div>

//             <div className="h-px bg-border" />

//             {/* --- SECTION: BUDGET --- */}
//             <div className="space-y-4">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                     <DollarSign className="w-5 h-5 text-primary" />
//                     Budget (USD)
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <Label className="font-medium text-sm">Min Budget</Label>
//                         <Input
//                             name="budgetMin"
//                             type="number"
//                             min="0"
//                             step="50"
//                             defaultValue={plan?.budgetMin || ""}
//                             placeholder="e.g. 500"
//                             className="mt-1"
//                         />
//                     </div>
//                     <div>
//                         <Label className="font-medium text-sm">Max Budget</Label>
//                         <Input
//                             name="budgetMax"
//                             type="number"
//                             min="0"
//                             step="50"
//                             defaultValue={plan?.budgetMax || ""}
//                             placeholder="e.g. 2000"
//                             className="mt-1"
//                         />
//                     </div>
//                 </div>
//             </div>

//             <div className="h-px bg-border" />

//             {/* --- SECTION: TAGS --- */}
//             <div className="space-y-4">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                     <Tag className="w-5 h-5 text-primary" />
//                     Tags
//                 </h3>
//                 <div>
//                     <Label className="font-medium text-sm">Add Tags</Label>
//                     <div className="flex gap-2 mt-1">
//                         <Input
//                             value={newTag}
//                             onChange={(e) => setNewTag(e.target.value)}
//                             placeholder="e.g. Hiking, Foodie, Beach"
//                             onKeyDown={(e) => {
//                                 if (e.key === "Enter") {
//                                     e.preventDefault();
//                                     addTag();
//                                 }
//                             }}
//                         />
//                         <Button type="button" onClick={addTag} variant="secondary">Add</Button>
//                     </div>

//                     {/* Hidden inputs to pass array data to Server Action */}
//                     {tags.map((tag) => (
//                         <input key={tag} type="hidden" name="tags" value={tag} />
//                     ))}

//                     <div className="flex flex-wrap mt-2 gap-2">
//                         {tags.map((tag) => (
//                             <Badge variant={"secondary"} key={tag} className="flex items-center gap-1 pl-3 pr-1 py-1">
//                                 {tag}
//                                 <button
//                                     type="button"
//                                     onClick={() => removeTag(tag)}
//                                     className="ml-1 text-muted-foreground hover:text-red-500 rounded-full p-0.5 transition-colors"
//                                 >
//                                     <X size={14} />
//                                 </button>
//                             </Badge>
//                         ))}
//                     </div>
//                     <p className="text-xs text-muted-foreground mt-2">
//                         Adding tags helps others find your trip based on interests.
//                     </p>
//                 </div>
//             </div>

//             {/* --- SUBMIT ACTIONS --- */}
//             <div className="flex gap-4 pt-2">
//                 <Button type="submit" className="w-full md:w-auto">
//                     {/* {isPending ? "Saving..." : (isEdit ? "Update Plan" : "Create Plan")} */}
//                     Create Plan
//                 </Button>
//                 {/* <Button disabled={isPending} type="submit" className="w-full md:w-auto">
//                     {isPending ? "Saving..." : (isEdit ? "Update Plan" : "Create Plan")}
//                 </Button> */}

//                 <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => window.history.back()}
//                     className="w-full md:w-auto"
//                 >
//                     Cancel
//                 </Button>
//             </div>

//         </form>
//     );
// }



// "use client";

// import { useActionState, useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue
// } from "@/components/ui/select";
// import { X, Calendar, MapPin, DollarSign, Globe, Plane, ImageIcon, Activity } from "lucide-react";
// import { toast } from "sonner";
// // import { createTravelPlanAction, updateTravelPlanAction } from "@/lib/actions/travel-plan";
// import InputFieldError from "@/components/shared/InputFieldError";
// import { redirect } from "next/navigation";
// import { createTravelPlanAction, updateTravelPlanAction } from "@/services/travel-plan";

// // You might need to import this Enum or define it locally to match your schema
// const TRAVEL_TYPES = ["SOLO", "COUPLE", "FAMILY", "FRIENDS", "BUSINESS"] as const;

// interface TravelPlanFormProps {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     plan?: any;
// }

// export default function TravelPlanForm({ plan }: TravelPlanFormProps) {
//     const isEdit = !!plan;

//     // Determine action: Create or Update
//     const action = isEdit
//         ? updateTravelPlanAction.bind(null, plan.id)
//         : createTravelPlanAction;

//     const [state, formAction, isPending] = useActionState(action, null);

//     // -------------------
//     // ACTIVITIES STATE (Matches "Interests" logic)
//     // -------------------
//     const [activities, setActivities] = useState<string[]>(plan?.activities || []);
//     const [newActivity, setNewActivity] = useState("");

//     const addActivity = () => {
//         const clean = newActivity.trim();
//         if (clean && !activities.includes(clean)) {
//             setActivities((prev) => [...prev, clean]);
//             setNewActivity("");
//         }
//     };

//     const removeActivity = (value: string) => {
//         setActivities((prev) => prev.filter((a) => a !== value));
//     };

//     // -------------------
//     // IS PUBLIC STATE
//     // -------------------
//     const [isPublic, setIsPublic] = useState<boolean>(plan?.isPublic ?? true);

//     // -------------------
//     // FEEDBACK HANDLER
//     // -------------------
//     // useEffect(() => {
//     //     if (state?.success === false && state?.message) {
//     //         toast.error(state.message);
//     //     } else if (state?.success === true) {
//     //         toast.success(isEdit ? "Plan updated successfully!" : "Plan created successfully!");
//     //         // Optional: redirect("/plans");
//     //     }
//     // }, [state, isEdit]);

//     return (
//         <form action={formAction} className="flex flex-col space-y-6">

//             {/* --- BASIC INFO --- */}
//             <div className="space-y-4">
//                 <div className="flex items-center gap-2 border-b pb-2">
//                     <Globe className="w-5 h-5 text-primary" />
//                     <h3 className="text-lg font-semibold">Destinations & Details</h3>
//                 </div>

//                 {/* Title */}
//                 <div>
//                     <Label className="font-medium text-sm">Trip Title *</Label>
//                     <Input
//                         name="title"
//                         defaultValue={plan?.title || ""}
//                         placeholder="e.g., Summer in Paris"
//                         className="mt-1"
//                     />
//                     {/* <InputFieldError state={state} field="title" /> */}
//                 </div>

//                 {/* Description */}
//                 <div>
//                     <Label className="font-medium text-sm">Description</Label>
//                     <Textarea
//                         name="description"
//                         defaultValue={plan?.description || ""}
//                         placeholder="What's the plan?"
//                         className="mt-1 min-h-[80px]"
//                     />
//                     {/* <InputFieldError state={state} field="description" /> */}
//                 </div>

//                 {/* Destination & Country */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <Label className="font-medium text-sm">Destination *</Label>
//                         <Input
//                             name="destination"
//                             defaultValue={plan?.destination || ""}
//                             placeholder="e.g., Paris"
//                             className="mt-1"
//                         />
//                         {/* <InputFieldError state={state} field="destination" /> */}
//                     </div>
//                     <div>
//                         <Label className="font-medium text-sm">Country</Label>
//                         <Input
//                             name="country"
//                             defaultValue={plan?.country || ""}
//                             placeholder="e.g., France"
//                             className="mt-1"
//                         />
//                         {/* <InputFieldError state={state} field="country" /> */}
//                     </div>
//                 </div>
//             </div>

//             {/* --- TIMING & TYPE --- */}
//             <div className="space-y-4">
//                 <div className="flex items-center gap-2 border-b pb-2">
//                     <Calendar className="w-5 h-5 text-primary" />
//                     <h3 className="text-lg font-semibold">Timing & Logistics</h3>
//                 </div>

//                 {/* Dates */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <Label className="font-medium text-sm">Start Date *</Label>
//                         <Input
//                             name="startDate"
//                             type="date"
//                             defaultValue={plan?.startDate ? new Date(plan.startDate).toISOString().split('T')[0] : ""}
//                             className="mt-1"
//                         />
//                         {/* <InputFieldError state={state} field="startDate" /> */}
//                     </div>
//                     <div>
//                         <Label className="font-medium text-sm">End Date *</Label>
//                         <Input
//                             name="endDate"
//                             type="date"
//                             defaultValue={plan?.endDate ? new Date(plan.endDate).toISOString().split('T')[0] : ""}
//                             className="mt-1"
//                         />
//                         {/* <InputFieldError state={state} field="endDate" /> */}
//                     </div>
//                 </div>

//                 {/* Type & Travelers */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <Label className="font-medium text-sm">Travel Type *</Label>
//                         <Select name="travelType" defaultValue={plan?.travelType || "SOLO"}>
//                             <SelectTrigger className="mt-1">
//                                 <SelectValue placeholder="Select type" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {TRAVEL_TYPES.map((type) => (
//                                     <SelectItem key={type} value={type}>
//                                         {type}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                         {/* <InputFieldError state={state} field="travelType" /> */}
//                     </div>
//                     <div>
//                         <Label className="font-medium text-sm">Max Travelers</Label>
//                         <Input
//                             name="maxTravelers"
//                             type="number"
//                             min="1"
//                             defaultValue={plan?.maxTravelers || ""}
//                             placeholder="Max capacity"
//                             className="mt-1"
//                         />
//                         {/* <InputFieldError state={state} field="maxTravelers" /> */}
//                     </div>
//                 </div>
//             </div>

//             {/* --- BUDGET & EXTRAS --- */}
//             <div className="space-y-4">
//                 <div className="flex items-center gap-2 border-b pb-2">
//                     <DollarSign className="w-5 h-5 text-primary" />
//                     <h3 className="text-lg font-semibold">Budget & Extras</h3>
//                 </div>

//                 {/* Budget */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <Label className="font-medium text-sm">Min Budget</Label>
//                         <Input
//                             name="budgetMin"
//                             type="number"
//                             min="0"
//                             defaultValue={plan?.budgetMin || ""}
//                             placeholder="0"
//                             className="mt-1"
//                         />
//                         {/* <InputFieldError state={state} field="budgetMin" /> */}
//                     </div>
//                     <div>
//                         <Label className="font-medium text-sm">Max Budget</Label>
//                         <Input
//                             name="budgetMax"
//                             type="number"
//                             min="0"
//                             defaultValue={plan?.budgetMax || ""}
//                             placeholder="0"
//                             className="mt-1"
//                         />
//                         {/* <InputFieldError state={state} field="budgetMax" /> */}
//                     </div>
//                 </div>

//                 {/* Image URL */}
//                 <div>
//                     <Label className="font-medium text-sm flex items-center gap-2">
//                         <ImageIcon size={16} /> Cover Image URL
//                     </Label>
//                     <Input
//                         name="image"
//                         defaultValue={plan?.image || ""}
//                         placeholder="https://example.com/image.jpg"
//                         className="mt-1"
//                     />
//                     {/* <InputFieldError state={state} field="image" /> */}
//                 </div>

//                 {/* Is Public Switch */}
//                 <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
//                     <div className="space-y-0.5">
//                         <Label className="text-base">Public Trip</Label>
//                         <p className="text-xs text-muted-foreground">
//                             Visible to everyone in the community.
//                         </p>
//                     </div>
//                     {/* Hidden input to ensure boolean is sent in formData if using standard form submission */}
//                     <input type="hidden" name="isPublic" value={String(isPublic)} />
//                     <Switch
//                         checked={isPublic}
//                         onCheckedChange={setIsPublic}
//                     />
//                 </div>
//                 {/* <InputFieldError state={state} field="isPublic" /> */}
//             </div>

//             {/* --- ACTIVITIES (Matches "Interests" UI) --- */}
//             <div className="space-y-4">
//                 <div className="flex items-center gap-2 border-b pb-2">
//                     <Activity className="w-5 h-5 text-primary" />
//                     <h3 className="text-lg font-semibold">Activities</h3>
//                 </div>

//                 <div>
//                     <div className="flex gap-2 mt-1">
//                         <Input
//                             value={newActivity}
//                             onChange={(e) => setNewActivity(e.target.value)}
//                             placeholder="Add activity (e.g. Hiking)"
//                             onKeyDown={(e) => {
//                                 if (e.key === "Enter") {
//                                     e.preventDefault();
//                                     addActivity();
//                                 }
//                             }}
//                         />
//                         <Button type="button" onClick={addActivity} variant="secondary">Add</Button>
//                     </div>

//                     {/* Hidden inputs to pass array data to Server Action via FormData */}
//                     {activities.map((a) => (
//                         <input key={a} type="hidden" name="activities" value={a} />
//                     ))}

//                     <div className="flex flex-wrap mt-3 gap-2">
//                         {activities.map((item) => (
//                             <Badge variant={"secondary"} key={item} className="flex items-center gap-1 pl-3 pr-1 py-1">
//                                 {item}
//                                 <button
//                                     type="button"
//                                     onClick={() => removeActivity(item)}
//                                     className="ml-1 text-red-500 hover:text-red-700 rounded-full p-0.5"
//                                 >
//                                     <X size={14} />
//                                 </button>
//                             </Badge>
//                         ))}
//                     </div>
//                     {/* <InputFieldError state={state} field="activities" /> */}
//                 </div>
//             </div>

//             {/* --- SUBMIT --- */}
//             <div className="pt-4">
//                 <Button disabled={isPending} type="submit" className="w-full">
//                     {isPending ? <span className="animate-pulse">Saving...</span> : (isEdit ? "Update Plan" : "Create Plan")}
//                 </Button>
//             </div>
//         </form>
//     );
// }


"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import Image from "next/image"; // Added for preview
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { X, Calendar, MapPin, DollarSign, Globe, Activity, ImageIcon, UploadCloud } from "lucide-react";
import { toast } from "sonner";
// import { createTravelPlanAction, updateTravelPlanAction } from "@/lib/actions/travel-plan";
import InputFieldError from "@/components/shared/InputFieldError";
import { createTravelPlanAction, updateTravelPlanAction } from "@/services/travel-plan";

// Match your specific Enum or constants
const TRAVEL_TYPES = ["SOLO", "FAMILY", "COUPLE", "FRIENDS"] as const;

interface TravelPlanFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plan?: any;
}

export default function TravelPlanForm({ plan }: TravelPlanFormProps) {
    const isEdit = !!plan;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB (Adjusted for Travel Photos)

    // Action Binding
    const action = isEdit
        ? updateTravelPlanAction.bind(null, plan.id)
        : createTravelPlanAction;

    const [state, formAction, isPending] = useActionState(action, null);

    // -------------------
    // IMAGE UPLOAD STATE
    // -------------------
    const [selectedImage, setSelectedImage] = useState<File | string | null>(plan?.image || null);
    const [imageError, setImageError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            setImageError("Image must be smaller than 5MB.");
            e.target.value = ""; // Reset input
            return;
        }

        setImageError("");
        setSelectedImage(file);
    };

    // -------------------
    // ACTIVITIES STATE
    // -------------------
    const [activities, setActivities] = useState<string[]>(plan?.activities || []);
    const [newActivity, setNewActivity] = useState("");

    const addActivity = () => {
        const clean = newActivity.trim();
        if (clean && !activities.includes(clean)) {
            setActivities((prev) => [...prev, clean]);
            setNewActivity("");
        }
    };

    const removeActivity = (value: string) => {
        setActivities((prev) => prev.filter((a) => a !== value));
    };

    // -------------------
    // IS PUBLIC STATE
    // -------------------
    const [isPublic, setIsPublic] = useState<boolean>(plan?.isPublic ?? true);

    // -------------------
    // FEEDBACK
    // -------------------
    // useEffect(() => {
    //     if (state?.success === false && state?.message) {
    //         toast.error(state.message);
    //     } else if (state?.success === true) {
    //         toast.success(isEdit ? "Plan updated successfully!" : "Plan created successfully!");
    //     }
    // }, [state, isEdit]);

    return (
        <form action={formAction} className="flex flex-col space-y-6 pb-8">

            {/* --- SECTION: IMAGE UPLOAD --- */}
            {/* Placed at top for a nice "Cover Photo" feel */}
            <div className="space-y-3">
                <Label className="font-medium text-sm flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Cover Image
                </Label>

                <div className="flex flex-col gap-4">
                    {/* Preview Area */}
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="relative w-full h-48 md:h-64 bg-muted/30 border-2 border-dashed border-muted-foreground/25 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors overflow-hidden group"
                    >
                        {selectedImage ? (
                            <Image
                                src={typeof selectedImage === "string" ? selectedImage : URL.createObjectURL(selectedImage)}
                                alt="Cover Preview"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center text-muted-foreground">
                                <UploadCloud className="w-10 h-10 mb-2" />
                                <span className="text-sm font-medium">Click to upload cover photo</span>
                                <span className="text-xs text-muted-foreground/70">Max 5MB</span>
                            </div>
                        )}

                        {/* Hover Overlay */}
                        {selectedImage && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white font-medium flex items-center gap-2">
                                    <UploadCloud className="w-5 h-5" /> Change Photo
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Hidden Input */}
                    <Input
                        ref={fileInputRef}
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
                    <InputFieldError state={state} field="image" />
                </div>
            </div>

            {/* --- SECTION: BASIC INFO --- */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 border-b pb-2">
                    <Globe className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Destinations & Details</h3>
                </div>

                <div>
                    <Label className="font-medium text-sm">Trip Title *</Label>
                    <Input
                        name="title"
                        defaultValue={plan?.title || ""}
                        placeholder="e.g., Summer in Paris"
                        className="mt-1"
                    />
                    <InputFieldError state={state} field="title" />
                </div>

                <div>
                    <Label className="font-medium text-sm">Description</Label>
                    <Textarea
                        name="description"
                        defaultValue={plan?.description || ""}
                        placeholder="What's the plan?"
                        className="mt-1 min-h-[80px]"
                    />
                    <InputFieldError state={state} field="description" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="font-medium text-sm">Destination *</Label>
                        <Input
                            name="destination"
                            defaultValue={plan?.destination || ""}
                            placeholder="e.g., Paris"
                            className="mt-1"
                        />
                        <InputFieldError state={state} field="destination" />
                    </div>
                    <div>
                        <Label className="font-medium text-sm">Country</Label>
                        <Input
                            name="country"
                            defaultValue={plan?.country || ""}
                            placeholder="e.g., France"
                            className="mt-1"
                        />
                        <InputFieldError state={state} field="country" />
                    </div>
                </div>
            </div>

            {/* --- SECTION: TIMING & TYPE --- */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 border-b pb-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Timing & Logistics</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="font-medium text-sm">Start Date *</Label>
                        <Input
                            name="startDate"
                            type="date"
                            defaultValue={plan?.startDate ? new Date(plan.startDate).toISOString().split('T')[0] : ""}
                            className="mt-1"
                        />
                        <InputFieldError state={state} field="startDate" />
                    </div>
                    <div>
                        <Label className="font-medium text-sm">End Date *</Label>
                        <Input
                            name="endDate"
                            type="date"
                            defaultValue={plan?.endDate ? new Date(plan.endDate).toISOString().split('T')[0] : ""}
                            className="mt-1"
                        />
                        <InputFieldError state={state} field="endDate" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="font-medium text-sm">Travel Type *</Label>
                        <Select name="travelType" defaultValue={plan?.travelType || "SOLO"}>
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {TRAVEL_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputFieldError state={state} field="travelType" />
                    </div>
                    <div>
                        <Label className="font-medium text-sm">Max Travelers</Label>
                        <Input
                            name="maxTravelers"
                            type="number"
                            min="1"
                            defaultValue={plan?.maxTravelers || ""}
                            placeholder="Max capacity"
                            className="mt-1"
                        />
                        <InputFieldError state={state} field="maxTravelers" />
                    </div>
                </div>
            </div>

            {/* --- SECTION: BUDGET & EXTRAS --- */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 border-b pb-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Budget & Extras</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="font-medium text-sm">Min Budget</Label>
                        <Input
                            name="budgetMin"
                            type="number"
                            min="0"
                            defaultValue={plan?.budgetMin || ""}
                            placeholder="0"
                            className="mt-1"
                        />
                        {/* <InputFieldError state={state} field="budgetMin" /> */}
                    </div>
                    <div>
                        <Label className="font-medium text-sm">Max Budget</Label>
                        <Input
                            name="budgetMax"
                            type="number"
                            min="0"
                            defaultValue={plan?.budgetMax || ""}
                            placeholder="0"
                            className="mt-1"
                        />
                        {/* <InputFieldError state={state} field="budgetMax" /> */}
                    </div>
                </div>

                {/* Public Switch */}
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <Label className="text-base">Public Trip</Label>
                        <p className="text-xs text-muted-foreground">
                            Visible to everyone in the community.
                        </p>
                    </div>
                    <input type="hidden" name="isPublic" value={String(isPublic)} />
                    <Switch
                        checked={isPublic}
                        onCheckedChange={setIsPublic}
                    />
                </div>
            </div>

            {/* --- SECTION: ACTIVITIES --- */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 border-b pb-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Activities</h3>
                </div>

                <div>
                    <div className="flex gap-2 mt-1">
                        <Input
                            value={newActivity}
                            onChange={(e) => setNewActivity(e.target.value)}
                            placeholder="Add activity (e.g. Hiking)"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addActivity();
                                }
                            }}
                        />
                        <Button type="button" onClick={addActivity} variant="secondary">Add</Button>
                    </div>

                    {/* Hidden inputs to pass array data */}
                    {activities.map((a) => (
                        <input key={a} type="hidden" name="activities" value={a} />
                    ))}

                    <div className="flex flex-wrap mt-3 gap-2">
                        {activities.map((item) => (
                            <Badge variant={"secondary"} key={item} className="flex items-center gap-1 pl-3 pr-1 py-1">
                                {item}
                                <button
                                    type="button"
                                    onClick={() => removeActivity(item)}
                                    className="ml-1 text-red-500 hover:text-red-700 rounded-full p-0.5"
                                >
                                    <X size={14} />
                                </button>
                            </Badge>
                        ))}
                    </div>
                    {/* <InputFieldError state={state} field="activities" /> */}
                </div>
            </div>

            {/* --- SUBMIT --- */}
            <div className="pt-4">
                <Button disabled={isPending} type="submit" className="w-full">
                    {isPending ? "Saving..." : (isEdit ? "Update Plan" : "Create Plan")}
                </Button>
            </div>
        </form>
    );
}