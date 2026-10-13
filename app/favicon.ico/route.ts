import { RESEARCH_MARK_SVG } from "@/lib/research-brand";

export function GET() {
  return new Response(RESEARCH_MARK_SVG, {
    headers: {
      "cache-control": "public, max-age=86400",
      "content-type": "image/svg+xml",
    },
  });
}
