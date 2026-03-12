import React from "react";

const testimonials = [
  {
    name: "Francis Lacson",
    handle: "@franlacson",
    text: "Cal.com has really upped the ante for scheduling tools. The flexibility and customization options make it a must‑have for my business.",
  },
  {
    name: "Tosin",
    handle: "@heisguyy",
    text: "Cal.com is the best thing I discovered this year. It just works, and my clients love it.",
  },
  {
    name: "Zach Waterfield",
    handle: "@zachwaterfield",
    text: "I use Cal to manage all my external meetings and it’s the perfect solution. Has all the features I need and I couldn’t live without it.",
  },
  {
    name: "David Asabina",
    handle: "@davidasabina",
    text: "For an open source product to be this focused on customer service is next level.",
  },
  {
    name: "Rotimi Best",
    handle: "@rotimi_best",
    text: "It’s a no‑brainer for me, the sheer brand minimalism and power in one product is unmatched.",
  },
  {
    name: "Chris Lee",
    handle: "@chrislee",
    text: "I’ve had Cal.com for a year and it’s incredible how far they’ve come with their product.",
  },
];

const Testimonials = () => {
  return (
    <section className="border-b border-black/5 bg-[#f5f5f7]">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-18 lg:py-20">
        <h2
          className="font-display text-center text-[22px] font-normal tracking-tight text-[#202124] md:text-[26px]"
          style={{
            "--font-selector": "R0Y7Q2FsIFNhbnMtcmVndWxhcg==",
            "--framer-font-family":
              '"Cal Sans", "Cal Sans Placeholder", sans-serif',
          }}
        >
          Loved by teams of all sizes
        </h2>
        <p
          className="mt-3 text-center text-[14px] font-light leading-[1.4] text-[#898989]"
          style={{
            "--framer-font-family":
              '"Cal Sans UI Variable Light", "Cal Sans UI Variable Light Placeholder", sans-serif',
            "--framer-font-family-bold":
              '"Cal Sans UI Variable Light", "Cal Sans UI Variable Light Placeholder", sans-serif',
            "--framer-font-open-type-features": "normal",
          }}
        >
          Hear from people who run their entire scheduling stack on Cal.com.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-3xl bg-white p-5 text-left shadow-sm ring-1 ring-black/5"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] text-xs font-semibold text-white">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p
                    className="text-[13px] font-normal text-[#202124]"
                    style={{
                      "--font-selector": "R0Y7Q2FsIFNhbnMtcmVndWxhcg==",
                      "--framer-font-family":
                        '"Cal Sans", "Cal Sans Placeholder", sans-serif',
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="text-xs text-[#6e6e73]"
                    style={{
                      "--framer-font-family":
                        '"Cal Sans UI Variable Light", "Cal Sans UI Variable Light Placeholder", sans-serif',
                      "--framer-font-family-bold":
                        '"Cal Sans UI Variable Light", "Cal Sans UI Variable Light Placeholder", sans-serif',
                      "--framer-font-open-type-features": "normal",
                    }}
                  >
                    {item.handle}
                  </p>
                </div>
              </div>
              <p
                className="mt-3 text-[14px] font-light leading-[1.4] text-[#898989]"
                style={{
                  "--framer-font-family":
                    '"Cal Sans UI Variable Light", "Cal Sans UI Variable Light Placeholder", sans-serif',
                  "--framer-font-family-bold":
                    '"Cal Sans UI Variable Light", "Cal Sans UI Variable Light Placeholder", sans-serif',
                  "--framer-font-open-type-features": "normal",
                }}
              >
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
