export const EMAIL = "monishobaid@gmail.com";

export type Point = { lead?: string; text: string };

export type Experience = {
  company: string;
  role: string;
  date: string;
  type: string;
  location: string;
  duration?: string;
  url?: string;
  logo?: string;
  domain?: string;
  points: Point[];
};

export const experience: Experience[] = [
  {
    company: "Berri",
    role: "Co-founder",
    date: "2025 — Present",
    type: "Founder",
    location: "Noida, India",
    url: "https://berri.in",
    logo: "/berri-logo.png",
    points: [
      {
        lead: "Product",
        text: "An always-on-top macOS workspace for notes, websites, screenshots and clipboard, one keystroke away.",
      },
      {
        lead: "Traction",
        text: "Grew from a personal tool to 40+ active users and 30+ paying customers on a one-time $20 lifetime plan.",
      },
      {
        lead: "Ownership",
        text: "Native app, landing site, licensing and device activation, onboarding, support and every shipped update.",
      },
    ],
  },
  {
    company: "The Economic Times",
    role: "AI Product Apprentice",
    date: "Aug 2025 — Present",
    type: "Apprenticeship",
    location: "Noida, India",
    domain: "economictimes.indiatimes.com",
    points: [
      {
        lead: "Real-time AI segmentation",
        text: "Developed a live-events system with live transcription, transcription-based analytics and real-time video clipping, actively used by editorial teams at NBT, The Economic Times and The Times of India.",
      },
      {
        lead: "Times Health AI Nutritionist",
        text: "Led product strategy for personalised nutrition recommendations powered by LLMs.",
      },
      {
        lead: "ET Market GPT",
        text: "Drove RAG-based retrieval to sharpen the accuracy of financial insights.",
      },
    ],
  },
  {
    company: "FuelBuddy",
    role: "Software Developer",
    date: "Feb 2024 — Aug 2025",
    type: "Full-time",
    location: "Delhi NCR, India",
    duration: "1 year 7 months",
    domain: "fuelbuddy.in",
    points: [
      {
        lead: "Driver app",
        text: "Owned the driver app end to end and everything that revolved around it: releases, the ops tooling behind it, and live video recording over WebRTC and mediasoup so ops could monitor deliveries, a dealbreaker requirement from the business side.",
      },
      {
        lead: "Customer app",
        text: "Worked on migrating the customer app from Vue 3 to React Native after the iOS payment gateway kept breaking, and owned the wallet module and all of its logic.",
      },
      { text: "Fun job, fun company, fun people." },
    ],
  },
  {
    company: "FuelBuddy",
    role: "Frontend Intern",
    date: "Aug 2023 — Jan 2024",
    type: "Internship",
    location: "Delhi NCR, India",
    duration: "6 months",
    domain: "fuelbuddy.in",
    points: [
      {
        text: "First corporate gig. Nervous at first, but the team was generous with their time. Worked on the UI layer across the driver and customer apps.",
      },
    ],
  },
  {
    company: "Miles2Smiles NGO",
    role: "Social Work Intern",
    date: "Feb 2022 — Apr 2022",
    type: "Internship",
    location: "Delhi, India",
    duration: "3 months",
    logo: "/m2s-logo.jpg",
    url: "https://miles2smile.org",
    points: [
      { text: "Coordinated relief efforts and skill-development workshops for refugee families." },
    ],
  },
];

export const education = [
  {
    school: "Dublin City University",
    degree: "MSc Computing, Artificial Intelligence (NLP)",
    date: "2026 — Present",
    location: "Dublin, Ireland",
    logo: "/dcu-logo.png",
  },
  {
    school: "Noida Institute of Engineering and Technology",
    degree: "B.Tech, Computer Science",
    date: "2020 — 2024",
    location: "Greater Noida, India",
    logo: "/niet-logo.png",
  },
];

export const skills = [
  "TypeScript",
  "React",
  "React Native",
  "Next.js",
  "Node.js",
  "Python",
  "Django",
  "Swift / macOS",
  "WebRTC",
  "SQL",
  "GraphQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "LLMs & RAG",
  "NLP",
];

export const resumeSkills = [
  "0 → 1 Product",
  "macOS apps",
  "React Native",
  "WebRTC",
  "Django REST",
  "Next.js",
  "LLM integration",
  "RAG",
  "Payments & licensing",
  "Docker / K8s",
  "AWS",
];

export const honours = [
  {
    org: "OpenWeaver Hackathon",
    type: "Award",
    title: "SpotLight Award",
    meta: "200+ participants",
    mono: "OW",
    color: "#7c3aed",
  },
  {
    org: "IIM Bengal",
    type: "Finalist",
    title: "Policy Competition, top 4 of 20 teams",
    meta: "Climate adaptation & mitigation in West Bengal agriculture · policy brief",
    mono: "IIM",
    color: "#b45309",
  },
];
