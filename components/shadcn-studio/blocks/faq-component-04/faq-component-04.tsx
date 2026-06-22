import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type FAQItem = {
  id: string
  question: string
  answer: string
}[]

type Tabs = {
  name: string
  value: string
  faqs: FAQItem
}[]

const FAQ = ({ tabs }: { tabs: Tabs }) => {
  return (
    <section className='border-b px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950'>
      <div className='mx-auto max-w-7xl border-x px-4 sm:px-6 lg:px-8 border-[#C5C4C2] py-8 sm:py-16 lg:py-24'>
        {/* Header */}
        <div className='mb-12 text-center sm:mb-16 lg:mb-24'>
          <h2 className='mb-4 text-2xl font-medium md:text-3xl lg:text-4xl font-serif text-black dark:text-white'>
            Answers to questions you might have
          </h2>
          <p className='text-muted-foreground text-xl max-w-2xl mx-auto'>
            Find quick answers to common questions about setting up your official WhatsApp Business API account.
          </p>
        </div>

        <Tabs defaultValue='general' className='gap-8'>
          <TabsList className='self-center py-0 rounded-none! border border-[#C5C4C2] bg-[#ECEBE9]/50'>
            {tabs.map(tab => (
              <TabsTrigger className='px-3 rounded-none! shadow-none! data-[state=active]:shadow-none! border border-transparent data-[state=active]:border-[#C5C4C2]' key={tab.value} value={tab.value}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map(tab => (
            <TabsContent key={tab.value} value={tab.value}>
              <Accordion
                type='single'
                collapsible
                className='w-full space-y-2 overflow-visible border-0 [&>*>[data-slot="accordion-content"]]:px-0'
                defaultValue='item-1'
              >
                {tab.faqs.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index + 1}`}
                    className='bg-card rounded-none border border-[#C5C4C2]'
                  >
                    <AccordionTrigger className='px-5 text-base font-medium'>{item.question}</AccordionTrigger>
                    <AccordionContent className='text-muted-foreground px-5 text-base'>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>

        {/* Support Link */}
        <div className='mt-12 text-center sm:mt-16 lg:mt-24'>
          <p className='text-muted-foreground'>
            Didn&apos;t find the answer you are looking for?{' '}
            <a href='#' className='text-foreground font-semibold hover:underline'>
              Contact our support
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default FAQ
