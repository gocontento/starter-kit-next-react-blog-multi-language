import { Link } from '@/i18n/routing'
import { ContentData } from '@gocontento/client'

export default function CategoryPill({ category }: { category: ContentData }) {
  return (
    category && (
      <Link
        href={`/blog/category/${category.slug}`}
        className="flex w-max items-center rounded-3xl bg-black px-4 py-2 hover:opacity-80"
      >
        <span className="text-xs font-semibold uppercase text-white">
          {category.name}
        </span>
      </Link>
    )
  )
}
