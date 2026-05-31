"use client";

import * as Form from "@radix-ui/react-form";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";
import { Button, Flex, Text } from "@radix-ui/themes";
import { Sparkles, Loader2 } from "lucide-react";

export default function SimpleAddJobForm() {
  const employmentTypes = ["Full-Time", "Part-Time", "Contract"];
  const jobTypes = ["Remote", "On-site", "Hybrid"];
  const applyThroughOptions = ["Google", "LinkedIn"];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    employment_type: "",
    job_type: "",
    apply_through: "",
    lastDate: "",
  });

  const { company } = useContext(UserContext);
  const { toast } = useToast();
  const [aiLoading, setAiLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function generateDescription() {
    if (!formData.title.trim()) {
      toast("Enter a job title first", "error");
      return;
    }
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/job-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          location: formData.location,
          employment_type: formData.employment_type,
          job_type: formData.job_type,
          companyName: company?.name,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, description: data.data }));
        toast(data.isDemo ? "Demo description generated" : "AI description generated!", "success");
      } else {
        toast(data.message || "Generation failed", "error");
      }
    } catch {
      toast("AI generation failed", "error");
    } finally {
      setAiLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!company || !company?.id) {
      toast("Company not found. Please register your company first.", "error");
      return;
    }

    const payload = {
      ...formData,
      salary: Number(formData.salary),
      companyId: company?.id,
    };

    try {
      const res = await fetch("/api/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit");

      toast("Job posted successfully!", "success");
      setFormData({
        title: "",
        description: "",
        location: "",
        salary: "",
        employment_type: "",
        job_type: "",
        apply_through: "",
        lastDate: "",
      });
    } catch (err) {
      console.error("Job Submit Error:", err);
      toast("Error submitting job", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-md bg-background text-foreground border border-border">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Post a New Job
      </h1>

      <Form.Root onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "title", label: "Job Title", type: "text" },
          { name: "location", label: "Location", type: "text" },
          { name: "salary", label: "Salary", type: "number" },
        ].map(({ name, label, type }) => (
          <Form.Field name={name} key={name} className="grid gap-1">
            <Form.Label className="font-medium">{label}</Form.Label>
            <Form.Control asChild>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                required={name !== "location"}
                className="p-2 border border-border bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Form.Control>
          </Form.Field>
        ))}

        <Form.Field name="description" className="grid gap-1">
          <Flex justify="between" align="center">
            <Form.Label className="font-medium">Description</Form.Label>
            <Button
              type="button"
              size="1"
              variant="soft"
              color="indigo"
              onClick={generateDescription}
              disabled={aiLoading}
            >
              {aiLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              AI Write
            </Button>
          </Flex>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="p-2 border border-border bg-background text-foreground rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form.Field>

        <Form.Field name="employment_type" className="grid gap-1">
          <Form.Label className="font-medium">Employment Type</Form.Label>
          <select
            name="employment_type"
            value={formData.employment_type}
            onChange={handleChange}
            required
            className="p-2 border border-border bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select type...
            </option>
            {employmentTypes.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </Form.Field>

        <Form.Field name="job_type" className="grid gap-1">
          <Form.Label className="font-medium">Job Type</Form.Label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            required
            className="p-2 border border-border bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select job type...
            </option>
            {jobTypes.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </Form.Field>

        <Form.Field name="apply_through" className="grid gap-1">
          <Form.Label className="font-medium">Apply Through</Form.Label>
          <select
            name="apply_through"
            value={formData.apply_through}
            onChange={handleChange}
            required
            className="p-2 border border-border bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Choose platform...
            </option>
            {applyThroughOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </Form.Field>

        <Form.Field name="lastDate" className="grid gap-1">
          <Form.Label className="font-medium">Application Deadline (Last Date to Apply)</Form.Label>
          <Form.Control asChild>
            <input
              type="date"
              name="lastDate"
              value={formData.lastDate}
              onChange={handleChange}
              className="p-2 border border-border bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
          >
            Submit Job
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
