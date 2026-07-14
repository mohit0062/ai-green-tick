'use server'

import { createClient } from '@/utils/supabase/server'

interface ContactInput {
  name: string
  email: string
  company?: string
  country?: string
  help_type?: string
  budget?: string
  message?: string
  source?: string
  phoneNumber?: string
  countryCode?: string
}

/**
 * Server Action to submit a contact form entry to website_leads table.
 */
export async function submitContactFormAction(input: ContactInput) {
  try {
    if (!input.name || !input.name.trim() || !input.email || !input.email.trim()) {
      return { error: 'Name and email are required.' }
    }

    const supabase = await createClient()

    // Format phone number
    let formattedPhone = ''
    if (input.phoneNumber && input.phoneNumber.trim()) {
      formattedPhone = `${input.countryCode || ''} ${input.phoneNumber}`.trim()
    }

    // Format message to combine all extra lead metadata nicely
    const messageParts: string[] = []
    if (input.company && input.company.trim()) messageParts.push(`Company: ${input.company.trim()}`)
    if (input.country && input.country.trim()) messageParts.push(`Country: ${input.country.trim()}`)
    if (input.help_type && input.help_type.trim()) messageParts.push(`Help Type: ${input.help_type.trim()}`)
    if (input.budget && input.budget.trim()) messageParts.push(`Budget/Volume: ${input.budget.trim()}`)
    if (input.source && input.source.trim()) messageParts.push(`Source: ${input.source.trim()}`)
    if (input.message && input.message.trim()) {
      messageParts.push(`\nMessage:\n${input.message.trim()}`)
    }

    const formattedMessage = messageParts.join('\n')

    const { error } = await supabase
      .from('website_leads')
      .insert({
        name: input.name.trim(),
        email: input.email.trim(),
        phone: formattedPhone || null,
        message: formattedMessage || null
      })

    if (error) {
      console.error('Error inserting website lead:', error)
      return { error: `Database error: ${error.message}` }
    }

    return { success: true }
  } catch (err: any) {
    console.error('Error in submitContactFormAction Server Action:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }
}

/**
 * Server Action to subscribe an email to the leads table.
 */
export async function subscribeNewsletterAction(email: string) {
  try {
    if (!email || !email.trim()) {
      return { error: 'Email is required.' }
    }

    const supabase = await createClient()

    // The leads table has 'name' as a NOT NULL column in postgres.
    // We will set name to 'Newsletter Subscriber' to satisfy the constraint.
    const { error } = await supabase
      .from('leads')
      .insert({
        name: 'Newsletter Subscriber',
        email: email.trim(),
        message: 'Subscribed to newsletter'
      })

    if (error) {
      console.error('Error inserting newsletter lead:', error)
      return { error: `Database error: ${error.message}` }
    }

    return { success: true }
  } catch (err: any) {
    console.error('Error in subscribeNewsletterAction Server Action:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }
}
