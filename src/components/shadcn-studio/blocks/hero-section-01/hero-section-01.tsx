import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const HeroSection = () => {
  return (
    // <section className='flex min-h-[calc(100dvh-4rem)] flex-1 flex-col justify-between gap-12 overflow-x-hidden pt-8 sm:gap-16 sm:pt-16 lg:gap-24 lg:pt-24'>
    //   {/* Hero Content */}
    //   <div className='mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8'>
    //     <div className='bg-muted flex items-center gap-2.5 rounded-full border px-3 py-2'>
    //       <Badge>Adventure Ready</Badge>
    //       <span className='text-muted-foreground'>Connect with fellow travelers</span>
    //     </div>

    //     <h1 className='text-3xl leading-[1.29167] font-bold text-foreground sm:text-4xl lg:text-5xl'>
    //       Explore the World Together
    //       <br />
    //       <span className='relative'>
    //         Find Your
    //         <svg
    //           width='223'
    //           height='12'
    //           viewBox='0 0 223 12'
    //           fill='none'
    //           xmlns='http://www.w3.org/2000/svg'
    //           className='absolute inset-x-0 bottom-0 w-full translate-y-1/2 max-sm:hidden'
    //         >
    //           <path
    //             d='M1.11716 10.428C39.7835 4.97282 75.9074 2.70494 114.894 1.98894C143.706 1.45983 175.684 0.313587 204.212 3.31596C209.925 3.60546 215.144 4.59884 221.535 5.74551'
    //             stroke='url(#paint0_linear_hero)'
    //             strokeWidth='2'
    //             strokeLinecap='round'
    //           />
    //           <defs>
    //             <linearGradient
    //               id='paint0_linear_hero'
    //               x1='18.8541'
    //               y1='3.72033'
    //               x2='42.6487'
    //               y2='66.6308'
    //               gradientUnits='userSpaceOnUse'
    //             >
    //               <stop stopColor='var(--primary)' />
    //               <stop offset='1' stopColor='var(--primary-foreground)' />
    //             </linearGradient>
    //           </defs>
    //         </svg>
    //       </span>{' '}
    //       Trip Sync!
    //     </h1>

    //     <p className='text-muted-foreground'>
    //       Discover travelers heading to your next destination. Share plans, make friends, and explore together.
    //       <br />
    //       Start your journey by finding a compatible travel companion.
    //     </p>

    //     <Button size='lg' asChild>
    //       <a href='/explore'>Find Travel Buddy</a>
    //     </Button>
    //   </div>


    // </section>

    <section
      className="relative flex min-h-[600px] flex-1 flex-col justify-between gap-12 overflow-x-hidden pt-8 sm:gap-16 sm:pt-16 lg:gap-24 lg:pt-24 bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-travel.jpg')" }} // 👈 your image in /public
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
        <div className="bg-muted flex items-center gap-2.5 rounded-full border px-3 py-2">
          <Badge>Adventure Ready</Badge>
          <span className="text-muted-foreground">Connect with fellow travelers</span>
        </div>

        <h1 className="text-3xl leading-[1.29167] font-bold text-white sm:text-4xl lg:text-5xl">
          Explore the World Together
          <br />
          <span className="relative">
            Find Your
            {/* underline svg stays */}
          </span>{" "}
          Trip Sync!
        </h1>

        <p className="text-white/80">
          Discover travelers heading to your next destination. Share plans, make friends, and explore together.
          <br />
          Start your journey by finding a compatible travel companion.
        </p>

        <Button size="lg" asChild>
          <a href="/explore">Find Travel Buddy</a>
        </Button>
      </div>
    </section>
  )
}

export default HeroSection

