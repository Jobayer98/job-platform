"use client";

import { HeroSection } from "@/components/shared/HeroSection";
import { CompaniesSection } from "@/components/shared/CompaniesSection";
import { CategorySection } from "@/components/shared/CategorySection";
import { FeaturedJobsSection } from "@/components/shared/FeaturedJobsSection";
import { LatestJobs } from "@/components/shared/LatestJobs";
import { PostingSection } from "@/components/shared/PostingSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <CompaniesSection />
      <CategorySection />
      <PostingSection />
      <FeaturedJobsSection />
      <LatestJobs />
    </>
  );
}
