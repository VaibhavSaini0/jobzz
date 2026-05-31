"use client";

import { Box, Flex, Text, Separator, Link as RadixLink, IconButton, TextField, Button } from "@radix-ui/themes";
import { Github, Linkedin, Twitter, Send, Mail, Briefcase } from "lucide-react";
import { useState } from "react";
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
    <Box id="footer-section" className="w-full border-t border-card-border mt-16 bg-card-bg/60 backdrop-blur-md transition-all duration-300 relative overflow-hidden">
      {/* Background soft glowing lights */}
      <div className="absolute top-[-50px] left-[15%] w-[250px] h-[250px] rounded-full bg-indigo-500/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-50px] right-[10%] w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-text-muted relative z-10">
        
        {/* Top Section: Branding & Newsletter */}
        <Flex direction={{ initial: "column", lg: "row" }} justify="between" align={{ initial: "stretch", lg: "center" }} gap="8" className="mb-12">
          <Box className="max-w-md space-y-3">
            <Flex gap="3" align="center" className="text-indigo-600 dark:text-indigo-400">
              <Briefcase className="w-6 h-6 animate-pulse" />
              <Text size="6" weight="bold" className="text-foreground tracking-tight">
                Jobzz
              </Text>
            </Flex>
            <Text size="2" className="text-text-muted block leading-relaxed">
              Connecting elite tech talents with verified global opportunities. Explore jobs, leverage AI matching tools, and accelerate your engineering career.
            </Text>
          </Box>

          {/* Premium Newsletter Box */}
          <Box className="w-full lg:max-w-md p-6 rounded-2xl border border-card-border/50 bg-card-bg/40 backdrop-blur-sm shadow-sm space-y-4">
            <div className="space-y-1">
              <Text size="3" weight="bold" className="text-foreground block flex items-center gap-1.5">
                <Mail size={16} className="text-indigo-500" />
                Subscribe to our Newsletter
              </Text>
              <Text size="1" className="text-text-muted block">
                Get weekly updates on tech jobs, recruitment insights, and career growth tips.
              </Text>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="flex-1 relative">
                <TextField.Root
                  id="newsletter-email"
                  type="text"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="2"
                  className="w-full bg-input-bg/50 border-card-border"
                />
              </div>
              <Button
                id="newsletter-submit"
                type="submit"
                size="2"
                color="indigo"
                className="cursor-pointer font-semibold hover:shadow-md hover:shadow-indigo-500/10 transition-all flex items-center gap-1.5"
              >
                Subscribe <Send size={12} />
              </Button>
            </form>
          </Box>
        </Flex>

        <Separator orientation="horizontal" size="4" className="bg-card-border opacity-20 my-6" />

        {/* Middle Section: Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
          
          {/* Column 1: Candidates */}
          <Flex direction="column" gap="2.5">
            <Text weight="bold" size="3" className="text-foreground tracking-wide uppercase text-xs opacity-80">
              Candidates
            </Text>
            <RadixLink id="footer-link-jobs" href="/jobs" size="2" color="indigo" className="hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Browse Jobs
            </RadixLink>
            <RadixLink id="footer-link-applied" href="/applied-jobs" size="2" color="indigo" className="hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Applied Status
            </RadixLink>
            <RadixLink id="footer-link-profile" href="/profile" size="2" color="indigo" className="hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Developer Profile
            </RadixLink>
          </Flex>

          {/* Column 2: Companies */}
          <Flex direction="column" gap="2.5">
            <Text weight="bold" size="3" className="text-foreground tracking-wide uppercase text-xs opacity-80">
              Companies
            </Text>
            <RadixLink id="footer-link-post-job" href="/profile" size="2" color="indigo" className="hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Post a Position
            </RadixLink>
            <RadixLink id="footer-link-recruiter-settings" href="/profile" size="2" color="indigo" className="hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Recruiter Center
            </RadixLink>
            <RadixLink id="footer-link-integrations" href="#" size="2" color="indigo" className="hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Enterprise Tools
            </RadixLink>
          </Flex>

          {/* Column 3: Platform */}
          <Flex direction="column" gap="2.5">
            <Text weight="bold" size="3" className="text-foreground tracking-wide uppercase text-xs opacity-80">
              Platform
            </Text>
            <RadixLink id="footer-link-about" href="#" size="2" color="indigo" className="hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              About Jobzz
            </RadixLink>
            <RadixLink id="footer-link-news" href="#" size="2" color="indigo" className="hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Company Blog
            </RadixLink>
            <RadixLink id="footer-link-faq" href="#" size="2" color="indigo" className="hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Help & FAQ
            </RadixLink>
          </Flex>

          {/* Column 4: Contact & Legal */}
          <Flex direction="column" gap="2.5">
            <Text weight="bold" size="3" className="text-foreground tracking-wide uppercase text-xs opacity-80">
              Legal & Privacy
            </Text>
            <RadixLink id="footer-link-privacy" href="#" size="2" color="indigo" className="hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Privacy Policy
            </RadixLink>
            <RadixLink id="footer-link-terms" href="#" size="2" color="indigo" className="hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Terms of Service
            </RadixLink>
            <RadixLink id="footer-link-security" href="#" size="2" color="indigo" className="hover:text-indigo-500 hover:translate-x-1 transition-all duration-200 w-fit">
              Security Compliance
            </RadixLink>
          </Flex>
        </div>

        <Separator orientation="horizontal" size="4" className="bg-card-border opacity-20 my-6" />

        {/* Bottom Section: Copyrights & Socials */}
        <Flex justify="between" align="center" direction={{ initial: "column", md: "row" }} gap="4" className="pt-2">
          <Text size="1" className="text-text-muted">
            © {new Date().getFullYear()} Jobzz. Designed and engineered for modern engineering talents. All rights reserved.
          </Text>

          <Flex gap="3">
            <IconButton id="social-github-btn" variant="ghost" color="gray" asChild className="hover:text-indigo-500 hover:scale-110 transition-all duration-200 text-text-muted">
              <a href="https://github.com" target="_blank" aria-label="Jobzz GitHub Repository"><Github className="w-4 h-4" /></a>
            </IconButton>
            <IconButton id="social-linkedin-btn" variant="ghost" color="gray" asChild className="hover:text-indigo-500 hover:scale-110 transition-all duration-200 text-text-muted">
              <a href="https://linkedin.com" target="_blank" aria-label="Jobzz LinkedIn Professional"><Linkedin className="w-4 h-4" /></a>
            </IconButton>
            <IconButton id="social-twitter-btn" variant="ghost" color="gray" asChild className="hover:text-indigo-500 hover:scale-110 transition-all duration-200 text-text-muted">
              <a href="https://twitter.com" target="_blank" aria-label="Jobzz Twitter Updates"><Twitter className="w-4 h-4" /></a>
            </IconButton>
          </Flex>
        </Flex>

      </div>
    </Box>
  );
}
