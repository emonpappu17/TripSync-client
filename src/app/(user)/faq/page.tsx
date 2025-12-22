// "use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export async function generateMetadata() {
    return {
        title: "FAQs | Travel Sync",
        description:
            "Find answers to frequently asked questions about Travel Sync, including travel buddies, subscriptions, safety, travel plans, and more.",
    };
}


export default function FAQPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* HEADER */}
            <section className="py-20 bg-linear-to-b from-primary/10 to-background">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <HelpCircle className="mx-auto mb-4 h-10 w-10 text-primary" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Everything you need to know about using Travel Sync & Meetup.
                    </p>
                </div>
            </section>

            {/* FAQ CONTENT */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Card className="shadow-sm">
                        <CardContent className="p-6">
                            <Accordion type="single" collapsible className="space-y-2">
                                {/* GENERAL */}
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        What is Travel Sync & Meetup?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Travel Sync & Meetup is a social travel platform
                                        that helps travelers connect with others going to
                                        similar destinations. You can create travel plans,
                                        match with people, and explore the world together.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-2">
                                    <AccordionTrigger>
                                        Is Travel Sync & Meetup free to use?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Yes, basic features like creating a profile,
                                        browsing travel plans, and matching with travelers
                                        are free. Premium subscriptions unlock advanced
                                        features such as verified badges and priority
                                        matching.
                                    </AccordionContent>
                                </AccordionItem>

                                {/* PROFILE */}
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>
                                        How do I create or edit my profile?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        After registering, go to your Profile page where
                                        you can add a bio, upload a profile image, list
                                        your travel interests, visited countries, and
                                        update your location anytime.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-4">
                                    <AccordionTrigger>
                                        Can other users see my profile information?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Yes, basic profile details such as your name,
                                        bio, interests, and public travel plans are visible
                                        to other users. Sensitive information like email
                                        and phone number remain private.
                                    </AccordionContent>
                                </AccordionItem>

                                {/* TRAVEL PLANS */}
                                <AccordionItem value="item-5">
                                    <AccordionTrigger>
                                        How do travel plans work?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        You can create a travel plan by adding destination,
                                        dates, budget range, travel type, and a description.
                                        Other users can discover your plan and send a
                                        request to join.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-6">
                                    <AccordionTrigger>
                                        Can I edit or delete my travel plan?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Yes. You can edit or delete your travel plans at
                                        any time from your dashboard as long as the trip
                                        hasn’t started.
                                    </AccordionContent>
                                </AccordionItem>

                                {/* MATCHING & SAFETY */}
                                <AccordionItem value="item-7">
                                    <AccordionTrigger>
                                        How does matching with travel buddies work?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Matching is based on destination, travel dates,
                                        travel type, and shared interests. You can browse
                                        compatible travelers and send requests to connect.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-8">
                                    <AccordionTrigger>
                                        Is it safe to travel with people from the platform?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Safety is a top priority. We provide verified
                                        profiles, reviews, ratings, and reporting tools.
                                        Always communicate clearly and follow best safety
                                        practices when meeting new people.
                                    </AccordionContent>
                                </AccordionItem>

                                {/* REVIEWS */}
                                <AccordionItem value="item-9">
                                    <AccordionTrigger>
                                        How do reviews and ratings work?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        After completing a trip, users can leave a
                                        rating and review for each other. Reviews help
                                        build trust and improve the quality of the
                                        community.
                                    </AccordionContent>
                                </AccordionItem>

                                {/* PAYMENTS */}
                                <AccordionItem value="item-10">
                                    <AccordionTrigger>
                                        How does the subscription and payment system work?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        We offer monthly and yearly subscription plans.
                                        Payments are securely processed via trusted
                                        gateways like Stripe or SSLCommerz. Subscriptions
                                        can be managed or canceled anytime.
                                    </AccordionContent>
                                </AccordionItem>

                                {/* SUPPORT */}
                                <AccordionItem value="item-11">
                                    <AccordionTrigger>
                                        How can I contact support?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        If you need help, visit the Contact page or email
                                        our support team. We’re always happy to assist you
                                        with any issues or questions.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    );
}
