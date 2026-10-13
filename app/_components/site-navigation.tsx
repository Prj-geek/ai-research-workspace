import Link from "next/link";
import { cn } from "@/lib/utils";

export function SiteNavigation({ active }: { active: "home" | "workspace" }) {
  return (
    <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-3">
      {[
        { href: "/", label: "Home", id: "home" },
        { href: "/workspace", label: "Research Workspace", id: "workspace" },
      ].map((item) => (
        <Link
          key={item.id}
          href={item.href}
          aria-current={active === item.id ? "page" : undefined}
          className={cn(
            "rounded-lg px-2 py-2 text-xs font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3 sm:text-sm",
            active === item.id ? "bg-accent text-accent-foreground" : "text-muted-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
