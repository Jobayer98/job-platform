import Image from "next/image";

export function CompaniesSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
        <p className="text-gray-400 text-sm mb-8">Companies we helped grow</p>
        <div className="flex flex-wrap items-center justify-between gap-8 md:gap-12">
          <Image
            src="/images/vodafone.png"
            alt="Vodafone"
            width={120}
            height={40}
            className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
          />
          <Image
            src="/images/intel.png"
            alt="Intel"
            width={80}
            height={40}
            className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
          />
          <Image
            src="/images/tesla.png"
            alt="Tesla"
            width={100}
            height={40}
            className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
          />
          <Image
            src="/images/amd.png"
            alt="AMD"
            width={80}
            height={40}
            className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
          />
          <div className="text-gray-300 text-2xl font-bold">Talkit</div>
        </div>
      </div>
    </section>
  );
}
