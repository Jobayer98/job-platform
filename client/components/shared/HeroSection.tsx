"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const popularTags = ["UI Designer", "UX Researcher", "Android", "Admin"];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }
    if (location.trim()) {
      params.set("location", location.trim());
    }

    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleTagClick = (tag: string) => {
    router.push(`/jobs?search=${encodeURIComponent(tag)}`);
  };

  return (
    <section
      className="relative overflow-hidden min-h-[calc(100vh-5rem)]"
      style={{ backgroundColor: "#F8F8FD" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-4">
                Discover
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-4">
                more than
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2">
                <span className="text-blue-500">5000+ Jobs</span>
              </h1>
              <div className="relative inline-block">
                <svg
                  className="w-64 h-3 mt-2"
                  viewBox="0 0 250 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 5 100 2 150 3C200 4 230 8 248 10"
                    stroke="#60A5FA"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="bg-white p-2 rounded-none-lg shadow-lg flex flex-col md:flex-row items-stretch gap-0 border border-gray-200 max-w-2xl mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-3 px-4 py-3 flex-1 border-b md:border-b-0 md:border-r border-gray-200">
                <Search className="text-gray-400 flex-shrink-0" size={20} />
                <Input
                  type="text"
                  placeholder="Job title or keyword"
                  className="border-0 focus-visible:ring-0 p-0 h-auto placeholder:text-gray-400 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 px-4 py-3 flex-1 border-b md:border-b-0 border-gray-200">
                <MapPin className="text-gray-400 flex-shrink-0" size={20} />
                <Input
                  type="text"
                  placeholder="Location"
                  className="border-0 focus-visible:ring-0 p-0 h-auto placeholder:text-gray-400 text-sm"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="md:w-auto p-2">
                <Button
                  type="submit"
                  className="w-full h-full bg-indigo-600 text-white rounded-none-none px-6 hover:bg-indigo-700 font-medium whitespace-nowrap"
                >
                  Search my job
                </Button>
              </div>
            </form>

            {/* Popular Tags */}
            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
              <span className="text-sm text-gray-600">Popular :</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="text-sm px-4 py-1.5 border border-gray-300 rounded-none text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="hidden lg:flex justify-end items-center relative">
            {/* Decorative geometric shapes */}
            <div className="absolute top-0 right-20 w-96 h-96 bg-indigo-100 opacity-30 rounded-none-full blur-3xl -z-10" />
            <div className="absolute bottom-20 left-0 w-64 h-64 bg-blue-100 opacity-40 rounded-none-full blur-2xl -z-10" />

            {/* Geometric accent lines */}
            <svg
              className="absolute top-10 right-10 w-80 h-80 -z-5 opacity-20"
              viewBox="0 0 300 300"
            >
              <path
                d="M50 50 L250 50 L250 250"
                stroke="#6366F1"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
              <path
                d="M100 100 L200 100 L200 200 L100 200 Z"
                stroke="#60A5FA"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Hero Image Container */}
            <div className="relative z-10">
              <div className="relative w-[380px] h-[480px]">
                <Image
                  src="/images/hero-image.png"
                  alt="Job seeker pointing"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
