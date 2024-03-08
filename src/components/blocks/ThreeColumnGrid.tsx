import { BlockData } from '@gocontento/client'
import Link from 'next/link'

export default function ThreeColumnGrid({ block }: { block: BlockData }) {
  return (
    <div className="py-9 md:py-16">
      <div className="prose">
        <h2 className="mb-5 text-3xl font-semibold">
          {block.fields.title.text}
        </h2>
        {block.fields.text.text && (
          <p className="text-lg">{block.fields.text.text}</p>
        )}
      </div>
      <div className="prose grid max-w-none space-y-4 pt-9 md:grid-cols-3 md:space-x-6 md:space-y-0">
        {block.fields.content.blocks.map((card: BlockData) => (
          <div
            key={card.fields.title.text}
            className="flex flex-col bg-zinc-100 p-6"
          >
            <h3 className="text-xl font-semibold">{card.fields.title.text}</h3>
            <p className="text-lg">{card.fields.text.text}</p>
            {card.fields.button.blocks.length > 0 && (
              <Link
                href={card.fields.button.blocks[0].fields.button_url.text}
                className="text-md not-prose my-5 font-semibold text-zinc-600 hover:opacity-80"
                target={
                  card.fields.button.blocks[0].fields.open_in_new_tab.is_on
                    ? '_blank'
                    : ''
                }
              >
                {card.fields.button.blocks[0].fields.button_text.text}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
