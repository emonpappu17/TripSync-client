/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { createRequest } from "@/services/travelRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface RequestButtonProps {
    travelPlanId: string;
    maxTravelersNumber: number;
    isCurrentUser: boolean;
    isRequested: boolean;
    acceptedCount: number;
    isCompleted: boolean,
    isMatched: boolean
}

const RequestButton = ({
    travelPlanId,
    maxTravelersNumber,
    isCurrentUser,
    isRequested,
    acceptedCount,
    isCompleted,
    isMatched
}: RequestButtonProps) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInitialClick = () => {
        if (isRequested) return
        if (!isCurrentUser) {
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
            const response = await createRequest(travelPlanId, message);

            if (!response.success) {
                toast.error(response.message || "Failed to send request");
                return;
            }

            toast.success("Request sent successfully!");
            setIsOpen(false);
            setMessage("");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            router.refresh(); // refresh once, always
       
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                className="w-full gradient-hero"
                size="lg"
                disabled={
                    maxTravelersNumber === 0 ||
                    isRequested ||
                    isCompleted ||
                    isMatched
                }
                onClick={handleInitialClick}
            >
                {isCompleted
                    ? "Trip Completed"
                    : isMatched
                        ? "Matched"
                        : isRequested
                            ? "Requested"
                            : (maxTravelersNumber - acceptedCount) === 0
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