"use client";

import { Rocket, Zap, ShieldCheck, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

const benefitsList = [
  { icon: Rocket, title: "Fast applications", desc: "Apply with your saved profile and skip repetitive forms." },
  { icon: Zap, title: "AI cover letters", desc: "Generate job-specific cover letters powered by Gemini AI." },
  { icon: ShieldCheck, title: "Structured hiring", desc: "Employers manage listings and applicants from one dashboard." },
  { icon: HeartHandshake, title: "Modern UX", desc: "Clean search, filters, dark mode, and mobile-friendly design." },
];

export default function HomeBenefits() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative z-10 space-y-8"
    >
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-foreground m-0">
          Why teams choose Jobzz
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefitsList.map(({ icon: Icon, title, desc }) => (
          <motion.div key={title} variants={itemVariants} className="h-full">
            <div className="h-full bg-card-bg border border-card-border p-6 rounded-2xl hover:border-indigo-500/30 transition-colors">
              <div className="p-2.5 bg-indigo-soft/15 text-indigo-600 w-fit rounded-xl mb-3 shrink-0">
                <Icon size={22} />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground">
                {title}
              </h3>
              <span className="text-sm text-text-muted leading-relaxed block">
                {desc}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
