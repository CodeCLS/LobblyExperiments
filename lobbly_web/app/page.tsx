"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  Activity,
  Archive,
  Brain,
  Boxes,
  FileText,
  GitBranch,
  Layers,
  MessageCircle,
  Network,
  NotebookPen,
  Paperclip,
  Radar,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Table,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const widgetCatalog = [
  {
    title: "Knowledge Graph",
    description:
      "Live map of claims, components, and how every uploaded file supports them.",
    icon: Network,
    tag: "Graph",
  },
  {
    title: "Uploaded Files",
    description:
      "All inventor uploads with tags, provenance, and where each file is used.",
    icon: Archive,
    tag: "Files",
  },
  {
    title: "Feature Coverage",
    description:
      "Feature-by-feature coverage across uploads, gaps, and required details.",
    icon: Layers,
    tag: "Coverage",
  },
  {
    title: "Component Inventory",
    description:
      "Core modules, variants, and interfaces extracted from the uploads.",
    icon: Boxes,
    tag: "Components",
  },
  {
    title: "Claim Draft Suggestions",
    description:
      "Draft claim language grounded in the inventor’s uploaded evidence.",
    icon: NotebookPen,
    tag: "Claims",
  },
  {
    title: "Risks & Red Flags",
    description:
      "IP, enablement, and clarity risks flagged directly from the record.",
    icon: ShieldCheck,
    tag: "Risk",
  },
  {
    title: "Ambiguities & Questions",
    description:
      "Unclear connections, missing definitions, and open questions to answer.",
    icon: MessageCircle,
    tag: "Clarity",
  },
  {
    title: "Consistency Checks",
    description:
      "Conflicts across files, mismatched terminology, and missing references.",
    icon: Activity,
    tag: "Consistency",
  },
  {
    title: "Evidence Map",
    description:
      "Every claim element linked to supporting sections of uploaded files.",
    icon: GitBranch,
    tag: "Evidence",
  },
  {
    title: "Application Readiness",
    description:
      "What’s complete, what’s weak, and what must be added before filing.",
    icon: Radar,
    tag: "Readiness",
  },
  {
    title: "Cleaned Application",
    description:
      "Normalized terms, cleaned language, and a cohesive invention narrative.",
    icon: FileText,
    tag: "Clean",
  },
  {
    title: "Prior Art Signals",
    description:
      "Similarity alerts and novelty notes based on the inventor’s uploads.",
    icon: Search,
    tag: "Prior art",
  },
  {
    title: "Summary Brief",
    description:
      "A concise, inventor-friendly summary of the invention as captured.",
    icon: Brain,
    tag: "Insights",
  },
  {
    title: "Export Package",
    description:
      "Generate a clean filing package ready for counsel or direct filing.",
    icon: Sparkles,
    tag: "Export",
  },
];

const starterMessages = [
  {
    id: 1,
    role: "assistant",
    text: "Welcome back. Ready to capture the full invention scope?",
  },
  {
    id: 2,
    role: "assistant",
    text: "I'll guide you through claims, components, and novelty checks.",
  },
  {
    id: 3,
    role: "user",
    text: "Start with the core claim and the must-have modules.",
  },
  {
    id: 4,
    role: "assistant",
    text: "Got it. Which modules are mandatory vs optional variants?",
  },
];

const toolOptions = [
  "Prior Art Scan",
  "Claim Drafting",
  "Component Registry",
  "Risk & Compliance",
  "Evidence Tracker",
  "Competitor Radar",
];

const widgetLayout: Record<string, string> = {
  "Knowledge Graph": "md:col-span-2 md:row-span-2",
  "Uploaded Files": "md:col-span-1 md:row-span-2",
  "Feature Coverage": "md:col-span-1 md:row-span-2",
  "Component Inventory": "md:col-span-1 md:row-span-2",
  "Claim Draft Suggestions": "md:col-span-2 md:row-span-1",
  "Risks & Red Flags": "md:col-span-1 md:row-span-2",
  "Ambiguities & Questions": "md:col-span-2 md:row-span-1",
  "Consistency Checks": "md:col-span-1 md:row-span-1",
  "Evidence Map": "md:col-span-2 md:row-span-1",
  "Application Readiness": "md:col-span-1 md:row-span-1",
  "Cleaned Application": "md:col-span-1 md:row-span-1",
  "Prior Art Signals": "md:col-span-1 md:row-span-1",
  "Summary Brief": "md:col-span-1 md:row-span-1",
  "Export Package": "md:col-span-1 md:row-span-1",
};

