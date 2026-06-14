import { redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

/** Legacy URL — public company profiles live under /companies/[id] */
export default async function LegacyCompanyProfileRedirect({ params }: Props) {
  const { id } = await params;
  redirect(`/companies/${id}`);
}
