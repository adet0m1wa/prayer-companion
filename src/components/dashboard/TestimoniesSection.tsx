import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { TestimonyCard } from "./TestimonyCard";

import sarahAvatar from "../../images/dp for testimonies/sarah.png";
import davidAvatar from "../../images/dp for testimonies/david.png";
import graceAvatar from "../../images/dp for testimonies/grace dp.png";

const TESTIMONIES = [
  {
    name: "Sarah M.",
    handle: "@sarah_m",
    avatarSrc: sarahAvatar,
    text: "God has been so faithful this season. What started as a painful breakup led me to a deeper understanding of His love. I started reading about forgiveness on this app and it completely changed my perspective. I'm now volunteering at my church and helping others walk through similar seasons.",
  },
  {
    name: "David K.",
    handle: "@david_k",
    avatarSrc: davidAvatar,
    text: "I was struggling with doubt for years. The theology section helped me ask honest questions without feeling guilty. I found answers I didn't know I needed and my faith is stronger than ever. This app gave me permission to wrestle with God and come out holding on tighter.",
  },
  {
    name: "Grace O.",
    handle: "@grace_o",
    avatarSrc: graceAvatar,
    text: "Prayer always felt like a monologue until I found the prayer aspect here. Learning about biblical prayer patterns completely transformed how I talk to God. Now I actually look forward to my quiet time. My family has noticed the change in me and my daughter started praying on her own too.",
  },
];

const slideTransition = { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] };

export function TestimoniesSection() {
  const [page, setPage] = useState(0);
  const totalPages = TESTIMONIES.length;

  return (
    <div className="flex flex-col gap-[16px] w-full">
      {/* Header: title left, pagination right */}
      <div className="flex items-center justify-between w-full">
        <h2 className="font-heading text-[18px] font-semibold text-ink-default">
          Testimonies
        </h2>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-[16px]">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="flex items-center justify-center w-[28px] h-[28px] rounded-[22px] bg-surface-muted"
            style={{ opacity: page === 0 ? 0.4 : 1 }}
            disabled={page === 0}
          >
            <CaretLeft size={18} weight="bold" className="text-accent-default" />
          </button>

          <span className="font-body text-[12px] font-semibold text-ink-default">
            {page + 1} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            className="flex items-center justify-center w-[28px] h-[28px] rounded-[22px] bg-surface-muted"
            style={{ opacity: page === totalPages - 1 ? 0.4 : 1 }}
            disabled={page === totalPages - 1}
          >
            <CaretRight size={18} weight="bold" className="text-accent-default" />
          </button>
        </div>
      </div>

      {/* Outer clip container — hides off-screen pages */}
      <div className="mx-[-24px]" style={{ overflow: "hidden" }}>
        {/* Horizontal track — slides by page */}
        <motion.div
          className="flex"
          style={{ width: `${totalPages * 100}%` }}
          animate={{ x: `${-page * (100 / totalPages)}%` }}
          transition={slideTransition}
        >
          {TESTIMONIES.map((testimony, idx) => (
            <div
              key={idx}
              style={{ width: `${100 / totalPages}%` }}
            >
              <div className="w-full px-[24px]">
                <TestimonyCard {...testimony} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
