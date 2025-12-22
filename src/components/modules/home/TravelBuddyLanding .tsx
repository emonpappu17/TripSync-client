/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Camera,
    Check,
    ChevronRight,
    Globe,
    Heart,
    MapPin,
    Mountain,
    Plane,
    Search,
    Shield,
    Sparkles,
    Star,
    TrendingUp,
    Users
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-xl border border-gray-200 ${className}`}>
        {children}
    </div>
);

const Avatar = ({ icon: Icon, className = "" }: { icon: React.ComponentType<{ className?: string }>; className?: string }) => (
    <div className={`rounded-full bg-linear-to-br from-blue-400 to-purple-400 flex items-center justify-center ${className}`}>
        <Icon className="w-1/2 h-1/2 text-white" />
    </div>
);


const TravelBuddyLanding = ({ plans, users }: { plans: any[], users: any[] }) => {

    const testimonials = [
        {
            name: 'Jennifer Martinez',
            location: 'California, USA',
            rating: 5,
            text: 'I found the perfect travel buddy for my Europe trip! We had similar interests and the same travel style. This platform made solo travel feel like a group adventure.',
            trip: 'Europe Backpacking',
            icon: Mountain
        },
        {
            name: 'Robert Kim',
            location: 'Seoul, South Korea',
            rating: 5,
            text: 'Amazing experience! Met wonderful people who became lifelong friends. The matching system really works - we all shared the same passion for hiking and photography.',
            trip: 'Iceland Adventure',
            icon: Camera
        },
        {
            name: 'Sophie Laurent',
            location: 'Paris, France',
            rating: 5,
            text: 'As a female solo traveler, I felt safe and comfortable meeting my travel companions through this platform. Everyone was verified and the review system gave me confidence.',
            trip: 'Southeast Asia Tour',
            icon: Globe
        }
    ];

    return (
        <div className="min-h-screen bg-linear-to-b ">
            {/* How It Works */}
            <section className="py-20 md:py-28 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <Badge variant="secondary" className="mb-4">
                            How It Works
                        </Badge>

                        <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                            Find Your Travel Buddy in 3 Steps
                        </h2>

                        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                            Create a profile, discover compatible travelers, and plan your journey together.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Users,
                                title: "Create Your Profile",
                                description:
                                    "Set up your traveler profile with interests, destinations, and travel preferences.",
                            },
                            {
                                icon: Search,
                                title: "Find Matching Travelers",
                                description:
                                    "Explore travelers heading to the same destination with similar interests.",
                            },
                            {
                                icon: MapPin,
                                title: "Connect & Travel",
                                description:
                                    "Send requests, chat securely, and plan your trip together with confidence.",
                            },
                        ].map((item, idx) => (
                            <Card
                                key={idx}
                                className="p-6 text-center border border-border bg-card"
                            >
                                <div className="flex justify-center mb-5">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <item.icon className="h-6 w-6 text-primary" />
                                    </div>
                                </div>

                                <h3 className="text-lg font-medium text-foreground mb-2">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>


            {/* Featured Destinations */}
            <section className="py-20 md:py-28 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-purple-100 text-purple-700">Trending Now</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Popular Destinations</h2>
                        <p className="text-xl text-muted-foreground">
                            Explore where our community is traveling
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {plans?.map((dest, idx) => (
                            <Link key={idx} href={'/explore'}>
                                <Card

                                    className="group cursor-pointer border border-border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                                >
                                    {/* Image Section */}
                                    <div className="h-48 relative overflow-hidden">
                                        {/* <img
                                        src={dest.image}
                                        alt={dest.destination}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    /> */}

                                        <Image src={dest.image} alt={dest.destination} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />

                                        {/* Overlay for text */}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <div className="relative z-10 text-center text-white">
                                                <h3 className="text-2xl font-bold">{dest.destination}</h3>
                                                <p className="text-sm opacity-80">{dest.country}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Section */}
                                    <div className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Users className="w-4 h-4" />
                                            <span className="font-semibold">{dest._count.requests} travelers</span>
                                        </div>
                                        <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </div>
                                </Card>
                            </Link>

                        ))}
                    </div>
                </div>
            </section>


            {/* Top Travelers */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-yellow-100 text-yellow-700">Community Stars</Badge>
                        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                            Top Rated Travelers
                        </h2>
                        <p className="text-muted-foreground">
                            Connect with experienced and trusted travel companions
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {users?.map((traveler, idx) => (
                            <Link key={idx} href={`/profile/${traveler.id}`}>
                                <Card
                                    className="p-6 text-center bg-card border border-border hover:shadow-md transition-all duration-200 cursor-pointer h-full"
                                >
                                    {/* Profile Image */}
                                    <div className="relative inline-block mb-4">

                                        {traveler.profileImage ? (
                                            <Image
                                                src={traveler.profileImage}
                                                alt={traveler.fullName}
                                                width={80}
                                                height={80}
                                                className="rounded-full object-cover"
                                            />
                                        ) : null}


                                        {traveler.isVerified && (
                                            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center shadow-md">
                                                <Star className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Name */}
                                    <h3 className="font-semibold text-lg mb-1 text-foreground">
                                        {traveler.fullName}
                                    </h3>

                                    {/* Location */}
                                    <p className="text-sm text-muted-foreground mb-3 flex items-center justify-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {traveler.currentLocation}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex items-center justify-center gap-1 mb-4">
                                        <Star className="w-4 h-4 text-yellow-400" />
                                        <span className="font-semibold text-foreground">{traveler.avgRating}</span>
                                        <span className="text-sm text-muted-foreground">
                                            ({traveler?.reviewsReceived?.length} reviews)
                                        </span>
                                    </div>

                                    {/* Trips */}
                                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                                        <div className="flex items-center gap-1">
                                            <Plane className="w-4 h-4" />
                                            <span>{traveler._count.travelPlans} trips</span>
                                        </div>
                                    </div>

                                    {/* Interests */}
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {traveler?.interests?.slice(0, 2).map((interest: any, i: any) => (
                                            <Badge key={i} className="bg-gray-100 text-gray-700 text-xs">
                                                {interest}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>
                            </Link>

                        ))}
                    </div>
                </div>
            </section>


            {/* Why Choose Us */}
            <section className="py-20 md:py-28 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <Badge variant="secondary" className="mb-4">
                            Our Promise
                        </Badge>

                        <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                            Why Travel Buddy?
                        </h2>

                        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                            Your safety, trust, and travel experience always come first.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                        {[
                            {
                                icon: Shield,
                                title: 'Verified Profiles',
                                description:
                                    'Every traveler goes through a verification process to keep the community safe.',
                            },
                            {
                                icon: Star,
                                title: 'Trusted Reviews',
                                description:
                                    'Read honest reviews from travelers who have journeyed together.',
                            },
                            {
                                icon: Heart,
                                title: 'Smart Matching',
                                description:
                                    'We match travelers based on interests, destinations, and travel style.',
                            },
                            {
                                icon: Users,
                                title: 'Global Community',
                                description:
                                    'Connect with travelers from over 150 countries worldwide.',
                            },
                            {
                                icon: TrendingUp,
                                title: 'Growing Network',
                                description:
                                    'Thousands of successful trips and friendships formed every month.',
                            },
                            {
                                icon: Sparkles,
                                title: 'Premium Features',
                                description:
                                    'Unlock advanced search, verified badge, and priority support.',
                            },
                        ].map((feature, idx) => (
                            <Card
                                key={idx}
                                className="p-6 flex gap-4 items-start border border-border bg-card"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                    <feature.icon className="h-5 w-5 text-primary" />
                                </div>

                                <div>
                                    <h3 className="text-base font-medium text-foreground mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>


            {/* Testimonials */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-pink-100 text-pink-700">Success Stories</Badge>
                        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                            Travelers Love Us
                        </h2>
                        <p className="text-muted-foreground">
                            Hear from travelers who found their perfect companions
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, idx) => (
                            <Card
                                key={idx}
                                className="p-6 bg-card border border-border hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex gap-3 mb-4 items-center">
                                    <Avatar
                                        icon={testimonial.icon}
                                        className="w-14 h-14"
                                    />
                                    <div className="text-left">
                                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {testimonial.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-3">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-muted-foreground mb-4 leading-relaxed">{testimonial.text}</p>

                                <Badge className="bg-gray-100 text-gray-700 text-xs flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {testimonial.trip}
                                </Badge>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <Card className="relative overflow-hidden p-12 md:p-16 text-center bg-card border border-border shadow-md">
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
                                Ready to Start Your Adventure?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Join thousands of travelers who have found their perfect travel companions
                            </p>


                            <Button>Get Started Free</Button>

                            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Check className="w-5 h-5 text-primary" />
                                    <span>Free to join</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-5 h-5 text-primary" />
                                    <span>No credit card required</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-5 h-5 text-primary" />
                                    <span>Cancel anytime</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

        </div>
    );
};

export default TravelBuddyLanding;