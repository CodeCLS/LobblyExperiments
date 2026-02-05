import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Filter,
  Headset,
  Receipt,
  Search,
  Settings,
  Timer,
} from "lucide-react";

const disclosures = [
  {
    id: "ID-1024",
    title: "Adaptive Sensorfusion für Industrie-Roboter",
    inventor: "Mila Schneider",
    company: "Auronix GmbH",
    status: "Neu",
    received: "04.02.2026",
    priority: "Komplex",
    tags: ["Robotik", "Sensorik"],
  },
  {
    id: "ID-1023",
    title: "Energieeffizientes Edge-ML für Wearables",
    inventor: "Jan Köhler",
    company: "VitaLoop AG",
    status: "In Prüfung",
    received: "03.02.2026",
    priority: "Standard",
    tags: ["Edge AI", "Wearables"],
  },
  {
    id: "ID-1019",
    title: "Sichere Datenfreigabe im MedTech-Netzwerk",
    inventor: "Aylin Demir",
    company: "Mediflow GmbH",
    status: "Rückfrage",
    received: "01.02.2026",
    priority: "Komplex",
    tags: ["Security", "MedTech"],
  },
  {
    id: "ID-1017",
    title: "Modulare Ladearchitektur für E-Flotten",
    inventor: "Tobias Werner",
    company: "VoltWay SE",
    status: "Freigabe",
    received: "31.01.2026",
    priority: "Einfach",
    tags: ["E-Mobility", "Energy"],
  },
  {
    id: "ID-1013",
    title: "Predictive Maintenance mit Schwingungsprofilen",
    inventor: "Lucia Becker",
    company: "Nordline Systems",
    status: "In Prüfung",
    received: "29.01.2026",
    priority: "Standard",
    tags: ["IoT", "Maintenance"],
  },
];

const statusStyles: Record<string, string> = {
  Neu: "border-blue-200 bg-blue-50 text-blue-700",
  "In Prüfung": "border-amber-200 bg-amber-50 text-amber-700",
  Rückfrage: "border-rose-200 bg-rose-50 text-rose-700",
  Freigabe: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const priorityStyles: Record<string, string> = {
  Komplex: "border-rose-200 bg-rose-50 text-rose-700",
  Standard: "border-amber-200 bg-amber-50 text-amber-700",
  Einfach: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export default function FirmPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)_16rem]">
        <aside className="hidden w-64 flex-col border-r border-border bg-card px-4 py-6 lg:flex">
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Navigation
              </p>
              <p className="text-sm font-semibold text-foreground">Übersicht</p>
            </div>
            <div className="space-y-2">
              <Link
                href="/firm"
                className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground"
              >
                Übersicht
                <Badge className="border border-border bg-card text-foreground">
                  Aktiv
                </Badge>
              </Link>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Weitere Erfindungen
              </p>
              <div className="mt-2 space-y-2">
                {disclosures.slice(0, 4).map((item) => (
                  <Link
                    key={item.id}
                    href="/report"
                    className="flex flex-col rounded-lg border border-border bg-card px-3 py-2 text-xs text-foreground hover:bg-background"
                  >
                    <span className="font-semibold text-foreground">
                      {item.title}
                    </span>
                    <span>{item.id}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-2 text-xs text-muted-foreground">
              Wechsel zur Detailansicht, um einzelne Meldungen zu prüfen.
            </div>
            <div className="mt-4 space-y-2">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground hover:bg-background"
              >
                <span className="flex items-center gap-2">
                  <Receipt className="size-4 text-muted-foreground" />
                  Abrechnung
                </span>
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground hover:bg-background"
              >
                <span className="flex items-center gap-2">
                  <Headset className="size-4 text-muted-foreground" />
                  Support
                </span>
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground hover:bg-background"
              >
                <span className="flex items-center gap-2">
                  <Settings className="size-4 text-muted-foreground" />
                  Einstellungen
                </span>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-7xl flex-col gap-6 px-8 py-8">
          <header className="flex flex-col gap-4 rounded-2xl border border-border bg-card px-6 py-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Kanzlei-Dashboard
                </p>
                <h1 className="text-2xl font-semibold text-foreground">
                  Eingegangene Erfindungsmeldungen
                </h1>
                <p className="text-sm text-muted-foreground">
                  Überblick über alle Meldungen, Status und Prioritäten.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-border bg-card text-foreground hover:bg-accent"
                >
                  <Filter className="mr-2 size-4" />
                  Filter
                </Button>
                <Button type="button" className="bg-primary text-white hover:bg-primary/90">
                  Eingabe-Link erstellen
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Meldungen, Erfinder oder Unternehmen suchen..."
                  className="pl-9"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                className="border-border bg-card text-foreground hover:bg-accent"
              >
                Export
              </Button>
            </div>
          </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Gesamt
              </CardTitle>
              <FileText className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-foreground">
                {disclosures.length}
              </div>
              <p className="text-xs text-muted-foreground">Aktive Meldungen</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Neu
              </CardTitle>
              <AlertCircle className="size-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-foreground">2</div>
              <p className="text-xs text-muted-foreground">Wartet auf Triage</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Prüfung
              </CardTitle>
              <Timer className="size-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-foreground">2</div>
              <p className="text-xs text-muted-foreground">In Bearbeitung</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Freigabe
              </CardTitle>
              <CheckCircle2 className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-foreground">1</div>
              <p className="text-xs text-muted-foreground">Bereit zur Freigabe</p>
            </CardContent>
          </Card>
        </section>

          <section className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Alle Meldungen
              </h2>
              <p className="text-xs text-muted-foreground">
                Letzte Aktualisierung heute
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="border-border bg-card text-foreground hover:bg-accent"
            >
              Status aktualisieren
            </Button>
          </div>
          <div className="divide-y divide-border">
            {disclosures.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 px-6 py-4 md:grid-cols-[2fr_1.2fr_1fr_1.1fr_1fr_1fr]"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.id}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="border border-border bg-background text-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Komplexität
                  </p>
                  <Badge className={`mt-1 border ${priorityStyles[item.priority]}`}>
                    {item.priority}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Erfinder
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {item.inventor}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.company}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Status
                  </p>
                  <Badge
                    className={`mt-1 border ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Eingegangen
                  </p>
                  <p className="text-sm text-foreground">{item.received}</p>
                </div>
                <div className="flex items-center gap-2 md:justify-end">
                  <Button
                    asChild
                    type="button"
                    variant="outline"
                    className="border-border bg-card text-foreground hover:bg-accent"
                  >
                    <Link href="/report">Öffnen</Link>
                  </Button>
                  <Button type="button" className="bg-primary text-white hover:bg-primary/90">
                    Bearbeiten
                  </Button>
                </div>
              </div>
            ))}
          </div>
          </section>
          </div>
        </div>
        <div className="hidden lg:block" />
      </div>
    </div>
  );
}
