import {
  BadgeCheck,
  Banknote,
  BrainCircuit,
  FileScan,
  Fingerprint,
  Languages,
  ScanFace,
  ShieldCheck,
} from "lucide-react";

export const profile = {
  name: "Abdul Rafay",
  role: "Deep Learning Engineer",
  location: "Karachi, Pakistan",
  email: "abdulrafayy255@gmail.com",
  introduction:
    "I build AI systems that turn messy, real-world data into reliable results from document understanding and identity verification to language processing and production APIs.",
  availability: "Open to new opportunities",
  resumePath: "/Abdul_Rafay_Resume.pdf",
  github: "https://github.com/rafay-ai",
  linkedin: "https://linkedin.com/in/abdul-rafay-551327437",
};

export const metrics = [
  { value: 97.45, suffix: "%", label: "Deepfake detection accuracy", decimals: 2 },
  { value: 2, suffix: "B", label: "Vision-language model scale", decimals: 0 },
  { value: 4, suffix: "+", label: "Production AI domains", decimals: 0 },
];

export type ProjectCategory = "Computer Vision" | "Multimodal AI" | "Language AI";

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  category: ProjectCategory;
  icon: typeof BrainCircuit;
  featured?: boolean;
  result: string;
  challenge: string;
  approach: string[];
  technologies: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "deepfake-detection",
    title: "Multiscale Deepfake Detection",
    eyebrow: "Authenticity intelligence",
    summary:
      "A custom fusion network combining frequency, spatial, and patch-level signals to identify synthetic imagery across multiple generators.",
    category: "Computer Vision",
    icon: ScanFace,
    featured: true,
    result: "97.45% average accuracy across generated and real-image classes.",
    challenge:
      "Synthetic images from different generators leave inconsistent visual traces, making single-branch detectors brittle outside their training distribution.",
    approach: [
      "Designed frequency-domain, spatial, and patch-based branches.",
      "Fused complementary signals through a multiscale attention mechanism.",
      "Evaluated across StyleGAN, Stable Diffusion, NanoBana, ChatGPT-generated, and real imagery.",
    ],
    technologies: ["PyTorch", "CNNs", "Attention Fusion", "Computer Vision"],
    accent: "violet",
  },
  {
    slug: "urdu-transliteration",
    title: "Urdu-to-Roman Transliteration",
    eyebrow: "Language infrastructure",
    summary:
      "A hybrid transliteration service combining a fine-tuned LLaMA 3.1 8B model with proper-noun lookup for consistent Roman Urdu output.",
    category: "Language AI",
    icon: Languages,
    featured: true,
    result: "Improved accuracy, standardization, and consistency at automated scale.",
    challenge:
      "Roman Urdu has no single spelling standard, while names and locations often require deterministic treatment rather than free-form generation.",
    approach: [
      "Built and curated a parallel Urdu–Roman Urdu corpus.",
      "Fine-tuned LLaMA 3.1 8B for transliteration behavior.",
      "Integrated a gazetteer to resolve proper nouns consistently.",
    ],
    technologies: ["LLaMA 3.1 8B", "Fine-tuning", "FastAPI", "NLP"],
    accent: "blue",
  },
  {
    slug: "cnic-ocr",
    title: "Multimodal CNIC OCR",
    eyebrow: "Bilingual document intelligence",
    summary:
      "A SmolVLM-based extraction framework for structured English and Urdu Nastaliq fields on Pakistani national identity cards.",
    category: "Multimodal AI",
    icon: FileScan,
    featured: true,
    result: "Structured bilingual extraction under low-resolution and alignment variance.",
    challenge:
      "Identity cards combine dense layouts, English text, Urdu Nastaliq, scanner artifacts, and strict field-level structure.",
    approach: [
      "Prepared multimodal image-and-label training samples.",
      "Fine-tuned a 2B vision-language model for field-aware extraction.",
      "Handled script alignment and low-resolution document artifacts.",
    ],
    technologies: ["SmolVLM 2B", "Hugging Face", "PyTorch", "Multimodal OCR"],
    accent: "emerald",
  },
  {
    slug: "bank-statement-parser",
    title: "Bank Statement Parsing Engine",
    eyebrow: "Financial document automation",
    summary:
      "An end-to-end information extraction pipeline that converts multi-page physical and digital statements into consistent structured records.",
    category: "Language AI",
    icon: Banknote,
    result: "Deterministic structured output with safeguards against hallucinated fields.",
    challenge:
      "Statement formats vary across banks, transaction descriptions wrap across lines, and financial values demand strict consistency.",
    approach: [
      "Converted unstructured statement content into model-ready text.",
      "Designed schema-driven prompts and deterministic constraints.",
      "Validated field structure and transaction-level output before delivery.",
    ],
    technologies: ["Qwen2.5", "Python", "Prompt Engineering", "Information Extraction"],
    accent: "amber",
  },
  {
    slug: "document-integrity",
    title: "Document Integrity Detection",
    eyebrow: "Forgery screening",
    summary:
      "A U2-Net segmentation system for detecting watermarks, blurred regions, and manipulated areas in scanned bills and official documents.",
    category: "Computer Vision",
    icon: ShieldCheck,
    result: "Automated flagging of suspicious submissions before manual review.",
    challenge:
      "Document alterations are often local, subtle, and mixed with ordinary scanner noise or compression damage.",
    approach: [
      "Trained segmentation models to localize suspicious document regions.",
      "Separated manipulation indicators from common scan degradation.",
      "Integrated automated rejection and review signals into the workflow.",
    ],
    technologies: ["U2-Net", "Segmentation", "PyTorch", "Document AI"],
    accent: "rose",
  },
  {
    slug: "cnic-verification",
    title: "CNIC Verification Pipeline",
    eyebrow: "Identity workflow security",
    summary:
      "A verification pipeline that combines document security checks with synthetic and photocopy detection for safer onboarding.",
    category: "Computer Vision",
    icon: Fingerprint,
    result: "Reduced manual verification effort and fraud exposure in onboarding.",
    challenge:
      "A document may be readable yet still be a photocopy, digitally altered, or inconsistent with expected security features.",
    approach: [
      "Validated document-level security indicators.",
      "Applied deepfake and manipulation detection to submitted CNIC imagery.",
      "Produced workflow-ready accept, reject, and review outcomes.",
    ],
    technologies: ["Computer Vision", "Verification", "Deepfake Detection", "APIs"],
    accent: "cyan",
  },
];

