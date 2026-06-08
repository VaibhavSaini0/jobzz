"use client";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { isEmployer } from "@/lib/roles";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { profileService } from "@/services/profileService";

export default function HomeProfileNotification() {
  const { user } = useContext(UserContext);
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [loadingResume, setLoadingResume] = useState(false);

  useEffect(() => {
    async function checkProfile() {
      if (!user?.id || isEmployer(user.role)) return;

      setLoadingResume(true);
      try {
        const data = await profileService.getProfile();
        if (data.success && data.data) {
          const r = data.data;
          const incomplete =
            !r ||
            !r.summary ||
            !r.skills || r.skills.length === 0 ||
            !r.experiences || r.experiences.length === 0 ||
            !r.resumePdfUrl;
          setIsIncomplete(incomplete);
        } else {
          setIsIncomplete(true);
        }
      } catch (err) {
        console.error("Failed to check profile completion:", err);
      } finally {
        setLoadingResume(false);
      }
    }
    checkProfile();
  }, [user]);

  return (
    <AnimatePresence>
      {user && !isEmployer(user.role) && !loadingResume && isIncomplete && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="w-full max-w-4xl mx-auto z-40 relative -mb-6 mt-2"
        >
          <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/10 border border-amber-500/30 backdrop-blur-md p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-amber-500/5 text-left">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
                <Sparkles size={20} className="animate-pulse" />
              </div>
              <div className="space-y-0.5">
                <span className="text-sm sm:text-base font-bold text-foreground block">
                  Complete your candidate profile!
                </span>
                <span className="text-xs sm:text-sm text-text-muted block">
                  Stand out to recruiters! Add your experiences, skills, and upload your PDF resume to unlock full matching capabilities.
                </span>
              </div>
            </div>
            <Link href="/profile">
              <button className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-bold whitespace-nowrap px-4 py-2.5 rounded-xl text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center gap-1.5 shadow-sm">
                Update Profile <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
