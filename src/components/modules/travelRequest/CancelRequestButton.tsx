
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
import { X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cancelRequest } from '@/services/travelRequest';

interface CancelRequestButtonProps {
    requestId: string;
}

export function CancelRequestButton({ requestId }: CancelRequestButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleCancel = async () => {
        setIsLoading(true);
        try {
            // const response = await fetch(`/api/travel-requests/${requestId}/cancel`, {
            //     method: 'PATCH',
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to cancel request');
            // }
            const response = await cancelRequest(requestId)

            if (!response.success) {
                toast.error('Failed to cancel request');
                return
            }
            toast.success('Request cancelled successfully');
            router.refresh();
        } catch (error) {
            toast.error('Failed to cancel request');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Cancelling...
                        </>
                    ) : (
                        <>
                            <X className="w-4 h-4 mr-2" />
                            Cancel Request
                        </>
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Request?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to cancel this travel request? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>No, keep it</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancel}>
                        Yes, cancel request
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}