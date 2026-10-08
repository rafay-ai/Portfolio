export const profile = {
  name: "Abdul Rafay",
  role: "Deep Learning Engineer",
  location: "Karachi, Pakistan",
  email: "abdulrafayy255@gmail.com",
  introduction:
    "I build AI systems that turn messy, real-world data into reliable results: document understanding, identity verification, Urdu language processing, and the APIs that serve them.",
  availability: "Open to new opportunities",
  resumePath: "/Abdul_Rafay_Resume.pdf",
  github: "https://github.com/rafay-ai",
  linkedin: "https://linkedin.com/in/abdul-rafay-551327437",
};

export type ProjectCategory = "Computer Vision" | "Multimodal AI" | "Language AI";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  result: string;
  challenge: string;
  approach: string[];
  technologies: string[];
};

export const projects: Project[] = [
  {
    slug: "deepfake-detection",
    title: "Multiscale Deepfake Detection",
    summary:
      "A custom fusion network combining frequency, spatial, and patch-level signals to identify synthetic imagery across multiple generators.",
    category: "Computer Vision",
    result: "97.45% average accuracy across generated and real-image classes.",
    challenge:
      "Synthetic images from different generators leave inconsistent visual traces, making single-branch detectors brittle outside their training distribution.",
    approach: [
      "Designed frequency-domain, spatial, and patch-based branches.",
      "Fused complementary signals through a multiscale attention mechanism.",
      "Evaluated across StyleGAN, Stable Diffusion, NanoBana, ChatGPT-generated, and real imagery.",
    ],
    technologies: ["PyTorch", "CNNs", "Attention Fusion", "Computer Vision"],
  },
  {
    slug: "urdu-transliteration",
    title: "Urdu to Roman Urdu Transliteration",
    summary:
      "A hybrid transliteration service combining a fine-tuned LLaMA 3.1 8B model with proper-noun lookup for consistent Roman Urdu output.",
    category: "Language AI",
    result: "More accurate, standardized, and consistent output at automated scale.",
    challenge:
      "Roman Urdu has no single spelling standard, while names and locations often require deterministic treatment rather than free-form generation.",
    approach: [
      "Built and curated a parallel Urdu and Roman Urdu corpus.",
      "Fine-tuned LLaMA 3.1 8B for transliteration behavior.",
      "Integrated a gazetteer to resolve proper nouns consistently.",
    ],
    technologies: ["LLaMA 3.1 8B", "Fine-tuning", "FastAPI", "NLP"],
  },
  {
    slug: "cnic-ocr",
    title: "Multimodal CNIC OCR",
    summary:
      "A SmolVLM-based extraction framework for structured English and Urdu Nastaliq fields on Pakistani national identity cards.",
    category: "Multimodal AI",
    result: "Structured bilingual extraction under low resolution and misalignment.",
    challenge:
      "Identity cards combine dense layouts, English text, Urdu Nastaliq, scanner artifacts, and strict field-level structure.",
    approach: [
      "Prepared multimodal image-and-label training samples.",
      "Fine-tuned a 2B vision-language model for field-aware extraction.",
      "Handled script alignment and low-resolution document artifacts.",
    ],
    technologies: ["SmolVLM 2B", "Hugging Face", "PyTorch", "Multimodal OCR"],
  },
  {
    slug: "bank-statement-parser",
    title: "Bank Statement Parsing Engine",
    summary:
      "An end-to-end information extraction pipeline that converts multi-page physical and digital statements into consistent structured records.",
    category: "Language AI",
    result: "Deterministic structured output with safeguards against hallucinated fields.",
    challenge:
      "Statement formats vary across banks, transaction descriptions wrap across lines, and financial values demand strict consistency.",
    approach: [
      "Converted unstructured statement content into model-ready text.",
      "Designed schema-driven prompts and deterministic constraints.",
      "Validated field structure and transaction-level output before delivery.",
    ],
    technologies: ["Qwen2.5", "Python", "Prompt Engineering", "Information Extraction"],
  },
  {
    slug: "document-integrity",
    title: "Document Integrity Detection",
    summary:
      "A U2-Net segmentation system for detecting watermarks, blurred regions, and manipulated areas in scanned bills and official documents.",
    category: "Computer Vision",
    result: "Suspicious submissions flagged automatically before manual review.",
    challenge:
      "Document alterations are often local, subtle, and mixed with ordinary scanner noise or compression damage.",
    approach: [
      "Trained segmentation models to localize suspicious document regions.",
      "Separated manipulation indicators from common scan degradation.",
      "Integrated automated rejection and review signals into the workflow.",
    ],
    technologies: ["U2-Net", "Segmentation", "PyTorch", "Document AI"],
  },
  {
    slug: "cnic-verification",
    title: "CNIC Verification Pipeline",
    summary:
      "A verification pipeline that combines document security checks with synthetic and photocopy detection for safer onboarding.",
    category: "Computer Vision",
    result: "Less manual verification effort and lower fraud exposure in onboarding.",
    challenge:
      "A document may be readable yet still be a photocopy, digitally altered, or inconsistent with expected security features.",
    approach: [
      "Validated document-level security indicators.",
      "Applied deepfake and manipulation detection to submitted CNIC imagery.",
      "Produced workflow-ready accept, reject, and review outcomes.",
    ],
    technologies: ["Computer Vision", "Verification", "Deepfake Detection", "APIs"],
  },
];

