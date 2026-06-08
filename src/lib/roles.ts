export const ROLES = {
  CANDIDATE: "user",
  EMPLOYER: "admin",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

const ALLOWED_ROLES: UserRole[] = [ROLES.CANDIDATE, ROLES.EMPLOYER];

export function normalizeRole(role: unknown): UserRole {
  if (typeof role === "string" && ALLOWED_ROLES.includes(role as UserRole)) {
    return role as UserRole;
  }
  return ROLES.CANDIDATE;
}

export function isEmployer(role: string | undefined | null): boolean {
  return role === ROLES.EMPLOYER;
}

export function roleLabel(role: string | undefined | null): string {
  return isEmployer(role) ? "Employer" : "Candidate";
}
