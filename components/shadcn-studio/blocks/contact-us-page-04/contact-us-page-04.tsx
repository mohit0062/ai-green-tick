import type { ComponentType } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import ContactForm from '@/components/shadcn-studio/blocks/contact-us-page-04/contact-form'

type ContactCard = {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  ctaText: string
  ctaLink: string
}[]

const ContactUs = ({ contactCards, heading = 'Get in Touch', subtitle = 'Have a question? Drop us a message.', mapUrl }: { contactCards: ContactCard; heading?: string; subtitle?: string; mapUrl?: string }) => {
  return (
    <section className='px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-neutral-50/30'>
      <div className='mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24'>
        <div className='mb-12 text-center sm:mb-16 lg:mb-24 flex flex-col items-center'>
          <span className="px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono inline-block w-fit mb-4">
            :: CONTACT US ::
          </span>
          <h2 className='mb-4 text-2xl font-bold md:text-3xl lg:text-4xl text-black font-display'>{heading}</h2>
          <div 
            className='text-neutral-500 text-base sm:text-lg max-w-2xl font-sans leading-relaxed [&_strong]:font-bold [&_strong]:text-neutral-900 [&_a]:text-[#00b259] [&_a]:underline [&_img]:inline-block [&_img]:max-w-full [&_img]:my-2'
            dangerouslySetInnerHTML={{ __html: subtitle }} 
          />
        </div>

        <Card className='shadow-none rounded-none border-[#C5C4C2] bg-white'>
          <CardContent className='grid gap-6 md:grid-cols-2 p-6'>
            <ContactForm />

            {/* Map Section */}
            <div>
              <iframe
                className='size-full min-h-[400px] rounded-none border border-[#C5C4C2]'
                src={mapUrl || 'https://maps.google.com/maps?hl=en&amp;q=Jaipur+Rajasthan+India&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'}
                title='Google Maps'
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Cards */}
        <div className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
          {contactCards.map((contact, index) => (
            <Card
              key={index}
              className='rounded-none border-[#C5C4C2] bg-white text-black shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#00b259] hover:shadow-[0_0_15px_rgba(0,178,89,0.1)] group flex flex-col justify-between'
            >
              <CardContent className='flex flex-col gap-6 p-6 h-full justify-between'>
                <div className='space-y-4'>
                  <div className='size-11 flex items-center justify-center rounded-none border border-[#C5C4C2] bg-[#00b259]/10 text-[#00b259]'>
                    <contact.icon className='size-5' />
                  </div>
                  <div className='space-y-2'>
                    <h3 className='text-lg font-bold font-display text-black'>
                      {contact.title}
                    </h3>
                    <div 
                      className='text-neutral-500 font-sans text-sm leading-relaxed [&_strong]:font-bold [&_strong]:text-neutral-900 [&_a]:text-[#00b259] [&_a]:underline [&_img]:inline-block [&_img]:max-w-full'
                      dangerouslySetInnerHTML={{ __html: contact.description }}
                    />
                  </div>
                </div>
                <Button
                  asChild
                  variant='outline'
                  className='rounded-none border-[#C5C4C2] hover:border-[#00b259] hover:text-[#00b259] hover:bg-[#00b259]/5 text-black bg-white transition-all font-sans w-full mt-4 font-semibold'
                  size='lg'
                >
                  <a href={contact.ctaLink}>{contact.ctaText}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactUs
