"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download } from "lucide-react";
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

const starterTree = `Claim: Autonomous orchard robot :: overall system [root]
> Perception stack :: detects fruit clusters [sensor]
>> Depth camera :: estimates distance [range]
> Mobility base :: navigates rows [actuator]
> Harvest arm :: picks fruit [actuator]
>> End-effector :: grips fruit without bruising [tool]`;

type Issue = { line: number; message: string };

function validateTree(text: string, requiresClaimRoot: boolean): Issue[] {
  const issues: Issue[] = [];
  const lines = text.split(/\r?\n/);
  let lastDepth = 0;

  lines.forEach((raw, index) => {
    const line = raw.trim();
    if (!line) return;

    const depthMatch = line.match(/^(>*)/);
    const depth = depthMatch ? depthMatch[1].length : 0;
    const content = line.replace(/^(>*)\s*/, "");

    if (depth - lastDepth > 1) {
      issues.push({
        line: index + 1,
        message: "Depth jumps by more than one level.",
      });
    }
    lastDepth = depth;

    if (requiresClaimRoot && index === 0 && !content.startsWith("Claim:")) {
      issues.push({
        line: index + 1,
        message: "Root must start with 'Claim:'.",
      });
    }

    if (!content.includes("::")) {
      issues.push({
        line: index + 1,
        message: "Missing '::' meaning annotation.",
      });
    }

    const [labelPart] = content.split("::");
    if (!labelPart?.replace(/^Claim:\s*/, "").trim()) {
      issues.push({
        line: index + 1,
        message: "Missing a label before '::'.",
      });
    }

    if (/\[[^\]]*$/.test(content)) {
      issues.push({
        line: index + 1,
        message: "Unclosed [tag] bracket.",
      });
    }
  });

  return issues;
}

