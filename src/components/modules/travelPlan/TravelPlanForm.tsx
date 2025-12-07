// "use client";

// import { useActionState, useEffect, useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import Image from "next/image"; // Added for preview
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue
// } from "@/components/ui/select";
// import { X, Calendar, MapPin, DollarSign, Globe, Activity, ImageIcon, UploadCloud } from "lucide-react";
// import { toast } from "sonner";
// // import { createTravelPlanAction, updateTravelPlanAction } from "@/lib/actions/travel-plan";
// import InputFieldError from "@/components/shared/InputFieldError";
// import { createTravelPlanAction, updateTravelPlanAction } from "@/services/travel-plan";

// // Match your specific Enum or constants
// const TRAVEL_TYPES = ["SOLO", "FAMILY", "COUPLE", "FRIENDS"] as const;

// interface TravelPlanFormProps {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     plan?: any;
// }

// export default function TravelPlanForm({ plan }: TravelPlanFormProps) {
//     const isEdit = !!plan;
//     const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB (Adjusted for Travel Photos)

//     // Action Binding
//     const action = isEdit
//         ? updateTravelPlanAction.bind(null, plan.id)
//         : createTravelPlanAction;

//     const [state, formAction, isPending] = useActionState(action, null);

//     // -------------------
//     // IMAGE UPLOAD STATE
//     // -------------------
//     const [selectedImage, setSelectedImage] = useState<File | string | null>(plan?.image || null);
//     const [imageError, setImageError] = useState("");
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         if (file.size > MAX_FILE_SIZE) {
//             setImageError("Image must be smaller than 3MB.");
//             e.target.value = ""; // Reset input
//             return;
//         }

//         setImageError("");
//         setSelectedImage(file);
//     };

//     // -------------------
//     // ACTIVITIES STATE
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
//     // FEEDBACK
//     // -------------------
//     // useEffect(() => {
//     //     if (state?.success === false && state?.message) {
//     //         toast.error(state.message);
//     //     } else if (state?.success === true) {
//     //         toast.success(isEdit ? "Plan updated successfully!" : "Plan created successfully!");
//     //     }
//     // }, [state, isEdit]);

//     return (
//         <form action={formAction} className="flex flex-col space-y-6 pb-8">

//             {/* --- SECTION: IMAGE UPLOAD --- */}
//             {/* Placed at top for a nice "Cover Photo" feel */}
//             <div className="space-y-3">
//                 <Label className="font-medium text-sm flex items-center gap-2">
//                     <ImageIcon className="w-4 h-4" /> Cover Image
//                 </Label>

//                 <div className="flex flex-col gap-4">
//                     {/* Preview Area */}
//                     <div
//                         onClick={() => fileInputRef.current?.click()}
//                         className="relative w-full h-48 md:h-64 bg-muted/30 border-2 border-dashed border-muted-foreground/25 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors overflow-hidden group"
//                     >
//                         {selectedImage ? (
//                             <Image
//                                 src={typeof selectedImage === "string" ? selectedImage : URL.createObjectURL(selectedImage)}
//                                 alt="Cover Preview"
//                                 fill
//                                 className="object-cover"
//                             />
//                         ) : (
//                             <div className="flex flex-col items-center text-muted-foreground">
//                                 <UploadCloud className="w-10 h-10 mb-2" />
//                                 <span className="text-sm font-medium">Click to upload cover photo</span>
//                                 <span className="text-xs text-muted-foreground/70">Max 5MB</span>
//                             </div>
//                         )}

//                         {/* Hover Overlay */}
//                         {selectedImage && (
//                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                                 <span className="text-white font-medium flex items-center gap-2">
//                                     <UploadCloud className="w-5 h-5" /> Change Photo
//                                 </span>
//                             </div>
//                         )}
//                     </div>

//                     {/* Hidden Input */}
//                     <Input
//                         ref={fileInputRef}
//                         id="image"
//                         name="image"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="hidden"
//                     />

//                     {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
//                     <InputFieldError state={state} field="image" />
//                 </div>
//             </div>

//             {/* --- SECTION: BASIC INFO --- */}
//             <div className="space-y-4">
//                 <div className="flex items-center gap-2 border-b pb-2">
//                     <Globe className="w-5 h-5 text-primary" />
//                     <h3 className="text-lg font-semibold">Destinations & Details</h3>
//                 </div>

//                 <div>
//                     <Label className="font-medium text-sm">Trip Title *</Label>
//                     <Input
//                         name="title"
//                         defaultValue={plan?.title || ""}
//                         placeholder="e.g., Summer in Paris"
//                         className="mt-1"
//                     />
//                     <InputFieldError state={state} field="title" />
//                 </div>

//                 <div>
//                     <Label className="font-medium text-sm">Description</Label>
//                     <Textarea
//                         name="description"
//                         defaultValue={plan?.description || ""}
//                         placeholder="What's the plan?"
//                         className="mt-1 min-h-[80px]"
//                     />
//                     <InputFieldError state={state} field="description" />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <Label className="font-medium text-sm">Destination *</Label>
//                         <Input
//                             name="destination"
//                             defaultValue={plan?.destination || ""}
//                             placeholder="e.g., Paris"
//                             className="mt-1"
//                         />
//                         <InputFieldError state={state} field="destination" />
//                     </div>
//                     <div>
//                         <Label className="font-medium text-sm">Country</Label>
//                         <Input
//                             name="country"
//                             defaultValue={plan?.country || ""}
//                             placeholder="e.g., France"
//                             className="mt-1"
//                         />
//                         <InputFieldError state={state} field="country" />
//                     </div>
//                 </div>
//             </div>

//             {/* --- SECTION: TIMING & TYPE --- */}
//             <div className="space-y-4">
//                 <div className="flex items-center gap-2 border-b pb-2">
//                     <Calendar className="w-5 h-5 text-primary" />
//                     <h3 className="text-lg font-semibold">Timing & Logistics</h3>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <Label className="font-medium text-sm">Start Date *</Label>
//                         <Input
//                             name="startDate"
//                             type="date"
//                             defaultValue={plan?.startDate ? new Date(plan.startDate).toISOString().split('T')[0] : ""}
//                             className="mt-1"
//                         />
//                         <InputFieldError state={state} field="startDate" />
//                     </div>
//                     <div>
//                         <Label className="font-medium text-sm">End Date *</Label>
//                         <Input
//                             name="endDate"
//                             type="date"
//                             defaultValue={plan?.endDate ? new Date(plan.endDate).toISOString().split('T')[0] : ""}
//                             className="mt-1"
//                         />
//                         <InputFieldError state={state} field="endDate" />
//                     </div>
//                 </div>

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
//                         <InputFieldError state={state} field="travelType" />
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
//                         <InputFieldError state={state} field="maxTravelers" />
//                     </div>
//                 </div>
//             </div>

//             {/* --- SECTION: BUDGET & EXTRAS --- */}
//             <div className="space-y-4">
//                 <div className="flex items-center gap-2 border-b pb-2">
//                     <DollarSign className="w-5 h-5 text-primary" />
//                     <h3 className="text-lg font-semibold">Budget & Extras</h3>
//                 </div>

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

//                 {/* Public Switch */}
//                 <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
//                     <div className="space-y-0.5">
//                         <Label className="text-base">Public Trip</Label>
//                         <p className="text-xs text-muted-foreground">
//                             Visible to everyone in the community.
//                         </p>
//                     </div>
//                     <input type="hidden" name="isPublic" value={String(isPublic)} />
//                     <Switch
//                         checked={isPublic}
//                         onCheckedChange={setIsPublic}
//                     />
//                 </div>
//             </div>

//             {/* --- SECTION: ACTIVITIES --- */}
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

//                     {/* Hidden inputs to pass array data */}
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
//                     {isPending ? "Saving..." : (isEdit ? "Update Plan" : "Create Plan")}
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
import Image from "next/image";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { X, Calendar, MapPin, DollarSign, Globe, Activity, ImageIcon, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import InputFieldError from "@/components/shared/InputFieldError";
import { createTravelPlanAction, updateTravelPlanAction } from "@/services/travel-plan";

const TRAVEL_TYPES = ["SOLO", "FAMILY", "COUPLE", "FRIENDS"] as const;

interface TravelPlanFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plan?: any;
}

export default function TravelPlanForm({ plan }: TravelPlanFormProps) {
    const isEdit = !!plan;
    const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

    // Action Binding
    const action = isEdit
        ? updateTravelPlanAction.bind(null, plan.id)
        : createTravelPlanAction;

    const [state, formAction, isPending] = useActionState(action, null);

    // IMAGE UPLOAD STATE
    const [selectedImage, setSelectedImage] = useState<File | string | null>(plan?.image || null);
    const [imageError, setImageError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            setImageError("Image must be smaller than 3MB.");
            e.target.value = "";
            return;
        }

        setImageError("");
        setSelectedImage(file);
    };

    // ACTIVITIES STATE
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

    // IS PUBLIC STATE
    const [isPublic, setIsPublic] = useState<boolean>(plan?.isPublic ?? true);

    // TRAVEL TYPE STATE (for controlled Select)
    const [travelType, setTravelType] = useState<string>(
        plan?.travelType || "SOLO"
    );

    // Restore file input on validation error
    useEffect(() => {
        if (state && !state.success && selectedImage && fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            if (selectedImage instanceof File) {
                dataTransfer.items.add(selectedImage);
                fileInputRef.current.files = dataTransfer.files;
            }
        }
    }, [state, selectedImage]);

    return (
        <form action={formAction} className="flex flex-col space-y-6 pb-8">

            {/* --- SECTION: IMAGE UPLOAD --- */}
            <div className="space-y-3">
                <Label className="font-medium text-sm flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Cover Image
                </Label>

                <div className="flex flex-col gap-4">
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
                                <span className="text-xs text-muted-foreground/70">Max 3MB</span>
                            </div>
                        )}

                        {selectedImage && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white font-medium flex items-center gap-2">
                                    <UploadCloud className="w-5 h-5" /> Change Photo
                                </span>
                            </div>
                        )}
                    </div>

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
                        defaultValue={state?.formData?.title || (isEdit ? plan?.title : "")}
                        placeholder="e.g., Summer in Paris"
                        className="mt-1"
                    />
                    <InputFieldError state={state} field="title" />
                </div>

                <div>
                    <Label className="font-medium text-sm">Description</Label>
                    <Textarea
                        name="description"
                        defaultValue={state?.formData?.description || (isEdit ? plan?.description : "")}
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
                            defaultValue={state?.formData?.destination || (isEdit ? plan?.destination : "")}
                            placeholder="e.g., Paris"
                            className="mt-1"
                        />
                        <InputFieldError state={state} field="destination" />
                    </div>
                    <div>
                        <Label className="font-medium text-sm">Country</Label>
                        <Input
                            name="country"
                            defaultValue={state?.formData?.country || (isEdit ? plan?.country : "")}
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
                            defaultValue={
                                state?.formData?.startDate ||
                                (isEdit && plan?.startDate ? new Date(plan.startDate).toISOString().split('T')[0] : "")
                            }
                            className="mt-1"
                        />
                        <InputFieldError state={state} field="startDate" />
                    </div>
                    <div>
                        <Label className="font-medium text-sm">End Date *</Label>
                        <Input
                            name="endDate"
                            type="date"
                            defaultValue={
                                state?.formData?.endDate ||
                                (isEdit && plan?.endDate ? new Date(plan.endDate).toISOString().split('T')[0] : "")
                            }
                            className="mt-1"
                        />
                        <InputFieldError state={state} field="endDate" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="font-medium text-sm">Travel Type *</Label>
                        <Input
                            name="travelType"
                            type="hidden"
                            value={travelType}
                        />
                        <Select
                            value={travelType}
                            onValueChange={setTravelType}
                        >
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
                            defaultValue={state?.formData?.maxTravelers || (isEdit ? plan?.maxTravelers : "")}
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
                            defaultValue={state?.formData?.budgetMin || (isEdit ? plan?.budgetMin : "")}
                            placeholder="0"
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label className="font-medium text-sm">Max Budget</Label>
                        <Input
                            name="budgetMax"
                            type="number"
                            min="0"
                            defaultValue={state?.formData?.budgetMax || (isEdit ? plan?.budgetMax : "")}
                            placeholder="0"
                            className="mt-1"
                        />
                    </div>
                </div>

                {/* Activities Section */}
                <div className="space-y-3">
                    <Label className="font-medium text-sm flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Activities
                    </Label>

                    <div className="flex gap-2">
                        <Input
                            value={newActivity}
                            onChange={(e) => setNewActivity(e.target.value)}
                            placeholder="Add activity"
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addActivity())}
                        />
                        <Button type="button" onClick={addActivity} variant="outline">
                            Add
                        </Button>
                    </div>

                    {activities.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {activities.map((activity) => (
                                <Badge key={activity} variant="secondary" className="gap-1">
                                    {activity}
                                    {/* <X
                                        className="w-3 h-3 cursor-pointer"
                                        onClick={() => removeActivity(activity)}
                                    /> */}
                                    <button
                                        type="button"
                                        onClick={() => removeActivity(activity)}
                                        className="ml-1 text-red-500 hover:text-red-700 rounded-full p-0.5"
                                    >
                                        <X size={14} />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Hidden input for activities */}
                    <input type="hidden" name="activities" value={JSON.stringify(activities)} />
                </div>

                {/* Public Toggle */}
                <div className="flex items-center justify-between">
                    <Label className="font-medium text-sm">Public Plan</Label>
                    <Switch
                        checked={isPublic}
                        onCheckedChange={setIsPublic}
                    />
                    <input type="hidden" name="isPublic" value={isPublic.toString()} />
                </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Saving..." : isEdit ? "Update Plan" : "Create Plan"}
            </Button>
        </form>
    );
}