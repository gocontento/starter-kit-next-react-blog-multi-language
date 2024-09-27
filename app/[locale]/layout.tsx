import '../globals.css'
import { createClient } from '@/lib/contento'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import notFound from './not-found'
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
  const client = createClient(false, locale)

  // Request by id but pass in language. getContentById()

  const mainNavResponse = await client.getContentByType({
    contentType: 'navigation',
    limit: 1,
  })

  const footerNavResponse = await client.getContentByType({
    contentType: 'navigation',
    limit: 1,
  })

  const mainNav = mainNavResponse.content[0]
  const footerNav = footerNavResponse.content[0]

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
