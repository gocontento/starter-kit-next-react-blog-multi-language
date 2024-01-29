import Link from "next/link";
import { ContentData } from "@gocontento/client";
import { CategoryLink } from "@/types";

export default function CategoryPill({
  category,
}: {
  category: CategoryLink | undefined;
}) {
  return (
    category && (
      <Link
        href={`${category.href}`}
        className="w-max rounded-3xl bg-black px-4 py-2 flex items-center hover:opacity-80"
      >
        <span className="text-xs font-semibold uppercase text-white">
          {category.label}
        </span>
      </Link>
    )
  );
}
