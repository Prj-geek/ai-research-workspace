import Link from "next/link";
import { ArrowRight, BookOpen, FileText, FolderOpen } from "lucide-react";
import { Brand } from "./_components/brand";
import { SiteNavigation } from "./_components/site-navigation";

const workflow = [
  { icon: FolderOpen, title: "Organize your project", description: "Link a local folder and keep research files, data, and reports together." },
  { icon: BookOpen, title: "Find and manage sources", description: "Search scholarly literature and save references to your project bibliography." },
  { icon: FileText, title: "Write and explore", description: "Edit documents, inspect data, and work with an AI assistant when configured." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/70 bg-background">
        <div className="mx-auto flex min-h-[72px] max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Brand />
          <SiteNavigation active="home" />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <section className="max-w-3xl">
          <p className="text-sm font-medium text-primary">College research project</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">AI Research Workspace</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            A local workspace for organizing sources, writing research documents, and exploring data with AI assistance.
          </p>
          <Link href="/workspace" className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Open Workspace <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </section>
        <section aria-label="Research workflow" className="mt-12 grid gap-4 md:grid-cols-3">
          {workflow.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border bg-card p-6">
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <h2 className="mt-4 font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          ))}
        </section>
        <p className="mt-8 max-w-3xl text-sm leading-6 text-muted-foreground">
          Project files and document editing work locally. Literature search needs internet access; AI assistance needs an OpenRouter key and a configured model in workspace Settings.
        </p>
      </main>
      <footer className="mx-auto max-w-6xl border-t px-5 py-6 text-xs leading-5 text-muted-foreground sm:px-8">
        A local-first AI research workspace. Licensed under the PolyForm Noncommercial License 1.0.0; see LICENSE.md in the project.
      </footer>
    </div>
  );
}
