import { Badge } from "@radix-ui/themes";
import {
  ApplicationStatus,
  STATUS_COLORS,
  STATUS_LABELS,
  normalizeStatus,
} from "@/lib/application-status";

export default function ApplicationStatusBadge({
  status,
  size = "2",
}: {
  status: string;
  size?: "1" | "2" | "3";
}) {
  const normalized = normalizeStatus(status) as ApplicationStatus;

  return (
    <Badge
      size={size}
      color={STATUS_COLORS[normalized]}
      variant="soft"
      className="rounded-full capitalize"
    >
      {STATUS_LABELS[normalized]}
    </Badge>
  );
}
