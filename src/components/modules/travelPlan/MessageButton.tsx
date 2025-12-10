'use client'

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

const MessageButton = () => {
    return (
        <Button size="sm" variant="outline" onClick={() => toast.success('This feature will be added soon!!')}>
            <MessageCircle className="h-4 w-4 mr-1" />
            Message
        </Button>
    );
};

export default MessageButton;