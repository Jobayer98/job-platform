"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { JobCard } from "@/components/shared/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building2,
  SlidersHorizontal,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  created_at: string;
  applications_count: number;
}

const categories = [
  "Technology",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "Engineering",
  "Business",
  "Operations",
  "Human Resource",
];

function JobsContent() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    company: "",
    category: "",
    page: 1,
  });
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  // Initialize filters from URL parameters
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";
    const category = searchParams.get("category") || "";
    const company = searchParams.get("company") || "";

    setFilters((prev) => ({
      ...prev,
      search,
      location,
      category,
      company,
    }));
  }, [searchParams]);

  useEffect(() => {
    fetchJobs();
  }, [filters.page, filters.category]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {
        page: filters.page.toString(),
        limit: "9",
        sort: "created_at:desc",
      };

      if (filters.search) params.search = filters.search;
      if (filters.location) params.location = filters.location;
      if (filters.company) params.company = filters.company;
      if (filters.category) params.category = filters.category;

      const query = new URLSearchParams(params);
      const res = await fetch(`${API_URL}/jobs?${query.toString()}`);
      const data = await res.json();

      if (data.success) {
        setJobs(data.data.jobs);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch jobs", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, page: 1 }));
    fetchJobs();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      location: "",
      company: "",
      category: "",
      page: 1,
    });
    setTimeout(() => fetchJobs(), 0);
  };

  const activeFiltersCount = [
    filters.search,
    filters.location,
    filters.company,
    filters.category,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600 text-lg">
            {pagination.total} opportunities waiting for you
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-none-none-none-lg shadow-md border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search by job title, keyword..."
                className="pl-12 h-12 text-base"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                onKeyDown={handleKeyPress}
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="h-12 px-6 border-gray-300 hover:bg-gray-50"
            >
              <SlidersHorizontal size={20} className="mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-indigo-600 text-white text-xs rounded-none-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
            <Button
              onClick={handleSearch}
              className="h-12 px-8 bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <Search size={20} className="mr-2" />
              Search
            </Button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                    size={18}
                  />
                  <Input
                    placeholder="Location"
                    className="pl-10 h-11"
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                    onKeyDown={handleKeyPress}
                  />
                </div>

                <div className="relative">
                  <Building2
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                    size={18}
                  />
                  <Input
                    placeholder="Company"
                    className="pl-10 h-11"
                    value={filters.company}
                    onChange={(e) =>
                      setFilters({ ...filters, company: e.target.value })
                    }
                    onKeyDown={handleKeyPress}
                  />
                </div>

                <Select
                  value={filters.category || undefined}
                  onValueChange={(val) => {
                    setFilters({
                      ...filters,
                      category: val === "all" ? "" : val,
                      page: 1,
                    });
                  }}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleClearFilters}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Clear all filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters Tags */}
        {activeFiltersCount > 0 && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">
              Active filters:
            </span>
            {filters.search && (
              <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm rounded-none-full border border-indigo-200">
                Search: {filters.search}
              </span>
            )}
            {filters.location && (
              <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm rounded-none-full border border-indigo-200">
                Location: {filters.location}
              </span>
            )}
            {filters.company && (
              <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm rounded-none-full border border-indigo-200">
                Company: {filters.company}
              </span>
            )}
            {filters.category && (
              <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm rounded-none-full border border-indigo-200">
                Category: {filters.category}
              </span>
            )}
          </div>
        )}

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {jobs.length} of {pagination.total} jobs
            <span className="text-gray-400 ml-2">• Sorted by most recent</span>
          </p>
        </div>

        {/* Job Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-none-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-none-lg border border-gray-200">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <p className="text-gray-900 text-xl font-semibold mb-2">
              No jobs found
            </p>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="outline"
              size="icon"
              disabled={filters.page === 1}
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
            >
              <ChevronLeft />
            </Button>
            <span className="text-sm font-medium text-gray-700">
              Page {filters.page} of {pagination.pages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={filters.page === pagination.pages}
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
            >
              <ChevronRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-none-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        </div>
      }
    >
      <JobsContent />
    </Suspense>
  );
}
