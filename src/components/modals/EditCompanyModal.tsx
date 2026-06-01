"use client";

import {
  Dialog,
  Text,
  Box,
  Heading,
  Flex,
  Button,
  TextField,
  TextArea,
  Grid,
} from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import { useToast } from "@/context/ToastContext";

type EditCompanyModalProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  companyId: string;
  initialData: {
    name: string;
    description: string;
    website: string;
    location: string;
    logoUrl: string;
    industry: string;
    companySize: string;
    founded: string;
    phone: string;
    email: string;
  };
  onSaveSuccess: () => void;
};

export default function EditCompanyModal({
  isOpen,
  setIsOpen,
  companyId,
  initialData,
  onSaveSuccess,
}: EditCompanyModalProps) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [founded, setFounded] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isOpen && initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setWebsite(initialData.website || "");
      setLocation(initialData.location || "");
      setLogoUrl(initialData.logoUrl || "");
      setIndustry(initialData.industry || "");
      setCompanySize(initialData.companySize || "");
      setFounded(initialData.founded || "");
      setPhone(initialData.phone || "");
      setEmail(initialData.email || "");
    }
  }, [isOpen, initialData]);

  async function handleSave() {
    if (!name.trim()) {
      toast("Company name is required", "error");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/company/profile/${companyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          website,
          location,
          logoUrl,
          industry,
          companySize,
          founded,
          phone,
          email,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast("Company profile updated successfully!", "success");
        onSaveSuccess();
        setIsOpen(false);
      } else {
        toast(data.message || "Failed to update profile", "error");
      }
    } catch {
      toast("Error updating company profile", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="max-w-[620px] bg-card-bg border border-card-border shadow-2xl rounded-2xl p-6 text-foreground">
        
        {/* Header */}
        <Flex justify="between" align="center" mb="4">
          <Box>
            <Dialog.Title size="5" className="text-foreground font-extrabold tracking-tight m-0">
              Edit Company Settings
            </Dialog.Title>
            <Dialog.Description size="1" className="text-text-muted mt-1.5 block">
              Provide corporate details to attract top developer talent.
            </Dialog.Description>
          </Box>
          <Button
            variant="ghost"
            color="gray"
            onClick={() => setIsOpen(false)}
            className="cursor-pointer p-1 rounded-full hover:bg-card-border/40 transition-colors"
          >
            <X size={18} />
          </Button>
        </Flex>

        <Box className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Company Name */}
          <Box className="space-y-1.5">
            <Text size="1" className="font-bold text-foreground block">
              Company Name <span className="text-red-500">*</span>
            </Text>
            <TextField.Root
              placeholder="e.g. Acme Tech Corporation"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background border border-card-border/60 rounded-xl"
            />
          </Box>

          {/* Tagline / Description */}
          <Box className="space-y-1.5">
            <Text size="1" className="font-bold text-foreground block">
              Company Description / Overview
            </Text>
            <TextArea
              placeholder="Tell developers about your work culture, missions, and technology stack..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="bg-background border border-card-border/60 rounded-xl"
            />
          </Box>

          {/* Grid fields */}
          <Grid columns="2" gap="4">
            <Box className="space-y-1.5">
              <Text size="1" className="font-bold text-foreground block">
                Website URL
              </Text>
              <TextField.Root
                placeholder="https://acme.org"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="bg-background border border-card-border/60 rounded-xl"
              />
            </Box>

            <Box className="space-y-1.5">
              <Text size="1" className="font-bold text-foreground block">
                Corporate Location
              </Text>
              <TextField.Root
                placeholder="e.g. Bangalore, India"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-background border border-card-border/60 rounded-xl"
              />
            </Box>

            <Box className="space-y-1.5">
              <Text size="1" className="font-bold text-foreground block">
                Industry Sector
              </Text>
              <TextField.Root
                placeholder="e.g. Fintech, SaaS, AI"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="bg-background border border-card-border/60 rounded-xl"
              />
            </Box>

            <Box className="space-y-1.5">
              <Text size="1" className="font-bold text-foreground block">
                Company Size
              </Text>
              <TextField.Root
                placeholder="e.g. 50-200 employees"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="bg-background border border-card-border/60 rounded-xl"
              />
            </Box>

            <Box className="space-y-1.5">
              <Text size="1" className="font-bold text-foreground block">
                Founded Year
              </Text>
              <TextField.Root
                placeholder="e.g. 2018"
                value={founded}
                onChange={(e) => setFounded(e.target.value)}
                className="bg-background border border-card-border/60 rounded-xl"
              />
            </Box>

            <Box className="space-y-1.5">
              <Text size="1" className="font-bold text-foreground block">
                Logo URL (Direct Link)
              </Text>
              <TextField.Root
                placeholder="https://acme.org/logo.png"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="bg-background border border-card-border/60 rounded-xl"
              />
            </Box>

            <Box className="space-y-1.5">
              <Text size="1" className="font-bold text-foreground block">
                Corporate Email
              </Text>
              <TextField.Root
                type="email"
                placeholder="contact@acme.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border border-card-border/60 rounded-xl"
              />
            </Box>

            <Box className="space-y-1.5">
              <Text size="1" className="font-bold text-foreground block">
                Corporate Phone
              </Text>
              <TextField.Root
                placeholder="+91 9988776655"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-background border border-card-border/60 rounded-xl"
              />
            </Box>
          </Grid>
        </Box>

        {/* Footer Actions */}
        <Flex justify="end" gap="3" mt="6" className="border-t border-card-border/50 pt-4">
          <Button
            variant="soft"
            color="gray"
            onClick={() => setIsOpen(false)}
            disabled={saving}
            className="cursor-pointer rounded-xl font-semibold shadow-sm px-4 py-2 hover:bg-card-border/40 transition-colors"
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            color="indigo"
            onClick={handleSave}
            disabled={saving}
            className="cursor-pointer rounded-xl font-semibold shadow-md px-4 py-2 flex items-center gap-1.5 hover:bg-indigo-700 transition"
          >
            {saving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-t-transparent border-white rounded-full animate-spin mr-1" />
                Saving...
              </>
            ) : (
              <>
                <Save size={14} />
                Save Changes
              </>
            )}
          </Button>
        </Flex>

      </Dialog.Content>
    </Dialog.Root>
  );
}
