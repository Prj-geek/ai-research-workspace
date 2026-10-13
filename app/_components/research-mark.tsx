import { BookOpen, Search } from "lucide-react";
import { cn } from "@/lib/utils";

/** Research identity composed from the project's existing Lucide icons. */
export function ResearchMark({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("relative inline-flex shrink-0 text-primary", className)}>
      <BookOpen className="size-full" strokeWidth={1.8} />
      <Search className="absolute -bottom-px -right-px size-[48%] rounded-full bg-background" strokeWidth={2.4} />
    </span>
  );
}
