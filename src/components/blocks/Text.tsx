import { BlockData } from '@gocontento/client'
import Button from './Button'

export default function Text({ block }: { block: BlockData }) {
  return (
    <div className="py-9 md:py-16">
      <div className="prose mx-auto">
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
