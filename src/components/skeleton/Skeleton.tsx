import { cn } from "@/lib/cn";

type SkeletonProps = {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
};

const roundedMap = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export default function Skeleton({
  className,
  rounded = "lg",
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton-shimmer bg-card-border/50",
        roundedMap[rounded],
        className
      )}
      aria-hidden
    />
  );
}
