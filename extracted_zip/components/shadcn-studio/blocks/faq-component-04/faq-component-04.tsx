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
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 text-center sm:mb-16 lg:mb-24'>
          <h1 className='mb-4 text-2xl font-semibold md:text-3xl lg:text-4xl'>Commonly Asked Questions</h1>
          <p className='text-muted-foreground text-xl'>
            Utilize artificial intelligence algorithms to deliver valuable insights to users.
          </p>
        </div>

        <Tabs defaultValue='dashboard' className='gap-8'>
          <TabsList className='self-center py-0'>
            {tabs.map(tab => (
              <TabsTrigger className='px-3' key={tab.value} value={tab.value}>
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
                    className='bg-card rounded-md border-b-0 shadow-md data-open:shadow-lg'
                  >
                    <AccordionTrigger className='px-5 text-base'>{item.question}</AccordionTrigger>
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
            <a href='#' className='text-foreground font-semibold'>
              Contact our support
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default FAQ
