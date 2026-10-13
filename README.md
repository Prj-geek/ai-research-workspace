AI Research Workspace
AI Research Workspace brings writing, an AI research assistant, and project files into one local workspace. The Next.js interface and Eve agent run on your computer, and each research project points to an existing folder on disk.
This project is intended for one trusted user on one computer.
Table of Contents
- Features
- Requirements
- Step-by-Step Setup on Windows
- Configure OpenRouter and AI Models
- Run the Application
- Create and Link a Research Project
- Step-by-Step Demo Workflow
- Feature Setup and Limitations
- Troubleshooting
- Where Data Is Stored
- Documents and Exports
- Development Commands
- Architecture
- License
Features
- Research documents: Rich Markdown editing with tables, math, images, inline citations, and generated bibliographies.
- Eve AI agent: Can use the open file, @-mentioned files, uploaded files, and selected passages as context. Depending on configuration, Eve can search literature and the web, inspect and edit project files, update bibliographies and literature matrices, and run local Bash or Python workflows.
- Project organization: Link an existing folder on your computer and manage its files inside the workspace.
- Literature management: Search literature, browse references, and maintain a reference library and literature matrix.
- Research artifacts: Organize references, data, analysis, reports, and figures; upload files and create folders or research artifacts.
- Writing assistance: Use document review and sentence suggestions when an appropriate AI model is configured.
- Equations and images: Generate LaTeX equations and analyze images when the selected model supports the required capability.
- Exports: Export documents as DOCX, citation-aware DOCX, LaTeX, or portable Markdown.
- Saved conversations: Conversations are saved per project so you can return to earlier work.
Requirements
Install the following tools before setting up the project:
Tool	Required version / purpose
Node.js	Version 24
pnpm	Version 11
Git for Windows	Needed to clone the repository; Git Bash is required for agent shell workflows on Windows
Python	Python 3 for agent commands and analysis


