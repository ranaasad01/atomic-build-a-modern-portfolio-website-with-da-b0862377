"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Phone, Briefcase as Linkedin, MapPin, ExternalLink, ChevronRight, Sparkles, Brain, Code, Cloud, Database, Layers, ArrowRight, Star, Calendar, GraduationCap, Briefcase, User, CheckCircle } from 'lucide-react';
import {
  brandName,
  brandTagline,
  brandEmail,
  brandPhone,
  brandLinkedIn,
  brandLocation,
  primaryCTA,
} from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Data ────────────────────────────────────────────────────────────

const heroTagline =
  "Building intelligent systems that push the boundaries of what AI can do.";

const aboutBio = `I'm a Senior AI/ML Engineer with 4+ years of experience designing and deploying production-grade AI systems. My work spans Generative AI, Large Language Models, multi-agent orchestration, and scalable MLOps pipelines. I thrive at the intersection of research and engineering, turning cutting-edge ideas into real-world products that scale.`;

const aboutHighlights = [
  "4+ years in AI/ML engineering",
  "Shipped 10+ production AI systems",
  "Expert in LLM fine-tuning and RAG",
  "Azure & AWS certified practitioner",
];

const skillCategories = [
  {
    id: "genai",
    icon: Brain,
    label: "Generative AI",
    color: "#00d4ff",
    skills: [
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "OpenAI API",
      "Anthropic Claude",
      "RAG Pipelines",
      "Prompt Engineering",
      "Fine-tuning",
    ],
  },
  {
    id: "ml",
    icon: Sparkles,
    label: "Machine Learning",
    color: "#7b2fff",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Hugging Face",
      "Computer Vision",
      "NLP",
      "Reinforcement Learning",
      "MLflow",
    ],
  },
  {
    id: "backend",
    icon: Code,
    label: "Backend & APIs",
    color: "#00d4ff",
    skills: [
      "FastAPI",
      "Python",
      "Django",
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "Celery",
      "Redis",
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    label: "Cloud & DevOps",
    color: "#7b2fff",
    skills: [
      "Azure",
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Terraform",
      "GitHub Actions",
      "Azure ML",
    ],
  },
  {
    id: "data",
    icon: Database,
    label: "Data & Storage",
    color: "#00d4ff",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Pinecone",
      "Weaviate",
      "Qdrant",
      "Elasticsearch",
      "Redis",
      "Pandas",
    ],
  },
  {
    id: "arch",
    icon: Layers,
    label: "Architecture",
    color: "#7b2fff",
    skills: [
      "Multi-Agent Systems",
      "Microservices",
      "Event-Driven",
      "Vector Databases",
      "Streaming Pipelines",
      "System Design",
      "API Gateway",
      "Load Balancing",
    ],
  },
];

const experiences = [
  {
    id: "datics",
    company: "Datics AI",
    role: "Senior AI/ML Engineer",
    period: "Jan 2023 – Present",
    location: "Lahore, Pakistan",
    type: "Full-time",
    accent: "#00d4ff",
    bullets: [
      "Architected multi-agent LLM systems using LangGraph, reducing manual workflow time by 70%.",
      "Built production RAG pipelines serving 50k+ daily queries with sub-200ms latency.",
      "Led a team of 4 engineers to deliver the MarketVerse AI platform end-to-end.",
      "Designed Azure-hosted MLOps infrastructure with automated retraining and monitoring.",
    ],
  },
  {
    id: "pf",
    company: "Programmer Force",
    role: "AI/ML Engineer",
    period: "Jun 2021 – Dec 2022",
    location: "Lahore, Pakistan",
    type: "Full-time",
    accent: "#7b2fff",
    bullets: [
      "Developed NLP pipelines for document classification and entity extraction at scale.",
      "Integrated OpenAI GPT models into client SaaS products, boosting user engagement 40%.",
      "Built FastAPI microservices for real-time inference with Docker and Kubernetes.",
      "Collaborated with cross-functional teams to ship 6 AI-powered features in 18 months.",
    ],
  },
  {
    id: "scale",
    company: "Scale AI",
    role: "AI Trainer / Data Annotator",
    period: "Mar 2021 – May 2021",
    location: "Remote",
    type: "Contract",
    accent: "#00d4ff",
    bullets: [
      "Annotated and quality-reviewed 10,000+ data samples for LLM training datasets.",
      "Provided RLHF feedback for code generation and reasoning tasks.",
      "Maintained 98% annotation accuracy across complex multi-label classification tasks.",
    ],
  },
  {
    id: "fast",
    company: "FAST-NUCES",
    role: "Research Assistant – AI Lab",
    period: "Sep 2020 – Feb 2021",
    location: "Lahore, Pakistan",
    type: "Part-time",
    accent: "#7b2fff",
    bullets: [
      "Researched transformer-based models for Urdu NLP tasks.",
      "Co-authored a paper on low-resource language model adaptation.",
      "Implemented baseline models in PyTorch for benchmark evaluation.",
    ],
  },
];

