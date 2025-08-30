import { NextRequest, NextResponse } from 'next/server'
import { privacyTemplate } from '@/lib/templates/privacy'
import { cookieTemplate } from '@/lib/templates/cookie'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessName, website, jurisdiction } = body

    // Validate required fields
    if (!businessName || !website) {
      return NextResponse.json(
        { error: 'Business name and website are required' },
        { status: 400 }
      )
    }

    // Get current date
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Replace placeholders in templates
    const replacePlaceholders = (template: string) => {
      return template
        .replace(/{{businessName}}/g, businessName)
        .replace(/{{website}}/g, website)
        .replace(/{{jurisdiction}}/g, jurisdiction || 'Global')
        .replace(/{{date}}/g, currentDate)
        // Handle jurisdiction-specific conditional content
        .replace(/\{\{#if_jurisdiction_EU\}\}([\s\S]*?)\{\{\/if_jurisdiction_EU\}\}/g, 
          jurisdiction === 'EU' ? '$1' : '')
        .replace(/\{\{#if_jurisdiction_US\}\}([\s\S]*?)\{\{\/if_jurisdiction_US\}\}/g, 
          jurisdiction === 'US' ? '$1' : '')
    }

    const privacyHTML = replacePlaceholders(privacyTemplate)
    const cookieHTML = replacePlaceholders(cookieTemplate)

    return NextResponse.json({
      privacyHTML,
      cookieHTML
    })
  } catch (error) {
    console.error('Error generating policies:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}