# AI Research Workspace

AI Research Workspace brings writing, an AI research assistant, and your project files into one workspace. The Next.js interface and the Eve agent run locally on your computer, and each project points to an existing folder on disk.

The homepage at `/` introduces the project and links to `/workspace`, where projects are listed. The main navigation contains Home and Research Workspace.

This is intended for a single trusted user on one computer.

## What you can do

- **Write with your sources beside you.** The [document editor](./app/%5BprojectId%5D/_components/editors/tiptap-document-editor.tsx) supports rich Markdown editing, tables, math, images, inline citations, and a generated bibliography. Search for literature or insert a citation from the editor, and use document review and sentence suggestions while you write. Export finished work as DOCX, citation-aware DOCX, LaTeX, or portable Markdown.
- **Work with an agent in the same project.** The [chat](./app/_components/agent-chat.tsx) can use the open file, `@`-mentioned files, uploaded files, and selected passages as context. The [Eve agent](./agent/) can search literature and the web, inspect and edit project files, update bibliographies and literature matrices, and run local Bash or Python workflows. Conversations are saved per project so you can return to earlier work.
- **Keep the research organized.** The [workspace rail](./app/%5BprojectId%5D/_components/project-layout-ui.tsx) combines a searchable [file explorer](./app/%5BprojectId%5D/_components/file-explorer.tsx) with [literature search and library](./app/%5BprojectId%5D/_components/literature-panel.tsx). Browse references, data, analysis, reports, and figures in the [artifact views](./app/%5BprojectId%5D/_components/research-artifact-browser.tsx); upload files, create folders and research artifacts, and open them alongside the chat.

The project [session page](./app/%5BprojectId%5D/%5B%5B...sessionId%5D%5D/page.tsx) connects the workspace to a new or saved conversation. Your project remains an ordinary folder on disk, so files you create or edit in the workspace are available to your other tools.

## Requirements

- Node.js 24 and pnpm 11
- An OpenRouter API key, model ID, and exact model context window for AI features; files and editing can be used without them
- Bash and Python 3 for agent commands and analysis (Windows users need a working Bash installation, such as Git Bash, on PATH)
- Optional: Pandoc on PATH for DOCX and LaTeX export; portable Markdown export does not need Pandoc
- Optional: LibreOffice (`soffice`) for agent-assisted Office-to-PDF conversion; other command-line tools and Python packages for the workflows you want to run

The folder picker uses macOS's native chooser. On other systems, enter an existing absolute folder path in the project form.