const projects = [
  {
    id: "marketverse",
    title: "MarketVerse AI",
    description:
      "An end-to-end AI-powered market intelligence platform. Ingests real-time financial data, runs multi-agent analysis, and generates actionable investment insights using LangGraph orchestration.",
    tags: ["LangGraph", "LangChain", "FastAPI", "Azure", "Pinecone", "GPT-4"],
    accent: "#00d4ff",
    featured: true,
    category: "Generative AI",
    icon: Brain,
  },
  {
    id: "cosmic",
    title: "Cosmic Platform",
    description:
      "A scalable MLOps platform for model lifecycle management. Supports experiment tracking, automated retraining triggers, A/B testing, and one-click deployment to Azure ML endpoints.",
    tags: ["MLflow", "Azure ML", "Docker", "FastAPI", "PostgreSQL", "Grafana"],
    accent: "#7b2fff",
    featured: true,
    category: "MLOps",
    icon: Cloud,
  },
  {
    id: "facia-liveness",
    title: "FACIA Liveness Detection",
    description:
      "Real-time face liveness detection system using 3D depth estimation and anti-spoofing models. Processes 30fps video streams with 99.2% accuracy in production.",
    tags: ["PyTorch", "OpenCV", "FastAPI", "ONNX", "TensorRT", "Docker"],
    accent: "#00d4ff",
    featured: false,
    category: "Computer Vision",
    icon: Sparkles,
  },
  {
    id: "facia-kyc",
    title: "FACIA KYC Pipeline",
    description:
      "Automated KYC document verification pipeline combining OCR, face matching, and fraud detection. Reduced manual review time by 85% for a fintech client.",
    tags: ["Tesseract", "DeepFace", "FastAPI", "Redis", "PostgreSQL", "AWS"],
    accent: "#7b2fff",
    featured: false,
    category: "Computer Vision",
    icon: CheckCircle,
  },
  {
    id: "rag-enterprise",
    title: "Enterprise RAG Assistant",
    description:
      "A multi-tenant RAG system for enterprise document Q&A. Supports hybrid search, citation grounding, and role-based access control across 1M+ document corpora.",
    tags: ["LlamaIndex", "Weaviate", "FastAPI", "Azure OpenAI", "LangChain"],
    accent: "#00d4ff",
    featured: false,
    category: "Generative AI",
    icon: Database,
  },
  {
    id: "urdu-nlp",
    title: "Urdu NLP Toolkit",
    description:
      "Open-source NLP toolkit for Urdu language processing. Includes tokenization, POS tagging, NER, and a fine-tuned BERT variant achieving state-of-the-art results on Urdu benchmarks.",
    tags: ["Hugging Face", "PyTorch", "Python", "Transformers", "FastAPI"],
    accent: "#7b2fff",
    featured: false,
    category: "NLP",
    icon: Code,
  },
];

