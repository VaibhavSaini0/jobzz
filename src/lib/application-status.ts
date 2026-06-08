export const APPLICATION_STATUSES = [
  "pending",
  "reviewed",
  "shortlisted",
  "interview",
  "rejected",
  "hired",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "Pending",
  reviewed: "Under Review",
  shortlisted: "Shortlisted",
  interview: "Interview",
  rejected: "Rejected",
  hired: "Hired",
};

export const STATUS_COLORS: Record<
  ApplicationStatus,
  "gray" | "blue" | "indigo" | "purple" | "red" | "green"
> = {
  pending: "gray",
  reviewed: "blue",
  shortlisted: "indigo",
  interview: "purple",
  rejected: "red",
  hired: "green",
};

export function normalizeStatus(status: unknown): ApplicationStatus {
  if (
    typeof status === "string" &&
    APPLICATION_STATUSES.includes(status as ApplicationStatus)
  ) {
    return status as ApplicationStatus;
  }
  return "pending";
}

export function isValidStatus(status: unknown): status is ApplicationStatus {
  return (
    typeof status === "string" &&
    APPLICATION_STATUSES.includes(status as ApplicationStatus)
  );
}
