'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
    CalendarIcon,
    Search,
    X,
    Filter,
    MapPin,
    DollarSign,
    Users,
    Loader2
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const TRAVEL_TYPES = [
    { value: 'SOLO', label: 'Solo' },
    { value: 'COUPLE', label: 'Couple' },
    { value: 'FAMILY', label: 'Family' },
    //   { value: 'GROUP', label: 'Group' },
    { value: 'FRIENDS', label: 'friends' },
];

// const SORT_OPTIONS = [
//     { value: 'relevance', label: 'Most Relevant' },
//     { value: 'date-asc', label: 'Date: Earliest First' },
//     { value: 'date-desc', label: 'Date: Latest First' },
//     { value: 'budget-asc', label: 'Budget: Low to High' },
//     { value: 'budget-desc', label: 'Budget: High to Low' },
//     { value: 'spots-desc', label: 'Most Spots Available' },
// ];

const SORT_OPTIONS = [
    { sortBy: "createdAt", sortOrder: "asc", label: "Date: Earliest First" },
    { sortBy: "createdAt", sortOrder: "desc", label: "Date: Latest First" },
    { sortBy: "budgetMin", sortOrder: "asc", label: "Budget: Low to High" },
    { sortBy: "budgetMax", sortOrder: "desc", label: "Budget: High to Low" },
    { sortBy: "maxTravelers", sortOrder: "desc", label: "Most Spots Available" },
    { sortBy: "relevance", sortOrder: "asc", label: "Most Relevant" }, // optional default
];