const education = [
  {
    id: "ms",
    degree: "MS Computer Science",
    specialization: "Artificial Intelligence",
    institution: "FAST-NUCES",
    location: "Lahore, Pakistan",
    period: "2019 – 2021",
    gpa: "3.8 / 4.0",
    highlights: [
      "Thesis: Transformer-based models for low-resource Urdu NLP",
      "Graduate Research Fellowship recipient",
      "Published 1 conference paper on multilingual NLP",
    ],
    accent: "#00d4ff",
    icon: GraduationCap,
  },
  {
    id: "bs",
    degree: "BS Computer Science",
    specialization: "Software Engineering",
    institution: "FAST-NUCES",
    location: "Lahore, Pakistan",
    period: "2015 – 2019",
    gpa: "3.6 / 4.0",
    highlights: [
      "Dean's List all 8 semesters",
      "Final year project: Autonomous drone navigation using RL",
      "President, AI & Robotics Society",
    ],
    accent: "#7b2fff",
    icon: GraduationCap,
  },
];

const stats = [
  { label: "Years Experience", value: "4+" },
  { label: "AI Systems Shipped", value: "10+" },
  { label: "Daily API Queries", value: "50k+" },
  { label: "Open Source Stars", value: "800+" },
];

// ─── Sub-components (inline) ─────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-xs font-semibold tracking-widest uppercase mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
      {children}
    </div>
  );
}

