import { NextResponse } from "next/server";
import prismaclient from "@/services/prisma";
import { jobs } from "@/data";
import { Checkcookie } from "@/HelperFun/Checkcookie";

const INDUSTRIES = [
  "SaaS (Software as a Service)",
  "FinTech (Financial Technology)",
  "Artificial Intelligence (AI)",
  "Machine Learning (ML)",
  "Web3 / Blockchain",
  "Cyber Security",
  "E-commerce",
  "HealthTech",
  "EdTech",
  "Gaming & Entertainment",
  "Cloud Computing",
  "DevTools & Infrastructure",
  "IoT (Internet of Things)",
  "PropTech (Property Tech)",
  "AdTech (Advertising Tech)",
  "Logistics & Supply Chain",
  "TravelTech",
  "InsurTech",
  "Robotics & Automation",
  "HRTech",
  "LegalTech",
  "Enterprise Software",
  "CleanTech & Energy",
  "Financetech",
  "BioTech",
  "Automotive & Autonomous",
];

const SIZES = [
  "1-10 employees (Early Stage)",
  "11-50 employees (Growth Stage)",
  "51-200 employees (Mid Market)",
  "201-500 employees (Scale-up)",
  "501-1000 employees (Large)",
  "1000-5000 employees (Enterprise)",
  "5000+ employees (Global Giant)",
];

const LOCATIONS = [
  "Remote (Work from Anywhere)",
  "Bangalore, India",
  "San Francisco, USA",
  "London, UK",
  "Berlin, Germany",
  "Singapore",
  "Tokyo, Japan",
  "Sydney, Australia",
  "Paris, France",
  "Amsterdam, Netherlands",
  "Mumbai, India",
  "Delhi NCR, India",
  "Hyderabad, India",
  "Pune, India",
  "Chennai, India",
  "New York, USA",
  "Seattle, USA",
  "Austin, USA",
  "Boston, USA",
  "Toronto, Canada",
  "Dublin, Ireland",
  "Stockholm, Sweden",
  "Zurich, Switzerland",
  "Tel Aviv, Israel",
  "Dubai, UAE",
];

const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Django",
  "Go (Golang)",
  "Rust",
  "Java",
  "Spring Boot",
  "C++",
  "C#",
  ".NET Core",
  "Ruby",
  "Ruby on Rails",
  "PHP",
  "Laravel",
  "HTML5 & CSS3",
  "Tailwind CSS",
  "Sass / SCSS",
  "Angular",
  "Vue.js",
  "Svelte",
  "GraphQL",
  "REST APIs",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Elasticsearch",
  "AWS (Amazon Web Services)",
  "Google Cloud Platform (GCP)",
  "Microsoft Azure",
  "Docker",
  "Kubernetes",
  "Terraform",
  "CI/CD Pipelines",
  "Git & GitHub",
  "GitHub Actions",
  "Jenkins",
  "Linux Systems",
  "Figma",
  "UI/UX Design",
  "System Architecture",
  "Solidity",
];

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { success: false, message: "Seeding is disabled in production" },
      { status: 403 }
    );
  }

  const user = await Checkcookie();
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    // 1. Seed lookup lists
    // Clear old options
    await prismaclient.staticOption.deleteMany({});

    // Bulk create
    const staticData = [
      ...INDUSTRIES.map((v) => ({ type: "industry", value: v })),
      ...SIZES.map((v) => ({ type: "size", value: v })),
      ...LOCATIONS.map((v) => ({ type: "location", value: v })),
      ...SKILLS.map((v) => ({ type: "skill", value: v })),
    ];

    await prismaclient.staticOption.createMany({
      data: staticData,
    });

    // 2. Seed jobs if company exists
    const jobdata = jobs.data;
    const et = ["Full-Time", "Part-Time", "Contract"];
    const jt = ["Remote", "On-site", "Hybrid"];
    const at = ["Manually Apply"];

    if (!Array.isArray(jobdata)) {
      return NextResponse.json({ success: false, message: "Invalid job data" }, { status: 400 });
    }

    const company = await prismaclient.company.findFirst();
    if (!company) {
      return NextResponse.json({
        success: true,
        message: `Successfully seeded ${staticData.length} static lookup values. Now register a company under your profile to seed jobs.`,
      });
    }

    let seeded = 0;
    for (const item of jobdata) {
      await prismaclient.job.create({
        data: {
          title: item.job_title,
          description: item.job_description,
          location: LOCATIONS[Math.floor(Math.random() * 5)] || item.job_location, // pick one of the first 5 locations or standard
          salary: Math.floor(Math.random() * 100000) + 30000,
          employment_type: et[Math.floor(Math.random() * et.length)],
          job_type: jt[Math.floor(Math.random() * jt.length)],
          apply_through: at[Math.floor(Math.random() * at.length)],
          companyId: company.id,
        },
      });
      seeded++;
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${staticData.length} form select items & ${seeded} mock jobs for ${company.name}`,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { success: false, message: "Database seeding failed" },
      { status: 500 }
    );
  }
}