export default function SearchFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    // Get current values from URL
    const [destination, setDestination] = useState(
        searchParams.get('destination') || ''
    );
    const [country, setCountry] = useState(
        searchParams.get('country') || ''
    );
    const [travelType, setTravelType] = useState(
        searchParams.get('travelType') || ''
    );
    // const [sortBy, setSortBy] = useState(
    //     searchParams.get('sortBy') || 'relevance'
    // );

    const [sortOption, setSortOption] = useState<{ sortBy: string; sortOrder: string }>(
        SORT_OPTIONS[0] // default
    );

    const [startDate, setStartDate] = useState<Date | undefined>(
        searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined
    );
    const [endDate, setEndDate] = useState<Date | undefined>(
        searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined
    );
    const [budgetRange, setBudgetRange] = useState<[number, number]>([
        parseInt(searchParams.get('budgetMin') || '0'),
        parseInt(searchParams.get('budgetMax') || '10000'),
    ]);

    // Check if any filters are applied
    const hasActiveFilters = destination || country || travelType || startDate || endDate ||
        budgetRange[0] > 0 || budgetRange[1] < 10000 ;

    const applyFilters = () => {
        const params = new URLSearchParams();

        if (destination) params.set('destination', destination);
        if (country) params.set('country', country);
        if (travelType) params.set('travelType', travelType);
        // if (sortBy && sortBy !== 'relevance') params.set('sortBy', sortBy);
        if (sortOption.sortBy !== "relevance") {
            params.set("sortBy", sortOption.sortBy);
            params.set("sortOrder", sortOption.sortOrder);
        }

        if (startDate) params.set('startDate', format(startDate, 'yyyy-MM-dd'));
        if (endDate) params.set('endDate', format(endDate, 'yyyy-MM-dd'));
        if (budgetRange[0] > 0) params.set('budgetMin', budgetRange[0].toString());
        if (budgetRange[1] < 10000) params.set('budgetMax', budgetRange[1].toString());

        startTransition(() => {
            router.push(`/explore?${params.toString()}`);
        });
    };

    const clearFilters = () => {
        setDestination('');
        setCountry('');
        setTravelType('');
        // setSortBy('relevance');
        setSortOption(SORT_OPTIONS[0])
        // setSortBy('relevance');
        setStartDate(undefined);
        setEndDate(undefined);
        setBudgetRange([0, 10000]);

        startTransition(() => {
            router.push('/explore');
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {

            console.log("jkjdlkfjaslkdf");
            applyFilters();
        }
        applyFilters();

    };

    return (
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                    {hasActiveFilters && (
                        <span className="ml-auto text-xs font-normal text-muted-foreground">
                            Active
                        </span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Destination Search */}
                <div className="space-y-2">
                    <Label htmlFor="destination" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Destination
                    </Label>
                    <Input
                        id="destination"
                        placeholder="e.g., Paris, Bali"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        onKeyUp={handleKeyPress}
                    // onKeyPress={handleKeyPress}
                    />
                </div>

                {/* Country Search */}
                <div className="space-y-2">
                    <Label htmlFor="country" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Country
                    </Label>
                    <Input
                        id="country"
                        placeholder="e.g., France, Indonesia"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        // onKeyPress={handleKeyPress}
                        onKeyUp={handleKeyPress}

                    />
                </div>

                {/* Travel Type */}
                <div className="space-y-2">
                    <Label htmlFor="travelType" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Travel Type
                    </Label>
                    <Select value={travelType} onValueChange={setTravelType}>
                        <SelectTrigger id="travelType">
                            <SelectValue placeholder="Any type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Any type</SelectItem>
                            {TRAVEL_TYPES.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Start Date */}
                <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        Start Date
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    'w-full justify-start text-left font-normal',
                                    !startDate && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, 'PPP') : 'Pick a date'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                                disabled={(date) => date < new Date()}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* End Date */}
                <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        End Date
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    'w-full justify-start text-left font-normal',
                                    !endDate && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, 'PPP') : 'Pick a date'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                                disabled={(date) =>
                                    date < new Date() || (startDate ? date < startDate : false)
                                }
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Budget Range */}
                <div className="space-y-4">
                    <Label className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Budget Range (USD)
                    </Label>
                    <div className="space-y-3">
                        <Slider
                            value={budgetRange}
                            onValueChange={(value) => setBudgetRange(value as [number, number])}
                            min={0}
                            max={10000}
                            step={100}
                            className="w-full"
                        />
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>${budgetRange[0].toLocaleString()}</span>
                            <span>${budgetRange[1].toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Sort By */}
                <div className="space-y-2">
                    <Label htmlFor="sortBy">Sort By</Label>
                    {/* <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger id="sortBy">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {SORT_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select> */}

                    <Select
                        value={`${sortOption.sortBy}-${sortOption.sortOrder}`}
                        onValueChange={(val) => {
                            const [sortBy, sortOrder] = val.split("-");
                            setSortOption({ sortBy, sortOrder });
                        }}
                    >
                        <SelectTrigger id="sortBy">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {SORT_OPTIONS.map((option) => (
                                <SelectItem
                                    key={`${option.sortBy}-${option.sortOrder}`}
                                    value={`${option.sortBy}-${option.sortOrder}`}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4 border-t">
                    <Button
                        onClick={applyFilters}
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Searching...
                            </>
                        ) : (
                            <>
                                <Search className="w-4 h-4 mr-2" />
                                Apply Filters
                            </>
                        )}
                    </Button>

                    <Button
                        onClick={clearFilters}
                        variant="outline"
                        className="w-full"
                        disabled={isPending}
                    >
                        <X className="w-4 h-4 mr-2" />
                        Clear All
                    </Button>
                    {/* 
                    {hasActiveFilters && (
                        <Button
                            onClick={clearFilters}
                            variant="outline"
                            className="w-full"
                            disabled={isPending}
                        >
                            <X className="w-4 h-4 mr-2" />
                            Clear All
                        </Button>
                    )} */}
                </div>

                {/* Active Filters Summary */}
                {hasActiveFilters && (
                    <div className="pt-4 border-t">
                        <p className="text-xs font-medium mb-2">Active Filters:</p>
                        <div className="flex flex-wrap gap-2">
                            {destination && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                    {destination}
                                </span>
                            )}
                            {country && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                    {country}
                                </span>
                            )}
                            {travelType && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                    {TRAVEL_TYPES.find(t => t.value === travelType)?.label}
                                </span>
                            )}
                            {(budgetRange[0] > 0 || budgetRange[1] < 10000) && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                    ${budgetRange[0]}-${budgetRange[1]}
                                </span>
                            )}
                            {startDate && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                    From {format(startDate, 'MMM dd')}
                                </span>
                            )}
                            {endDate && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                    Until {format(endDate, 'MMM dd')}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}