import { BlockData } from '@gocontento/client'
import Image from 'next/image'
import Button from './Button'

export default function Hero({ block }: { block: BlockData }) {
  return (
    <div className="pb-9 md:pb-16">
      <div className="mx-auto grid items-center justify-center space-y-6 lg:grid-cols-2 lg:space-x-12 lg:pt-9 xl:max-w-7xl">
        <div className="prose">
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            {block.fields.title.text}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: block.fields.text.text }}
            className="text-lg lg:w-4/5"
          />
          {block.fields.button.blocks &&
            block.fields.button.blocks.map((button: BlockData) => {
              return (
                <Button key={button.fields.button_text.text} button={button} />
              )
            })}
        </div>
        {block.fields.image.assets.length > 0 && (
          <div>
            <Image
              src={block.fields.image.assets[0].asset.url}
              alt={block.fields.image.assets[0].asset.description}
              className="h-full w-full object-cover"
              width={750}
              height={600}
            />
          </div>
        )}
      </div>
    </div>
  )
}
