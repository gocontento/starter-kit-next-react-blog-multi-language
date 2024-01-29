import Link from "next/link";
import { CategoryLink } from "@/types";

export default function CategoryPills({
  categoryLinks,
}: {
  categoryLinks: CategoryLink[] | undefined;
}) {
  return (
    categoryLinks && (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-4">
        {categoryLinks.map((link, index) => {
          return (
            <Link
              key={`category-${index}`}
              href={link.href}
              className="w-min-content group rounded-3xl bg-white px-4 shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <span className="text-sm text-zinc-800 transition group-hover:text-zinc-700 dark:text-white dark:group-hover:text-zinc-300">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    )
  );
}
