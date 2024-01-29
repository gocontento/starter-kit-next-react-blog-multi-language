import Link from "next/link";
import { CategoryLink } from "@/types";

export default function CategoryPills({
  categoryLinks,
}: {
  categoryLinks: CategoryLink[] | undefined;
}) {
  return (
    categoryLinks && (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-4 my-7">
        {categoryLinks.map((link, index) => {
          return (
            <Link
              key={`category-${index}`}
              href={link.href}
              className="w-min-content rounded-3xl bg-black px-4 py-2 flex items-center hover:opacity-80"
            >
              <span className="text-xs font-semibold uppercase text-white">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    )
  );
}
