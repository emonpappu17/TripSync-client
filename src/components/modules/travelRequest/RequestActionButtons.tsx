/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Check, X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateRequestStatus } from '@/services/travelRequest';

interface RequestActionButtonsProps {
    requestId: string;
}

export function RequestActionButtons({ requestId }: RequestActionButtonsProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [action, setAction] = useState<'ACCEPTED' | 'REJECTED' | null>(null);

    const handleAction = async (status: 'ACCEPTED' | 'REJECTED') => {
        setIsLoading(true);
        setAction(status);

        try {
            // const response = await fetch(`/api/travel-requests/${requestId}/status`, {
            //     method: 'PATCH',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ status }),
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to update request');
            // }
            const response = await updateRequestStatus(requestId, status)

              if (!response.success) {
                toast.error('Failed to update request');
                return
            }

            toast.success(
                status === 'ACCEPTED'
                    ? 'Request accepted! 🎉'
                    : 'Request rejected'
            );
            router.refresh();
        } catch (error) {
            toast.error('Failed to update request');
            console.error(error);
        } finally {
            setIsLoading(false);
            setAction(null);
        }
    };

    return (
        <div className="flex gap-2">
            {/* Accept Button */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="default"
                        size="sm"
                        disabled={isLoading}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {isLoading && action === 'ACCEPTED' ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Accepting...
                            </>
                        ) : (
                            <>
                                <Check className="w-4 h-4 mr-2" />
                                Accept
                            </>
                        )}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Accept Request?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This person will be notified that you've accepted their request to join your trip.
                            You can message them to coordinate travel details.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleAction('ACCEPTED')}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Accept Request
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Reject Button */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                        {isLoading && action === 'REJECTED' ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Rejecting...
                            </>
                        ) : (
                            <>
                                <X className="w-4 h-4 mr-2" />
                                Reject
                            </>
                        )}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Reject Request?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This person will be notified that their request was not accepted.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleAction('REJECTED')}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Reject Request
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}