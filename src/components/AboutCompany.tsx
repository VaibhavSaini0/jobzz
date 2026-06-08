"use client";

import Loading from "./lodingstate/Loading";
import {
  Globe,
  MapPin,
  Building2,
  Calendar,
  Users,
  Phone,
  Mail,
} from "lucide-react";

export default function AboutCompany({
  company,
  isLoading,
}: {
  company: any; // Using any to prevent typing conflicts during compiler execution
  isLoading: boolean;
}) {
  if (isLoading) {
    return <Loading />;
  }

  if (!company) {
    return (
      <div className="max-w-7xl mx-auto w-full">
        <p className="text-sm text-text-muted">
          No company information available.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full space-y-6">
      
      {/* Description / About Us */}
      <div className="space-y-3">
        <h2 className="text-xl text-foreground tracking-tight font-extrabold flex items-center gap-2">
          <Building2 className="text-indigo-500" size={20} /> About Our Organization
        </h2>
        <hr className="border-card-border/50" />
        <p className="text-sm text-text-muted leading-relaxed block whitespace-pre-line bg-card-bg/25 border border-card-border/40 p-5 rounded-2xl">
          {company.description || "No company overview provided yet. Click 'Edit Settings' to add a corporate description."}
        </p>
      </div>

      {/* Corporate Metadata Grid */}
      <div className="space-y-3 pt-2">
        <h2 className="text-xl text-foreground tracking-tight font-extrabold flex items-center gap-2">
          <Calendar className="text-indigo-500" size={20} /> Corporate Profile Details
        </h2>
        <hr className="border-card-border/50" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {/* Industry */}
          <div className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 rounded-2xl transition-all duration-300">
            <div className="p-2.5 bg-indigo-500/5 text-indigo-500 rounded-xl">
              <Building2 size={18} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-text-muted">Industry Sector</span>
              <span className="text-sm font-medium text-foreground block">
                {company.industry || "Not Specified"}
              </span>
            </div>
          </div>

          {/* Founded */}
          <div className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 rounded-2xl transition-all duration-300">
            <div className="p-2.5 bg-indigo-500/5 text-indigo-500 rounded-xl">
              <Calendar size={18} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-text-muted">Founded In</span>
              <span className="text-sm font-medium text-foreground block">
                {company.founded || "Not Specified"}
              </span>
            </div>
          </div>

          {/* Size */}
          <div className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 rounded-2xl transition-all duration-300">
            <div className="p-2.5 bg-indigo-500/5 text-indigo-500 rounded-xl">
              <Users size={18} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-text-muted">Teammate Count</span>
              <span className="text-sm font-medium text-foreground block">
                {company.companySize || "Not Specified"}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 rounded-2xl transition-all duration-300">
            <div className="p-2.5 bg-red-500/5 text-red-500 rounded-xl">
              <MapPin size={18} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-text-muted">Headquarters</span>
              <span className="text-sm font-medium text-foreground block">
                {company.location || "Not Specified"}
              </span>
            </div>
          </div>

          {/* Website */}
          <div className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 rounded-2xl transition-all duration-300">
            <div className="p-2.5 bg-indigo-500/5 text-indigo-500 rounded-xl">
              <Globe size={18} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-text-muted">Official Website</span>
              {company.website ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 text-sm font-semibold hover:underline block"
                >
                  {company.website.replace(/^https?:\/\//, "")}
                </a>
              ) : (
                <span className="text-sm text-text-muted block">Not Specified</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 rounded-2xl transition-all duration-300">
            <div className="p-2.5 bg-indigo-500/5 text-indigo-500 rounded-xl">
              <Mail size={18} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-text-muted">Contact Email</span>
              {company.email ? (
                <a
                  href={`mailto:${company.email}`}
                  className="text-indigo-500 text-sm font-semibold hover:underline block"
                >
                  {company.email}
                </a>
              ) : (
                <span className="text-sm text-text-muted block">Not Specified</span>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 rounded-2xl transition-all duration-300">
            <div className="p-2.5 bg-indigo-500/5 text-indigo-500 rounded-xl">
              <Phone size={18} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-text-muted">Contact Phone</span>
              <span className="text-sm font-medium text-foreground block">
                {company.phone || "Not Specified"}
              </span>
            </div>
          </div>

          {/* Owner Identity */}
          <div className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 rounded-2xl transition-all duration-300">
            <div className="p-2.5 bg-indigo-500/5 text-indigo-500 rounded-xl">
              <Users size={18} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-text-muted">Primary Administrator</span>
              <span className="text-sm font-medium text-foreground truncate block max-w-[200px]">
                Owner ID: {company.ownerId}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
