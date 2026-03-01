import Link from "next/link";
import {
  ArrowRight,
  Wrench,
  TrendingUp,
  Megaphone,
  DollarSign,
  Monitor,
  Code,
  Briefcase,
  Users,
} from "lucide-react";
import { CategoryCard } from "./CategoryCard";

export function CategorySection() {
  const categories = [
    {
      icon: Wrench,
      title: "Design",
      jobCount: 235,
    },
    {
      icon: TrendingUp,
      title: "Sales",
      jobCount: 756,
    },
    {
      icon: Megaphone,
      title: "Marketing",
      jobCount: 140,
    },
    {
      icon: DollarSign,
      title: "Finance",
      jobCount: 325,
    },
    {
      icon: Monitor,
      title: "Technology",
      jobCount: 436,
    },
    {
      icon: Code,
      title: "Engineering",
      jobCount: 542,
    },
    {
      icon: Briefcase,
      title: "Business",
      jobCount: 211,
    },
    {
      icon: Users,
      title: "Human Resource",
      jobCount: 346,
    },
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore by <span className="text-blue-500">category</span>
          </h2>
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            Show all jobs
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              icon={category.icon}
              title={category.title}
              jobCount={category.jobCount}
              href={`/jobs?category=${category.title.toLowerCase()}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
