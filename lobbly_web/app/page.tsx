"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Paperclip, Send, Settings, User, Wrench } from "lucide-react";
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

const starterMessages: ChatMessage[] = [];

const toolOptions = [
  "Stand-der-Technik-Scan",
  "Anspruchsentwurf",
  "Komponentenregister",
  "Risiko & Compliance",
  "Evidenz-Tracker",
  "Wettbewerbsradar",
];

const intakeSteps = [
  { title: "Datenerfassung", detail: "Erfindungszusammenfassung und Uploads sammeln." },
  { title: "Erste Fragen", detail: "Umfang und Kernansprüche klären." },
  { title: "Risikofragen", detail: "Offenbarung und Neuheitsrisiken erkennen." },
  { title: "Funktionsfragen", detail: "Vollständige Merkmalsabdeckung sicherstellen." },
  { title: "Stand-der-Technik", detail: "Überschneidungen und Neuheit prüfen." },
  { title: "Bereinigen & normalisieren", detail: "Begriffe vereinheitlichen und Mehrdeutigkeiten entfernen." },
  { title: "Anmeldebereitschaft", detail: "Finales Paket für die Kanzlei vorbereiten." },
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
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Aufnahme-Zeitleiste
            </p>
            <p className="text-xs text-slate-500">
              Fortschritt der Anmeldeschritte
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              aria-label="Profil"
            >
              <User className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              aria-label="Einstellungen"
            >
              <Settings className="size-4" />
            </Button>
          </div>
        </div>
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
        Patent-Aufnahme-Workflow
      </div>
    </aside>
  );
};

const HeaderBar = () => {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <h1 className="text-lg font-semibold text-slate-900">
          2spl Erfinderaufnahme
        </h1>
        <p className="text-xs text-slate-500">
          Erfindungsdetails erfassen und Anmeldebereitschaft bestätigen.
        </p>
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
        <p className="text-base font-semibold text-slate-600">Dateiablage</p>
        <div className="mt-3 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-base text-slate-600">
          Dateien hierher ziehen oder
          <button
            type="button"
            className="ml-1 text-slate-900 underline"
            onClick={() => fileInputRef.current?.click()}
          >
            durchsuchen
          </button>
          .
        </div>
      </div>
    );
  }

  if (kind === "key-questions") {
    return (
      <div>
        <p className="text-base font-semibold text-slate-600">Schlüsselfragen</p>
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
        <p className="text-base font-semibold text-slate-600">Graph-Ausschnitt</p>
        <div className="mt-3 grid h-28 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500">
          Knoten: 6 · Verbindungen: 9
        </div>
      </div>
    );
  }

  if (kind === "option-questions") {
    return (
      <div>
        <p className="text-base font-semibold text-slate-600">Schnelloptionen</p>
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
        <p className="text-base font-semibold text-slate-600">Datei-Ausschnitt</p>
        <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-base text-slate-600">
          Letzter Upload: {files[0] ?? "Noch keine Dateien"}
        </div>
      </div>
    );
  }

  if (kind === "sketch") {
    return (
      <div>
        <p className="text-base font-semibold text-slate-600">Skizzenfeld</p>
        <div className="mt-3 grid h-28 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500">
          Zeichnen oder Diagramm hochladen
        </div>
      </div>
    );
  }

  if (kind === "missing-details") {
    return (
      <div>
        <p className="text-base font-semibold text-slate-600">Fehlende Details</p>
        <div className="mt-3 space-y-2 text-base text-slate-600">
          {[
            "Primärer Sensorik-Workflow",
            "Fehlerbehandlung",
            "Betriebsbedingungen",
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
      <p className="text-base font-semibold text-slate-600">Kurzzusammenfassung</p>
      <div className="mt-2">
        <Textarea
          rows={5}
          className="border-slate-200 bg-white text-base text-slate-700"
          defaultValue="Fasse die Erfindung in 3–4 Sätzen zusammen..."
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
                Senden...
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
            placeholder="Erfindungsdetail beschreiben oder eine Frage stellen..."
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
              Senden
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
        <p className="text-sm font-semibold text-slate-900">Hochgeladene Dateien</p>
        <p className="text-xs text-slate-500">Alle Erfinder-Uploads</p>
      </div>
      <div className="flex-1 overflow-auto px-4 py-4">
        {files.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-xs text-slate-500">
            Noch keine Dateien hochgeladen.
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
        Dateistatus-Updates erscheinen hier
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
          text: "Danke. Ich habe das in den Anspruchsbaum übertragen und Folgefragen vorbereitet.",
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
    "Welches Kernproblem wird technisch gelöst?",
    "Welche Komponenten sind essenziell vs. optionale Varianten?",
    "Was macht die Erfindung gegenüber dem Stand der Technik neu?",
  ];

  const optionQuestions = [
    "Erfordert es Hardware?",
    "Gibt es einen Software-Algorithmus?",
    "Gibt es Sicherheits- oder regulatorische Vorgaben?",
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
