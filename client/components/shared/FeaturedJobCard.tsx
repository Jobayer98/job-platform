import Image from "next/image";
import Link from "next/link";

interface FeaturedJobCardProps {
  id: string;
  logo: string;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
  employmentType: string;
}

export function FeaturedJobCard({
  id,
  logo,
  title,
  company,
  location,
  description,
  tags,
  employmentType,
}: FeaturedJobCardProps) {
  const tagColors: Record<string, string> = {
    Marketing: "bg-orange-50 text-orange-600",
    Design: "bg-green-50 text-green-600",
    Business: "bg-blue-50 text-blue-600",
    Technology: "bg-red-50 text-red-600",
    Engineering: "bg-blue-50 text-blue-600",
    Sales: "bg-emerald-50 text-emerald-600",
    Finance: "bg-cyan-50 text-cyan-600",
    Operations: "bg-purple-50 text-purple-600",
    "Human Resources": "bg-pink-50 text-pink-600",
    "Customer Support": "bg-indigo-50 text-indigo-600",
  };

  return (
    <Link
      href={`/jobs/${id}`}
      className="block bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex flex-col h-full space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-gray-100 rounded-none flex items-center justify-center overflow-hidden flex-shrink-0">
            {logo.startsWith("/") ? (
              <Image
                src={logo}
                alt={company}
                width={48}
                height={48}
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white font-bold text-lg">
                {company.charAt(0)}
              </div>
            )}
          </div>
          <span className="px-3 py-1 text-xs font-medium text-indigo-600 border border-indigo-600 rounded-none">
            {employmentType}
          </span>
        </div>

        {/* Job Info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">
            {company} · {location}
          </p>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 text-xs font-medium rounded-none ${
                tagColors[tag] || "bg-gray-50 text-gray-600"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