export const experience = [
  {
    period: "Feb 2026 to present",
    role: "Deep Learning Engineer",
    company: "Unikrew Solutions",
    description:
      "Owning the R&D lifecycle end to end, from literature review and experiments to production deployment of computer vision and language-model systems.",
    highlights: [
      "Architected multimodal OCR, authenticity, and document-intelligence pipelines.",
      "Built model-backed services for high-security identification workflows.",
      "Worked across engineering to harden and deploy production AI systems.",
    ],
  },
  {
    period: "Jul 2025 to Jan 2026",
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
    skills: ["Fine-tuning", "Transfer learning", "Prompt engineering", "Model evaluation"],
  },
  {
    title: "Computer vision",
    skills: ["Classification", "Segmentation", "Multimodal OCR", "Document parsing"],
  },
  {
    title: "Language systems",
    skills: ["Text classification", "Transliteration", "Information extraction", "LLMs"],
  },
  {
    title: "Engineering stack",
    skills: ["Python", "PyTorch", "FastAPI", "Hugging Face", "Pandas", "NumPy"],
  },
];

export type Artwork = {
  slug: string;
  title: string;
  src: string;
  width: number;
  height: number;
  medium: string;
  note: string;
  alt: string;
  /** Colour of the sticky note the title is written on. */
  tag: "yellow" | "blue" | "green";
};

// Titles come from the sticky notes pinned beside each drawing.
export const artworks: Artwork[] = [
  {
    slug: "besotted",
    title: "Besotted",
    src: "/art/besotted.jpg",
    width: 728,
    height: 1200,
    medium: "Blue ballpoint on paper",
    note: "A face half dissolving into hair and cloth. The heavy hatching under the jaw does most of the work; everything above it is left almost open.",
    alt: "Blue ballpoint drawing of a man's face tilted to one side, hair and cloth wrapped around the head, dense hatching along the jaw and beard.",
    tag: "blue",
  },
  {
    slug: "utilitarianism",
    title: "Utilitarianism",
    src: "/art/utilitarianism.jpg",
    width: 900,
    height: 1380,
    medium: "Blue ballpoint on paper",
    note: "A portrait built from long curls of line. The hand against the cheek and the uneven eyes were the parts I kept returning to.",
    alt: "Blue ballpoint portrait of a woman with long wavy hair, one hand raised to her cheek, looking slightly past the viewer.",
    tag: "yellow",
  },
  {
    slug: "untitled-figure",
    title: "Untitled",
    src: "/art/untitled-figure.jpg",
    width: 998,
    height: 1600,
    medium: "Black ballpoint on paper",
    note: "A figure holding itself together. The face is replaced by contour rings, so the hands and the folded body carry the expression.",
    alt: "Black ballpoint drawing of a faceless figure with contour rings for a head, arms wrapped tightly around its own torso, one hand cradling the head.",
    tag: "green",
  },
];