Download from the official sites:
- Node.js
- pnpm installation guide
- Git for Windows
- Python for Windows
Optional tools:
- Pandoc for DOCX and LaTeX export.
- LibreOffice for agent-assisted Office-to-PDF conversion.
- Additional Python packages or command-line tools may be needed for specific workflows.
Verify the prerequisites
Open PowerShell or the VS Code terminal and run:
node -v
npm -v
git --version
python --version
Node.js should report version v24.x.x. If a command is not recognized, finish installing the tool, check that it is on PATH, and restart VS Code.
Enable Corepack and activate pnpm:
corepack enable
corepack prepare pnpm@11 --activate
pnpm -v
If Corepack is unavailable, use the official pnpm installation guide.
Step-by-Step Setup on Windows
Step 1: Clone the repository
Open PowerShell or the VS Code terminal. Choose a directory where you want to keep the project:
Set-Location "$HOME\Documents"
git clone https://github.com/Prj-geek/ai-research-workspace.git
Set-Location .\ai-research-workspace
Open the folder in VS Code:
code .
Run all remaining project commands from the repository root—the directory containing package.json.
Step 2: Install dependencies
pnpm install --frozen-lockfile
Wait for the command to finish. If installation fails, check the Node.js and pnpm versions before changing dependency files.
Step 3: Create the environment file
On the first setup only, copy the example file:
Copy-Item .env.example .env.local
Open it:
notepad .env.local
If .env.local already exists, do not overwrite it. Preserve the existing configuration and edit only the settings you need.
No API credentials are included in the repository. Keep .env.local private and never commit API keys to GitHub.
Step 4: Decide whether to configure AI now
You can use local project files and editing without an AI API key. To use AI features, configure OpenRouter as described in the next section. You can also configure the key and models through the application's Settings page after startup.
Step 5: Start the application
pnpm dev
Keep this terminal open while using the application. The development launcher creates .aiworkspace/ if needed, applies SQLite migrations, and starts the Next.js interface and Eve agent.
Step 6: Open the application
Visit:
- http://127.0.0.1:3000
The UI listens on 127.0.0.1:3000; the Eve agent listens on 127.0.0.1:2000. The launcher starts both services for local development.
Configure OpenRouter and AI Models
AI features require a valid OpenRouter API key and suitable models. The main agent model must support tool calling.
Step 1: Create an OpenRouter API key
1. Visit OpenRouter.
2. Sign in or create an account.
3. Create an API key.
4. Review your account balance and the pricing of the model you plan to use.
Treat the API key like a password. Do not paste it into public issues, screenshots, source files, or commits.
Step 2: Open the application's model settings
1. Start the application with pnpm dev.
2. Open the workspace in your browser.
3. Open Settings from the workspace menu, or visit http://127.0.0.1:3000/account.
4. Enter an OpenRouter API key if one is not already configured.
A saved key is encrypted in .aiworkspace/ai-settings.json. OPENROUTER_API_KEY in .env.local remains available as a fallback when no key is saved in the application.
Step 3: Select a model for each task
The settings page has separate model fields for:
- Agent Conversations: Main Eve model; must support tool calling.
- Conversation Titles: Generates titles for new chats.
- Sentence Suggestions: Provides short completions in the editor.
- Document Review: Reviews and proofreads documents.
- Equation Generation: Creates LaTeX from a description.
- Image Analysis: Analyzes images passed to the agent's image-analysis tool; the model must support vision.
You may use the same model for several tasks, or select different models. Check each model's current availability, pricing, supported parameters, and context window on the OpenRouter model catalog.
For example, google/gemini-2.5-flash-lite is a model ID you can check for tool-calling support and current availability. Model availability and pricing can change, so verify them before relying on a model for a demo.
Click Save Settings. The application checks the key and selected models with OpenRouter, including whether the main chat model supports tools.
Step 4: Configure environment variables if preferred
Instead of configuring the key and main model through Settings, you can set initial defaults in .env.local:
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL_ID=your_model_id
OPENROUTER_MODEL_CONTEXT_WINDOW_TOKENS=your_model_context_window
Replace the placeholders with your own values. Use the model's published context window; do not guess it. Settings saved through the application may take precedence over environment defaults.
Other optional settings are documented in Configuration.
Context window vs. maximum output tokens
These settings are different:
- Context window is the total input-and-context capacity supported by a model.
- Maximum output tokens is the amount of text the application asks the model to generate in a single response.
A large context window does not mean that a request can afford to generate an equally large response. OpenRouter may reject a request if the requested output budget exceeds what your available credits can cover.
For ordinary outlines and short writing tasks, a maximum output limit of 2,048–4,096 tokens is often a practical starting point, if supported by the model and the application. If the application requests an excessive limit, locate the actual model request in the source code and adjust the appropriate output-token setting. Do not change maxOutputTokensPerSession without confirming its purpose; a session-history limit is not necessarily the model's output limit.
Create and Link a Research Project
Step 1: Open the workspace
1. Open the homepage.
2. Click Open Workspace.
3. Choose New Project.
Step 2: Link a folder on your computer
Choose Link Project Folder and enter an existing folder path.
Windows note: The native folder picker is available on macOS. On Windows, paste the full absolute path to an existing folder, for example:
C:\Users\YourUserName\Documents\Phishing-Research
Replace the example path with a folder that actually exists on your computer.
Step 3: Inspect the project structure
When a folder is linked, the workspace adds any missing canonical folders and files while preserving existing files:
your-research-folder/
├── 1-References/
│   └── references.bib
├── 2-Data/
├── 3-Analysis/
│   └── literature-matrix.matrix
├── 4-Reports/
└── research-draft.md
The research-draft.md file is a useful document to create for a demonstration; it may not be created automatically by linking a folder.
The project path is stored in SQLite. The agent displays the linked folder as /workspace, and agent shell commands use the linked project folder as their working directory. $AIWORKSPACE_PROJECT_DIR contains the absolute path.
Step-by-Step Demo Workflow
The following workflow can be used to demonstrate the application to a professor. Test each feature before presenting it, and do not claim that an optional integration works until you have verified it.
1. Show the homepage and workspace
- Open the homepage.
- Click Open Workspace.
- Open the project you created, or create a new one.
Explain that the app brings research documents, literature, and AI assistance into one local workspace.
2. Demonstrate project files
- Open the file explorer.
- Browse the research folders and files.
- Open a Markdown document.
- If appropriate, create a folder or upload a small sample file.
Explain that the project uses a folder on disk, so its files remain accessible to other local tools.
3. Demonstrate literature search
- Open Literature.
- Search for a topic such as phishing website detection machine learning.
- If OpenAlex is unavailable, try Crossref or PubMed where appropriate.
- Open a genuine result.
- Save a reference to the library or literature matrix if the control is available.
Literature search requires internet access. Provider rate limits and key requirements may apply. Verify papers and metadata before using them in academic work.
4. Demonstrate document editing
Open or create research-draft.md in the project root. You can use this sample:
# Detecting Phishing Websites Using Machine Learning

## Research Problem

Phishing websites imitate legitimate websites to steal sensitive information. Detecting them accurately is an important cybersecurity problem.

## Research Objectives

- Explore machine learning methods for phishing detection.
- Identify useful website features.
- Compare the strengths and limitations of different approaches.

## Proposed Methodology

Review existing research, identify candidate datasets, select baseline classification algorithms, and evaluate them using precision, recall, and F1-score.

## Expected Outcome

A structured literature review and a reproducible plan for evaluating phishing-detection models.

## References

