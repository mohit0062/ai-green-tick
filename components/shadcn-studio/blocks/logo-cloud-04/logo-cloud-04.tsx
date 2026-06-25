import { Marquee } from '@/components/ui/marquee'
import { MotionPreset } from '@/components/ui/motion-preset'

type brandLogos = {
  image: string
  name: string
}

const LogoCloud = ({ brandLogos }: { brandLogos: brandLogos[] }) => {
  return (
    <section className='border-b px-4 sm:px-6 lg:px-8 bg-muted'>
      <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] bg-background'>
        {/* Header */}
        <div className='py-4 sm:py-6 text-center border-b'>
          <MotionPreset
            component='p'
            className='font-mono font-semibold text-xs sm:text-sm text-muted-foreground tracking-wide'
            fade
            slide={{ direction: 'down', offset: 20 }}
            transition={{ duration: 0.5 }}
          >
            Loved by growing brands across 15+ industries
          </MotionPreset>
        </div>

        {/* Logos Marquee Container */}
        <div className='relative'>
          {/* Edge Gradients overlay */}
          <div className='from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r to-transparent' />
          <div className='from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l to-transparent' />

          {/* Row 1 */}
          <div className='w-full overflow-hidden border-b h-13 lg:h-18 flex items-center'>
            <Marquee pauseOnHover duration={35} gap={0}>
              {brandLogos.slice(0, 7).map((logo, index) => (
                <div
                  key={index}
                  className='w-[115px] lg:w-[160px] h-13 lg:h-18 flex items-center justify-center border-r shrink-0 px-3'
                >
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className='max-w-[80%] max-h-[55%] object-contain hover:scale-105 transition-transform duration-300'
                  />
                </div>
              ))}
            </Marquee>
          </div>

          {/* Row 2 */}
          <div className='w-full overflow-hidden h-13 lg:h-18 flex items-center'>
            <Marquee pauseOnHover duration={35} gap={0} reverse>
              {brandLogos.slice(7).map((logo, index) => (
                <div
                  key={index}
                  className='w-[115px] lg:w-[160px] h-13 lg:h-18 flex items-center justify-center border-r shrink-0 px-3'
                >
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className='max-w-[80%] max-h-[55%] object-contain hover:scale-105 transition-transform duration-300'
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogoCloud
