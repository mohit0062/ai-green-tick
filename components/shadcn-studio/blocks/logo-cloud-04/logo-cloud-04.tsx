import { Marquee } from '@/components/ui/marquee'
import { MotionPreset } from '@/components/ui/motion-preset'

type BrandLogo = {
  image: string
  name: string
}

interface LogoCloudProps {
  heading?: string
  brandLogos?: BrandLogo[]
}

const LogoCloud = ({ 
  heading = "Loved by growing brands across 15+ industries", 
  brandLogos = [] 
}: LogoCloudProps) => {
  // Split logos into 2 rows dynamically
  const half = Math.ceil(brandLogos.length / 2)
  const row1 = brandLogos.slice(0, half)
  const row2 = brandLogos.slice(half)

  return (
    <section className='border-y px-4 sm:px-6 lg:px-8 bg-muted select-none'>
      <div className='mx-auto max-w-7xl border border-[#C5C4C2] bg-background'>
        {/* Header */}
        <div className='py-4 sm:py-6 text-center border-b'>
          <MotionPreset
            component='p'
            className='font-mono font-semibold text-xs sm:text-sm text-muted-foreground tracking-wide px-4'
            fade
            slide={{ direction: 'down', offset: 20 }}
            transition={{ duration: 0.5 }}
          >
            {heading}
          </MotionPreset>
        </div>

        {/* Logos Marquee Container */}
        <div className='relative'>
          {/* Edge Gradients overlay */}
          <div className='from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r to-transparent' />
          <div className='from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l to-transparent' />

          {/* Row 1 */}
          {row1.length > 0 && (
            <div className='w-full overflow-hidden border-b h-16 lg:h-24 flex items-center'>
              <Marquee pauseOnHover duration={35} gap={0} className="p-0 h-full">
                {row1.map((logo, index) => (
                  <div
                    key={index}
                    className='w-[115px] lg:w-[160px] h-16 lg:h-24 flex items-center justify-center border-r shrink-0 px-3'
                  >
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className='h-6 lg:h-9 w-auto max-w-[80%] object-contain mx-auto hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          )}

          {/* Row 2 */}
          {row2.length > 0 && (
            <div className='w-full overflow-hidden h-16 lg:h-24 flex items-center'>
              <Marquee pauseOnHover duration={35} gap={0} reverse className="p-0 h-full">
                {row2.map((logo, index) => (
                  <div
                    key={index}
                    className='w-[115px] lg:w-[160px] h-16 lg:h-24 flex items-center justify-center border-r shrink-0 px-3'
                  >
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className='h-6 lg:h-9 w-auto max-w-[80%] object-contain mx-auto hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default LogoCloud
