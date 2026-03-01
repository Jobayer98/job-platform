import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  jobCount: number;
  href: string;
  isHighlighted?: boolean;
}

export function CategoryCard({
  icon: Icon,
  title,
  jobCount,
  href,
  isHighlighted = false,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={`${
        isHighlighted
          ? "bg-indigo-600 text-white"
          : "bg-white text-gray-900 hover:bg-indigo-600 hover:text-white"
      } border border-gray-200 rounded-none-lg p-6 transition-all duration-300 group`}
    >
      <div className="flex flex-col space-y-4">
        <div
          className={`w-12 h-12 ${
            isHighlighted
              ? "bg-white/20"
              : "bg-indigo-50 group-hover:bg-white/20"
          } rounded-none-lg flex items-center justify-center transition-colors`}
        >
          <Icon
            className={`${
              isHighlighted
                ? "text-white"
                : "text-indigo-600 group-hover:text-white"
            } transition-colors`}
            size={24}
            strokeWidth={2}
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="flex items-center gap-2">
            <p
              className={`text-sm ${
                isHighlighted
                  ? "text-white/80"
                  : "text-gray-500 group-hover:text-white/80"
              } transition-colors`}
            >
              {jobCount} jobs available
            </p>
            <ArrowRight
              className={`${
                isHighlighted
                  ? "text-white"
                  : "text-gray-400 group-hover:text-white"
              } group-hover:translate-x-1 transition-all`}
              size={16}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
