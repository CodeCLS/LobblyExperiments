import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Headset,
  Link2,
  Network,
  Receipt,
  Settings,
  Shield,
  Sparkles,
  Target,
} from "lucide-react";

const risks = [
  "Potenzielle Überschneidung mit bestehenden Sensorfusion-Patenten.",
  "Unklare Offenbarung zur Fehlerbehandlung bei Sensorausfall.",
  "Regulatorische Anforderungen für sicherheitskritische Robotik.",
];

const openings = [
  "Vertikale Ausweitung auf Logistik- und Krankenhausrobotik.",
  "Lizenzierung des Safety Layers als eigenständiges Modul.",
  "Partnerschaft mit Sensorherstellern für integrierte Bundles.",
];

const priorArt = [
  {
    title: "US-2023-1187 Sensor Fusion for Industrial Automation",
    note: "Ähnliche Pipeline, jedoch ohne self-calibration.",
  },
  {
    title: "EP-412389 Safety Envelope for Mobile Robots",
    note: "Kontextbasierte Sicherheitszonen, Fokus auf mobilen Plattformen.",
  },
  {
    title: "WO-2022-7749 Edge Analytics for Vision Robotics",
    note: "Edge-Verarbeitung, aber keine Multisensorik.",
  },
];

const requiredInfo = [
  "Problem-Statement (1–2 Sätze)",
  "Kernanspruch (Claim-Sketch)",
  "Essenzielle Merkmale vs. optionale Varianten",
  "Konkrete Abgrenzung zum Stand der Technik",
  "Implementierungsdetails (Architektur, Datenfluss, Schnittstellen)",
  "Betriebsbedingungen & Grenzen",
  "Messbare Ergebnisse (Tests, Benchmarks, Logs)",
  "Erfinderliste + Beiträge",
  "Timeline (Idee, Prototyp, Veröffentlichungen)",
  "Offenlegung/Publikationen (Ort/Datum)",
  "Regulatorik/Sicherheitsnormen",
  "IP-Strategie (Länder, Fortsetzungen, Lizenzierung)",
  "Beweisdokumente/Anhänge",
];

const structuredFacts = [
  {
    title: "Features",
    items: [
      "Adaptive Sensorfusion (Lidar/Kamera/IMU) mit dynamischer Gewichtung",
      "Kontextabhängige Sicherheitszonen (Speed/Last/Umgebung)",
      "Selbstkalibrierung ohne externe Referenz",
      "Edge-Analytics zur Latenz- und Datenreduktion",
    ],
  },
  {
    title: "Komponenten",
    items: [
      "Sensor-Array: Lidar, Stereo-Kamera, IMU",
      "Fusionskern (Bayes/Graph-Optimierung)",
      "Safety Layer (Regelwerk + Echtzeit-Monitoring)",
      "Logging & Telemetrie (On-device + Cloud Sync)",
    ],
  },
  {
    title: "Architektur & Datenfluss",
    items: [
      "Vorverarbeitung → Feature-Extraktion → Fusionskern → Safety Layer",
      "Echtzeit-Pipeline mit < 45 ms End-to-End Latenz",
      "Fallback-Modus bei Sensorausfall",
    ],
  },
  {
    title: "Betriebsbedingungen",
    items: [
      "Temperaturbereich: 0–45°C",
      "Schutzklasse: IP54",
      "Zielgenauigkeit: ±3 cm",
      "Max. Ausfallrate Sensoren: < 1% pro Stunde",
    ],
  },
  {
    title: "Tests & Ergebnisse",
    items: [
      "35% weniger Ausreißer bei Störlicht",
      "18% schnellere Reaktionszeit gegenüber Vorversion",
      "5.000+ Simulationszyklen in variablen Fabriklayouts",
    ],
  },
  {
    title: "Offenlegung & Veröffentlichungen",
    items: [
      "Interne Demo am 15.01.2026",
      "Keine externe Veröffentlichung",
      "Marketing-Freigabe noch offen",
    ],
  },
  {
    title: "Erfinder & Beiträge",
    items: [
      "Mila Schneider: Sensorfusion & Gewichtung",
      "Lars König: Safety Layer & Failover",
      "Aylin Demir: Selbstkalibrierung",
    ],
  },
  {
    title: "IP-Strategie",
    items: [
      "Priorität DE, EU, US; später CN/JP",
      "Fortsetzungen für Safety Layer und Calibration",
      "Lizenzoptionen für OEM-Partner",
    ],
  },
  {
    title: "Regulatorik",
    items: [
      "Sicherheitsanforderungen nach ISO 10218",
      "CE-Konformität für EU",
      "Risikoanalyse nach ISO 12100",
    ],
  },
];

