"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminToken, getAdminUser, getAuthHeaders } from "@/lib/auth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Briefcase,
  Users,
  TrendingUp,
  DollarSign,
  Plus,
  Eye,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

interface Stats {
  totalJobs: number;
  totalApplications: number;
  activeJobs: number;
  recentApplications: number;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  applications_count: number;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0,
    recentApplications: 0,
  });
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);

  useEffect(() => {
    const token = getAdminToken();
    const user = getAdminUser();

    if (!token || !user) {
      router.push("/admin/auth");
      return;
    }

    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/dashboard/stats`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();

      if (data.success) {
        setStats({
          totalJobs: data.data.totalJobs,
          totalApplications: data.data.totalApplications,
          activeJobs: data.data.activeJobs,
          recentApplications: data.data.recentApplications,
        });
        setRecentJobs(data.data.recentJobs);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (res.ok) {
        toast.success("Job deleted successfully!");
        fetchDashboardData();
      } else {
        toast.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job. Please try again.");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      name: "Total Jobs",
      value: stats.totalJobs,
      icon: Briefcase,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      name: "Total Applications",
      value: stats.totalApplications,
      icon: Users,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      name: "Active Jobs (30d)",
      value: stats.activeJobs,
      icon: TrendingUp,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      name: "Recent Apps (7d)",
      value: stats.recentApplications,
      icon: DollarSign,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's what's happening.
            </p>
          </div>
          <Link href="/admin/jobs/new">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus size={20} className="mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.name}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={stat.textColor} size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Recent Jobs</h2>
            <Link href="/admin/jobs">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentJobs.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No jobs posted yet. Create your first job!
              </div>
            ) : (
              recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span>{job.company}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded">
                          {job.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {job.applications_count || 0} applications
                        </span>
                        <span>
                          Posted {new Date(job.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Link href={`/jobs/${job.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/jobs/new" className="block">
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <Plus className="text-indigo-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Post a Job</h3>
                  <p className="text-sm text-gray-600">
                    Create new job listing
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin/jobs" className="block">
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <Briefcase className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Manage Jobs</h3>
                  <p className="text-sm text-gray-600">
                    View and edit listings
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin/settings" className="block">
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <Users className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Settings</h3>
                  <p className="text-sm text-gray-600">Configure preferences</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
