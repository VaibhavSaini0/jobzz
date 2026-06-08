import {
  ApplicationStatus,
  STATUS_LABELS,
  normalizeStatus,
} from "@/lib/application-status";

const colorClasses: Record<ApplicationStatus, string> = {
  pending: "bg-card-border/50 text-text-muted border-card-border/70",
  reviewed: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  shortlisted: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  interview: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  rejected: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  hired: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

export default function ApplicationStatusBadge({
  status,
  size = "2",
}: {
  status: string;
  size?: "1" | "2" | "3";
}) {
  const normalized = normalizeStatus(status) as ApplicationStatus;
  const padding = size === "1" ? "px-2 py-0.5 text-[10px]" : size === "3" ? "px-3.5 py-1.5 text-sm" : "px-3 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold border capitalize shrink-0 ${padding} ${colorClasses[normalized]}`}
    >
      {STATUS_LABELS[normalized]}
    </span>
  );
}
