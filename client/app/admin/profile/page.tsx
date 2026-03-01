"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminToken, getAdminUser, getAuthHeaders } from "@/lib/auth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Calendar, Briefcase, Shield } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  jobs_count: number;
}

export default function AdminProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getAdminToken();
    const user = getAdminUser();

    if (!token || !user) {
      router.push("/admin/auth");
      return;
    }

    fetchProfile();
  }, [router]);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      if (data.success) {
        setProfile(data.data);
      } else {
        setError(data.message || "Failed to load profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !profile) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">
              {error || "Profile not found"}
            </p>
            <Button onClick={fetchProfile} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const profileStats = [
    {
      label: "Jobs Posted",
      value: profile.jobs_count,
      icon: Briefcase,
      color: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Account Type",
      value: profile.role.charAt(0).toUpperCase() + profile.role.slice(1),
      icon: Shield,
      color: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      label: "Member Since",
      value: new Date(profile.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      icon: Calendar,
      color: "bg-green-50",
      textColor: "text-green-600",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-12">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <User size={48} className="text-indigo-600" />
              </div>
              <div className="text-white">
                <h2 className="text-3xl font-bold">{profile.name}</h2>
                <p className="text-indigo-100 mt-1 flex items-center gap-2">
                  <Mail size={16} />
                  {profile.email}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                  <Shield size={14} />
                  {profile.role.charAt(0).toUpperCase() +
                    profile.role.slice(1)}{" "}
                  Account
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 border-b border-gray-200">
            {profileStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className={stat.textColor} size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Profile Information */}
          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Account Information
            </h3>
            <div className="space-y-5">
              <div>
                <Label className="text-gray-700 font-medium">User ID</Label>
                <Input
                  value={profile.id}
                  disabled
                  className="mt-1.5 bg-gray-50 text-gray-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label className="text-gray-700 font-medium">Full Name</Label>
                  <Input
                    value={profile.name}
                    disabled
                    className="mt-1.5 bg-gray-50 text-gray-600"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    value={profile.email}
                    disabled
                    className="mt-1.5 bg-gray-50 text-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label className="text-gray-700 font-medium">Role</Label>
                  <Input
                    value={
                      profile.role.charAt(0).toUpperCase() +
                      profile.role.slice(1)
                    }
                    disabled
                    className="mt-1.5 bg-gray-50 text-gray-600"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 font-medium">
                    Account Created
                  </Label>
                  <Input
                    value={new Date(profile.created_at).toLocaleString(
                      "en-US",
                      {
                        dateStyle: "long",
                        timeStyle: "short",
                      },
                    )}
                    disabled
                    className="mt-1.5 bg-gray-50 text-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Activity Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Briefcase className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Total Jobs Posted</p>
                  <p className="text-sm text-gray-600">All time job listings</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {profile.jobs_count}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-lg">
                  <Calendar className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Account Age</p>
                  <p className="text-sm text-gray-600">
                    Days since registration
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {Math.floor(
                  (new Date().getTime() -
                    new Date(profile.created_at).getTime()) /
                    (1000 * 60 * 60 * 24),
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
