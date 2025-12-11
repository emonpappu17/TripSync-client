import {
    ArrowRight,
    Camera,
    Check,
    ChevronRight,
    Coffee,
    Compass,
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

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-xl border border-gray-200 ${className}`}>
        {children}
    </div>
);

const Button = ({ children, variant = "primary", size = "md", className = "" }: { children: React.ReactNode; variant?: "primary" | "secondary" | "ghost"; size?: "sm" | "md" | "lg"; className?: string }) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200";
    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
        secondary: "bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-900",
        ghost: "hover:bg-gray-100 text-gray-700"
    };
    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
            {children}
        </button>
    );
};

const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 ${className}`}>
        {children}
    </span>
);

const Avatar = ({ icon: Icon, className = "" }: { icon: React.ComponentType<{ className?: string }>; className?: string }) => (
    <div className={`rounded-full bg-linear-to-br from-blue-400 to-purple-400 flex items-center justify-center ${className}`}>
        <Icon className="w-1/2 h-1/2 text-white" />
    </div>
);

const IconBox = ({ icon: Icon, gradient = "from-blue-500 to-purple-500", className = "" }: { icon: React.ComponentType<{ className?: string }>; gradient?: string; className?: string }) => (
    <div className={`rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center ${className}`}>
        <Icon className="text-white" />
    </div>
);