const openQuestions = [
  "Define the exact control loop for the core module.",
  "Which parameters are essential for enablement?",
  "List the minimum viable hardware configuration.",
  "Clarify data inputs required for the key algorithm.",
  "Provide failure modes and fallback behavior.",
];

const detectedRisks = [
  "Enablement detail is thin for the sensing workflow.",
  "Terminology mismatch between diagram and narrative.",
  "No explicit disclosure of best-mode parameters.",
  "Potential prior art overlap in the core claim phrasing.",
];

const clarityGaps = [
  "Unclear linkage between optional modules and claims.",
  "Missing definition for primary performance metric.",
  "Ambiguous boundary between core and variant features.",
];

export default function Home() {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [files, setFiles] = useState<string[]>([
    "core-architecture.pdf",
    "sensor-pipeline.png",
    "bench-results.csv",
  ]);
  const [tools, setTools] = useState<string[]>([
    "Prior Art Scan",
    "Claim Drafting",
  ]);
  const [widgets, setWidgets] = useState(widgetCatalog);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [toolIndex, setToolIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const newMessage = {
      id: Date.now(),
      role: "user" as const,
      text: trimmed,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsSending(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant" as const,
          text: "Thanks. I mapped that into the claim tree and queued follow-ups.",
        },
      ]);
      setIsSending(false);
    }, 550);
  };

  const handleAddTool = () => {
    const nextTool = toolOptions[toolIndex % toolOptions.length];
    setTools((prev) => (prev.includes(nextTool) ? prev : [...prev, nextTool]));
    setToolIndex((prev) => prev + 1);
  };

  const handleFilePick = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(event.target.files ?? []).map((file) => file.name);
    if (picked.length) {
      setFiles((prev) => [...prev, ...picked]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!isSending) {
      inputRef.current?.focus();
    }
  }, [isSending]);

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    setWidgets((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const totalQuestions = 12;
  const answeredQuestions = Math.min(
    totalQuestions,
    Math.max(0, messages.filter((message) => message.role === "user").length)
  );
  const progressPercent = Math.round(
    (answeredQuestions / totalQuestions) * 100
  );
  const remainingQuestions = Math.max(
    0,
    totalQuestions - answeredQuestions
  );

  return (
    <div className="min-h-screen bg-[#ede9e2] text-slate-900">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_12%,_rgba(246,242,236,0.9),_transparent_55%),radial-gradient(circle_at_90%_0%,_rgba(215,210,202,0.6),_transparent_55%),linear-gradient(120deg,_rgba(237,233,226,0.8),_rgba(230,226,219,0.95))]" />
      <main className="relative grid h-screen w-full gap-6 px-6 py-6 lg:grid-cols-2">
        <section className="flex min-h-0 flex-col">
          <Card className="flex min-h-0 flex-1 flex-col border-slate-300/70 bg-white/85 shadow-xl shadow-slate-300/40 backdrop-blur">
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-slate-900 text-white">
                  Inventor workspace
                </Badge>
              </div>
              <div className="space-y-1">
                <CardTitle className="text-2xl">Inventor Chat</CardTitle>
                <CardDescription className="text-slate-600">
                  Answer guided prompts so we can build a complete, clean, and
                  defensible application.
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                {[
                  "Scope validation",
                  "Claim dependencies",
                  "Missing features",
                  "Risk flags",
                  "Novelty check",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-300/60 bg-slate-50/80 px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Application completeness</span>
                  <span>
                    {progressPercent}% · {remainingQuestions} questions left
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/70">
                  <div
                    className="h-full rounded-full bg-slate-900 transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
              <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto pr-2 text-sm">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      message.role === "user"
                        ? "ml-auto w-[86%] rounded-2xl border border-slate-300/70 bg-slate-900 px-4 py-3 text-white"
                        : "w-[88%] rounded-2xl border border-slate-300/70 bg-white px-4 py-3 text-slate-800"
                    }
                  >
                    {message.text}
                  </div>
                ))}
                {isSending && (
                  <div className="w-fit rounded-full border border-slate-300/70 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                    Sending to the claim graph...
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {files.map((file) => (
                  <Badge
                    key={file}
                    className="border border-slate-300/70 bg-slate-50 text-slate-700"
                  >
                    {file}
                  </Badge>
                ))}
                {tools.map((tool) => (
                  <Badge
                    key={tool}
                    className="border border-slate-300/70 bg-white text-slate-700"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Describe the invention detail or ask a question..."
                  className="flex-1 border-slate-300/70 bg-white text-slate-900 placeholder:text-slate-500"
                  disabled={isSending}
                />
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFilePick}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="border-slate-300/70 bg-white text-slate-700 hover:bg-slate-100"
                  >
                    <Paperclip className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleAddTool}
                    className="border-slate-300/70 bg-white text-slate-700 hover:bg-slate-100"
                  >
                    <Wrench className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSend}
                    disabled={!input.trim() || isSending}
                    className="bg-slate-900 text-white hover:bg-slate-800"
                  >
                    <Send className="size-4" />
                    Send
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </section>

        <section className="flex min-h-0 flex-col">
          <Card className="flex min-h-0 flex-1 flex-col border-slate-300/70 bg-white/85 shadow-xl shadow-slate-300/40 backdrop-blur">
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-2xl">Invention Review</CardTitle>
                  <CardDescription className="text-slate-600">
                    Your uploads are analyzed into evidence, gaps, and risks to
                    prepare a filing-ready application.
                  </CardDescription>
                </div>
                <Badge className="bg-slate-50 text-slate-700">
                  Review view
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                {[
                  "Drag to rearrange",
                  "Pin critical views",
                  "Export data",
                  "Share with counsel",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-300/60 bg-slate-50/80 px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
              <Card className="border-slate-300/70 bg-white">
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base text-slate-900">
                        Intake Review
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500">
                        Open questions, risks, and clarity gaps derived from uploads.
                      </CardDescription>
                    </div>
                    <Badge className="bg-slate-50 text-slate-700">
                      Needs responses
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-3 text-sm text-slate-600 md:grid-cols-3">
                  <div className="rounded-lg bg-slate-50/80 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Open Questions
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {openQuestions.map((item) => (
                        <li key={item} className="rounded-md bg-white px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-slate-50/80 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Detected Risks
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {detectedRisks.map((item) => (
                        <li key={item} className="rounded-md bg-white px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-slate-50/80 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Clarity Gaps
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {clarityGaps.map((item) => (
                        <li key={item} className="rounded-md bg-white px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <div className="grid min-h-0 flex-1 auto-rows-[minmax(140px,auto)] grid-flow-dense gap-3 overflow-auto pr-2 md:grid-cols-3">
                {widgets.map((widget, index) => {
                  const Icon = widget.icon;
                  const isDragging = dragIndex === index;
                  const isDragOver = dragOverIndex === index;
                  const isExpanded = expandedWidget === widget.title;
                  return (
                    <Card
                      key={widget.title}
                      className={`flex h-full flex-col border-slate-300/70 bg-white transition-all duration-300 ease-out ${
                        isDragging
                          ? "scale-[0.98] opacity-70 shadow-lg shadow-slate-200/80"
                          : "shadow-sm shadow-slate-200/60"
                      } ${isDragOver ? "ring-2 ring-slate-900/60" : ""} ${
                        widgetLayout[widget.title] ?? "md:col-span-1 md:row-span-1"
                      }`}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(event) => {
                        event.preventDefault();
                        setDragOverIndex(index);
                      }}
                      onDragEnter={() => setDragOverIndex(index)}
                      onDragLeave={() => {
                        if (dragOverIndex === index) {
                          setDragOverIndex(null);
                        }
                      }}
                      onDrop={() => handleDrop(index)}
                      onClick={() =>
                        setExpandedWidget((prev) =>
                          prev === widget.title ? null : widget.title
                        )
                      }
                    >
                      <CardHeader className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="grid size-9 place-items-center rounded-xl bg-slate-100/80">
                              <Icon className="size-5 text-slate-700" />
                            </div>
                            <div>
                              <CardTitle className="text-base text-slate-900">
                                {widget.title}
                              </CardTitle>
                              <CardDescription className="text-xs text-slate-500">
                                {widget.tag}
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="min-h-0 flex-1 text-sm text-slate-600">
                        <p className="break-words leading-snug">
                          {widget.description}
                        </p>
                        {isExpanded && (
                          <div className="mt-3 max-h-52 overflow-auto rounded-lg border border-slate-300/70 bg-slate-50/80 p-3 text-xs text-slate-600">
                            {widget.title === "Uploaded Files" && (
                              <div className="space-y-2">
                                {files.map((file) => (
                                  <div
                                    key={file}
                                    className="flex items-center justify-between rounded-md bg-white px-3 py-2"
                                  >
                                    <span className="break-words">{file}</span>
                                    <Badge className="bg-slate-100 text-slate-600">
                                      Linked
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            )}
                            {widget.title === "Knowledge Graph" && (
                              <div className="space-y-2">
                                {[
                                  "Core claim node connected to 6 components",
                                  "Evidence links: 9",
                                  "Open dependencies: 3",
                                ].map((item) => (
                                  <div
                                    key={item}
                                    className="rounded-md bg-white px-3 py-2"
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            )}
                            {widget.title === "Feature Coverage" && (
                              <div className="space-y-2">
                                {[
                                  "Core module: complete",
                                  "Interface spec: partial",
                                  "Fallback behavior: missing",
                                ].map((item) => (
                                  <div
                                    key={item}
                                    className="rounded-md bg-white px-3 py-2"
                                  >
                                    <span className="break-words">{item}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {widget.title === "Risks & Red Flags" && (
                              <div className="space-y-2">
                                {detectedRisks.map((item) => (
                                  <div
                                    key={item}
                                    className="rounded-md bg-white px-3 py-2"
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            )}
                            {widget.title === "Ambiguities & Questions" && (
                              <div className="space-y-2">
                                {openQuestions.map((item) => (
                                  <div
                                    key={item}
                                    className="rounded-md bg-white px-3 py-2"
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            )}
                            {widget.title === "Consistency Checks" && (
                              <div className="space-y-2">
                                {[
                                  "Term mismatch: sensor pipeline vs sensing stack",
                                  "Diagram references missing appendix",
                                  "Two modules share the same label",
                                ].map((item) => (
                                  <div
                                    key={item}
                                    className="rounded-md bg-white px-3 py-2"
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            )}
                            {widget.title === "Evidence Map" && (
                              <div className="space-y-2">
                                {[
                                  "Claim element A -> page 4, fig. 2",
                                  "Claim element B -> spec section 3.1",
                                  "Claim element C -> test data appendix",
                                ].map((item) => (
                                  <div
                                    key={item}
                                    className="rounded-md bg-white px-3 py-2"
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            )}
                            {widget.title === "Application Readiness" && (
                              <div className="space-y-2">
                                {[
                                  "Enablement: 72%",
                                  "Claim clarity: 68%",
                                  "Support coverage: 81%",
                                ].map((item) => (
                                  <div
                                    key={item}
                                    className="rounded-md bg-white px-3 py-2"
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            )}
                            {widget.title === "Cleaned Application" && (
                              <div className="space-y-2">
                                {[
                                  "Normalized 14 terms",
                                  "Merged duplicate components",
                                  "Removed speculative language",
                                ].map((item) => (
                                  <div
                                    key={item}
                                    className="rounded-md bg-white px-3 py-2"
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            )}
                            {widget.title === "Prior Art Signals" && (
                              <div className="space-y-2">
                                {[
                                  "Similarity to US20xx/xxxxxx at 0.71",
                                  "Potential overlap in sensing claim",
                                  "Novelty note added to actuator module",
                                ].map((item) => (
                                  <div
                                    key={item}
                                    className="rounded-md bg-white px-3 py-2"
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            )}
                            {widget.title === "Summary Brief" && (
                              <div className="space-y-2">
                                {[
                                  "Core value: automated detection + actuation",
                                  "Primary novelty: adaptive control loop",
                                  "Primary use: field-scale deployments",
                                ].map((item) => (
                                  <div
                                    key={item}
                                    className="rounded-md bg-white px-3 py-2"
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            )}
                            {widget.title === "Export Package" && (
                              <div className="space-y-2">
                                {[
                                  "Claims draft: prepared",
                                  "Figures list: pending",
                                  "Support matrix: prepared",
                                ].map((item) => (
                                  <div
                                    key={item}
                                    className="rounded-md bg-white px-3 py-2"
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