## Run locally

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
# For AI, set OPENROUTER_API_KEY, OPENROUTER_MODEL_ID,
# and OPENROUTER_MODEL_CONTEXT_WINDOW_TOKENS in .env.local
pnpm dev
```

For Windows PowerShell:

```powershell
Set-Location 'C:\path\to\ai-research-workspace'
pnpm install --frozen-lockfile
Copy-Item .env.example .env.local
notepad .env.local
pnpm dev
```

Copy `.env.example` only on the first setup; preserve any existing `.env.local`. No API credentials are included in the repository. Set the three OpenRouter variables for AI, or configure the key and models through Settings after startup. Use a model that supports tool calling and its published context length. The workspace shows a configuration notice when the key or chat model is absent; no generated result is simulated.

Open [http://127.0.0.1:3000](http://127.0.0.1:3000), then click **Open Workspace**. `pnpm dev` creates `.aiworkspace/` if needed, applies the SQLite migrations, and starts both the Next.js UI and the Eve agent. They listen on `127.0.0.1:3000` and `127.0.0.1:2000` respectively. The launcher invokes package JavaScript CLIs directly, which also works on Windows in directories containing spaces.

Choose **Link Project Folder** to select a folder. You can also paste its absolute path. The workspace stores the resolved path in SQLite and works with the files in place. On linking, it adds any missing canonical files and folders: `1-References/`, `2-Data/`, `3-Analysis/`, and `4-Reports/` folders, plus `1-References/references.bib` and `3-Analysis/literature-matrix.matrix`. Existing files are preserved. Agent file tools display the folder as `/workspace`; agent shell commands run on your computer with that folder as the working directory. `$AIWORKSPACE_PROJECT_DIR` contains its absolute path.

## Demonstration workflow

1. Open the homepage and select **Open Workspace**.
2. Select **New Project** and link an existing research folder. On Windows, paste its full absolute path; the native Browse picker is only shown on macOS.
3. Open Literature, search a topic, and choose Crossref or PubMed if OpenAlex is unavailable. Save a genuine result to the reference library or literature matrix.
4. Open `research-draft.md` in the project root and write notes or insert a saved citation. Save, reopen, and export portable Markdown to demonstrate real local file operations without an AI key. Use `4-Reports/` for additional reports.
5. If OpenRouter is configured and the Eve server is running, ask the AI assistant to summarize the saved sources. Data analysis uses the agent's local Bash/Python tools; verify those tools before the presentation.

There are no fabricated papers, prewritten AI responses, or fake backend success messages.

## Setup limits

| Feature | Required setup |
| --- | --- |
| Project folders, file editing, CSV/XLSX, bibliography, matrices, diagrams | Local app and its SQLite migrations; no model API key |
| Literature search | Internet access to Crossref, PubMed, or OpenAlex; provider rate limits and key requirements may apply. Configure the matching variables in `.env.local` if needed. |
| AI chat, review, sentence/equation/image assistance | OpenRouter key and suitable selected model; chat also needs the local Eve server. Image analysis requires vision support. |
| Agent analysis and command execution | Working Bash and Python on PATH, plus Python packages used by the task |
| DOCX and LaTeX exports | Pandoc on PATH, or `PANDOC_PATH`; portable Markdown is available without it |
| Knowledge search and transcription | Google key and the matching selected Google models in `.env.local` |
| Brave and Monid agent tools | Their respective API keys |
| Office Online previews and external share links | A public HTTPS tunnel and `PUBLIC_TUNNEL_ORIGIN`, as described below |

Without model credentials, use the local editor and reference-management workflow. AI notices indicate missing configuration, not provider availability or credential validation. Saving Settings validates the credentials and selected models against OpenRouter.

## Configuration

The main agent needs an OpenRouter key and model. You can set `OPENROUTER_API_KEY`, `OPENROUTER_MODEL_ID`, and `OPENROUTER_MODEL_CONTEXT_WINDOW_TOKENS` in `.env.local` as initial defaults. After starting the app, open **Settings** from the workspace menu (or visit `/account`) to choose separate models for agent conversations, conversation titles, sentence suggestions, document review, equation generation, and image analysis. Saving checks the key and models with OpenRouter; the chat model must support tools. A key entered there is encrypted in the local `.aiworkspace/ai-settings.json` file. `.env.local` remains the fallback when no key is saved. Copy [`.env.example`](./.env.example) for all settings:

| Setting | Used for |
| --- | --- |
| `OPENROUTER_MODEL_ID_LITE` | Lightweight tasks such as conversation titles and sentence suggestions |
| `OPENROUTER_REQUEST_TIMEOUT_MS` | Optional limit for one agent model request, in milliseconds; unset means no time limit. Agent turns have no fixed time limit. |
| `OPENROUTER_MODEL_ID_REVIEW` | Document review; falls back to the main model |
| `OPENROUTER_VISION_MODEL_ID` | Image analysis; falls back to the main model if it supports vision |
| `GOOGLE_API_KEY`, `GOOGLE_TRANSCRIPTION_MODEL_ID` | Google key and selected transcription model for audio transcription |
| `GOOGLE_KNOWLEDGE_EMBEDDING_MODEL_ID`, `GOOGLE_KNOWLEDGE_QUERY_MODEL_ID` | Selected Google models for creating and querying Knowledge stores |
| `MONID_API_KEY`, `BRAVE_SEARCH_API_KEY` | Optional research and web tools |
| `CROSSREF_MAILTO` | Contact address for scholarly metadata requests |
| `PUBLIC_TUNNEL_ORIGIN` | Public HTTPS origin of a tunnel to the local UI, used for Office Online previews and share links |
| `LOCAL_DB_PATH` | Optional custom SQLite path; defaults to `.aiworkspace/aiworkspace.sqlite` |
| `AGENT_URL` | Local Eve origin for the UI proxy; set automatically by `pnpm dev` |
| `PANDOC_PATH` | Optional full path to the Pandoc executable |

The application has one local user and no browser login or account checks. Keep the servers bound to loopback: the agent's Bash tool uses your computer's own environment and can access files outside a project folder through shell commands.

## Where data lives

- **Project files:** Your linked folders. Browser uploads, downloads, and agent file operations use local filesystem routes.
- **Application data:** `.aiworkspace/aiworkspace.sqlite` stores projects, conversation state, knowledge metadata, and share records. Schema migrations are in [`drizzle/`](./drizzle/).
- **Internal secret:** `.aiworkspace/agent-secret` is generated automatically for the local UI-to-agent connection.
- **Agent compute:** Eve runs Bash and Python on the host. No Docker image or separate database server is required. The bundled `aiworkspace_research` Python helper is available to agent commands; other Python packages come from your local environment.

The workspace calls external model and research APIs when those features are used. Back up both your project folders and `.aiworkspace/` if you need to preserve files and conversation history.

## Documents

The Markdown editor can export DOCX, DOCX with Mendeley or Zotero citations, LaTeX, and portable Markdown. Office files in the workspace open in Microsoft's read-only Office Online viewer. Because Microsoft fetches the file itself, local previews require a public HTTPS tunnel to `127.0.0.1:3000` and its base URL in `PUBLIC_TUNNEL_ORIGIN`; restart `pnpm dev` after changing it. The Share button also uses this origin for links that others can open. Keep the tunnel running while using either feature. The tunnel exposes the app, and Office previews send the viewed file to Microsoft's service.

To make a PDF, export DOCX and convert it with your local document software or ask the agent to do it. LibreOffice is optional for that local conversion; it is not used by the current Office file viewer.

The Share button creates a public link for a file. When `PUBLIC_TUNNEL_ORIGIN` is set, the link uses that tunnel even if you opened the workspace through localhost. Keep the app and tunnel running for others to view shared files or submit shared forms; form responses are saved in the project folder.

## Development commands

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm build:eve
pnpm db:migrate
```

## Architecture

| Location | Responsibility |
| --- | --- |
| `app/page.tsx`, `app/workspace/` | Homepage and local project dashboard |
| `app/[projectId]/[[...sessionId]]/` | Project editor and new/saved agent conversation |
| `app/account/` | Local AI key/model settings; this is not a subscription or login page |
| `app/api/`, `app/eve/` | Local filesystem, project/session, export, knowledge, sharing, and authenticated UI-to-agent routes |
| `app/share/[shareId]/` | Public-file viewer and forms |
| `agent/` | Eve model resolver, tool implementations, local Bash sandbox, and built-in research skills |
| `db/`, `drizzle/` | SQLite schema and migrations |
| `lib/`, `hooks/`, `components/`, `types/` | Shared storage, research, editor, UI, and typing dependencies |
| `scripts/local-dev.mjs`, `scripts/local-process.mjs` | Migrate SQLite and run local servers with Windows-compatible CLI launching |

## License

Released under the [PolyForm Noncommercial License 1.0.0](LICENSE.md).