Add verified research papers and their citation details here.
Then:
- Edit a sentence.
- Save and reopen the document to verify persistence.
- If available, insert a saved citation.
- Demonstrate an export, such as portable Markdown.
5. Demonstrate Eve's research assistance
Configure OpenRouter and verify that the Eve server is running before this part.
Try this prompt:
I'm researching phishing website detection using machine learning.
Create a structured research plan with the research question,
objectives, methodology, evaluation metrics, and limitations.
Clearly distinguish established facts from suggestions.
Do not invent papers or citations.
Explain how the assistant can use project context and available tools. Review its output rather than treating it as verified research.
6. Demonstrate editing with the agent
Try this prompt:
In research-draft.md, insert a section titled "Research Outline"
immediately after "## Research Problem" and before
"## Research Objectives".

Include:
1. Introduction to phishing websites
2. Review of existing detection approaches
3. Dataset selection and preprocessing
4. Feature selection and model development
5. Model evaluation
6. Limitations and future work

Preserve all existing content and headings. After editing,
show me the updated document so I can verify the insertion.
Verify the document after the operation. If anchor-based editing fails, ask the agent to generate the complete updated Markdown document in chat, then apply and verify the edit manually.
7. Show additional features
If configured and available in your build, demonstrate one or two of these:
- Document review and proofreading.
- Sentence suggestions.
- Equation generation.
- Image analysis.
- Literature matrix updates.
- Data analysis using the local Bash/Python tools.
8. Wrap up
Summarize the workflow: link a project folder, organize sources, write a document, and use AI assistance where configured.
For a live presentation, keep the development terminal running and have screenshots ready in case internet access or model requests fail.
Feature Setup and Limitations
Feature	Requirements
Project folders, file editing, CSV/XLSX, bibliography, matrices, diagrams	Local app and SQLite migrations; no model API key
Literature search	Internet access to Crossref, PubMed, or OpenAlex; provider rate limits and key requirements may apply
AI chat, document review, sentence suggestions, equation generation	OpenRouter key and a suitable model; chat also needs the local Eve server
Image analysis	OpenRouter key and a model with vision support
Agent analysis and command execution	Working Bash and Python on PATH, plus packages needed for the task
DOCX and LaTeX export	Pandoc on PATH, or PANDOC_PATH
Portable Markdown export	No Pandoc required
Knowledge search and transcription	Google key and the matching selected Google models
Brave and Monid agent tools	Their respective API keys
Office Online previews and external share links	Public HTTPS tunnel and PUBLIC_TUNNEL_ORIGIN


Without model credentials, use the local editor and reference-management workflow. Configuration notices indicate missing configuration; they do not guarantee provider availability or credential validity.
Troubleshooting
node, pnpm, or git is not recognized
Run:
node -v
pnpm -v
git --version
If a command is not recognized, install the corresponding tool, check PATH, and restart VS Code.
Dependency installation fails
From the repository root, run:
pnpm install --frozen-lockfile
Check that Node.js 24 and pnpm 11 are installed. Read the first meaningful error before changing dependencies or the lockfile.
The app does not open at port 3000
Confirm that pnpm dev is still running. Inspect its output for startup errors or a different port. If port 3000 is already occupied, stop the other process or use the port reported by the app.
AI requests fail with insufficient credits or too many requested tokens
For example, OpenRouter may report that the request asks for 65536 tokens but the account can only afford 13047.
Try these steps:
1. Check the balance at OpenRouter Credits.
2. Check the model's current input/output pricing and supported limits.
3. Use a shorter prompt for the initial test.
4. Select a less expensive compatible model if appropriate.
5. Reduce the application's actual maximum output-token request if it is too high.
Changing the model may lower cost, but it does not guarantee a fix if the application still requests the same excessive output budget.
To locate relevant code in VS Code, press Ctrl + Shift + F and search for:
maxOutputTokens
maxTokens
max_tokens
65536
If needed, run this from the repository root in PowerShell:
Get-ChildItem -Recurse -File -Include *.ts,*.tsx,*.js,*.mjs,*.json |
  Select-String -Pattern '65536|maxOutputTokens|maxTokens|max_tokens|openrouter|streamText'
