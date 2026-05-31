"use client";
import { Button, RadioGroup, Text, Flex } from "@radix-ui/themes";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";

export default function FilterSidebar() {
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const q = searchparams.get("q") || "";
  const initialEt = searchparams.get("et") || "";
  const initialJt = searchparams.get("jt") || "";

  const [jobType, setJobType] = useState(initialJt);
  const [employmentType, setEmploymentType] = useState(initialEt);

  // Sync state if URL changes
  useEffect(() => {
    setJobType(searchparams.get("jt") || "");
    setEmploymentType(searchparams.get("et") || "");
  }, [searchparams]);

  function handleclick() {
    let url = `${pathname}?`;
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (employmentType) params.set("et", employmentType);
    if (jobType) params.set("jt", jobType);
    
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleClear() {
    setJobType("");
    setEmploymentType("");
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    router.push(`${pathname}?${params.toString()}`);
  }

  const hasFilters = jobType || employmentType;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 bg-card-bg border border-card-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
        <Flex justify="between" align="center" className="pb-3 border-b border-card-border/50">
          <Flex align="center" gap="2">
            <Filter size={18} className="text-indigo-600 dark:text-indigo-400" />
            <Text className="font-bold text-foreground" size="4">Filters</Text>
          </Flex>
          {hasFilters && (
            <button
              onClick={handleClear}
              className="text-xs font-semibold text-red-500 hover:text-red-600 cursor-pointer flex items-center gap-1 transition"
            >
              <X size={12} /> Clear
            </button>
          )}
        </Flex>

        <div className="space-y-6">
          <div className="space-y-3">
            <Text className="font-bold text-foreground text-sm tracking-wide uppercase block" color="gray">
              Job Type
            </Text>
            <RadioGroup.Root
              value={jobType}
              onValueChange={(val) => setJobType(val)}
              className="space-y-2.5"
            >
              <Flex gap="2" align="center">
                <RadioGroup.Item value="Remote" id="jt-remote" className="cursor-pointer" />
                <label htmlFor="jt-remote" className="text-sm text-foreground cursor-pointer font-medium hover:text-indigo-500 transition">
                  Remote
                </label>
              </Flex>
              <Flex gap="2" align="center">
                <RadioGroup.Item value="On-site" id="jt-onsite" className="cursor-pointer" />
                <label htmlFor="jt-onsite" className="text-sm text-foreground cursor-pointer font-medium hover:text-indigo-500 transition">
                  On-site
                </label>
              </Flex>
              <Flex gap="2" align="center">
                <RadioGroup.Item value="Hybrid" id="jt-hybrid" className="cursor-pointer" />
                <label htmlFor="jt-hybrid" className="text-sm text-foreground cursor-pointer font-medium hover:text-indigo-500 transition">
                  Hybrid
                </label>
              </Flex>
            </RadioGroup.Root>
          </div>

          <div className="space-y-3">
            <Text className="font-bold text-foreground text-sm tracking-wide uppercase block" color="gray">
              Employment Type
            </Text>
            <RadioGroup.Root
              value={employmentType}
              onValueChange={(val) => setEmploymentType(val)}
              className="space-y-2.5"
            >
              <Flex gap="2" align="center">
                <RadioGroup.Item value="Full-Time" id="et-fulltime" className="cursor-pointer" />
                <label htmlFor="et-fulltime" className="text-sm text-foreground cursor-pointer font-medium hover:text-indigo-500 transition">
                  Full-Time
                </label>
              </Flex>
              <Flex gap="2" align="center">
                <RadioGroup.Item value="Part-Time" id="et-parttime" className="cursor-pointer" />
                <label htmlFor="et-parttime" className="text-sm text-foreground cursor-pointer font-medium hover:text-indigo-500 transition">
                  Part-Time
                </label>
              </Flex>
              <Flex gap="2" align="center">
                <RadioGroup.Item value="Contract" id="et-contract" className="cursor-pointer" />
                <label htmlFor="et-contract" className="text-sm text-foreground cursor-pointer font-medium hover:text-indigo-500 transition">
                  Contract
                </label>
              </Flex>
            </RadioGroup.Root>
          </div>
        </div>

        <Button
          onClick={handleclick}
          size="3"
          color="indigo"
          className="w-full cursor-pointer hover:shadow-lg transition-all duration-300 font-semibold"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
