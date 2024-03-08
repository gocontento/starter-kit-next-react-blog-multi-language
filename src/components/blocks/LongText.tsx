import { BlockData } from '@gocontento/client'
import Button from './Button'

export default function LongText({ block }: { block: BlockData }) {
  return (
    <div className="py-9 md:py-16">
      <div className="prose mx-auto">
        <h2 className="mb-5 text-3xl font-semibold">
          {block.fields.title.text}
        </h2>
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
    </div>
  )
}
