// 

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center space-y-6">
                {/* Success Icon */}
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Payment Successful 🎉
                </h1>

                {/* Message */}
                <p className="text-gray-600">
                    Your subscription is now active. Welcome aboard — let’s start your journey!
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/dashboard">
                        <Button className="w-full sm:w-auto">Go to Dashboard</Button>
                    </Link>
                    <Link href="/explore">
                        <Button variant="outline" className="w-full sm:w-auto">
                            Explore Plans
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
