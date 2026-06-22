import type { Project } from "@/components/site/ProjectCard";
import anugraghaLayout from "@/assets/anugragha-layout.jpg";

export const COMPANY_PHONE = "+919876543210";       // ← replace with your real number
export const COMPANY_WHATSAPP = "919876543210";     // ← replace with your real number (no +)

export const DEFAULT_FEATURES = [
  "DTCP Approved",
  "Clear Title",
  "Blacktop Roads",
  "Drainage System",
  "Electricity",
  "Vastu Compliant",
];

export const COMPLETED: Project[] = [
  {
    slug: "mahalakshmi-nagar",
    name: "Mahalakshmi Nagar",
    location: "Kumbakonam",
    status: "Completed",
    description:
      "A serene, vastu-compliant residential layout with wide blacktop roads, drainage and full electricity. DTCP approved. All plots sold — 100% delivery record.",
    imageLabel: "Upload Mahalakshmi Nagar photo",
  },
  {
    slug: "spm-garden",
    name: "SPM Garden",
    location: "Kumbakonam",
    status: "Completed",
    description:
      "A lush green plotted layout offering plots amidst natural surroundings with all civic amenities. DTCP approved. Fully delivered.",
    imageLabel: "Upload SPM Garden photo",
  },
  {
    slug: "sanjana-nagar",
    name: "Sanjana Nagar",
    location: "Senchina, Kumbakonam",
    status: "Completed",
    description:
      "Premium residential plots in the rapidly growing Senchina zone — clear title, DTCP approved, full infrastructure developed.",
    imageLabel: "Upload Sanjana Nagar photo",
  },
  {
    slug: "salith-nagar",
    name: "Salith Nagar",
    location: "Kumbakonam",
    status: "Completed",
    description:
      "A fully delivered, sold-out premium layout — testament to the trust Kumbakonam families place in Nila Promoters.",
    imageLabel: "Upload Salith Nagar photo",
  },
];

export const ONGOING: Project[] = [
  {
    slug: "anugragha-avenue",
    name: "Anugragah Avenue",
    location: "Kumbakonam",
    status: "Ongoing",
    description:
      "Anugragah Avenue is Nila Promoters' current flagship project — a DTCP approved premium plotted layout in a prime Kumbakonam location. Offering plots for families seeking the best of connectivity, green surroundings, and strong investment value.",
    imageLabel: "Upload Anugragah Avenue site photo",
    cta: "Enquire Now",
    layoutMapImage: anugraghaLayout,   // ← shows the layout image on the detail page
    layoutMapPdf: anugraghaLayout,     // ← used for the Download button
  },
];

export const UPCOMING: Project[] = [
  {
    slug: "london-city",
    name: "London City",
    location: "Kumbakonam Region",
    status: "Upcoming",
    description:
      "An ambitious township-style plotted layout inspired by world-class urban planning — wide roads, landscaped greens, and modern infrastructure. Register your interest today.",
    imageLabel: "Upload London City concept image",
    cta: "Register Interest",
  },
  {
    slug: "shanthi-nagar-virivakkam",
    name: "Shanthi Nagar Virivakkam",
    location: "Analagragharam, Kumbakonam",
    status: "Upcoming",
    description:
      "A tranquil upcoming layout in the fast-developing Analagragharam area — expansive plots with high appreciation potential and DTCP approval in progress.",
    imageLabel: "Upload Shanthi Nagar concept image",
    cta: "Notify Me",
  },
];

export const ALL_PROJECTS = [...COMPLETED, ...ONGOING, ...UPCOMING];