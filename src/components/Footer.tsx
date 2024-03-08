import { BlockData, ContentData } from '@gocontento/client'
import Link from 'next/link'

export default function Footer({ footerNav }: { footerNav: ContentData }) {
  return (
    <div className="flex w-full flex-col space-y-9 bg-zinc-200/40 px-6 py-9 md:flex-row md:items-center md:justify-between md:space-y-0 md:px-28">
      <FooterNav footerNav={footerNav} />
      <div>
        <p className="text-md font-semibold text-zinc-600">
          &copy; {new Date().getFullYear()} Company Name. All rights reserved.
        </p>
      </div>
    </div>
  )
}

function FooterNav({ footerNav }: { footerNav: ContentData }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {footerNav.fields.nav_links.blocks &&
        footerNav.fields.nav_links.blocks.map((link: BlockData) => (
          <Link
            href={link.fields.link_url.text}
            className="text-md block font-semibold text-zinc-600 hover:opacity-80"
            target={link.fields.open_in_new_tab.is_on ? '_blank' : ''}
            key={link.fields.link_text.text}
          >
            {link.fields.link_text.text}
          </Link>
        ))}
    </div>
  )
}
