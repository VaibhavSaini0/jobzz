"use client";
//@ts-nocheck
import {
  Avatar,
  Box,
  Flex,
  Text,
  Button,
  Badge,
  ThickChevronRightIcon,
} from "@radix-ui/themes";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Building } from "lucide-react";

export default function Jobcard({
  job,
  fromSearch = false,
}: {
  job: any;
  fromSearch: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <div className="h-full flex flex-col bg-card-bg border border-card-border hover:border-indigo-500/50 dark:hover:border-indigo-400/40 rounded-2xl p-5 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
        
        {/* Subtle hover gradient background blob */}
        <div className="absolute -inset-y-0 -left-4 w-12 bg-indigo-500/5 blur-xl group-hover:w-24 transition-all duration-500 rounded-full pointer-events-none" />

        <Flex align="start" justify="between" mb="3" gap="3">
          <Box className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-foreground line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {job.title}
            </h3>
          </Box>
          <Badge size="2" color="indigo" variant="soft" className="rounded-full shrink-0">
            {job.employment_type}
          </Badge>
        </Flex>

        <div className="flex-1 mb-4">
          <p className="text-text-muted text-sm leading-relaxed line-clamp-4">
            {job.description}
          </p>
        </div>

        {/* Location & Details Badges */}
        <Flex gap="2" mb="4" wrap="wrap">
          <Badge size="1" color="gray" variant="surface" className="rounded-md flex items-center gap-1">
            <MapPin size={10} /> {job.location}
          </Badge>
          <Badge size="1" color="green" variant="surface" className="rounded-md">
            ₹{job.salary ? job.salary.toLocaleString() : "Competitive"}
          </Badge>
        </Flex>

        <Flex align="center" justify="between" mt="auto" className="gap-3">
          <Box className="max-w-[60%]">
            <Link href={`/company/profile/${job.company.id}`}>
              <div className="flex items-center gap-2 p-1.5 rounded-lg border border-card-border bg-background hover:bg-indigo-soft/10 transition duration-200">
                <Avatar
                  size="1"
                  src={job.employer_logo || ""}
                  radius="full"
                  fallback={job?.company?.name?.charAt(0).toUpperCase() || <Building size={12} />}
                />
                <Text size="2" weight="bold" className="text-foreground line-clamp-1 truncate block">
                  {job.company.name}
                </Text>
              </div>
            </Link>
          </Box>

          <Button
            size="2"
            variant="solid"
            color="indigo"
            className="cursor-pointer font-medium hover:shadow-lg transition-all"
            asChild
          >
            <Link href={`/jobs/${job.id}`}>
              <Flex gap="1" align="center">
                <span>Details</span>
                <ThickChevronRightIcon />
              </Flex>
            </Link>
          </Button>
        </Flex>
      </div>
    </motion.div>
  );
}
