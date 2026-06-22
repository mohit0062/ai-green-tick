import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

import { CardStack } from '@/components/shadcn-studio/blocks/bento-grid-18/card-stack'
import type { StackProps } from '@/components/shadcn-studio/blocks/bento-grid-18/card-stack'
import FallingBadge from '@/components/shadcn-studio/blocks/bento-grid-18/falling-badge'
import DataTriangle from '@/assets/svg/data-triangle'
import VehicleOverviewCard from '@/components/shadcn-studio/blocks/chart-vehicle-overview'
import { UsersRoundIcon, MapPinIcon, BriefcaseBusinessIcon, SearchIcon, CrosshairIcon, FilterIcon, TrendingUpIcon, ThumbsUpIcon } from 'lucide-react'

const userData = [
  {
    status: 'Connection',
    percentage: 45,
    time: '2,600',
    icon: (
      <UsersRoundIcon />
    ),
    width: 'w-[45%]',
    colors: 'bg-chart-4 text-primary-foreground'
  },
  {
    status: 'City',
    percentage: 35,
    time: '1,228',
    icon: (
      <MapPinIcon />
    ),
    width: 'w-[35%]',
    colors: 'bg-chart-1 text-primary-foreground'
  },
  {
    status: 'Work',
    percentage: 20,
    time: '800',
    icon: (
      <BriefcaseBusinessIcon />
    ),
    width: 'w-[20%]',
    colors: 'bg-chart-2 text-primary-foreground'
  }
]

