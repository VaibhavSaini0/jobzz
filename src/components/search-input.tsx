"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchInput() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState<{ title: string }[]>([]);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && input.trim()) {
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
      setSuggestion([]);
    }
  }

  // Fetch suggestions with debouncing
  useEffect(() => {
    if (!input.trim()) {
      setSuggestion([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search/suggestion?q=${encodeURIComponent(input.trim())}`);
        const data = await res.json();
        if (data.success) {
          setSuggestion(data.data);
        } else {
          setSuggestion([]);
        }
      } catch (err) {
        console.error("Failed to fetch suggestions:", err);
        setSuggestion([]);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setSuggestion([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto"
    >
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3.5 h-5 w-5 text-text-muted pointer-events-none" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search jobs..."
          className="w-full pl-11 pr-4 py-2.5 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm sm:text-base shadow-sm"
        />
      </div>

      {input.trim() && suggestion.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 z-50 bg-card-bg border border-card-border rounded-xl shadow-lg overflow-hidden transition-all">
          {suggestion.map((item, index) => (
            <p
              key={index}
              onClick={() => {
                setInput(item.title);
                router.push(`/search?q=${encodeURIComponent(item.title)}`);
                setSuggestion([]);
              }}
              className="px-4 py-2.5 hover:bg-indigo-soft/10 cursor-pointer text-sm sm:text-base text-foreground transition duration-150 border-b border-card-border/50 last:border-b-0"
            >
              {item.title}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
