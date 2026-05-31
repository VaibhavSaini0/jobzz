"use client";

import { Box, Card, Flex, Text, Heading } from "@radix-ui/themes";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const loadingSubtexts = [
  "Matching elite tech talents...",
  "Searching verified global opportunities...",
  "Loading premium developer profiles...",
  "Analyzing market salary parameters...",
  "Preparing responsive layouts...",
];

export default function RootLoading() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingSubtexts.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="root-loading-container" className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background select-none overflow-hidden transition-all duration-300">
      
      {/* Absolute Dynamic Glowing Background Blobs */}
      <div className="absolute top-[20%] left-[25%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] right-[25%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

      <Flex direction="column" align="center" gap="5" className="relative z-10 w-full max-w-sm px-6">
        
        {/* Animated Brand Pulse Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="flex items-center justify-center p-5 rounded-full border border-indigo-500/20 bg-indigo-500/5 shadow-[0_0_50px_rgba(99,102,241,0.1)] mb-2 relative"
        >
          {/* Infinite orbital rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/30 animate-spin" style={{ animationDuration: '12s' }} />
          
          <Briefcase className="w-12 h-12 text-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]" />
        </motion.div>

        {/* Glassmorphic Loading Detail Box */}
        <Card className="w-full p-6 border border-card-border/50 bg-card-bg/40 backdrop-blur-md shadow-2xl rounded-3xl relative overflow-hidden flex flex-col items-center text-center gap-4">
          <Flex direction="column" align="center" gap="1">
            <Heading size="6" weight="bold" className="text-foreground tracking-tight flex items-center gap-1.5 justify-center">
              Jobzz
              <Sparkles size={16} className="text-indigo-500 animate-bounce" />
            </Heading>
            <Text size="1" className="text-text-muted tracking-widest uppercase font-semibold">
              PREMIUM TECH PORTAL
            </Text>
          </Flex>

          {/* Core Infinite Progress Loader */}
          <div className="w-full h-1 bg-card-border rounded-full overflow-hidden relative mt-2">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-full h-full"
            />
          </div>

          {/* Cyclical Fading Subtexts */}
          <div className="h-6 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={textIndex}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 0.8 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="text-text-muted text-sm font-medium flex items-center gap-2 justify-center"
              >
                <Loader2 size={12} className="animate-spin text-indigo-500" />
                {loadingSubtexts[textIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </Card>

      </Flex>
    </div>
  );
}
