"use client";

import { Box, Heading, Separator, Text, Flex, Grid, Card } from "@radix-ui/themes";
import { company } from "../../generated/prisma";
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
      <Box className="max-w-7xl mx-auto w-full">
        <Text size="2" color="gray">
          No company information available.
        </Text>
      </Box>
    );
  }

  return (
    <Box className="max-w-7xl mx-auto w-full space-y-6">
      
      {/* Description / About Us */}
      <Box className="space-y-3">
        <Heading size="5" className="text-foreground tracking-tight font-extrabold flex items-center gap-2">
          <Building2 className="text-indigo-500" size={20} /> About Our Organization
        </Heading>
        <Separator size="4" className="bg-card-border/50" />
        <Text size="2" className="text-text-muted leading-relaxed block whitespace-pre-line bg-card-bg/25 border border-card-border/40 p-5 rounded-2xl">
          {company.description || "No company overview provided yet. Click 'Edit Settings' to add a corporate description."}
        </Text>
      </Box>

      {/* Corporate Metadata Grid */}
      <Box className="space-y-3 pt-2">
        <Heading size="5" className="text-foreground tracking-tight font-extrabold flex items-center gap-2">
          <Calendar className="text-indigo-500" size={20} /> Corporate Profile Details
        </Heading>
        <Separator size="4" className="bg-card-border/50" />

        <Grid columns={{ initial: "1", sm: "2" }} gap="4" className="mt-2">
          {/* Industry */}
          <Card className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 transition-all duration-300">
            <div className="p-2.5 bg-indigo-500/5 text-indigo-500 rounded-xl">
              <Building2 size={18} />
            </div>
            <div>
              <Text size="1" color="gray" className="block font-semibold">Industry Sector</Text>
              <Text size="2" weight="medium" className="text-foreground">
                {company.industry || "Not Specified"}
              </Text>
            </div>
          </Card>

          {/* Founded */}
          <Card className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 transition-all duration-300">
            <div className="p-2.5 bg-indigo-500/5 text-indigo-500 rounded-xl">
              <Calendar size={18} />
            </div>
            <div>
              <Text size="1" color="gray" className="block font-semibold">Founded In</Text>
              <Text size="2" weight="medium" className="text-foreground">
                {company.founded || "Not Specified"}
              </Text>
            </div>
          </Card>

          {/* Size */}
          <Card className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 transition-all duration-300">
            <div className="p-2.5 bg-indigo-500/5 text-indigo-500 rounded-xl">
              <Users size={18} />
            </div>
            <div>
              <Text size="1" color="gray" className="block font-semibold">Teammate Count</Text>
              <Text size="2" weight="medium" className="text-foreground">
                {company.companySize || "Not Specified"}
              </Text>
            </div>
          </Card>

          {/* Location */}
          <Card className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 transition-all duration-300">
            <div className="p-2.5 bg-red-500/5 text-red-500 rounded-xl">
              <MapPin size={18} />
            </div>
            <div>
              <Text size="1" color="gray" className="block font-semibold">Headquarters</Text>
              <Text size="2" weight="medium" className="text-foreground">
                {company.location || "Not Specified"}
              </Text>
            </div>
          </Card>

          {/* Website */}
          <Card className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 transition-all duration-300">
            <div className="p-2.5 bg-indigo-500/5 text-indigo-500 rounded-xl">
              <Globe size={18} />
            </div>
            <div>
              <Text size="1" color="gray" className="block font-semibold">Official Website</Text>
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
                <Text size="2" className="text-text-muted">Not Specified</Text>
              )}
            </div>
          </Card>

          {/* Email */}
          <Card className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 transition-all duration-300">
            <div className="p-2.5 bg-indigo-500/5 text-indigo-500 rounded-xl">
              <Mail size={18} />
            </div>
            <div>
              <Text size="1" color="gray" className="block font-semibold">Contact Email</Text>
              {company.email ? (
                <a
                  href={`mailto:${company.email}`}
                  className="text-indigo-500 text-sm font-semibold hover:underline block"
                >
                  {company.email}
                </a>
              ) : (
                <Text size="2" className="text-text-muted">Not Specified</Text>
              )}
            </div>
          </Card>

          {/* Phone */}
          <Card className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 transition-all duration-300">
            <div className="p-2.5 bg-indigo-500/5 text-indigo-500 rounded-xl">
              <Phone size={18} />
            </div>
            <div>
              <Text size="1" color="gray" className="block font-semibold">Contact Phone</Text>
              <Text size="2" weight="medium" className="text-foreground">
                {company.phone || "Not Specified"}
              </Text>
            </div>
          </Card>

          {/* Owner Identity */}
          <Card className="p-4 border border-card-border/60 bg-card-bg/40 backdrop-blur-sm shadow-sm flex items-center gap-3.5 hover:border-indigo-500/20 transition-all duration-300">
            <div className="p-2.5 bg-indigo-500/5 text-indigo-500 rounded-xl">
              <Users size={18} />
            </div>
            <div>
              <Text size="1" color="gray" className="block font-semibold">Primary Administrator</Text>
              <Text size="2" weight="medium" className="text-foreground truncate block max-w-[200px]">
                Owner ID: {company.ownerId}
              </Text>
            </div>
          </Card>
        </Grid>
      </Box>

    </Box>
  );
}
