"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Briefcase, ArrowLeft, Clock, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/lib/constants";
import type { Job } from "@/lib/types";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume_link: "",
    cover_note: "",
  });

  useEffect(() => {
    if (params.id) fetchJob();
  }, [params.id]);

  const fetchJob = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/jobs/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setJob(data.data);
      } else {
        setError("Job not found");
      }
    } catch (error) {
      console.error("Error fetching job", error);
      setError("Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          job_id: params.id,
          ...formData,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", resume_link: "", cover_note: "" });
        // Refresh job data to update application count
        fetchJob();

        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application", error);
      setError("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Job not found</p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="ghost"
          className="mb-8 hover:bg-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full uppercase tracking-wide">
                {job.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-3">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Briefcase size={18} />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={18} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={18} />
                  <span>
                    Posted {new Date(job.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={18} />
                  <span>{job.applications_count || 0} Applications</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Job Description
              </h3>
              <div className="prose prose-gray max-w-none">
                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Apply for this position
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Fill out the form below to submit your application
              </p>

              {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm font-medium">
                    ✓ Application submitted successfully!
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    required
                    placeholder="John Doe"
                    className="mt-1.5"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={submitting}
                  />
                </div>

                <div>
                  <Label className="text-gray-700 font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    required
                    placeholder="john.doe@example.com"
                    className="mt-1.5"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={submitting}
                  />
                </div>

                <div>
                  <Label className="text-gray-700 font-medium">
                    Resume Link <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="url"
                    required
                    placeholder="https://drive.google.com/..."
                    className="mt-1.5"
                    value={formData.resume_link}
                    onChange={(e) =>
                      setFormData({ ...formData, resume_link: e.target.value })
                    }
                    disabled={submitting}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Link to your resume (Google Drive, Dropbox, etc.)
                  </p>
                </div>

                <div>
                  <Label className="text-gray-700 font-medium">
                    Cover Note
                  </Label>
                  <Textarea
                    rows={4}
                    placeholder="Tell us why you're a great fit for this role..."
                    className="mt-1.5"
                    value={formData.cover_note}
                    onChange={(e) =>
                      setFormData({ ...formData, cover_note: e.target.value })
                    }
                    disabled={submitting}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700 h-11"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
