"use client";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { isEmployer } from "@/lib/roles";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProfileBannerSkeleton } from "@/components/skeleton";
import { profileService } from "@/services/profileService";

export default function HomeProfileNotification() {
  const { user } = useContext(UserContext);
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [loadingResume, setLoadingResume] = useState(false);

  const isCandidate = Boolean(user && !isEmployer(user.role));

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

  if (!isCandidate) {
    return null;
  }

  const showBanner = !loadingResume && isIncomplete;

  return (
    <div
      className="w-full max-w-4xl mx-auto z-40 relative mt-2"
      style={{ minHeight: showBanner ? undefined : loadingResume ? "5.5rem" : 0 }}
      aria-live="polite"
    >
      {loadingResume && <ProfileBannerSkeleton />}
      {showBanner && (
        <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/10 border border-amber-500/30 backdrop-blur-md p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-amber-500/5 text-left">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
              <Sparkles size={20} />
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
          <Link
            href="/profile"
            prefetch={false}
            className="inline-flex items-center justify-center gap-1.5 min-h-11 whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-bold bg-amber-800 hover:bg-amber-900 text-white shadow-sm active:scale-[0.98] transition-transform"
          >
            Update Profile <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}
