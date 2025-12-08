"use client";

import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

const RequestButton = ({ maxTravelersNumber, isCurrentUser }: { maxTravelersNumber: number, isCurrentUser: boolean }) => {
    return (

        <Button
            className="w-full gradient-hero"
            size="lg"
            disabled={maxTravelersNumber === 0}
            onClick={() => {
                if (!isCurrentUser) {
                    redirect("/login")
                }
            }}
        >
            {maxTravelersNumber === 0 ? 'Trip Full' : 'Request to Join'}
        </Button>

    );
};

export default RequestButton;