export default function Home() {
  const [treeText] = useState(starterTree);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { id: number; role: "user" | "assistant"; text: string }[]
  >([
    {
      id: 1,
      role: "assistant",
      text: "Starting with the orchard robot tree. Anything missing in sensing?",
    },
    {
      id: 2,
      role: "user",
      text: "Add depth camera and end-effector tags so counsel can map device elements.",
    },
    {
      id: 3,
      role: "assistant",
      text: "Got it. I’ll sync the updated nodes into the board.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatStatus, setChatStatus] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const chatInputRef = useRef<HTMLInputElement | null>(null);
  const claimSectionRef = useRef<HTMLElement | null>(null);
  const claimsDocRef = useRef<HTMLElement | null>(null);
  const [attorneyMessages, setAttorneyMessages] = useState<
    { id: number; role: "attorney" | "assistant"; text: string }[]
  >([
    {
      id: 1,
      role: "attorney",
      text: "Add a dependent claim covering the sensor fusion step.",
    },
    {
      id: 2,
      role: "assistant",
      text: "Noted. I’ll add a new branch for sensor fusion.",
    },
    {
      id: 3,
      role: "attorney",
      text: "Also tighten the end-effector definition to avoid ambiguity.",
    },
  ]);
  const [attorneyInput, setAttorneyInput] = useState("");
  const [attorneyStatus, setAttorneyStatus] = useState<string | null>(null);
  const [isPostingAttorney, setIsPostingAttorney] = useState(false);
  const attorneyInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isPosting) {
      chatInputRef.current?.focus();
    }
  }, [isPosting]);

  useEffect(() => {
    if (!isPostingAttorney) {
      attorneyInputRef.current?.focus();
    }
  }, [isPostingAttorney]);

  const issues = useMemo(() => validateTree(treeText, true), [treeText]);
  const miroEmbedUrl = process.env.NEXT_PUBLIC_MIRO_EMBED_URL ?? "";
  const miroEmbedUrlViewOnly = useMemo(() => {
    if (!miroEmbedUrl) return "";
    try {
      const url = new URL(miroEmbedUrl);
      url.searchParams.set("embedMode", "view_only_without_ui");
      return url.toString();
    } catch {
      const separator = miroEmbedUrl.includes("?") ? "&" : "?";
      return `${miroEmbedUrl}${separator}embedMode=view_only_without_ui`;
    }
  }, [miroEmbedUrl]);

  const makeViewportUrl = (baseUrl: string, seed: number) => {
    if (!baseUrl) return "";
    const rng = (value: number) =>
      Math.floor(((Math.sin(value) + 1) / 2) * 8000 - 4000);
    const x = rng(seed + 1);
    const y = rng(seed + 2);
    const w = 1200 + Math.abs(rng(seed + 3)) % 1200;
    const h = 800 + Math.abs(rng(seed + 4)) % 800;
    const viewport = `${x},${y},${w},${h}`;

    try {
      const url = new URL(baseUrl);
      url.searchParams.set("moveToViewport", viewport);
      return url.toString();
    } catch {
      const separator = baseUrl.includes("?") ? "&" : "?";
      return `${baseUrl}${separator}moveToViewport=${viewport}`;
    }
  };

  const miroEmbedInnovation = useMemo(
    () => makeViewportUrl(miroEmbedUrlViewOnly, Date.now()),
    [miroEmbedUrlViewOnly]
  );
  const miroEmbedClaim = useMemo(
    () => makeViewportUrl(miroEmbedUrlViewOnly, Date.now() + 4242),
    [miroEmbedUrlViewOnly]
  );

  const handleSyncToMiro = async () => {
    if (issues.length > 0 || isSyncing) return;
    setIsSyncing(true);
    setSyncStatus("Sending tree to Miro...");
    try {
      const response = await fetch("/api/miro/tree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ treeText }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setSyncStatus(data?.error ?? "Failed to sync to Miro.");
      } else {
        setSyncStatus(
          `Created ${data?.created ?? 0} shapes and ${data?.connectors ?? 0} connectors on the board.`
        );
      }
    } catch (error) {
      setSyncStatus("Network error. Check your Miro credentials and try again.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleScrollToClaims = () => {
    if (!claimSectionRef.current) return;
    claimSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScrollToClaimsDoc = () => {
    if (!claimsDocRef.current) return;
    claimsDocRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAttorneySubmit = async () => {
    const trimmed = attorneyInput.trim();
    if (!trimmed || isPostingAttorney) return;

    const messageId = Date.now();
    setAttorneyMessages((prev) => [
      ...prev,
      { id: messageId, role: "attorney", text: trimmed },
    ]);
    setAttorneyInput("");
    attorneyInputRef.current?.focus();
    setIsPostingAttorney(true);
    setAttorneyStatus("Adding node to claim graph...");

    try {
      const response = await fetch("/api/miro/shape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setAttorneyStatus(data?.error ?? "Failed to add node.");
      } else {
        setAttorneyStatus("Node added to the claim graph.");
      }
    } catch (error) {
      setAttorneyStatus("Network error. Check your Miro credentials.");
    } finally {
      setIsPostingAttorney(false);
      attorneyInputRef.current?.focus();
    }
  };

  const handleChatSubmit = async () => {
    const trimmed = chatInput.trim();
    if (!trimmed || isPosting) return;

    const messageId = Date.now();
    setChatMessages((prev) => [
      ...prev,
      { id: messageId, role: "user", text: trimmed },
    ]);
    setChatInput("");
    chatInputRef.current?.focus();
    setIsPosting(true);
    setChatStatus("Adding rectangle to Miro...");

    try {
      const response = await fetch("/api/miro/shape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setChatStatus(data?.error ?? "Failed to add rectangle.");
      } else {
        setChatStatus("Rectangle added to the board.");
      }
    } catch (error) {
      setChatStatus("Network error. Check your Miro credentials.");
    } finally {
      setIsPosting(false);
      chatInputRef.current?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#f2efe8] text-slate-950">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,_#e1f0ff,_transparent_45%),radial-gradient(circle_at_85%_10%,_#fde6c7,_transparent_50%),linear-gradient(120deg,_#f7f4ed,_#ece7db)]" />
        <div className="relative mx-auto grid min-h-screen max-w-7xl gap-8 px-6 py-8 md:px-10 lg:grid-cols-[1fr_1.2fr]">
          <section className="flex min-h-0 flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-slate-900 text-slate-50">Innovation chat</Badge>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Lobbly innovation graph
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                Describe the innovation. Watch the graph grow.
              </h1>
              <p className="mt-3 text-base text-slate-600">
                It asks questions to sharpen the idea and capture the key
                information your invention needs.
              </p>
            </div>

            <Card className="flex min-h-0 flex-1 flex-col border-slate-200/70 bg-white/90">
              <CardHeader>
                <CardTitle>Innovation chat</CardTitle>
                <CardDescription>
                  Answer prompts to grow the innovation graph.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
                <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto pr-2 text-sm text-slate-700">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={
                        message.role === "user"
                          ? "ml-auto w-[86%] rounded-2xl bg-slate-900 px-4 py-3 text-slate-50"
                          : "w-[88%] rounded-2xl bg-slate-100/80 px-4 py-3"
                      }
                    >
                      {message.text}
                    </div>
                  ))}
                  {chatStatus && (
                    <div className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                      {chatStatus}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
                  <Input
                    ref={chatInputRef}
                    autoFocus
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleChatSubmit();
                      }
                    }}
                    placeholder="Type a message and press Enter..."
                    className="flex-1"
                    disabled={isPosting}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleChatSubmit}
                    disabled={isPosting || !chatInput.trim()}
                  >
                    Send
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </section>

          <section className="flex min-h-0 flex-col">
            <Card className="flex min-h-0 flex-1 flex-col border-slate-200/80 bg-white/95">
              <CardHeader>
                <CardTitle>Innovation graph</CardTitle>
                <CardDescription>
                  Live Miro board showing your evolving idea map.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex min-h-0 flex-1 flex-col gap-4 text-sm text-slate-600">
                <div className="flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  {miroEmbedInnovation ? (
                    <iframe
                      title="Miro knowledge graph"
                      src={miroEmbedInnovation}
                      className="h-full w-full"
                      allow="fullscreen; clipboard-read; clipboard-write"
                    />
                  ) : (
                    <div className="grid h-full place-items-center bg-slate-50 text-center text-sm text-slate-500">
                      <div>
                        <p className="font-semibold text-slate-700">
                          Add your Miro live embed URL
                        </p>
                        <p>
                          Set NEXT_PUBLIC_MIRO_EMBED_URL to see the board here.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {syncStatus && (
                  <p className="text-xs text-slate-500">{syncStatus}</p>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-2">
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={handleScrollToClaims}
                >
                  Generate Claim Graph
                </Button>
              </CardFooter>
            </Card>
          </section>
        </div>
      </div>

      <section className="relative border-t border-slate-200/70 bg-[#f3efe6]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_#eef6ff,_transparent_55%),linear-gradient(120deg,_#f7f4ed,_#ece7db)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:px-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-slate-900 text-slate-50">Prior art</Badge>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Research pipeline
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            We run prior art search, filtering, cleaning, and more.
          </h2>
          <div className="flex flex-wrap gap-2 text-sm text-slate-600">
            {[
              "Prior Art Search",
              "Filtering",
              "Cleaning",
              "Clustering",
              "Relevance scoring",
              "Attorney annotations",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white/80 px-3 py-1"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div
        ref={claimSectionRef}
        className="relative min-h-screen border-t border-slate-200/70 bg-[#f5f1e7]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,_#efe5ff,_transparent_45%),radial-gradient(circle_at_80%_10%,_#ffe9d3,_transparent_50%),linear-gradient(120deg,_#f9f6ef,_#f0e9dd)]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-6 py-8 md:px-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-slate-900 text-slate-50">Claim review</Badge>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Attorney feedback
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                Refine the claim graph with attorney corrections.
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Track objections, missing elements, and wording changes right next
                to the graph.
              </p>
            </div>
          </div>

          <div className="grid min-h-0 flex-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
            <section className="flex min-h-0 flex-col">
              <Card className="flex min-h-0 flex-1 flex-col border-slate-200/70 bg-white/90">
                <CardHeader>
                  <CardTitle>Attorney notes</CardTitle>
                  <CardDescription>
                    Capture corrections before finalizing claims.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
                  <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto pr-2 text-sm text-slate-700">
                    {attorneyMessages.map((message) => (
                      <div
                        key={message.id}
                        className={
                          message.role === "assistant"
                            ? "ml-auto w-[86%] rounded-2xl bg-slate-900 px-4 py-3 text-slate-50"
                            : "w-[88%] rounded-2xl bg-slate-100/80 px-4 py-3"
                        }
                      >
                        {message.text}
                      </div>
                    ))}
                    {attorneyStatus && (
                      <div className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                        {attorneyStatus}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-stretch gap-2">
                  <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
                    <Input
                      ref={attorneyInputRef}
                      autoFocus
                      value={attorneyInput}
                      onChange={(event) => setAttorneyInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          handleAttorneySubmit();
                        }
                      }}
                      placeholder="Add attorney feedback and press Enter..."
                      className="flex-1"
                      disabled={isPostingAttorney}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleAttorneySubmit}
                      disabled={isPostingAttorney || !attorneyInput.trim()}
                    >
                      Send
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </section>

            <section className="flex min-h-0 flex-col">
              <Card className="flex min-h-0 flex-1 flex-col border-slate-200/80 bg-white/95">
                <CardHeader>
                  <CardTitle>Claim graph</CardTitle>
                  <CardDescription>
                    Structured claims with attorney revisions applied.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex min-h-0 flex-1 flex-col gap-4 text-sm text-slate-600">
                  <div className="flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  {miroEmbedClaim ? (
                    <iframe
                      title="Claim graph"
                      src={miroEmbedClaim}
                      className="h-full w-full"
                      allow="fullscreen; clipboard-read; clipboard-write"
                    />
                    ) : (
                      <div className="grid h-full place-items-center bg-slate-50 text-center text-sm text-slate-500">
                        <div>
                          <p className="font-semibold text-slate-700">
                            Add your Miro live embed URL
                          </p>
                          <p>
                            Set NEXT_PUBLIC_MIRO_EMBED_URL to see the board here.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-stretch gap-2">
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={handleScrollToClaimsDoc}
                  >
                    Generate Claims
                  </Button>
                </CardFooter>
              </Card>
            </section>
          </div>
        </div>
      </div>

      <section
        ref={claimsDocRef}
        className="relative min-h-screen border-t border-slate-200/70 bg-[#f7f2ea]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_#e7f3ff,_transparent_50%),radial-gradient(circle_at_85%_15%,_#ffe7d1,_transparent_45%),linear-gradient(120deg,_#fbf7f0,_#f1ebe0)]" />
        <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-10 md:px-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-slate-900 text-slate-50">Claim draft</Badge>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Generated document
            </span>
          </div>
          <div>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              Draft claims for review.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Dummy claims below illustrate the format that will be generated
              from the innovation graph.
            </p>
          </div>

          <Card className="border-slate-200/80 bg-white/95">
            <CardHeader>
              <CardTitle>Claims document</CardTitle>
              <CardDescription>
                Placeholder claims (auto-generated example).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-700">
              <details className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                  Patent description
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  An autonomous orchard robot system that navigates crop rows,
                  detects fruit clusters, and coordinates harvesting actions to
                  minimize bruising while optimizing throughput.
                </p>
              </details>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                <p className="font-semibold text-slate-900">Claim 1</p>
                <p className="mt-2">
                  An autonomous orchard robot system comprising: a mobility base
                  configured to navigate crop rows; a perception stack including
                  a depth camera configured to detect fruit clusters; and a
                  harvesting arm with an end-effector configured to grip fruit
                  without bruising, wherein the system coordinates navigation
                  and harvesting based on the detected fruit clusters.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                <p className="font-semibold text-slate-900">Claim 2</p>
                <p className="mt-2">
                  The system of claim 1, wherein the perception stack further
                  includes a sensor fusion module that combines depth data with
                  visual cues to determine ripeness prior to actuation of the
                  harvesting arm.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                <p className="font-semibold text-slate-900">Claim 3</p>
                <p className="mt-2">
                  The system of claim 1, wherein the end-effector includes a
                  compliant gripping surface and a force feedback sensor to
                  maintain a target pressure range during fruit extraction.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-2">
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {[
                  "Export to Microsoft Word",
                  "Export to ClaimMaster",
                  "Export to PatSnap",
                  "Export to LexisNexis PatentOptimizer",
                  "Export to Derwent",
                  "Export to IP.com",
                  "Export to Docket Navigator",
                  "Export to The PatentBot",
                ].map((label) => (
                  <Button
                    key={label}
                    variant="default"
                    className="whitespace-nowrap bg-slate-900 text-slate-50 hover:bg-slate-800"
                  >
                    <Download className="size-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}

