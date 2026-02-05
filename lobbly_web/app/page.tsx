"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Paperclip, Send, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text?: string;
  widgetKind?:
    | "dropzone"
    | "key-questions"
    | "graph-snippet"
    | "option-questions"
    | "file-snippet"
    | "sketch"
    | "missing-details"
    | "quick-summary";
};

const starterMessages: ChatMessage[] = [
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

const intakeSteps = [
  { title: "Data intake", detail: "Collect invention summary and uploads." },
  { title: "Initial questions", detail: "Clarify scope and core claims." },
  { title: "Risk questions", detail: "Surface enablement and novelty risks." },
  { title: "Feature questions", detail: "Ensure complete feature coverage." },
  { title: "Prior art search", detail: "Check overlap and novelty signals." },
  { title: "Clean & normalize", detail: "Unify terms and remove ambiguity." },
  { title: "Filing readiness", detail: "Prepare final package for counsel." },
];

type MessageListProps = {
  messages: ChatMessage[];
  isSending: boolean;
  endOfMessagesRef: React.RefObject<HTMLDivElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  quickQuestions: string[];
  optionQuestions: string[];
  files: string[];
  onQuickInsert: (text: string) => void;
};

type FooterBarProps = {
  files: string[];
  tools: string[];
  input: string;
  isSending: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onAddTool: () => void;
  onFilePick: (event: ChangeEvent<HTMLInputElement>) => void;
};

type WidgetPanelProps = {
  kind: NonNullable<ChatMessage["widgetKind"]>;
  quickQuestions: string[];
  optionQuestions: string[];
  files: string[];
  onQuickInsert: (text: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
};

const TimelineAside = () => {
  return (
    <aside className="hidden h-full flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="border-b border-slate-200 px-4 py-4">
        <p className="text-sm font-semibold text-slate-900">Intake Timeline</p>
        <p className="text-xs text-slate-500">Progress through filing steps</p>
      </div>
      <div className="flex-1 overflow-auto px-4 py-4">
        <ol className="space-y-4">
          {intakeSteps.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="flex size-7 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700">
                  {index + 1}
                </div>
                {index !== intakeSteps.length - 1 && (
                  <div className="mt-2 h-6 w-px bg-slate-200" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {step.title}
                </p>
                <p className="text-xs text-slate-500">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="border-t border-slate-200 px-4 py-4 text-xs text-slate-500">
        Patent intake workflow
      </div>
    </aside>
  );
};

const HeaderBar = () => {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Inventor Chat
          </h1>
          <p className="text-xs text-slate-500">
            Capture invention details and confirm filing readiness.
          </p>
        </div>
        <Badge className="bg-slate-900 text-white">Invention intake</Badge>
      </div>
    </header>
  );
};

const WidgetPanel = ({
  kind,
  quickQuestions,
  optionQuestions,
  files,
  onQuickInsert,
  fileInputRef,
}: WidgetPanelProps) => {
  if (kind === "dropzone") {
    return (
      <div>
        <p className="text-base font-semibold text-slate-600">File dropzone</p>
        <div className="mt-3 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-base text-slate-600">
          Drag files here or
          <button
            type="button"
            className="ml-1 text-slate-900 underline"
            onClick={() => fileInputRef.current?.click()}
          >
            browse
          </button>
          .
        </div>
      </div>
    );
  }

  if (kind === "key-questions") {
    return (
      <div>
        <p className="text-base font-semibold text-slate-600">Key questions</p>
        <div className="mt-3 space-y-2">
          {quickQuestions.map((question) => (
            <Button
              key={question}
              type="button"
              variant="outline"
              className="w-full justify-start border-slate-200 bg-white text-left text-base text-slate-700 hover:bg-slate-50"
              onClick={() => onQuickInsert(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "graph-snippet") {
    return (
      <div>
        <p className="text-base font-semibold text-slate-600">Graph snippet</p>
        <div className="mt-3 grid h-28 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500">
          Nodes: 6 · Links: 9
        </div>
      </div>
    );
  }

  if (kind === "option-questions") {
    return (
      <div>
        <p className="text-base font-semibold text-slate-600">Quick options</p>
        <div className="mt-3 flex flex-wrap gap-2 text-base text-slate-600">
          {optionQuestions.map((question) => (
            <Button
              key={question}
              type="button"
              variant="outline"
              className="border-slate-200 bg-white text-base text-slate-700 hover:bg-slate-50"
              onClick={() => onQuickInsert(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "file-snippet") {
    return (
      <div>
        <p className="text-base font-semibold text-slate-600">File snippet</p>
        <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-base text-slate-600">
          Latest upload: {files[0] ?? "No files yet"}
        </div>
      </div>
    );
  }

  if (kind === "sketch") {
    return (
      <div>
        <p className="text-base font-semibold text-slate-600">Sketch pad</p>
        <div className="mt-3 grid h-28 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500">
          Draw or upload a diagram
        </div>
      </div>
    );
  }

  if (kind === "missing-details") {
    return (
      <div>
        <p className="text-base font-semibold text-slate-600">Missing details</p>
        <div className="mt-3 space-y-2 text-base text-slate-600">
          {[
            "Primary sensing workflow",
            "Failure handling",
            "Operating constraints",
          ].map((item) => (
            <div
              key={item}
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-base font-semibold text-slate-600">Quick summary</p>
      <div className="mt-2">
        <Textarea
          rows={5}
          className="border-slate-200 bg-white text-base text-slate-700"
          defaultValue="Summarize the invention in 3-4 sentences..."
        />
      </div>
    </div>
  );
};

const MessageList = ({
  messages,
  isSending,
  endOfMessagesRef,
  fileInputRef,
  quickQuestions,
  optionQuestions,
  files,
  onQuickInsert,
}: MessageListProps) => {
  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#f7f7f8]">
        {messages.map((message) => {
          const containerClass =
            message.role === "user" ? "justify-end" : "justify-start";
          const bubbleClass =
            message.role === "user"
              ? "max-w-[78%] bg-white"
              : "max-w-[85%] bg-white";

          return (
            <div key={message.id} className="w-full px-4 py-3 text-sm">
              <div className={`flex w-full ${containerClass}`}>
                <div
                  className={`rounded-2xl border border-slate-200 px-6 py-5 text-slate-800 shadow-sm ${bubbleClass}`}
                >
                  {message.text}
                  {message.widgetKind && (
                    <div className="mt-4 max-h-80 overflow-auto border-t border-slate-200 pt-4 text-base">
                      <WidgetPanel
                        kind={message.widgetKind}
                        quickQuestions={quickQuestions}
                        optionQuestions={optionQuestions}
                        files={files}
                        onQuickInsert={onQuickInsert}
                        fileInputRef={fileInputRef}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {isSending && (
          <div className="px-4 py-3 text-xs text-slate-500">
            <div className="flex w-full justify-start">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2">
                Sending...
              </div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>
    </section>
  );
};

const FooterBar = ({
  files,
  tools,
  input,
  isSending,
  inputRef,
  fileInputRef,
  onInputChange,
  onSend,
  onAddTool,
  onFilePick,
}: FooterBarProps) => {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {files.map((file) => (
            <Badge
              key={file}
              className="border border-slate-200 bg-slate-50 text-slate-700"
            >
              {file}
            </Badge>
          ))}
          {tools.map((tool) => (
            <Badge
              key={tool}
              className="border border-slate-200 bg-white text-slate-700"
            >
              {tool}
            </Badge>
          ))}
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            ref={inputRef}
            value={input}
            onChange={(event) => onInputChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onSend();
              }
            }}
            placeholder="Describe the invention detail or ask a question..."
            className="h-18 flex-1 rounded-2xl border-slate-200 bg-white px-5 text-base text-slate-900 placeholder:text-slate-500"
            disabled={isSending}
          />
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={onFilePick}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            >
              <Paperclip className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onAddTool}
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            >
              <Wrench className="size-4" />
            </Button>
            <Button
              type="button"
              onClick={onSend}
              disabled={!input.trim() || isSending}
              className="bg-slate-900 text-white hover:bg-slate-800"
            >
              <Send className="size-4" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FilesAside = ({ files }: { files: string[] }) => {
  return (
    <aside className="hidden h-full flex-col border-l border-slate-200 bg-white lg:flex">
      <div className="border-b border-slate-200 px-4 py-4">
        <p className="text-sm font-semibold text-slate-900">Uploaded Files</p>
        <p className="text-xs text-slate-500">All inventor uploads</p>
      </div>
      <div className="flex-1 overflow-auto px-4 py-4">
        {files.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-xs text-slate-500">
            No files uploaded yet.
          </div>
        ) : (
          <ul className="space-y-2 text-sm text-slate-700">
            {files.map((file) => (
              <li
                key={file}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2"
              >
                {file}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-t border-slate-200 px-4 py-4 text-xs text-slate-500">
        File status updates appear here
      </div>
    </aside>
  );
};

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [toolIndex, setToolIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const widgetKinds: ChatMessage["widgetKind"][] = [
    "dropzone",
    "key-questions",
    "graph-snippet",
    "option-questions",
    "file-snippet",
    "sketch",
    "missing-details",
    "quick-summary",
  ];

  const createWidgetMessage = (): ChatMessage => {
    const randomKind =
      widgetKinds[Math.floor(Math.random() * widgetKinds.length)];
    return {
      id: Date.now() + 2,
      role: "assistant",
      widgetKind: randomKind,
    };
  };

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
          role: "assistant",
          text: "Thanks. I mapped that into the claim tree and queued follow-ups.",
        },
        createWidgetMessage(),
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

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isSending]);

  const quickQuestions = [
    "What is the core technical problem being solved?",
    "Which components are essential vs optional variants?",
    "What makes this invention novel over prior art?",
  ];

  const optionQuestions = [
    "Does it require hardware?",
    "Is there a software algorithm?",
    "Any safety or regulatory constraints?",
  ];

  const handleQuickInsert = (text: string) => {
    setInput((prev) => (prev ? `${prev} ${text}` : text));
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-slate-900">
      <div className="grid h-screen grid-cols-1 lg:grid-cols-[280px_1fr_280px]">
        <TimelineAside />

        <main className="flex h-full flex-col overflow-hidden">
          <HeaderBar />
          <MessageList
            messages={messages}
            isSending={isSending}
            endOfMessagesRef={endOfMessagesRef}
            fileInputRef={fileInputRef}
            quickQuestions={quickQuestions}
            optionQuestions={optionQuestions}
            files={files}
            onQuickInsert={handleQuickInsert}
          />
          <FooterBar
            files={files}
            tools={tools}
            input={input}
            isSending={isSending}
            inputRef={inputRef}
            fileInputRef={fileInputRef}
            onInputChange={setInput}
            onSend={handleSend}
            onAddTool={handleAddTool}
            onFilePick={handleFilePick}
          />
        </main>

        <FilesAside files={files} />
      </div>
    </div>
  );
}
