import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center space-y-6">
                {/* Icon */}
                <XCircle className="w-16 h-16 text-red-500 mx-auto" />

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800">
                    Payment Canceled
                </h1>

                {/* Message */}
                <p className="text-gray-600">
                    Your payment was not completed. Don’t worry — you can try again anytime.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/subscription">
                        <Button className="w-full sm:w-auto">Try Again</Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" className="w-full sm:w-auto">
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