Inspect the surrounding model-request code before editing it. A property named maxOutputTokensPerSession may control session history rather than the model output budget.
The AI model fails validation
- Confirm the model ID is available on OpenRouter.
- Check that the Agent Conversations model supports tool calling.
- Verify the API key and available credits.
- Check the selected model's supported context window and other parameters.
- Click Save Settings again and read any validation message.
The agent cannot run shell commands
Verify that Git Bash and Python are installed and available on PATH. Some tasks also require additional Python packages or command-line utilities.
Literature search returns no results
Check the internet connection and try another supported provider, such as Crossref or PubMed where appropriate. Provider rate limits, API keys, and the suitability of the search topic can affect results.
Office Online preview or public sharing does not work
These features require a public HTTPS tunnel and the correct PUBLIC_TUNNEL_ORIGIN. Keep the tunnel running while using the feature. Remember that the tunnel exposes the app, and Office Online previews send the viewed file to Microsoft's service.
Where Data Is Stored
- Project files: Stored in linked folders on your computer.
- Application database: .aiworkspace/aiworkspace.sqlite stores projects, conversation state, knowledge metadata, and share records.
- Local AI settings: .aiworkspace/ai-settings.json stores the encrypted API key and model settings when configured through the application.
- Agent secret: .aiworkspace/agent-secret is generated automatically for the local UI-to-agent connection.
- Database migrations: Stored in drizzle/.
Eve runs Bash and Python on the host computer. Docker and a separate database server are not required.
The workspace calls external model and research APIs when those features are used. Back up both your project folders and .aiworkspace/ if you need to preserve files and conversation history.
Documents and Exports
The Markdown editor supports export to:
- DOCX.
- DOCX with Mendeley or Zotero citations.
- LaTeX.
- Portable Markdown.
Pandoc is required for DOCX and LaTeX export unless the relevant environment is configured through PANDOC_PATH. Portable Markdown export does not need Pandoc.
Office files open in Microsoft's read-only Office Online viewer. Local previews require a public HTTPS tunnel to 127.0.0.1:3000 and its base URL in PUBLIC_TUNNEL_ORIGIN. Restart pnpm dev after changing the setting. The Share button also uses this origin for links others can open.
A public share link requires the app and tunnel to remain running. A tunnel exposes the application, and Office previews send the viewed file to Microsoft's service. Do not expose sensitive research documents without understanding these implications.
For PDF output, export DOCX and convert it using local document software or a suitable agent workflow. LibreOffice is optional for local conversion.
Configuration Details
The following optional environment variables are documented by the project:
Setting	Purpose
OPENROUTER_API_KEY	Fallback API key for OpenRouter
OPENROUTER_MODEL_ID	Main agent model
OPENROUTER_MODEL_CONTEXT_WINDOW_TOKENS	Published context-window size for the selected main model
OPENROUTER_MODEL_ID_LITE	Lightweight tasks such as conversation titles and sentence suggestions
OPENROUTER_REQUEST_TIMEOUT_MS	Optional timeout for one agent model request
OPENROUTER_MODEL_ID_REVIEW	Document review model; falls back to the main model
OPENROUTER_VISION_MODEL_ID	Image analysis model; falls back to the main model if it supports vision
GOOGLE_API_KEY	Google API key for supported knowledge and transcription workflows
GOOGLE_TRANSCRIPTION_MODEL_ID	Selected transcription model
GOOGLE_KNOWLEDGE_EMBEDDING_MODEL_ID	Knowledge-store embedding model
GOOGLE_KNOWLEDGE_QUERY_MODEL_ID	Knowledge-store query model
MONID_API_KEY	Optional Monid agent tools
BRAVE_SEARCH_API_KEY	Optional Brave search tools
CROSSREF_MAILTO	Contact address for scholarly metadata requests
PUBLIC_TUNNEL_ORIGIN	Public HTTPS origin for Office previews and share links
LOCAL_DB_PATH	Optional custom SQLite database path
AGENT_URL	Local Eve origin for the UI proxy; set by pnpm dev
PANDOC_PATH	Optional full path to the Pandoc executable


Use .env.example as the source of truth for the full list of settings. Do not assume a variable has an effect unless the application reads it.
Security Notes
The application is designed for one local user and does not provide browser login or account checks. Keep the servers bound to loopback. Eve's Bash tool runs in your computer's environment and may access files outside a linked project folder through shell commands.
- Never commit API keys or .env.local.
- Do not expose the app through a public tunnel unless you understand the risks.
- Verify AI-generated facts, papers, and citations before using them academically.
- Back up research files and application data.
Development Commands
Run these from the repository root:
pnpm typecheck
pnpm lint
pnpm build
pnpm build:eve
pnpm db:migrate
Architecture
Location	Responsibility
app/page.tsx, app/workspace/	Homepage and local project dashboard
app/[projectId]/[[...sessionId]]/	Project editor and new/saved agent conversation
app/account/	Local AI key/model settings; not a subscription or login page
app/api/, app/eve/	Filesystem, project/session, export, knowledge, sharing, and UI-to-agent routes
app/share/[shareId]/	Public-file viewer and forms
agent/	Eve model resolver, tool implementations, local Bash environment, and built-in research skills
db/, drizzle/	SQLite schema and migrations
lib/, hooks/, components/, types/	Shared storage, research, editor, UI, and typing dependencies
scripts/local-dev.mjs, scripts/local-process.mjs	SQLite migrations and local server launching, including Windows-compatible CLI launching


License
Released under the [PolyForm Noncommercial License 1.0.0](LICENSE.md).
