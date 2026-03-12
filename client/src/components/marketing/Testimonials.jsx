import React from "react";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    name: "Zach Waterfield",
    handle: "CEO",
    imgColor: "bg-green-600",
    text: "I use cal to manage all my external meetings and it's the perfect solution. Has all the features I need and couldn't live without it.",
  },
  {
    name: "Deyson",
    handle: "Designer",
    imgColor: "bg-orange-500",
    text: "Cal has been amazing for me!\n\nI have recently started offering Personalized one-on-one training for creating Final Cut Pro - Effects, Transitions, and Templates.\n\nThanks to Cal, scheduling sessions and managing payments with my students is a breeze.\n\nWhat is really amazing is how much you get with the free version. It is a big help for testing new services, especially when you're running a small business like mine.\n\nI fully recommend Cal. Give it a try, I think you will love it as much as I do!",
  },
  {
    name: "Wilson Wilson",
    handle: "Co-founder of Senja",
    imgColor: "bg-blue-600",
    text: "I just learned about cal.com this morning and now they have a new customer. I'm head over heels about Peer's project. It just works! Well done!",
  },
  {
    name: "Aashish Upadhyay",
    handle: "",
    imgColor: "bg-red-500",
    text: "There are so many app integrations available, offering a wide range of choices for video conferencing. Additionally, the built-in Cal Video feature is excellent as it allows you to seamlessly conduct video conferences directly in your browser, without the need to download and install any additional applications in your computer.",
  },
  {
    name: "Mickey",
    handle: "",
    imgColor: "bg-black",
    initials: "MI",
    text: "Thrilled with this scheduling app—it's a game-changer. The intuitive interface and advanced features streamline my time management. The standout, however, is the incredible support team—swift, expert responses to every query. A perfect combo for seamless scheduling and top-notch customer service.\n\nP.s. Way better than Calendly",
  },
  {
    name: "Guillermo Rauch",
    handle: "@rauchg",
    imgColor: "bg-black",
    text: "Coolest domain. Check\nCoolest mission. Check\nCoolest product. Check\n\ncal.com",
  },
  {
    name: "Francis Lacson",
    handle: "",
    imgColor: "bg-black",
    initials: "FL",
    text: "Cal.com has really upped the ante for scheduling tools! I knew right away, even when I started using it, that it was one step above the rest. It has an intuitive interface, flexibility in customization options, and seamless integration into my workflow that makes it a must-have for my business.\n\nA special thank you to Milos for going the extra mile to ensure I had the best experience. His support was prompt, professional, and tailored to my needs.",
  },
  {
    name: "Chris Lee",
    handle: "",
    imgColor: "bg-black",
    initials: "CL",
    text: "I've had Cal.com for a year and it's incredible how far they've come with their product. This is by far the best, most efficient, and robust scheduling app on the market today. From their curated selection of useful integrations to their sleek and minimalist design, Cal.com will impress your clients as much as it will impress your users. With GDPR, SOC, and HIPAA-compliant options and security built in, Cal.com is perfect for any business.",
  },
  {
    name: "Nickolas Tazes",
    handle: "@nickolas_tazes",
    imgColor: "bg-gray-800",
    text: "I had a Calendly and a cal.com account. Now I only have @calcom.\nIt's a no-brainer!",
  },
];

const Testimonials = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#f5f5f7] pb-32 pt-20">
      <div className="relative mx-auto max-w-7xl px-4 md:px-12 lg:px-20">
        
        {/* Infinite Background Grid Lines */}
        <div className="absolute left-4 right-4 top-[-1rem] bottom-[-1rem] md:left-12 md:right-12 lg:left-20 lg:right-20 md:top-[-4rem] md:bottom-[-4rem] pointer-events-none">
          {/* Horizontal lines */}
          <div className="absolute top-0 -left-[100vw] w-[200vw] h-[1px] bg-black/[0.04]" />
          <div className="absolute bottom-0 -left-[100vw] w-[200vw] h-[1px] bg-black/[0.04]" />
          
          {/* Vertical lines */}
          <div className="absolute left-0 -top-[100vh] h-[200vh] w-[1px] bg-black/[0.04]" />
          <div className="absolute right-0 -top-[100vh] h-[200vh] w-[1px] bg-black/[0.04]" />

          {/* Crosshairs */}
          <svg className="absolute -top-1.5 -left-1.5 w-3 h-3 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <svg className="absolute -top-1.5 -right-1.5 w-3 h-3 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <svg className="absolute -bottom-1.5 -left-1.5 w-3 h-3 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <svg className="absolute -bottom-1.5 -right-1.5 w-3 h-3 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="text-center mb-16 mt-8">
            <h2 className="font-display text-[32px] font-bold tracking-tight text-[#111111] md:text-[44px]">
              See why our users love cal.com
            </h2>
            <div className="mt-6 flex items-center justify-center gap-3">
               <button 
                 onClick={() => navigate("/app/dashboard")}
                 className="rounded-full bg-[#111111] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-black"
               >
                 Get started ›
               </button>
               <button className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-[#111111] hover:bg-gray-50 flex items-center gap-1">
                 Book a demo ›
               </button>
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((item, idx) => (
            <article
              key={idx}
              className="break-inside-avoid flex flex-col rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm text-left hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${item.imgColor}`}>
                  {item.initials || item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#111111]">
                    {item.name}
                  </p>
                  {item.handle && (
                    <p className="text-[12px] text-[#6e6e73]">
                      {item.handle}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-[14px] leading-[1.6] text-[#3c3c43] whitespace-pre-wrap">
                {item.text}
              </p>
            </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