const BentoGrid = ({ images }: { images: StackProps['cardsData'] }) => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-6 lg:px-8'>
        {/* Find Experts Card */}
        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          transition={{ duration: 0.45 }}
          className='overflow-hidden max-xl:min-h-120 md:col-span-3 xl:col-span-2'
        >
          <Card className='h-full justify-between shadow-none ring-0'>
            <CardHeader className='flex gap-4'>
              <MotionPreset
                fade
                slide={{ direction: 'down', offset: 50 }}
                delay={0.1}
                transition={{ duration: 0.45 }}
                className='bg-primary text-primary-foreground grid size-8 shrink-0 place-content-center rounded-full'
              >
                <SearchIcon className='size-4' />
              </MotionPreset>
              <div className='flex flex-col gap-2'>
                <MotionPreset
                  component='h3'
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={0.1}
                  transition={{ duration: 0.45 }}
                >
                  <CardTitle className='text-xl font-medium'>Find Experts Across Fields</CardTitle>
                </MotionPreset>
                <MotionPreset
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={0.2}
                  transition={{ duration: 0.45 }}
                >
                  <CardDescription className='text-lg'>
                    Explore a wide network of skilled professionals across industries and easily connect with right
                    talent.
                  </CardDescription>
                </MotionPreset>
              </div>
            </CardHeader>
            <MotionPreset
              fade
              slide={{ direction: 'down', offset: 50 }}
              delay={0.3}
              transition={{ duration: 0.45 }}
              className='flex-1'
            >
              <FallingBadge
                badges={[
                  {
                    text: 'Technical assistant',
                    className:
                      'bg-green-600/20 dark:bg-green-400/40 text-lg text-medium text-foreground border-border py-1.5 px-3'
                  },
                  {
                    text: 'Finance analyst',
                    className:
                      'bg-amber-600/20 dark:bg-amber-400/40 text-lg text-medium text-foreground border-border py-1.5 px-3'
                  },
                  {
                    text: 'Backend developer',
                    className:
                      'bg-destructive/20 dark:bg-destructive/40 text-lg text-medium text-foreground border-border py-1.5 px-3'
                  },
                  {
                    text: 'UI/UX',
                    className:
                      'bg-sky-600/20 dark:bg-sky-400/40 text-lg text-medium text-foreground border-border py-1.5 px-3'
                  },
                  {
                    text: 'BDE',
                    className:
                      'bg-green-600/20 dark:bg-green-400/40 text-lg text-medium text-foreground border-border py-1.5 px-3'
                  },
                  {
                    text: 'Manager',
                    className:
                      'bg-amber-600/20 dark:bg-amber-400/40 text-lg text-medium text-foreground border-border py-1.5 px-3'
                  },
                  {
                    text: 'Charted accountant',
                    className:
                      'bg-destructive/20 dark:bg-destructive/40 text-lg text-medium text-foreground border-border py-1.5 px-3'
                  }
                ]}
                trigger='hover'
                gravity={1.2}
                className='p-0'
              />
            </MotionPreset>
          </Card>
        </MotionPreset>

        {/* Advance Evaluation Card */}
        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          delay={0.45}
          transition={{ duration: 0.45 }}
          className='overflow-hidden max-xl:min-h-120 md:col-span-3 xl:col-span-2'
        >
          <Card className='h-full text-base shadow-none ring-0'>
            <CardHeader className='flex gap-4'>
              <MotionPreset
                fade
                slide={{ direction: 'down', offset: 50 }}
                delay={0.55}
                transition={{ duration: 0.45 }}
                className='bg-primary text-primary-foreground grid size-8 shrink-0 place-content-center rounded-full'
              >
                <CrosshairIcon className='size-4' />
              </MotionPreset>
              <div className='flex flex-col gap-2'>
                <MotionPreset
                  component='h3'
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={0.55}
                  transition={{ duration: 0.45 }}
                >
                  <CardTitle className='text-xl font-medium'>Advanced Evaluation Tools</CardTitle>
                </MotionPreset>
                <MotionPreset
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={0.65}
                  transition={{ duration: 0.45 }}
                >
                  <CardDescription className='text-lg'>
                    Gain accurate insights into each candidate&apos;s strengths to simplify hiring decisions.
                  </CardDescription>
                </MotionPreset>
              </div>
            </CardHeader>
            <MotionPreset
              fade
              slide={{ direction: 'down', offset: 50 }}
              delay={0.75}
              transition={{ duration: 0.45 }}
              className='grid flex-1 grid-cols-2 grid-rows-2 px-10 py-5'
            >
              <div className='relative font-medium'>
                <span>Strength</span>
                <div className='absolute right-0 bottom-0 size-31.25 border-r border-b border-dashed'>
                  <DataTriangle className='absolute right-2 bottom-2 w-25 fill-[color-mix(in_oklab,var(--color-green-600)20%,var(--card))] hover:stroke-green-600 hover:drop-shadow-md hover:drop-shadow-green-600/40 dark:fill-[color-mix(in_oklab,var(--color-green-400)40%,var(--card))] dark:hover:stroke-green-400 dark:hover:drop-shadow-green-400/60' />
                  <span className='absolute right-7 bottom-5.25 text-xl font-medium text-green-600 dark:text-green-400'>
                    S
                  </span>
                </div>
              </div>
              <div className='relative text-end font-medium'>
                <span>Weakness</span>
                <div className='absolute bottom-0 left-0 size-31.25 border-b border-dashed'>
                  <DataTriangle className='hover:stroke-destructive hover:drop-shadow-destructive/40 dark:hover:drop-shadow-destructive/60 absolute bottom-2 left-2 w-25 rotate-y-180 fill-[color-mix(in_oklab,var(--destructive)20%,var(--card))] hover:drop-shadow-md dark:fill-[color-mix(in_oklab,var(--destructive)40%,var(--card))]' />
                  <span className='text-destructive absolute bottom-5.25 left-7 text-xl font-medium'>W</span>
                </div>
              </div>
              <div className='relative font-medium'>
                <span className='absolute bottom-0 left-0'>Experience</span>
                <div className='absolute top-0 right-0 size-31.25 border-r border-dashed'>
                  <DataTriangle className='absolute top-2 right-2 w-25 rotate-x-180 fill-[color-mix(in_oklab,var(--color-sky-600)20%,var(--card))] hover:stroke-sky-600 hover:drop-shadow-md hover:drop-shadow-sky-600/40 dark:fill-[color-mix(in_oklab,var(--color-sky-400)40%,var(--card))] dark:hover:stroke-sky-400 dark:hover:drop-shadow-sky-400/60' />
                  <span className='absolute top-5.25 right-7 text-xl font-medium text-sky-600 dark:text-sky-400'>
                    E
                  </span>
                </div>
              </div>
              <div className='relative text-end font-medium'>
                <span className='absolute right-0 bottom-0'>Achievements</span>
                <div className='absolute top-0 left-0 size-31.25'>
                  <DataTriangle className='absolute top-2 left-2 w-25 rotate-180 fill-[color-mix(in_oklab,var(--color-amber-600)20%,var(--card))] hover:stroke-amber-600 hover:drop-shadow-md hover:drop-shadow-amber-600/40 dark:fill-[color-mix(in_oklab,var(--color-amber-400)40%,var(--card))] dark:hover:stroke-amber-400 dark:hover:drop-shadow-amber-400/60' />
                  <span className='absolute top-5.25 left-7 text-xl font-medium text-amber-600 dark:text-amber-400'>
                    A
                  </span>
                </div>
              </div>
            </MotionPreset>
          </Card>
        </MotionPreset>

        {/* Perfect Fit Card */}
        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          delay={0.9}
          transition={{ duration: 0.45 }}
          className='overflow-hidden md:col-span-3 md:max-xl:order-1 xl:col-span-2'
        >
          <Card className='group h-full justify-between shadow-none ring-0'>
            <CardHeader className='flex gap-4'>
              <MotionPreset
                fade
                slide={{ direction: 'down', offset: 50 }}
                delay={1}
                transition={{ duration: 0.45 }}
                className='bg-primary text-primary-foreground grid size-8 shrink-0 place-content-center rounded-full'
              >
                <FilterIcon className='size-4' />
              </MotionPreset>
              <div className='flex flex-col gap-2'>
                <MotionPreset
                  component='h3'
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={1}
                  transition={{ duration: 0.45 }}
                >
                  <CardTitle className='text-xl font-medium'>Find Your Perfect Fit</CardTitle>
                </MotionPreset>
                <MotionPreset
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={1.1}
                  transition={{ duration: 0.45 }}
                >
                  <CardDescription className='text-lg'>
                    Use advanced filters to narrow searches so you connect only with people who fit your exact needs.
                  </CardDescription>
                </MotionPreset>
              </div>
            </CardHeader>

            {/* Ring section */}
            <MotionPreset
              fade
              slide={{ direction: 'down', offset: 50 }}
              delay={1.2}
              transition={{ duration: 0.45 }}
              className='flex flex-1 items-center justify-center py-3.5'
            >
              <div className='relative flex size-57.5 items-center justify-center -space-x-2 rounded-full border'>
                {/* Rotating orbit container for all moving avatars */}
                <div className='avatar-orbit-container absolute inset-0'>
                  {/* Avatar 1 - Left position, stays on left on hover */}
                  <div className='absolute top-1/2 left-10.75 -translate-y-1/2 transition-all duration-500 group-hover:-left-5.25'>
                    <div className='avatar-counter-rotate'>
                      <Avatar className='ring-background size-11.5 ring-2 transition-transform duration-500 group-hover:scale-110'>
                        <AvatarImage
                          src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-100.png'
                          alt='Avatar 1'
                        />
                        <AvatarFallback>A1</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Avatar 2 - moves to top */}
                  <div className='absolute top-1/2 left-17 -translate-y-1/2 transition-all duration-500 group-hover:top-0 group-hover:left-1/2 group-hover:-translate-x-1/2'>
                    <div className='avatar-counter-rotate'>
                      <Avatar className='ring-background size-11.5 ring-2 transition-transform duration-500 group-hover:scale-110'>
                        <AvatarImage
                          src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-101.png'
                          alt='Avatar 2'
                        />
                        <AvatarFallback>A2</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Avatar 4 - moves to bottom */}
                  <div className='absolute top-1/2 right-19 z-1 -translate-y-1/2 transition-all duration-500 group-hover:top-full group-hover:left-1/2 group-hover:-translate-x-1/2'>
                    <div className='avatar-counter-rotate'>
                      <Avatar className='ring-background size-11.5 ring-2 transition-transform duration-500 group-hover:scale-110'>
                        <AvatarImage
                          src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-103.png'
                          alt='Avatar 4'
                        />
                        <AvatarFallback>A4</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Avatar 5 - Right position, stays on right on hover */}
                  <div className='absolute top-1/2 right-13 z-2 -translate-y-1/2 transition-all duration-500 group-hover:-right-3.5'>
                    <div className='avatar-counter-rotate'>
                      <Avatar className='ring-background size-11.5 ring-2 transition-transform duration-500 group-hover:scale-110'>
                        <AvatarImage
                          src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-104.png'
                          alt='Avatar 5'
                        />
                        <AvatarFallback>A5</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>

                {/* Avatar 3 - Center, stays in center */}
                <Avatar className='ring-background absolute top-1/2 left-1/2 size-11.5 -translate-1/2 ring-2 transition-transform duration-500 group-hover:scale-110'>
                  <AvatarImage
                    src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-102.png'
                    alt='Avatar 3'
                  />
                  <AvatarFallback>A3</AvatarFallback>
                </Avatar>
              </div>
            </MotionPreset>
          </Card>
        </MotionPreset>

        {/* Network Growth Card */}
        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          delay={1.35}
          transition={{ duration: 0.45 }}
          className='col-span-full min-h-120 xl:col-span-3'
        >
          <Card className='h-full overflow-hidden shadow-none ring-0'>
            <CardHeader className='flex gap-4'>
              <MotionPreset
                fade
                slide={{ direction: 'down', offset: 50 }}
                delay={1.45}
                transition={{ duration: 0.45 }}
                className='bg-primary text-primary-foreground grid size-8 shrink-0 place-content-center rounded-full'
              >
                <TrendingUpIcon className='size-4' />
              </MotionPreset>
              <div className='flex flex-col gap-2'>
                <MotionPreset
                  component='h3'
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={1.45}
                  transition={{ duration: 0.45 }}
                >
                  <CardTitle className='text-xl font-medium'>Track Network Growth</CardTitle>
                </MotionPreset>
                <MotionPreset
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={1.55}
                  transition={{ duration: 0.45 }}
                >
                  <CardDescription className='text-lg'>
                    Monitor how your professional network expands over time with clear progress insights and engagement
                    data.
                  </CardDescription>
                </MotionPreset>
              </div>
            </CardHeader>
            <MotionPreset
              fade
              slide={{ direction: 'down', offset: 50 }}
              delay={1.65}
              transition={{ duration: 0.45 }}
              className='self-center md:h-fit'
            >
              <CardContent>
                <VehicleOverviewCard
                  title='Impression overview'
                  vehicleData={userData}
                  className='md:w-113 md:scale-95'
                />
              </CardContent>
            </MotionPreset>
          </Card>
        </MotionPreset>

        {/* Industry Posts Card */}
        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          delay={1.8}
          transition={{ duration: 0.45 }}
          className='overflow-hidden md:col-span-3 md:max-xl:order-2'
        >
          <Card className='h-full shadow-none ring-0'>
            <CardHeader className='flex gap-4'>
              <MotionPreset
                fade
                slide={{ direction: 'down', offset: 50 }}
                delay={1.9}
                transition={{ duration: 0.45 }}
                className='bg-primary text-primary-foreground grid size-8 shrink-0 place-content-center rounded-full'
              >
                <ThumbsUpIcon className='size-4' />
              </MotionPreset>
              <div className='flex flex-col gap-2'>
                <MotionPreset
                  component='h3'
                  fade
                  slide={{ direction: 'down', offset: 50 }}
                  delay={1.9}
                  transition={{ duration: 0.45 }}
                >
                  <CardTitle className='text-xl font-medium'>Latest Industry Posts</CardTitle>
                </MotionPreset>
                <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={2} transition={{ duration: 0.45 }}>
                  <CardDescription className='text-lg'>
                    Keep up with regular updates and shared posts, ensuring you stay connected with industry activity.
                  </CardDescription>
                </MotionPreset>
              </div>
            </CardHeader>

            <MotionPreset
              fade
              slide={{ direction: 'down', offset: 50 }}
              delay={2.1}
              transition={{ duration: 0.45 }}
              className='flex h-96.5 justify-center overflow-hidden px-6'
            >
              <CardStack
                cardsData={images}
                perspective={3500}
                className='w-67.5 focus-visible:outline-none [&>div]:top-1/2 [&>div]:-translate-y-1/2'
              />
            </MotionPreset>
          </Card>
        </MotionPreset>
      </div>
    </section>
  )
}

export default BentoGrid
