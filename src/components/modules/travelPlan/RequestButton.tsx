/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
// "use client";

// import { Button } from '@/components/ui/button';
// import { redirect } from 'next/navigation';

// const RequestButton = ({ maxTravelersNumber, isCurrentUser }: { maxTravelersNumber: number, isCurrentUser: boolean }) => {
//     return (

//         <Button
//             className="w-full gradient-hero"
//             size="lg"
//             disabled={maxTravelersNumber === 0}
//             onClick={() => {
//                 if (!isCurrentUser) {
//                     redirect("/login")
//                 }
//             }}
//         >
//             {maxTravelersNumber === 0 ? 'Trip Full' : 'Request to Join'}
//         </Button>

//     );
// };

// export default RequestButton;



// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { redirect } from "next/navigation";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";

// const RequestButton = ({
//     maxTravelersNumber,
//     isCurrentUser,
// }: {
//     maxTravelersNumber: number;
//     isCurrentUser: boolean;
// }) => {
//     const [open, setOpen] = useState(false);
//     const [message, setMessage] = useState("");

//     const handleClick = () => {
//         if (!isCurrentUser) {
//             redirect("/login");
//             return;
//         }

//         if (maxTravelersNumber === 0) return;

//         setOpen(true);
//     };

//     const handleSubmit = async () => {
//         if (!message.trim()) return;

//         // ✅ TODO: Send this to your API
//         console.log("Request Message:", message);

//         setMessage("");
//         setOpen(false);
//     };

//     return (
//         <>
//             {/* ✅ MAIN BUTTON */}
//             <Button
//                 className="w-full gradient-hero"
//                 size="lg"
//                 disabled={maxTravelersNumber === 0}
//                 onClick={handleClick}
//             >
//                 {maxTravelersNumber === 0 ? "Trip Full" : "Request to Join"}
//             </Button>

//             {/* ✅ MODAL / DIALOG */}
//             <Dialog open={open} onOpenChange={setOpen} >
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>Send Request Message</DialogTitle>
//                     </DialogHeader>

//                     {/* ✅ MESSAGE INPUT */}
//                     <Textarea
//                         placeholder="Write a short message to the host..."
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         className="min-h-[120px]"
//                     />

//                     <DialogFooter>
//                         <Button variant="outline" onClick={() => setOpen(false)}>
//                             Cancel
//                         </Button>
//                         <Button onClick={handleSubmit} disabled={!message.trim()}>
//                             Send Request
//                         </Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// };

// export default RequestButton;


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // Or your preferred toast library import
import { createRequest } from "@/services/travelRequest";

interface RequestButtonProps {
    travelPlanId: string;
    maxTravelersNumber: number;
    isCurrentUser: boolean;
    isRequested: boolean;
}

const RequestButton = ({
    travelPlanId,
    maxTravelersNumber,
    isCurrentUser,
    isRequested
}: RequestButtonProps) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInitialClick = () => {
        if (isRequested) return
        if (!isCurrentUser) {
            // Store the current URL to redirect back after login if needed
            // const currentPath = window.location.pathname;
            // router.push(`/login?callbackUrl=${currentPath}`);
            router.push("/login");
            return;
        }
        setIsOpen(true);
    };

    const handleSubmitRequest = async () => {
        if (!message.trim()) {
            toast.error("Please enter a message to the host.");
            return;
        }

        try {
            setLoading(true);

            // ---------------------------------------------------------
            // REPLACE THIS WITH YOUR ACTUAL API SERVICE CALL
            // Example: await createTravelRequest(travelPlanId, message);
            // ---------------------------------------------------------
            // console.log({ travelPlanId, message });
            const response = await createRequest(travelPlanId, message)

            // console.log({ response });

            if (!response.success) {
                toast.error(response.message || "Failed to send request");
                return
            }
            // if (!response.ok) {
            //     throw new Error("Failed to send request");
            // }

            // Success logic
            toast.success("Request sent successfully!");
            setIsOpen(false);
            setMessage("");
            router.refresh();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* <Button
                className="w-full gradient-hero"
                size="lg"
                disabled={maxTravelersNumber === 0}
                onClick={handleInitialClick}
            >
                {isRequested && 'Requested' || maxTravelersNumber === 0 ? 'Trip Full' : 'Request to Join'}
            </Button> */}

            <Button
                className="w-full gradient-hero"
                size="lg"
                disabled={maxTravelersNumber === 0 || isRequested}
                onClick={handleInitialClick}
            >
                {isRequested
                    ? "Requested"
                    : maxTravelersNumber === 0
                        ? "Trip Full"
                        : "Request to Join"}
            </Button>


            <Dialog open={isOpen} onOpenChange={setIsOpen} >
                <DialogContent className="sm:max-w-[425px] p-5" >
                    <DialogHeader>
                        <DialogTitle>Join this Trip</DialogTitle>
                        <DialogDescription>
                            Send a message to the host introducing yourself and why you'd like to join.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="message">Your Message</Label>
                            <Textarea
                                id="message"
                                placeholder="Hi! I saw your trip and I'm really interested because..."
                                className="min-h-[100px]"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmitRequest}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Request"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default RequestButton;