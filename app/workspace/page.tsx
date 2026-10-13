import { getWorkspaceDashboardData } from "../actions";
import { UserMenu } from "../_components/user-menu";
import { ProjectsDashboardClient } from "../_components/projects-dashboard-client";
import { Brand } from "../_components/brand";
import { requireUser } from "@/lib/auth/session";
import Link from "next/link";
import { getAiTaskConfig } from "@/lib/local-ai-settings";
import { SiteNavigation } from "../_components/site-navigation";

export const dynamic = "force-dynamic";

export default async function ProjectsDashboard() {
  const user = await requireUser();
  const { projects, recentSessions } = await getWorkspaceDashboardData();
  const chat = await getAiTaskConfig("chat");
  const aiConfigured = Boolean(chat.apiKey && chat.modelId.trim());

  return (
    <div className="min-h-screen bg-background [background-image:radial-gradient(circle_at_12%_0%,oklch(0.91_0.035_235/0.45),transparent_27rem)] dark:[background-image:radial-gradient(circle_at_12%_0%,oklch(0.30_0.06_235/0.4),transparent_27rem)]">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-[86rem] flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Brand />
          <div className="flex items-center gap-3">
            <SiteNavigation active="workspace" />
            <UserMenu
              user={{ name: user.name, email: user.email, image: user.image }}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[86rem] px-5 py-10 sm:px-8 sm:py-14">
        {!aiConfigured ? (
          <div role="status" className="mb-6 rounded-xl border bg-card px-5 py-4 text-sm leading-6">
            <p className="font-medium">AI assistant needs configuration</p>
            <p className="text-muted-foreground">
              Add your OpenRouter key and model in{" "}
              <Link href="/account" className="text-primary underline underline-offset-4">Settings</Link>
              {" "}to use AI features. You can link folders, edit documents, and manage references now.
            </p>
          </div>
        ) : null}
        <ProjectsDashboardClient
          initialProjects={projects}
          recentSessions={recentSessions}
        />
      </main>
    </div>
  );
}
