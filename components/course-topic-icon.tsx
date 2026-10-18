import type { LucideIcon } from "lucide-react";

export function CourseTopicIcon({ icon: Icon, size = 19 }: { icon: LucideIcon; size?: number }) {
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />;
}
