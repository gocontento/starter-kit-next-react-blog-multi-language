import '../globals.css'
import { createClient } from '@/lib/contento'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

const InterFont = Inter({
  variable: '--font-inter',
  weight: ['400', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  const mainNavId = process.env.SITE_MAIN_NAV_ID ?? false
  const footerNavId = process.env.SITE_FOOTER_NAV_ID ?? false

  if (!mainNavId) {
    throw new Error(
      'No mainNav ID found - SITE_MAIN_NAV_ID - Please ensure you have created one in Contento and copied the ID to your .env file.',
    )
  }

  if (!footerNavId) {
    throw new Error(
      'No FooterNav ID found - SITE_FOOTER_NAV_ID - Please ensure you have created one in Contento and copied the ID to your .env file.',
    )
  }

  const mainNav = await createClient()
    .getContentById(mainNavId)
    .catch(() => {
      throw new Error(
        'No main nav found in Contento that matches the SITE_MAIN_NAV_ID',
      )
    })

  const footerNav = await createClient()
    .getContentById(footerNavId)
    .catch(() => {
      throw new Error(
        'No footer nav found in Contento that matches the SITE_FOOTER_NAV_ID',
      )
    })

  return (
    <html
      lang={locale}
      className={`${InterFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex h-full">
        <NextIntlClientProvider messages={messages}>
          <div className="flex w-full flex-col">
            <Header locale={locale} mainNav={mainNav} />
            <main className="flex-auto">{children}</main>
            <Footer footerNav={footerNav} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
