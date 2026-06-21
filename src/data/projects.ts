import mahalakshmilogo from "@/assets/logos/mahalakshmi-logo.png";
import spmLogo from "@/assets/logos/spm-logo.png";
import senchinalogo from "@/assets/logos/senchina-logo.png";
import salith from "@/assets/logos/salith-logo.png";
import anugraghalogo from "@/assets/logos/anugragha-logo.png";
import megalogo from "@/assets/logos/mega-logo.png";
import kurinjilogo from "@/assets/logos/kurunji-logo.png";
import pamlogo from "@/assets/logos/pam-logo.png";
import megacitylogo from "@/assets/logos/mega-logo.png";
import anugragha1 from "@/assets/logos/anugraha-1.jpg";
import anugragha2 from "@/assets/logos/anugraha-2.jpg";
import anugragha3 from "@/assets/logos/anugraha-3.jpg";
import anugragha4 from "@/assets/logos/anugraha-4.jpg";
import anugragha5 from "@/assets/logos/anugraha-5.jpg";
import anugragha6 from "@/assets/logos/anugraha-6.jpg";
import anugragha7 from "@/assets/logos/anugraha-7.jpg";
import anugragha8 from "@/assets/logos/anugraha-8.jpg";
import anugragha9 from "@/assets/logos/anugraha-9.jpg";

export type ProjectStatus = "Completed" | "Ongoing" | "Upcoming";

export interface Project {
  slug: string;            // used in the URL: /projects/<slug>
  name: string;
  location: string;
  description: string;
  status: ProjectStatus;
  imageLabel: string;
  highlight?: string;
  cta?: string;
  logo?: string;

  // ---- Detail-page-only fields (all optional, page falls back gracefully) ----
  address?: string;
  phone?: string;          // overrides COMPANY_PHONE for this project
  whatsapp?: string;       // overrides COMPANY_WHATSAPP for this project
  features?: string[];     // shown as an icon grid on the detail page
  gallery?: string[];      // imported images for the "Project Gallery" section
  layoutMapImage?: string; // imported image for the "Layout Map" section
  layoutMapPdf?: string;   // optional path/link for "Download Layout Map"
}

// Company-wide contact defaults — change these once, used everywhere
export const COMPANY_PHONE = "+919876543210";
export const COMPANY_WHATSAPP = "919876543210"; // digits only, with country code

export const DEFAULT_FEATURES = [
  "DTCP & RERA Approved Layout",
  "100% Clear & Marketable Title",
  "Wide Black-top Roads",
  "Underground Drainage",
  "Individual EB Connection",
  "24-Hour Security",
];

