import {
  CheckSquare, Car, ShieldCheck, Zap, Droplet, Home,
  Landmark, Lightbulb, Store, TrendingUp, Map as MapIcon,
  GraduationCap, Sparkles, CheckCircle2, Clock,
} from "lucide-react";
import type { ProjectStatus } from "@/data/projects";

type IconComponent = React.FC<{ className?: string }>;

const RULES: { keywords: string[]; Icon: IconComponent }[] = [
  { keywords: ["dtcp", "rera", "approved", "title"], Icon: CheckSquare },
  { keywords: ["road"], Icon: Car },
  { keywords: ["security", "gated"], Icon: ShieldCheck },
  { keywords: ["eb", "electric", "connection", "power"], Icon: Zap },
  { keywords: ["water", "drainage"], Icon: Droplet },
  { keywords: ["residential", "area", "community"], Icon: Home },
  { keywords: ["near", "highway", "main road", "bypass"], Icon: Landmark },
  { keywords: ["light", "street", "arch"], Icon: Lightbulb },
  { keywords: ["shop", "facilit", "market"], Icon: Store },
  { keywords: ["industr", "sipcot", "factory", "company"], Icon: TrendingUp },
  { keywords: ["map", "location", "route"], Icon: MapIcon },
  { keywords: ["school", "college", "hospital", "education"], Icon: GraduationCap },
];

export function getFeatureIcon(label: string): IconComponent {
  const lower = label.toLowerCase();
  return RULES.find((r) => r.keywords.some((k) => lower.includes(k)))?.Icon ?? Sparkles;
}

export const statusConfig: Record<ProjectStatus, {
  label: string; dot: string; text: string; bg: string; border: string; Icon: IconComponent;
}> = {
  Completed: { label: "Completed", dot: "#10b981", text: "#065f46", bg: "#ecfdf5", border: "#a7f3d0", Icon: CheckCircle2 },
  Ongoing:   { label: "Ongoing",   dot: "#0ea5e9", text: "#0c4a6e", bg: "#f0f9ff", border: "#bae6fd", Icon: Zap },
  Upcoming:  { label: "Upcoming",  dot: "#C9A84C", text: "#78350f", bg: "#fffbeb", border: "#fde68a", Icon: Clock },
};