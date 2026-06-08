"use client";

import { Building2, MapPin, Globe, ExternalLink, Mail, Phone } from "lucide-react";

interface CompanyContactsCardProps {
  location: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
}

export default function CompanyContactsCard({
  location,
  website,
  email,
  phone,
}: CompanyContactsCardProps) {
  return (
    <div className="p-6 border border-card-border bg-card-bg/70 backdrop-blur-md shadow-lg rounded-2xl space-y-4">
      <h3 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-card-border/50 pb-2">
        <Building2 size={16} className="text-indigo-500" />
        <span>Workspace Contacts</span>
      </h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-red-500 shrink-0" />
          <span className="text-sm text-text-muted truncate">{location || "Headquarters not set"}</span>
        </div>

        <div className="flex items-center gap-3">
          <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 text-sm font-semibold hover:underline flex items-center gap-1 overflow-hidden truncate"
            >
              <span className="truncate">{website.replace(/^https?:\/\//, "")}</span>
              <ExternalLink size={10} className="shrink-0" />
            </a>
          ) : (
            <span className="text-sm text-text-muted">Website not set</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
          <span className="text-sm text-text-muted truncate">{email || "Support email not set"}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
          <span className="text-sm text-text-muted truncate">{phone || "Support phone not set"}</span>
        </div>
      </div>
    </div>
  );
}
