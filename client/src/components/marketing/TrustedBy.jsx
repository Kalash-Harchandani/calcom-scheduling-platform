import React from "react";

const logos = [
  "Calbase",
  "Udemy",
  "Rho",
  "Deel",
  "Framer",
  "Ramp",
  "PlanetScale",
];

const TrustedBy = () => {
  return (
    <section className="border-b border-black/5 bg-[#f5f5f7]">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-10 md:flex-row md:items-center md:gap-10 md:px-6 md:py-12">
        <div className="w-full md:w-1/3">
          <p className="text-left text-xs font-normal text-[#6e6e73] md:text-sm">
            Trusted by fast‑growing companies around the world
          </p>
        </div>
        <div className="w-full overflow-hidden md:w-2/3">
          <div className="trusted-marquee">
            {[...logos, ...logos].map((logo, index) => (
              <span
                key={`${logo}-${index}`}
                className="whitespace-nowrap text-sm font-medium text-[#3c3c43] md:text-base"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;