function GlowDivider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent my-2" />
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sent">("idle");

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sent");
    setFormData({ name: "", email: "", message: "" });
  };

  const motionProps = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : {
          variants,
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-80px" },
        };

  return (
    <main className="bg-[#0f0f0f] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#7b2fff]/10 rounded-full blur-[100px]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-xs font-semibold tracking-widest uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
                  Available for new opportunities
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05]">
                  <span className="text-white">{brandName}</span>
                </h1>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] bg-clip-text text-transparent">
                    {brandTagline}
                  </span>
                </div>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-white/60 text-lg leading-relaxed max-w-lg text-pretty"
              >
                {heroTagline}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4 pt-2"
              >
                <a
                  href={primaryCTA.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector(primaryCTA.href)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] text-white font-semibold text-sm shadow-[0_0_24px_rgba(0,212,255,0.25)] hover:shadow-[0_0_36px_rgba(0,212,255,0.4)] transition-all duration-300 hover:scale-[1.03]"
                >
                  {primaryCTA.label}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  Get in Touch
                </a>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
              >
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={scaleIn}
                    className="text-center p-3 rounded-xl bg-white/3 border border-white/5"
                  >
                    <div className="text-2xl font-bold text-[#00d4ff]">
                      {stat.value}
                    </div>
                    <div className="text-white/40 text-xs mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Visual card */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00d4ff]/20 to-[#7b2fff]/20 blur-2xl scale-110" />
                <div className="relative w-80 rounded-3xl bg-[#1a1a2e] border border-white/10 p-8 shadow-[0_8px_48px_rgba(0,0,0,0.5)]">
                  {/* Avatar placeholder */}
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#7b2fff] flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-[0_0_32px_rgba(0,212,255,0.3)]">
                    HM
                  </div>
                  <div className="text-center mb-6">
                    <div className="text-white font-bold text-lg">
                      {brandName}
                    </div>
                    <div className="text-[#00d4ff] text-sm font-medium mt-1">
                      {brandTagline}
                    </div>
                    <div className="flex items-center justify-center gap-1 text-white/40 text-xs mt-2">
                      <MapPin size={11} />
                      {brandLocation}
                    </div>
                  </div>
                  <GlowDivider />
                  <div className="mt-5 space-y-3">
                    {[
                      { label: "LLM Engineering", pct: 95 },
                      { label: "MLOps", pct: 88 },
                      { label: "Computer Vision", pct: 82 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60">{item.label}</span>
                          <span className="text-[#00d4ff]">{item.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7b2fff]"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.pct}%` }}
                            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["LangChain", "PyTorch", "FastAPI", "Azure"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-[#00d4ff]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#7b2fff]/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: image-like card */}
            <motion.div
              {...motionProps(slideInLeft)}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/8 shadow-[0_8px_48px_rgba(0,0,0,0.4)]">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D16AQEzsGlWOFFg_Q/profile-displaybackgroundimage-shrink_200_800/B4DZeDM1D_H4AU-/0/1750252869221?e=2147483647&v=beta&t=WcAwRl5GcDokN854C_HbVS_KciCB3-6Bfs4KDYywfAo"
                  alt="Hassan Masood – AI/ML Engineer workspace"
                  className="w-full h-80 object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
                {/* Fallback visual */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#7b2fff] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      HM
                    </div>
                    <div className="text-white/60 text-sm">
                      Senior AI/ML Engineer
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#1a1a2e] border border-white/10 rounded-2xl px-5 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                <div className="text-[#00d4ff] font-bold text-xl">4+</div>
                <div className="text-white/50 text-xs">Years in AI/ML</div>
              </div>
            </motion.div>

            {/* Right: text */}
            <motion.div
              {...motionProps(staggerContainer)}
              className="space-y-6 order-1 lg:order-2"
            >
              <motion.div {...motionProps(fadeInUp)}>
                <SectionLabel>About Me</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                  Turning AI research into{" "}
                  <span className="bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] bg-clip-text text-transparent">
                    production reality
                  </span>
                </h2>
              </motion.div>

              <motion.p
                {...motionProps(fadeInUp)}
                className="text-white/60 leading-relaxed text-pretty"
              >
                {aboutBio}
              </motion.p>

              <motion.ul
                {...motionProps(staggerContainer)}
                className="space-y-3"
              >
                {aboutHighlights.map((item) => (
                  <motion.li
                    key={item}
                    {...motionProps(fadeInUp)}
                    className="flex items-center gap-3 text-white/70 text-sm"
                  >
                    <CheckCircle
                      size={16}
                      className="text-[#00d4ff] flex-shrink-0"
                    />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div {...motionProps(fadeInUp)} className="flex gap-4 pt-2">
                <a
                  href={`mailto:${brandEmail}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-sm font-medium hover:bg-[#00d4ff]/20 transition-all duration-200"
                >
                  <Mail size={15} />
                  Email Me
                </a>
                <a
                  href={brandLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 transition-all duration-200"
                >
                  <Linkedin size={15} />
                  LinkedIn
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section
        id="skills"
        className="py-24 md:py-32 bg-[#1a1a2e]/30 relative overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#00d4ff]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...motionProps(staggerContainer)}
            className="text-center mb-16"
          >
            <motion.div {...motionProps(fadeInUp)}>
              <SectionLabel>Technical Skills</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                The tools I{" "}
                <span className="bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] bg-clip-text text-transparent">
                  build with
                </span>
              </h2>
              <p className="text-white/50 mt-4 max-w-xl mx-auto text-pretty">
                A curated stack refined through 4+ years of shipping AI systems
                in production environments.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.id}
                  {...motionProps(scaleIn)}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative rounded-2xl bg-[#16213e]/60 border border-white/8 p-6 hover:border-white/15 transition-all duration-300 shadow-[0_2px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at top left, ${cat.color}08, transparent 60%)`,
                    }}
                  />
                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: `${cat.color}15`,
                        border: `1px solid ${cat.color}30`,
                      }}
                    >
                      <Icon size={20} style={{ color: cat.color }} />
                    </div>
                    <h3 className="text-white font-semibold mb-4">
                      {cat.label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          whileHover={{ scale: 1.05 }}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200"
                          style={{
                            background: `${cat.color}10`,
                            border: `1px solid ${cat.color}20`,
                            color: cat.color,
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 md:py-32 relative">
        <div className="absolute right-0 top-1/4 w-80 h-80 bg-[#7b2fff]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...motionProps(staggerContainer)} className="mb-16">
            <motion.div {...motionProps(fadeInUp)}>
              <SectionLabel>Work Experience</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Where I've{" "}
                <span className="bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] bg-clip-text text-transparent">
                  made an impact
                </span>
              </h2>
            </motion.div>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff]/40 via-[#7b2fff]/30 to-transparent" />

            <motion.div
              {...motionProps(staggerContainer)}
              className="space-y-10"
            >
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  {...motionProps(fadeInUp)}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-4 md:left-6 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: exp.accent,
                      background: "#0f0f0f",
                      boxShadow: `0 0 12px ${exp.accent}40`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: exp.accent }}
                    />
                  </div>

                  <motion.div
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="group rounded-2xl bg-[#1a1a2e]/50 border border-white/8 p-6 hover:border-white/15 transition-all duration-300 shadow-[0_2px_16px_rgba(0,0,0,0.2)]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-bold text-lg">
                            {exp.role}
                          </h3>
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              background: `${exp.accent}15`,
                              color: exp.accent,
                              border: `1px solid ${exp.accent}25`,
                            }}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <Briefcase size={13} />
                          <span className="font-medium text-white/70">
                            {exp.company}
                          </span>
                          <span>·</span>
                          <MapPin size={13} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/40 text-sm">
                        <Calendar size={13} />
                        {exp.period}
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, bi) => (
                        <li
                          key={bi}
                          className="flex items-start gap-2.5 text-white/60 text-sm leading-relaxed"
                        >
                          <ChevronRight
                            size={14}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: exp.accent }}
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section
        id="projects"
        className="py-24 md:py-32 bg-[#16213e]/20 relative overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#7b2fff]/20 to-transparent" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#00d4ff]/4 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...motionProps(staggerContainer)} className="mb-16">
            <motion.div {...motionProps(fadeInUp)}>
              <SectionLabel>Projects</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Things I've{" "}
                <span className="bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] bg-clip-text text-transparent">
                  built
                </span>
              </h2>
              <p className="text-white/50 mt-4 max-w-xl text-pretty">
                A selection of AI systems, platforms, and tools shipped to
                production.
              </p>
            </motion.div>
          </motion.div>

          {/* Featured projects (large) */}
          <motion.div
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
          >
            {projects
              .filter((p) => p.featured)
              .map((project) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={project.id}
                    {...motionProps(scaleIn)}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="group relative rounded-2xl bg-[#1a1a2e]/70 border border-white/8 p-8 hover:border-white/15 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at top right, ${project.accent}08, transparent 60%)`,
                      }}
                    />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            background: `${project.accent}15`,
                            border: `1px solid ${project.accent}30`,
                          }}
                        >
                          <Icon size={22} style={{ color: project.accent }} />
                        </div>
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: `${project.accent}10`,
                            color: project.accent,
                            border: `1px solid ${project.accent}20`,
                          }}
                        >
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-xl mb-3">
                        {project.title}
                      </h3>
                      <p className="text-white/55 text-sm leading-relaxed mb-5 text-pretty">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-white/50 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </motion.div>

          {/* Other projects (smaller grid) */}
          <motion.div
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {projects
              .filter((p) => !p.featured)
              .map((project) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={project.id}
                    {...motionProps(fadeInUp)}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group relative rounded-xl bg-[#1a1a2e]/50 border border-white/8 p-5 hover:border-white/15 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.2)] overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at top left, ${project.accent}06, transparent 60%)`,
                      }}
                    />
                    <div className="relative">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                        style={{
                          background: `${project.accent}12`,
                          border: `1px solid ${project.accent}25`,
                        }}
                      >
                        <Icon size={16} style={{ color: project.accent }} />
                      </div>
                      <span
                        className="text-xs font-medium mb-2 block"
                        style={{ color: project.accent }}
                      >
                        {project.category}
                      </span>
                      <h3 className="text-white font-semibold text-sm mb-2">
                        {project.title}
                      </h3>
                      <p className="text-white/45 text-xs leading-relaxed mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-white/40 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </motion.div>
        </div>
      </section>

      {/* ── EDUCATION ────────────────────────────────────────────────────── */}
      <section id="education" className="py-24 md:py-32 relative">
        <div className="absolute left-0 top-1/3 w-72 h-72 bg-[#00d4ff]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...motionProps(staggerContainer)} className="mb-16">
            <motion.div {...motionProps(fadeInUp)}>
              <SectionLabel>Education</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Academic{" "}
                <span className="bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] bg-clip-text text-transparent">
                  foundation
                </span>
              </h2>
            </motion.div>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {education.map((edu) => {
              const Icon = edu.icon;
              return (
                <motion.div
                  key={edu.id}
                  {...motionProps(scaleIn)}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative rounded-2xl bg-[#1a1a2e]/50 border border-white/8 p-8 hover:border-white/15 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.25)] overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `${edu.accent}08` }}
                  />
                  <div className="relative">
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${edu.accent}15`,
                          border: `1px solid ${edu.accent}30`,
                        }}
                      >
                        <Icon size={22} style={{ color: edu.accent }} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-xl">
                          {edu.degree}
                        </h3>
                        <div
                          className="text-sm font-medium mt-0.5"
                          style={{ color: edu.accent }}
                        >
                          {edu.specialization}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-5 text-sm text-white/50">
                      <div className="flex items-center gap-1.5">
                        <GraduationCap size={13} />
                        {edu.institution}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} />
                        {edu.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {edu.period}
                      </div>
                    </div>

                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-5 text-sm font-semibold"
                      style={{
                        background: `${edu.accent}10`,
                        border: `1px solid ${edu.accent}20`,
                        color: edu.accent,
                      }}
                    >
                      <Star size={13} />
                      GPA: {edu.gpa}
                    </div>

                    <GlowDivider />

                    <ul className="mt-4 space-y-2">
                      {edu.highlights.map((h, hi) => (
                        <li
                          key={hi}
                          className="flex items-start gap-2.5 text-white/55 text-sm"
                        >
                          <ChevronRight
                            size={14}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: edu.accent }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-24 md:py-32 bg-[#1a1a2e]/20 relative overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7b2fff]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...motionProps(staggerContainer)}
            className="text-center mb-16"
          >
            <motion.div {...motionProps(fadeInUp)}>
              <SectionLabel>Contact</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Let's build something{" "}
                <span className="bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] bg-clip-text text-transparent">
                  remarkable
                </span>
              </h2>
              <p className="text-white/50 mt-4 max-w-lg mx-auto text-pretty">
                Open to senior AI/ML roles, consulting engagements, and
                interesting collaborations. Drop me a message.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <motion.div
              {...motionProps(slideInLeft)}
              className="lg:col-span-2 space-y-6"
            >
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: brandEmail,
                  href: `mailto:${brandEmail}`,
                  accent: "#00d4ff",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: brandPhone,
                  href: `tel:${brandPhone}`,
                  accent: "#7b2fff",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  value: "linkedin.com/in/hassan-masood",
                  href: brandLinkedIn,
                  accent: "#00d4ff",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: brandLocation,
                  href: null,
                  accent: "#7b2fff",
                },
              ].map((item) => {
                const Icon = item.icon;
                const inner = (
                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${item.accent}12`,
                        border: `1px solid ${item.accent}25`,
                      }}
                    >
                      <Icon size={18} style={{ color: item.accent }} />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-white/80 text-sm font-medium">
                        {item.value}
                      </div>
                    </div>
                    {item.href && (
                      <ExternalLink
                        size={14}
                        className="ml-auto text-white/20 group-hover:text-white/50 transition-colors"
                      />
                    )}
                  </div>
                );

                return item.href ? (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="group flex rounded-xl bg-[#1a1a2e]/60 border border-white/8 p-4 hover:border-white/15 transition-all duration-200 cursor-pointer"
                  >
                    {inner}
                  </motion.a>
                ) : (
                  <div
                    key={item.label}
                    className="flex rounded-xl bg-[#1a1a2e]/60 border border-white/8 p-4"
                  >
                    {inner}
                  </div>
                );
              })}
            </motion.div>

            {/* Contact form */}
            <motion.div
              {...motionProps(slideInRight)}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl bg-[#1a1a2e]/60 border border-white/8 p-8 shadow-[0_4px_32px_rgba(0,0,0,0.3)]">
                {formStatus === "sent" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#00d4ff]/15 border border-[#00d4ff]/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={28} className="text-[#00d4ff]" />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">
                      Message sent!
                    </h3>
                    <p className="text-white/50 text-sm">
                      Thanks for reaching out. I'll get back to you within 24
                      hours.
                    </p>
                    <button
                      onClick={() => setFormStatus("idle")}
                      className="mt-6 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-all duration-200"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/8 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/8 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        rows={5}
                        placeholder="Tell me about the role or project..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/8 transition-all duration-200 resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] text-white font-semibold text-sm shadow-[0_0_24px_rgba(0,212,255,0.2)] hover:shadow-[0_0_36px_rgba(0,212,255,0.35)] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Send Message
                      <ArrowRight size={16} />
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}