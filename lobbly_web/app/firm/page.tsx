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
  Search,
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
  Komplex: "border-slate-900 bg-slate-900 text-white",
  Standard: "border-slate-200 bg-slate-50 text-slate-700",
  Einfach: "border-slate-200 bg-white text-slate-500",
};

export default function FirmPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Kanzlei-Dashboard
              </p>
              <h1 className="text-2xl font-semibold text-slate-900">
                Eingegangene Erfindungsmeldungen
              </h1>
              <p className="text-sm text-slate-500">
                Überblick über alle Meldungen, Status und Prioritäten.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              >
                <Filter className="mr-2 size-4" />
                Filter
              </Button>
              <Button type="button" className="bg-slate-900 text-white hover:bg-slate-800">
                Eingabe-Link erstellen
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Meldungen, Erfinder oder Unternehmen suchen..."
                className="pl-9"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            >
              Export
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-500">
                Gesamt
              </CardTitle>
              <FileText className="size-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-slate-900">
                {disclosures.length}
              </div>
              <p className="text-xs text-slate-500">Aktive Meldungen</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-500">
                Neu
              </CardTitle>
              <AlertCircle className="size-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-slate-900">2</div>
              <p className="text-xs text-slate-500">Wartet auf Triage</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-500">
                In Prüfung
              </CardTitle>
              <Timer className="size-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-slate-900">2</div>
              <p className="text-xs text-slate-500">In Bearbeitung</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-500">
                Freigabe
              </CardTitle>
              <CheckCircle2 className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-slate-900">1</div>
              <p className="text-xs text-slate-500">Bereit zur Freigabe</p>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Alle Meldungen
              </h2>
              <p className="text-xs text-slate-500">
                Letzte Aktualisierung heute
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            >
              Status aktualisieren
            </Button>
          </div>
          <div className="divide-y divide-slate-100">
            {disclosures.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 px-6 py-4 md:grid-cols-[2fr_1.2fr_1.1fr_1fr_1fr]"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <Badge
                      className={`border ${priorityStyles[item.priority]}`}
                    >
                      {item.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">{item.id}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="border border-slate-200 bg-slate-50 text-slate-600"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Erfinder
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {item.inventor}
                  </p>
                  <p className="text-xs text-slate-500">{item.company}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Status
                  </p>
                  <Badge
                    className={`mt-1 border ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Eingegangen
                  </p>
                  <p className="text-sm text-slate-700">{item.received}</p>
                </div>
                <div className="flex items-center gap-2 md:justify-end">
                  <Button
                    asChild
                    type="button"
                    variant="outline"
                    className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                  >
                    <Link href="/report">Öffnen</Link>
                  </Button>
                  <Button type="button" className="bg-slate-900 text-white hover:bg-slate-800">
                    Bearbeiten
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
