import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Users,
    Globe,
    ShieldCheck,
    Star,
    MapPin,
    HeartHandshake,
} from "lucide-react";
import Link from "next/link";

export async function generateMetadata() {
    return {
        title: "About Us | Travel Sync",
        description:
            "Learn about Travel Sync — a social travel platform that helps travelers connect, plan trips together, and find the perfect travel buddy worldwide.",
    };
}


export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* HERO SECTION */}
            <section className="py-20 bg-linear-to-b from-primary/10 to-background">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Travel Together. <span className="text-primary">Not Alone.</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl mb-8">
                        Travel Sync & Meetup is a social travel platform that helps
                        travelers connect, plan trips, and explore the world together.
                        Turn solo journeys into shared adventures.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/register">
                            <Button size="lg">Get Started</Button>
                        </Link>
                        <Link href="/explore">
                            <Button variant="outline" size="lg">
                                Find Travel Buddies
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* OUR MISSION */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">
                                Our Mission
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground text-lg">
                            We believe traveling is better when shared.
                            Our mission is to connect like-minded travelers,
                            build trust through transparency, and create a global
                            community where people explore destinations together
                            safely and confidently.
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-16 bg-muted/50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        How It Works
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader className="flex items-center gap-2">
                                <Users className="text-primary" />
                                <CardTitle>Create Your Profile</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
                                Sign up, add your interests, travel history, and let
                                others know who you are as a traveler.
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex items-center gap-2">
                                <MapPin className="text-primary" />
                                <CardTitle>Create Travel Plans</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
                                Share upcoming trips with destinations, budgets,
                                dates, and travel preferences.
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex items-center gap-2">
                                <HeartHandshake className="text-primary" />
                                <CardTitle>Match & Travel Together</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
                                Find compatible travel buddies, send requests,
                                meet safely, and enjoy the journey.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Why Choose Travel Sync & Meetup?
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader className="flex items-center gap-2">
                                <Globe className="text-primary" />
                                <CardTitle>Global Community</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
                                Connect with travelers from around the world
                                heading to similar destinations.
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex items-center gap-2">
                                <ShieldCheck className="text-primary" />
                                <CardTitle>Secure & Trusted</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
                                Verified profiles, reviews, and secure authentication
                                keep the community safe.
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex items-center gap-2">
                                <Star className="text-primary" />
                                <CardTitle>Review System</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
                                Rate and review travel partners after trips to
                                build transparency and trust.
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex items-center gap-2">
                                <Users className="text-primary" />
                                <CardTitle>Premium Experience</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
                                Subscription plans unlock premium features and
                                verified badges.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-20 bg-primary/50 text-primary-foreground">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Find Your Next Travel Sync?
                    </h2>
                    <p className="text-lg opacity-90 mb-8">
                        Join thousands of travelers discovering the world together.
                        Create your profile and start matching today.
                    </p>
                    <Link href="/register">
                        <Button size="lg" variant="secondary">
                            Join Now
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
