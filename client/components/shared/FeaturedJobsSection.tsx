"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedJobCard } from "./FeaturedJobCard";
import { API_URL } from "@/lib/constants";
import type { Job } from "@/lib/types";

export function FeaturedJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs?limit=8&sort=created_at:desc`);
      const data = await res.json();

      if (data.success) {
        setJobs(data.data.jobs);
      }
    } catch (error) {
      console.error("Failed to fetch featured jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const truncateDescription = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Featured <span className="text-blue-500">jobs</span>
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
            <div className="inline-block animate-spin rounded-none-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading featured jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 border border-gray-200">
            <p className="text-gray-600">
              No featured jobs available at the moment.
            </p>
          </div>
        ) : (
          /* Jobs Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <FeaturedJobCard
                key={job.id}
                id={job.id}
                logo="/images/logo.png"
                title={job.title}
                company={job.company}
                location={job.location}
                description={truncateDescription(job.description)}
                tags={[job.category]}
                employmentType="Full Time"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
