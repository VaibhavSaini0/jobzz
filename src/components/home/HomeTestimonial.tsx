"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function HomeTestimonial() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto text-center p-8 md:p-10 rounded-3xl border border-card-border bg-card-bg/60 relative z-10"
    >
      <div className="flex justify-center mb-3">
        <Star className="text-amber-400 fill-amber-400 animate-pulse" size={24} />
      </div>
      <h2 className="text-lg font-bold mb-3 text-foreground">
        Trusted by growing teams
      </h2>
      <p className="text-sm sm:text-base text-text-muted italic leading-relaxed">
        &ldquo;Jobzz helped me land a remote developer role quickly. The job filters are sharp, and the AI cover letter tool saved hours of writing.&rdquo;
      </p>
      <span className="font-semibold text-foreground text-sm mt-4 block">— Priya M., Full Stack Developer</span>
    </motion.section>
  );
}
