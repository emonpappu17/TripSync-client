/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { deactivateMatch } from '@/services/travel-match';
import { toast } from 'sonner';
import { Loader2, UserX } from 'lucide-react';

interface Props {
    matchId: string;
}

export function DeactivateMatchButton({ matchId }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDeactivate = async () => {
        try {
            setIsLoading(true);
            await deactivateMatch(matchId);
            toast.success('Match deactivated successfully');
            router.push('/my-matches');
            router.refresh();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to deactivate match');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Deactivating...
                        </>
                    ) : (
                        <>
                            <UserX className="mr-2 h-4 w-4" />
                            Deactivate Match
                        </>
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will deactivate your match and remove the connection with your travel buddy.
                        You won't be able to see each other in the matches list anymore.
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeactivate}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Yes, Deactivate
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}