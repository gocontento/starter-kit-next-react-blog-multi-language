import { BlockData } from '@gocontento/client'
import Image from 'next/image'
import Button from './Button'

export default function Hero({ block }: { block: BlockData }) {
  return (
    <div className="pb-9 md:pb-16">
      <div className="grid items-center space-y-6 md:grid-cols-2 md:space-x-12">
        <div className="prose">
          <h1 className="text-4xl font-semibold md:text-5xl">
            {block.fields.title.text}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: block.fields.text.text }}
            className="text-lg"
          />
          {block.fields.button.blocks.length > 0 &&
            block.fields.button.blocks.map((button: BlockData) => {
              return (
                <Button key={button.fields.button_text.text} button={button} />
              )
            })}
        </div>
        <div>
          <Image
            src={block.fields.image.assets[0].asset.url}
            alt={block.fields.image.assets[0].asset.description}
            className="h-full w-full object-cover"
            width={750}
            height={600}
          />
        </div>
      </div>
    </div>
  )
}
