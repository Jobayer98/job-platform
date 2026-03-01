import { Button } from "@/components/ui/button";
import Image from "next/image";

export function PostingSection() {
  return (
    <section className="mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
      <div className="relative py-16 md:py-20">
        {/* Clipped Background */}
        <div
          className="absolute inset-0 bg-indigo-600"
          style={{
            clipPath:
              "polygon(8% 0%, 100% 0%, 100% 10%, 100% 75%, 80% 100%, 10% 100%, 0% 100%, 0% 15%)",
          }}
        ></div>

        {/* Content */}
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Start posting
                <br />
                jobs today
              </h2>
              <p className="text-lg text-indigo-100">
                Start posting jobs for only $10.
              </p>
              <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg rounded-none">
                Sign Up For Free
              </Button>
            </div>

            {/* Spacer for layout */}
            <div className="hidden lg:block"></div>
          </div>
        </div>

        {/* Dashboard Image - Outside clipped area */}
        <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-37 w-[45%] pointer-events-none z-20">
          <div className="relative w-full h-[400px]">
            <Image
              src="/images/dashboard.png"
              alt="Dashboard Preview"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
