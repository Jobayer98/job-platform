import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock } from "lucide-react";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    category: string;
    created_at: string;
    applications_count: number;
  };
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
            <Briefcase />
          </div>
          <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {job.category}
          </span>
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-1">{job.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{job.company}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{new Date(job.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-500">
          {job.applications_count} Applications
        </span>
        <Link href={`/jobs/${job.id}`}>
          <Button
            size="sm"
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
