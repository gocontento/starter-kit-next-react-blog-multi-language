import { BlockData } from '@gocontento/client'
import Image from 'next/image'

export default function ImageBlock({ block }: { block: BlockData }) {
  return (
    <div className="py-9 md:py-16">
      <Image
        src={block.fields.image.assets[0].asset.url}
        alt={block.fields.image.assets[0].asset.description}
        className="prose mx-auto h-full w-full object-cover"
        width={176}
        height={176}
      />
    </div>
  )
}