export const COMPLETED: Project[] = [
  {
    slug: "sri-mahalakshmi-nagar",
    name: "Sri Mahalakshmi Nagar",
    location: "Kumbakonam",
    description: "A premium DTCP approved plotted layout delivering well-planned residential plots to families seeking peaceful living.",
    status: "Completed",
    imageLabel: "Mahalakshmi Nagar",
    highlight: "100% Plots Sold",
    cta: "View Details",
    logo: mahalakshmilogo,
    address: "Neelamangalam Main Road, Pattukottai Road, Kumbakonam, Tamil Nadu",
    features: [
      "DTCP & RERA Approved Gated Layout",
      "30ft & 23ft Wide Black-top Roads",
      "24-Hour Security",
      "Individual EB Connections",
      "Drinking Water Facility",
      "Well-Developed Residential Area",
      "Near Neelamangalam Main Road",
      "Arch Entrance & Street Lights",
    ],
    // gallery: [img1, img2, img3],          // add image imports when ready
    // layoutMapImage: layoutMapMahalakshmi, // add when ready
  },
  {
    slug: "spm-garden",
    name: "SPM Garden",
    location: "Kumbakonam",
    description: "Thoughtfully designed layout with wide roads, greenery, and all essential amenities for comfortable community living.",
    status: "Completed",
    imageLabel: "SPM Garden",
    highlight: "Fully Handed Over",
    cta: "View Details",
    logo: spmLogo,
    address: "Pulavarnathan, Valangaiman Taluk, Kumbakonam, Tamil Nadu",
  },
  {
    slug: "sanjeeena-nagar",
    name: "Sanjeeena Nagar",
    location: "Kumbakonam",
    description: "DTCP approved residential plots in a prime location, offering families a secure and value-driven investment.",
    status: "Completed",
    imageLabel: "Sanjeeena Nagar",
    highlight: "100% Plots Sold",
    cta: "View Details",
    logo: senchinalogo,
    address: "Annalakshmipuram, Kumbakonam, Tamil Nadu",
  },
  {
    slug: "salith-nagar",
    name: "Salith Nagar",
    location: "Kumbakonam",
    description: "A serene plotted community offering excellent connectivity and clear legal title for every plot owner.",
    status: "Completed",
    imageLabel: "Salith Nagar",
    highlight: "Fully Handed Over",
    cta: "View Details",
    logo: salith,
  },
  {
    slug: "kurinji-nagar",
    name: "Kurinji Nagar",
    location: "Kumbakonam",
    description: "A serene plotted community offering excellent connectivity and clear legal title for every plot owner.",
    status: "Completed",
    imageLabel: "Kurinji Nagar",
    highlight: "Fully Handed Over",
    cta: "View Details",
    logo: kurinjilogo,
  },
  {
    slug: "pam-nagar",
    name: "PAM Nagar",
    location: "Kumbakonam",
    description: "A serene plotted community offering excellent connectivity and clear legal title for every plot owner.",
    status: "Completed",
    imageLabel: "PAM Nagar",
    highlight: "Fully Handed Over",
    cta: "View Details",
    logo: pamlogo,
  },
  {
    slug: "mega-city",
    name: "Mega City",
    location: "Kumbakonam",
    description: "A serene plotted community offering excellent connectivity and clear legal title for every plot owner.",
    status: "Completed",
    imageLabel: "Mega City",
    highlight: "Fully Handed Over",
    cta: "View Details",
    logo: megacitylogo,
  },
];

export const ONGOING: Project[] = [
  {
    slug: "anugraha-avenue",
    name: "Anugraha Avenue",
    location: "Pudukkottai Main Road, Thanjavur",
    description:
      "DTCP & RERA approved premium gated community strategically located on the Thanjavur–Pudukkottai NH Road. Residential plots with modern infrastructure, water facilities, security, and excellent connectivity to educational institutions and hospitals.",
    status: "Ongoing",
    imageLabel: "Anugraha Avenue",
    highlight: "DTCP & RERA Approved Plots Available",
    cta: "Enquire Now",
    logo: anugraghalogo,
    address: "Anugraha Avenue, Thanjavur–Pudukkottai Main Road, Tamil Nadu",
    features: [
      "DTCP & RERA Approved Layout",
      "Located on Thanjavur–Pudukkottai NH Road",
      "Near Kings College & Major Educational Institutions",
      "24ft, 30ft & 33ft Wide Roads",
      "Residential Neighborhood with Existing Houses",
      "60,000 Litre Drinking Water Facility",
      "Individual EB Connection for Every Plot",
      "24×7 Security Service",
      "CCTV Surveillance Throughout the Layout",
      "Elevated Land with No Water Stagnation",
      "Arch Entrance & Well-Planned Infrastructure",
      "Close to Schools, Colleges & Hospitals",
    ],
    gallery: [anugragha1, anugragha2, anugragha3, anugragha4, anugragha5, anugragha6, anugragha7, anugragha8, anugragha9]
  },
];

export const UPCOMING: Project[] = [
  {
    slug: "london-city",
    name: "London City",
    location: "Kumbakonam",
    description: "A landmark pre-launch development inspired by world-class planning, offering premium plots at early-bird pricing.",
    status: "Upcoming",
    imageLabel: "London City",
    highlight: "Pre-Launch — Register Interest",
    cta: "Register Interest",
    logo: megalogo,
  },
  {
    slug: "shanthi-nagar-virivakkam",
    name: "Shanthi Nagar Virivakkam",
    location: "Analagragharam, Kumbakonam",
    description: "A peaceful upcoming layout in the growing Analagragharam belt — ideal for families and long-term investors.",
    status: "Upcoming",
    imageLabel: "Shanthi Nagar Virivakkam",
    highlight: "Coming Soon",
    cta: "Register Interest",
    logo: senchinalogo,
  },
];

export const ALL_PROJECTS: Project[] = [...COMPLETED, ...ONGOING, ...UPCOMING];