const TravelBuddyLanding = () => {
    const destinations = [
        { name: 'Tokyo', country: 'Japan', icon: Mountain, travelers: 127, gradient: 'from-red-500 to-pink-500' },
        { name: 'Paris', country: 'France', icon: Coffee, travelers: 203, gradient: 'from-purple-500 to-indigo-500' },
        { name: 'Bali', country: 'Indonesia', icon: Camera, travelers: 156, gradient: 'from-green-500 to-teal-500' },
        { name: 'New York', country: 'USA', icon: Compass, travelers: 189, gradient: 'from-yellow-500 to-orange-500' },
        { name: 'Barcelona', country: 'Spain', icon: Sparkles, travelers: 142, gradient: 'from-pink-500 to-rose-500' },
        { name: 'Dubai', country: 'UAE', icon: Globe, travelers: 98, gradient: 'from-cyan-500 to-blue-500' }
    ];

    const topTravelers = [
        {
            name: 'Sarah Johnson',
            location: 'San Francisco, USA',
            rating: 4.9,
            reviews: 47,
            trips: 23,
            interests: ['Photography', 'Food Tours', 'Culture'],
            icon: Camera,
            isPremium: true
        },
        {
            name: 'Mike Chen',
            location: 'Singapore',
            rating: 4.8,
            reviews: 38,
            trips: 19,
            interests: ['Art', 'Museums', 'Dining'],
            icon: Coffee,
            isPremium: true
        },
        {
            name: 'Emma Wilson',
            location: 'London, UK',
            rating: 4.9,
            reviews: 52,
            trips: 28,
            interests: ['Yoga', 'Wellness', 'Beaches'],
            icon: Sparkles,
            isPremium: true
        },
        {
            name: 'David Park',
            location: 'Toronto, Canada',
            rating: 4.7,
            reviews: 31,
            trips: 16,
            interests: ['Broadway', 'Museums', 'Food'],
            icon: Globe,
            isPremium: false
        }
    ];

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
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* How It Works */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-blue-100 text-blue-700">Simple Process</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">How It Works</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Three simple steps to find your travel buddy
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Users,
                                title: 'Create Profile',
                                description: 'Sign up and build your traveler profile with your interests, travel style, and destinations.',
                                gradient: 'from-blue-500 to-cyan-500',
                                step: '01'
                            },
                            {
                                icon: Search,
                                title: 'Find Matches',
                                description: 'Discover travelers with similar interests heading to your dream destination.',
                                gradient: 'from-purple-500 to-pink-500',
                                step: '02'
                            },
                            {
                                icon: MapPin,
                                title: 'Travel Together',
                                description: 'Connect, plan your trip together, and create unforgettable memories.',
                                gradient: 'from-green-500 to-emerald-500',
                                step: '03'
                            }
                        ].map((item, idx) => (
                            <Card key={idx} className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
                                <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors">
                                    {item.step}
                                </div>
                                <IconBox icon={item.icon} gradient={item.gradient} className="w-16 h-16 mx-auto mb-6 shadow-lg" />
                                <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Destinations */}
            <section className="py-20 md:py-28 bg-linear-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-purple-100 text-purple-700">Trending Now</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Popular Destinations</h2>
                        <p className="text-xl text-gray-600">
                            Explore where our community is traveling
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {destinations.map((dest, idx) => (
                            <Card key={idx} className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                                <div className={`h-48 bg-linear-to-br ${dest.gradient} flex items-center justify-center relative overflow-hidden`}>
                                    <dest.icon className="w-24 h-24 text-white/30 absolute group-hover:scale-110 transition-transform duration-500" />
                                    <div className="relative z-10 text-center text-white">
                                        <dest.icon className="w-16 h-16 mx-auto mb-3" />
                                        <h3 className="text-2xl font-bold">{dest.name}</h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">{dest.country}</p>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Users className="w-4 h-4" />
                                                <span className="font-semibold">{dest.travelers} travelers</span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Top Travelers */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-yellow-100 text-yellow-700">Community Stars</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Top Rated Travelers</h2>
                        <p className="text-xl text-gray-600">
                            Connect with experienced and trusted travel companions
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {topTravelers.map((traveler, idx) => (
                            <Card key={idx} className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
                                <div className="relative inline-block mb-4">
                                    <Avatar icon={traveler.icon} className="w-24 h-24 shadow-lg group-hover:scale-105 transition-transform" />
                                    {traveler.isPremium && (
                                        <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                                            <Star className="w-4 h-4 text-white fill-white" />
                                        </div>
                                    )}
                                </div>

                                <h3 className="font-bold text-lg mb-1 text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {traveler.name}
                                </h3>
                                <p className="text-sm text-gray-500 mb-3 flex items-center justify-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {traveler.location}
                                </p>

                                <div className="flex items-center justify-center gap-1 mb-4">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold text-gray-900">{traveler.rating}</span>
                                    <span className="text-sm text-gray-500">({traveler.reviews} reviews)</span>
                                </div>

                                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Plane className="w-4 h-4" />
                                        <span>{traveler.trips} trips</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 justify-center">
                                    {traveler.interests.slice(0, 2).map((interest, i) => (
                                        <Badge key={i} className="bg-gray-100 text-gray-700 text-xs">
                                            {interest}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 md:py-28 bg-linear-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-green-100 text-green-700">Our Promise</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Why Travel Buddy?</h2>
                        <p className="text-xl text-gray-600">
                            Your safety and experience are our priorities
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            { icon: Shield, title: 'Verified Profiles', description: 'All users go through verification to ensure a safe community.', gradient: 'from-blue-500 to-cyan-500' },
                            { icon: Star, title: 'Review System', description: 'Read real reviews from travelers who\'ve journeyed together.', gradient: 'from-yellow-500 to-orange-500' },
                            { icon: Heart, title: 'Perfect Matches', description: 'Advanced algorithm finds companions with similar interests.', gradient: 'from-pink-500 to-rose-500' },
                            { icon: Users, title: 'Global Community', description: 'Connect with travelers from over 150 countries worldwide.', gradient: 'from-purple-500 to-indigo-500' },
                            { icon: TrendingUp, title: 'Growing Network', description: 'Join thousands of successful meetups and friendships formed.', gradient: 'from-green-500 to-emerald-500' },
                            { icon: Sparkles, title: 'Premium Features', description: 'Unlock advanced search, verified badge, and priority support.', gradient: 'from-indigo-500 to-purple-500' }
                        ].map((feature, idx) => (
                            <div key={idx} className="flex gap-4 group">
                                <IconBox icon={feature.icon} gradient={feature.gradient} className="w-12 h-12 shrink-0 group-hover:scale-110 transition-transform shadow-md" />
                                <div>
                                    <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-pink-100 text-pink-700">Success Stories</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Travelers Love Us</h2>
                        <p className="text-xl text-gray-600">
                            Hear from travelers who found their perfect companions
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, idx) => (
                            <Card key={idx} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="flex gap-3 mb-4">
                                    <Avatar icon={testimonial.icon} className="w-12 h-12" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {testimonial.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-3">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-gray-600 mb-4 leading-relaxed">{testimonial.text}</p>

                                <Badge className="bg-blue-100 text-blue-700 text-xs">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {testimonial.trip}
                                </Badge>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <Card className="relative overflow-hidden p-12 md:p-16 text-center">
                        <div className="absolute inset-0 gradient-hero opacity-10" />
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Ready to Start Your Adventure?
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8">
                                Join thousands of travelers who have found their perfect travel companions
                            </p>
                            {/* <Link to={isAuthenticated ? "/explore" : "/register"}>
                                <Button size="lg" className="gradient-hero text-lg px-8 shadow-strong">
                                    Get Started Free
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link> */}
                            <Button size="lg" className=" text-lg px-8 ">
                                Get Started Free
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>

                            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
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