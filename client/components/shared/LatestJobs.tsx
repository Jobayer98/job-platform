"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { API_URL } from "@/lib/constants";
import type { Job } from "@/lib/types";

export function LatestJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestJobs();
  }, []);

  const fetchLatestJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs?limit=8&sort=created_at:desc`);
      const data = await res.json();

      if (data.success) {
        setJobs(data.data.jobs);
      }
    } catch (error) {
      console.error("Failed to fetch latest jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Engineering: "border-blue-500 text-blue-600",
      Design: "border-purple-500 text-purple-600",
      Marketing: "border-orange-500 text-orange-600",
      Sales: "border-green-500 text-green-600",
      Finance: "border-emerald-500 text-emerald-600",
      Operations: "border-cyan-500 text-cyan-600",
      "Human Resources": "border-pink-500 text-pink-600",
      "Customer Support": "border-indigo-500 text-indigo-600",
    };
    return colors[category] || "border-gray-500 text-gray-600";
  };

  const getCompanyInitial = (company: string) => {
    return company.charAt(0).toUpperCase();
  };

  const getCompanyColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-green-100 text-green-600",
      "bg-purple-100 text-purple-600",
      "bg-orange-100 text-orange-600",
      "bg-cyan-100 text-cyan-600",
      "bg-pink-100 text-pink-600",
      "bg-indigo-100 text-indigo-600",
      "bg-red-100 text-red-600",
    ];
    return colors[index % colors.length];
  };

  return (
    <section style={{ backgroundColor: "#F8F8FD" }} className="py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Latest <span className="text-blue-500">jobs open</span>
          </h2>
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            Show all jobs
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading latest jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-200">
            <p className="text-gray-600">No jobs available at the moment.</p>
          </div>
        ) : (
          /* Jobs Grid */
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="flex items-center gap-4 bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* Logo */}
                <div
                  className={`w-16 h-16 ${getCompanyColor(index)} flex items-center justify-center flex-shrink-0 font-bold text-2xl`}
                >
                  {getCompanyInitial(job.company)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Briefcase size={14} />
                    <span>{job.company}</span>
                    <span>·</span>
                    <MapPin size={14} />
                    <span className="truncate">{job.location}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap">
                    <span
                      className={`px-3 py-1 text-xs font-medium border ${getCategoryColor(job.category)}`}
                    >
                      {job.category}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                      {job.applications_count || 0} applicants
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