export const experience = [
  {
    period: "February 2026 — Present",
    role: "Deep Learning Engineer",
    company: "Unikrew Solutions",
    description:
      "Owning the end-to-end R&D lifecycle, from literature review and experimentation to production deployment of computer vision and language-model systems.",
    highlights: [
      "Architected multimodal OCR, authenticity, and document-intelligence pipelines.",
      "Built model-backed services for high-security identification workflows.",
      "Collaborated across engineering to harden and deploy production AI systems.",
    ],
  },
  {
    period: "July 2025 — January 2026",
    role: "Machine Learning Intern",
    company: "Unikrew Solutions",
    description:
      "Developed applied vision systems for document verification and integrity analysis while improving existing production pipelines.",
    highlights: [
      "Built CNIC verification and document manipulation detection systems.",
      "Contributed bug fixes, refactoring, and performance improvements.",
      "Worked closely with senior engineers on production-facing AI projects.",
    ],
  },
];

export const skillGroups = [
  {
    title: "Model engineering",
    icon: BrainCircuit,
    skills: ["Fine-tuning", "Transfer Learning", "Prompt Engineering", "Model Evaluation"],
  },
  {
    title: "Computer vision",
    icon: BadgeCheck,
    skills: ["Classification", "Segmentation", "Multimodal OCR", "Document Parsing"],
  },
  {
    title: "Language systems",
    icon: Languages,
    skills: ["Text Classification", "Transliteration", "Information Extraction", "LLMs"],
  },
  {
    title: "Engineering stack",
    icon: ShieldCheck,
    skills: ["Python", "PyTorch", "FastAPI", "Hugging Face", "Pandas", "NumPy"],
  },
];
