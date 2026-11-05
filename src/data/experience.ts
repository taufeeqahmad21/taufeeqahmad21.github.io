import type { EmploymentEntry } from "@/types/content";

/**
 * Professional employment, most recent first. Confirmed by Taufeeq (November 2026):
 * role, period, scope, the responsibilities listed and the technologies listed.
 * Do not add metrics, team sizes, clients or achievements that haven't been confirmed.
 */
export const employment: EmploymentEntry[] = [
  {
    id: "mtr",
    company: "My Taxi Ride (MTR)",
    role: "Senior Android Developer",
    startLabel: "February 2021",
    startDate: "2021-02",
    endLabel: null,
    endDate: null,
    employmentType: "Professional employment",
    summary:
      "Contributing to the development and maintenance of multiple Android applications within My Taxi Ride's transportation and dispatch software ecosystem.",
    responsibilities: [
      "Android application development and maintenance",
      "Application architecture and implementation",
      "API and backend integrations",
      "Performance optimization and debugging",
    ],
    technologies: ["Kotlin", "Android SDK", "Java", "Jetpack Compose", "MVVM", "Clean Architecture"],
    links: [
      { label: "Company website", href: "https://mtr.care/", kind: "website" },
      {
        label: "MTR on Google Play",
        href: "https://play.google.com/store/apps/dev?id=8463082059817782937",
        kind: "google-play",
      },
    ],
  },
];
