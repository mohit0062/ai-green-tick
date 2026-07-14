import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms-data'
import ContactShopifyCms from './contact-cms-client'

export const dynamic = 'force-dynamic'

export default async function ContactCmsPage() {
  const supabase = await createClient()

  const { data: row } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'contact_page')
    .single()

  const fallback = DEFAULT_FALLBACKS.contact_page

  // Merge DB data with defaults
  let contactData: any = {
    // Shopify-style page fields
    pageTitle: 'Contact us',
    visibility: 'visible',
    htmlContent: '<p>Monday to Friday, from 10:00 am till 7:00 pm IST and Saturday, On-call only for production issues (with the exception of public holidays)</p>',
    seoTitle: 'Contact Us — Get in Touch with AI Greentick',
    seoUrl: 'aigreentick.com/contact',
    seoDesc: 'Reach out to AI Greentick for WhatsApp Business API setup, marketing campaigns, automation support, or partnership inquiries.',
    // Structured data (used by /contact page rendering)
    ...fallback,
  }

  if (row?.content) {
    contactData = {
      ...contactData,
      ...row.content,
      // Preserve structured arrays with fallback
      contactCards:
        row.content.contactCards?.length > 0
          ? row.content.contactCards
          : fallback.contactCards,
      officeSection: {
        ...fallback.officeSection,
        ...(row.content.officeSection || {}),
        phone: { ...fallback.officeSection.phone, ...(row.content.officeSection?.phone || {}) },
        office: { ...fallback.officeSection.office, ...(row.content.officeSection?.office || {}) },
        hours: { ...fallback.officeSection.hours, ...(row.content.officeSection?.hours || {}) },
      },
      stepsSection: {
        ...fallback.stepsSection,
        ...(row.content.stepsSection || {}),
        steps:
          row.content.stepsSection?.steps?.length > 0
            ? row.content.stepsSection.steps
            : fallback.stepsSection.steps,
      },
    }
  }

  return <ContactShopifyCms initialData={contactData} />
}
