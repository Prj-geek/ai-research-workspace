"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { ResearchMark } from "../_components/research-mark";

export default function WorkspaceLoading() {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    // Give feedback while the local database and dashboard are loading.
    const timeout = setTimeout(() => setIsSlow(true), 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-7 bg-background [background-image:radial-gradient(circle_at_12%_0%,oklch(0.91_0.035_235/0.45),transparent_27rem)] px-6">
      <div className="flex flex-col items-center gap-2.5">
        <ResearchMark className="size-9" />
        <span className="text-base font-semibold tracking-[-0.035em]">AI Research Workspace</span>
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <LoaderCircle className="size-4 animate-spin" />
          Preparing Your Workspace…
        </div>
        {isSlow && (
          <p className="text-xs text-muted-foreground/80">
            Still loading your local projects. This can take a little longer on the first visit.
          </p>
        )}
      </div>
    </div>
  );
}
