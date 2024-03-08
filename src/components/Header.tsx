'use client'

import { BlockData, ContentData } from '@gocontento/client'
import ContentoLogo from '@/images/ContentoLogo'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid'
import { usePathname } from 'next/navigation'
import { classNames } from '@/utils/ClassNames'

function Logo() {
  return (
    <Link
      href="/"
      className="inline-block w-[128px] hover:opacity-80 lg:-mt-2.5 lg:w-[180px]"
    >
      <ContentoLogo className="h-auto w-full" />
    </Link>
  )
}

export default function Header({ mainNav }: { mainNav: ContentData }) {
  const pathName = usePathname()

  return (
    <Disclosure as="nav" className="bg-zinc-100">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 md:px-28">
            <div className="flex h-20 items-center justify-between">
              {/* Logo */}
              <div className="flex flex-shrink-0 items-center">
                <Logo />
              </div>
              <div>
                {/* Desktop Nav */}
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-9">
                  {mainNav.fields.nav_links.blocks.map((item: BlockData) => {
                    if (item.fields.button.is_on) {
                      return (
                        <Disclosure.Button
                          key={item.fields.link_text.text}
                          as={Link}
                          href={item.fields.link_url.text}
                          className="my-9 inline-block bg-zinc-700 px-6 py-3 font-semibold text-white hover:opacity-80"
                          target={
                            item.fields.open_in_new_tab.is_on ? '_blank' : ''
                          }
                        >
                          {item.fields.link_text.text}
                        </Disclosure.Button>
                      )
                    } else {
                      return (
                        <Disclosure.Button
                          key={item.fields.link_text.text}
                          as={Link}
                          href={item.fields.link_url.text}
                          className={classNames(
                            pathName.startsWith(item.fields.link_url.text)
                              ? 'text-teal-500'
                              : 'text-zinc-600 hover:opacity-80',
                            'text-md font-semibold',
                          )}
                          target={
                            item.fields.open_in_new_tab.is_on ? '_blank' : ''
                          }
                        >
                          {item.fields.link_text.text}
                        </Disclosure.Button>
                      )
                    }
                  })}
                </div>
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center text-zinc-600">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="absolute w-full bg-zinc-100 md:hidden">
            {/* Mobile Nav */}
            <div className="space-y-4 px-4 pb-6 pt-2 sm:px-3">
              {mainNav.fields.nav_links.blocks.map((item: BlockData) => {
                if (item.fields.button.is_on) {
                  // This is a toggle in the navLink block in the CMS - it turns the link into a button
                  return (
                    <Disclosure.Button
                      key={item.fields.link_text.text}
                      as={Link}
                      href={item.fields.link_url.text}
                      className="block bg-zinc-700 px-6 py-3 text-center font-semibold text-white hover:opacity-80"
                      target={item.fields.open_in_new_tab.is_on ? '_blank' : ''}
                    >
                      {item.fields.link_text.text}
                    </Disclosure.Button>
                  )
                } else {
                  return (
                    <Disclosure.Button
                      key={item.fields.link_text.text}
                      as={Link}
                      href={item.fields.link_url.text}
                      className={classNames(
                        pathName.startsWith(item.fields.link_url.text)
                          ? 'text-teal-500'
                          : 'text-zinc-600 hover:opacity-80',
                        'text-md block font-semibold',
                      )}
                      target={item.fields.open_in_new_tab.is_on ? '_blank' : ''}
                    >
                      {item.fields.link_text.text}
                    </Disclosure.Button>
                  )
                }
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