const reportInventions = [
  { id: "ID-1024", title: "Adaptive Sensorfusion für Industrie-Roboter" },
  { id: "ID-1023", title: "Energieeffizientes Edge-ML für Wearables" },
  { id: "ID-1019", title: "Sichere Datenfreigabe im MedTech-Netzwerk" },
  { id: "ID-1017", title: "Modulare Ladearchitektur für E-Flotten" },
];

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)_16rem]">
        <aside className="hidden w-64 flex-col border-r border-border bg-card px-4 py-6 lg:flex">
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Navigation
              </p>
              <p className="text-sm font-semibold text-foreground">Erfindung</p>
            </div>
            <div className="space-y-2">
              <Link
                href="/firm"
                className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground hover:bg-background"
              >
                Zur Übersicht
                <span className="text-xs text-muted-foreground">Alle</span>
              </Link>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground">
                Aktuelle Erfindung
                <Badge className="border border-border bg-card text-foreground">
                  Aktiv
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Weitere Erfindungen
              </p>
              <div className="mt-2 space-y-2">
                {reportInventions.slice(1).map((item) => (
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
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Erfindungsreport
              </p>
              <h1 className="text-2xl font-semibold text-foreground">
                Adaptive Sensorfusion für Industrie-Roboter
              </h1>
              <p className="text-sm text-muted-foreground">
                Erfinderin: Mila Schneider · Auronix GmbH · ID-1024
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border border-border bg-background text-foreground">
                  Eingegangen: 04.02.2026
                </Badge>
                <Badge className="border border-rose-200 bg-rose-50 text-rose-700">
                  Komplex
                </Badge>
                <Badge className="border border-blue-200 bg-blue-50 text-blue-700">
                  Neu
                </Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-border bg-card text-foreground hover:bg-accent"
              >
                <Link2 className="mr-2 size-4" />
                Eingabe-Link kopieren
              </Button>
              <Button type="button" className="bg-primary text-white hover:bg-primary/90">
                Status aktualisieren
              </Button>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-border bg-card px-6 py-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Review-Entscheidung
              </h2>
              <p className="text-xs text-muted-foreground">
                Freigabe-Status und nächste Aktionen
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" className="bg-primary text-white hover:bg-primary/90">
                Als bereit markieren
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-border bg-card text-foreground hover:bg-accent"
              >
                PDF exportieren
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-border bg-card text-foreground hover:bg-accent"
              >
                Word exportieren
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-border bg-card text-foreground hover:bg-accent"
              >
                Per E-Mail senden
              </Button>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              {
                title: "Technische Reife",
                value: "Gut",
                icon: CheckCircle2,
              },
              {
                title: "Neuheitsgrad",
                value: "Mittel",
                icon: AlertTriangle,
              },
              {
                title: "Klarheit der Offenbarung",
                value: "Verbesserbar",
                icon: FileText,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-3"
              >
                <item.icon className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.title}</p>
                  <p className="text-sm font-semibold text-foreground">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-foreground">
                Rückfrage senden
              </CardTitle>
              <FileText className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground">
              <div className="rounded-lg border border-border bg-card px-3 py-3">
                <p className="text-xs text-muted-foreground">
                  Kurze Rückfrage an die Erfinderin formulieren.
                </p>
                <div className="mt-3 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    placeholder="Frage eingeben..."
                    className="h-11 flex-1 rounded-lg border border-border px-3 text-sm text-foreground"
                  />
                  <Button
                    type="button"
                    className="h-11 bg-primary text-white hover:bg-primary/90"
                  >
                    Senden
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>



        <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-foreground">
                Knowledge Graph (Miro)
              </CardTitle>
              <Network className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="relative flex h-[360px] items-center justify-center rounded-xl border border-dashed border-border bg-gradient-to-br from-slate-50 via-white to-slate-100 text-center">
                <div className="max-w-xs text-sm text-muted-foreground">
                  Miro-Embed-Platzhalter
                  <div className="mt-2 text-xs text-muted-foreground">
                    Hier wird der interaktive Graph gerendert.
                  </div>
                </div>
                <div className="absolute right-6 top-6 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm">
                  Live Sync
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-card px-3 py-3">
                  <p className="text-xs text-muted-foreground">Knoten</p>
                  <p className="text-lg font-semibold text-foreground">48</p>
                </div>
                <div className="rounded-lg border border-border bg-card px-3 py-3">
                  <p className="text-xs text-muted-foreground">Verknüpfungen</p>
                  <p className="text-lg font-semibold text-foreground">92</p>
                </div>
                <div className="rounded-lg border border-border bg-card px-3 py-3">
                  <p className="text-xs text-muted-foreground">Offene Punkte</p>
                  <p className="text-lg font-semibold text-foreground">7</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-foreground">
                Kurzbeschreibung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-foreground">
              <p>
                Die Erfindung beschreibt eine adaptive Sensorfusion für
                Industrie-Roboter, die situativ zwischen verschiedenen
                Sensorkonfigurationen wechselt und dadurch eine erhöhte
                Ausfallsicherheit erzielt. Die Pipeline kombiniert Lidar,
                Kameras und IMU-Daten, passt die Gewichtung dynamisch an und
                liefert ein konsistentes Echtzeit-Wahrnehmungsmodell.
              </p>
              <p>
                Besonderer Fokus liegt auf einem selbstkalibrierenden Modul, das
                die Inbetriebnahme vereinfacht, sowie einem Safety Layer, der
                kontextabhängige Sicherheitszonen erzeugt. Zielmärkte sind
                hochautomatisierte Fertigungslinien mit variablen Umgebungen.
              </p>
              <div className="rounded-lg border border-border bg-background px-3 py-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Statusnotiz
                </p>
                <p className="text-sm text-foreground">
                  Offen: Validierung der Offline-Kalibrierung bei Temperaturschwankungen.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-foreground">
                Pflichtinformationen
              </CardTitle>
              <CheckCircle2 className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-foreground">
              {requiredInfo.map((item) => (
                <details
                  key={item}
                  className="rounded-lg border border-border bg-card px-3 py-2"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground">
                    <span>{item}</span>
                    <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700">
                      Fertig
                    </Badge>
                  </summary>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Detaillierte Angaben, Nachweise und Belege sind vorhanden.
                  </p>
                </details>
              ))}
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-foreground">
                Strukturierte Fakten
              </CardTitle>
              <FileText className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground">
              {structuredFacts.map((group) => (
                <details
                  key={group.title}
                  className="rounded-lg border border-border bg-card px-3 py-2"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-foreground">
                    {group.title}
                  </summary>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-foreground">
                Stand der Technik (Prior Art)
              </CardTitle>
              <Sparkles className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-3">
              {priorArt.map((item) => (
                <details
                  key={item.title}
                  className="rounded-lg border border-border bg-card px-4 py-3"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-foreground">
                    {item.title}
                  </summary>
                  <div className="mt-2 space-y-2 text-sm text-foreground">
                    <p>{item.note}</p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-foreground underline"
                    >
                      Quelle öffnen
                    </a>
                  </div>
                </details>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-foreground">
                Risiken & Lücken
              </CardTitle>
              <AlertTriangle className="size-4 text-rose-400" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground">
              {risks.map((risk) => (
                <div
                  key={risk}
                  className="rounded-lg border border-rose-100 bg-rose-50 px-3 py-3"
                >
                  {risk}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-foreground">
                Chancen & nächste Schritte
              </CardTitle>
              <Target className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground">
              {openings.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-3"
                >
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-foreground">
                Schutzstrategie
              </CardTitle>
              <Shield className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground">
              <div className="rounded-lg border border-border bg-card px-3 py-3">
                <p className="text-sm font-semibold text-foreground">
                  Anspruchsarchitektur
                </p>
                <p className="text-xs text-muted-foreground">
                  Kernerfindung + modulare Unteransprüche für Safety Layer und
                  Self-Calibration.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card px-3 py-3">
                <p className="text-sm font-semibold text-foreground">
                  Geografische Abdeckung
                </p>
                <p className="text-xs text-muted-foreground">
                  Empfehlung: EU, US, CN mit Fokus auf Fertigungsindustrie.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card px-3 py-3">
                <p className="text-sm font-semibold text-foreground">
                  Beweismaterial
                </p>
                <p className="text-xs text-muted-foreground">
                  Funktionsdemo, Logfiles der Sensorfusion, Simulationsdaten.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-foreground">
                Offene Fragen
              </CardTitle>
              <FileText className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground">
              {[
                "Welche Fehlerszenarien wurden getestet?",
                "Wie verhält sich die Fusion bei starkem Staub?",
                "Gibt es Vergleichsdaten zu bestehenden Lösungen?",
                "Welche Sicherheitsnormen gelten in Zielmärkten?",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-border bg-card px-3 py-3"
                >
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="hidden rounded-2xl border border-border bg-card px-6 py-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Review-Entscheidung
              </h2>
              <p className="text-xs text-muted-foreground">
                Freigabe-Status und nächste Aktionen
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-border bg-card text-foreground hover:bg-accent"
              >
                Rückfrage senden
              </Button>
              <Button type="button" className="bg-primary text-white hover:bg-primary/90">
                Als bereit markieren
              </Button>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              {
                title: "Technische Reife",
                value: "Gut",
                icon: CheckCircle2,
              },
              {
                title: "Neuheitsgrad",
                value: "Mittel",
                icon: AlertTriangle,
              },
              {
                title: "Klarheit der Offenbarung",
                value: "Verbesserbar",
                icon: FileText,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-3"
              >
                <item.icon className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.title}</p>
                  <p className="text-sm font-semibold text-foreground">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
          </div>
        </div>
        <div className="hidden lg:block" />
      </div>
      <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3">
        <input
          type="text"
          placeholder="Frage zur Erfindungsmeldung stellen..."
          className="h-11 w-[416px] rounded-full border border-border bg-card px-5 text-sm text-foreground shadow-lg"
        />
        <Button type="button" className="bg-primary text-white hover:bg-primary/90">
          Enter
        </Button>
      </div>
    </div>
  );
}
