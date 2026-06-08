"use client";

import { Github, Linkedin, Twitter, Send, Mail, Briefcase } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/context/ToastContext";

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      toast("Please enter your email address.", "error");
      return;
    }
    if (!emailRegex.test(email.trim())) {
      toast("Please enter a valid email address.", "error");
      return;
    }
    toast("Successfully subscribed to Jobzz newsletter! 🚀", "success");
    setEmail("");
  }

  return (
    <div id="footer-section" className="w-full border-t border-card-border mt-16 bg-card-bg/60 backdrop-blur-md transition-all duration-300 relative overflow-hidden">
      {/* Background soft glowing lights */}
      <div className="absolute top-[-50px] left-[15%] w-[250px] h-[250px] rounded-full bg-indigo-500/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-50px] right-[10%] w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-text-muted relative z-10">
        
        {/* Top Section: Branding & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-8 mb-12">
          <div className="max-w-md space-y-3">
            <div className="flex gap-3 items-center text-indigo-600 dark:text-indigo-400">
              <Briefcase className="w-6 h-6 animate-pulse" />
              <span className="text-2xl font-bold text-foreground tracking-tight">
                Jobzz
              </span>
            </div>
            <span className="text-sm text-text-muted block leading-relaxed">
              Connecting elite tech talents with verified global opportunities. Explore jobs, leverage AI matching tools, and accelerate your engineering career.
            </span>
          </div>

          {/* Premium Newsletter Box */}
          <div className="w-full lg:max-w-md p-6 rounded-2xl border border-card-border/50 bg-card-bg/40 backdrop-blur-sm shadow-sm space-y-4">
            <div className="space-y-1">
              <span className="text-base font-bold text-foreground block flex items-center gap-1.5">
                <Mail size={16} className="text-indigo-500" />
                Subscribe to our Newsletter
              </span>
              <span className="text-xs text-text-muted block">
                Get weekly updates on tech jobs, recruitment insights, and career growth tips.
              </span>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm shadow-sm"
                />
              </div>
              <button
                id="newsletter-submit"
                type="submit"
                className="cursor-pointer px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl hover:shadow-md hover:shadow-indigo-500/10 transition-all flex items-center gap-1.5 active:scale-[0.98] text-sm shrink-0"
              >
                Subscribe <Send size={12} />
              </button>
            </form>
          </div>
        </div>

        <hr className="border-card-border opacity-20 my-6" />

        {/* Middle Section: Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
          
          {/* Column 1: Candidates */}
          <div className="flex flex-col gap-2.5">
            <span className="font-bold text-foreground tracking-wide uppercase text-xs opacity-80 block">
              Candidates
            </span>
            <Link id="footer-link-jobs" href="/jobs" className="text-sm text-text-muted hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Browse Jobs
            </Link>
            <Link id="footer-link-applied" href="/applied-jobs" className="text-sm text-text-muted hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Applied Status
            </Link>
            <Link id="footer-link-profile" href="/profile" className="text-sm text-text-muted hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Developer Profile
            </Link>
          </div>

          {/* Column 2: Companies */}
          <div className="flex flex-col gap-2.5">
            <span className="font-bold text-foreground tracking-wide uppercase text-xs opacity-80 block">
              Companies
            </span>
            <Link id="footer-link-post-job" href="/add-job" className="text-sm text-text-muted hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Post a Position
            </Link>
            <Link id="footer-link-recruiter-settings" href="/profile" className="text-sm text-text-muted hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Recruiter Center
            </Link>
            <Link id="footer-link-integrations" href="#" className="text-sm text-text-muted hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Enterprise Tools
            </Link>
          </div>

          {/* Column 3: Platform */}
          <div className="flex flex-col gap-2.5">
            <span className="font-bold text-foreground tracking-wide uppercase text-xs opacity-80 block">
              Platform
            </span>
            <Link id="footer-link-about" href="#" className="text-sm text-text-muted hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              About Jobzz
            </Link>
            <Link id="footer-link-news" href="#" className="text-sm text-text-muted hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Company Blog
            </Link>
            <Link id="footer-link-faq" href="#" className="text-sm text-text-muted hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Help & FAQ
            </Link>
          </div>

          {/* Column 4: Contact & Legal */}
          <div className="flex flex-col gap-2.5">
            <span className="font-bold text-foreground tracking-wide uppercase text-xs opacity-80 block">
              Legal & Privacy
            </span>
            <Link id="footer-link-privacy" href="#" className="text-sm text-text-muted hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Privacy Policy
            </Link>
            <Link id="footer-link-terms" href="#" className="text-sm text-text-muted hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Terms of Service
            </Link>
            <Link id="footer-link-security" href="#" className="text-sm text-text-muted hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Security Compliance
            </Link>
          </div>
        </div>

        <hr className="border-card-border opacity-20 my-6" />

        {/* Bottom Section: Copyrights & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
          <span className="text-xs text-text-muted">
            © {new Date().getFullYear()} Jobzz. Designed and engineered for modern engineering talents. All rights reserved.
          </span>

          <div className="flex gap-3">
            <a
              id="social-github-btn"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Jobzz GitHub Repository"
              className="p-2 rounded-full border border-card-border hover:bg-indigo-soft/10 hover:text-indigo-500 hover:scale-110 transition-all duration-200 text-text-muted flex items-center justify-center bg-card-bg/40 shadow-sm"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              id="social-linkedin-btn"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Jobzz LinkedIn Professional"
              className="p-2 rounded-full border border-card-border hover:bg-indigo-soft/10 hover:text-indigo-500 hover:scale-110 transition-all duration-200 text-text-muted flex items-center justify-center bg-card-bg/40 shadow-sm"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              id="social-twitter-btn"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Jobzz Twitter Updates"
              className="p-2 rounded-full border border-card-border hover:bg-indigo-soft/10 hover:text-indigo-500 hover:scale-110 transition-all duration-200 text-text-muted flex items-center justify-center bg-card-bg/40 shadow-sm"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
