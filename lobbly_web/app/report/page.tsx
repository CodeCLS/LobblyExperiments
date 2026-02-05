import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Link2,
  Network,
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

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Erfindungsreport
              </p>
              <h1 className="text-2xl font-semibold text-slate-900">
                Adaptive Sensorfusion für Industrie-Roboter
              </h1>
              <p className="text-sm text-slate-500">
                Erfinderin: Mila Schneider · Auronix GmbH · ID-1024
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="border border-slate-200 bg-slate-50 text-slate-700">
                  Eingegangen: 04.02.2026
                </Badge>
                <Badge className="border border-slate-900 bg-slate-900 text-white">
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
                className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              >
                <Link2 className="mr-2 size-4" />
                Eingabe-Link kopieren
              </Button>
              <Button type="button" className="bg-slate-900 text-white hover:bg-slate-800">
                Status aktualisieren
              </Button>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Review-Entscheidung
              </h2>
              <p className="text-xs text-slate-500">
                Freigabe-Status und nächste Aktionen
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" className="bg-slate-900 text-white hover:bg-slate-800">
                Als bereit markieren
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              >
                PDF exportieren
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              >
                Word exportieren
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
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
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3"
              >
                <item.icon className="size-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-400">{item.title}</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900">
                Rückfrage senden
              </CardTitle>
              <FileText className="size-4 text-slate-400" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-3">
                <p className="text-xs text-slate-500">
                  Kurze Rückfrage an die Erfinderin formulieren.
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    placeholder="Frage eingeben..."
                    className="h-11 flex-1 rounded-lg border border-slate-200 px-3 text-sm text-slate-700"
                  />
                  <Button type="button" className="bg-slate-900 text-white hover:bg-slate-800">
                    Senden
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>



        <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900">
                Knowledge Graph (Miro)
              </CardTitle>
              <Network className="size-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="relative flex h-[360px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 text-center">
                <div className="max-w-xs text-sm text-slate-500">
                  Miro-Embed-Platzhalter
                  <div className="mt-2 text-xs text-slate-400">
                    Hier wird der interaktive Graph gerendert.
                  </div>
                </div>
                <div className="absolute right-6 top-6 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500 shadow-sm">
                  Live Sync
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-3">
                  <p className="text-xs text-slate-400">Knoten</p>
                  <p className="text-lg font-semibold text-slate-900">48</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-3">
                  <p className="text-xs text-slate-400">Verknüpfungen</p>
                  <p className="text-lg font-semibold text-slate-900">92</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-3">
                  <p className="text-xs text-slate-400">Offene Punkte</p>
                  <p className="text-lg font-semibold text-slate-900">7</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900">
                Kurzbeschreibung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600">
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
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Statusnotiz
                </p>
                <p className="text-sm text-slate-600">
                  Offen: Validierung der Offline-Kalibrierung bei Temperaturschwankungen.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900">
                Pflichtinformationen
              </CardTitle>
              <CheckCircle2 className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              {requiredInfo.map((item) => (
                <details
                  key={item}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-slate-900">
                    <span>{item}</span>
                    <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700">
                      Fertig
                    </Badge>
                  </summary>
                  <p className="mt-2 text-xs text-slate-500">
                    Detaillierte Angaben, Nachweise und Belege sind vorhanden.
                  </p>
                </details>
              ))}
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900">
                Strukturierte Fakten
              </CardTitle>
              <FileText className="size-4 text-slate-400" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              {structuredFacts.map((group) => (
                <details
                  key={group.title}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                    {group.title}
                  </summary>
                  <ul className="mt-2 space-y-1 text-xs text-slate-500">
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
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900">
                Stand der Technik (Prior Art)
              </CardTitle>
              <Sparkles className="size-4 text-slate-400" />
            </CardHeader>
            <CardContent className="space-y-3">
              {priorArt.map((item) => (
                <details
                  key={item.title}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                    {item.title}
                  </summary>
                  <div className="mt-2 space-y-2 text-sm text-slate-600">
                    <p>{item.note}</p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 underline"
                    >
                      Quelle öffnen
                    </a>
                  </div>
                </details>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900">
                Risiken & Lücken
              </CardTitle>
              <AlertTriangle className="size-4 text-rose-400" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
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
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900">
                Chancen & nächste Schritte
              </CardTitle>
              <Target className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
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

          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900">
                Schutzstrategie
              </CardTitle>
              <Shield className="size-4 text-slate-400" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-3">
                <p className="text-sm font-semibold text-slate-800">
                  Anspruchsarchitektur
                </p>
                <p className="text-xs text-slate-500">
                  Kernerfindung + modulare Unteransprüche für Safety Layer und
                  Self-Calibration.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-3">
                <p className="text-sm font-semibold text-slate-800">
                  Geografische Abdeckung
                </p>
                <p className="text-xs text-slate-500">
                  Empfehlung: EU, US, CN mit Fokus auf Fertigungsindustrie.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-3">
                <p className="text-sm font-semibold text-slate-800">
                  Beweismaterial
                </p>
                <p className="text-xs text-slate-500">
                  Funktionsdemo, Logfiles der Sensorfusion, Simulationsdaten.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900">
                Offene Fragen
              </CardTitle>
              <FileText className="size-4 text-slate-400" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              {[
                "Welche Fehlerszenarien wurden getestet?",
                "Wie verhält sich die Fusion bei starkem Staub?",
                "Gibt es Vergleichsdaten zu bestehenden Lösungen?",
                "Welche Sicherheitsnormen gelten in Zielmärkten?",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-3"
                >
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="hidden rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Review-Entscheidung
              </h2>
              <p className="text-xs text-slate-500">
                Freigabe-Status und nächste Aktionen
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              >
                Rückfrage senden
              </Button>
              <Button type="button" className="bg-slate-900 text-white hover:bg-slate-800">
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
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3"
              >
                <item.icon className="size-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-400">{item.title}</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
