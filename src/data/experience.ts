import type { EmploymentEntry } from "@/types/content";

/**
 * Professional employment, most recent first. Kept in step with resume/resume.html, which
 * Taufeeq rebuilt from LinkedIn (November 2026): roles, periods, scope, highlights and stack.
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
    location: "New York · Remote",
    summary:
      "Developing and maintaining the Android apps for a real-time ride-hailing platform that serves both drivers and passengers.",
    responsibilities: [
      "Built live driver tracking and trip-status updates with Google Maps SDK, Firebase and MQTT.",
      "Reduced crash and ANR rates by restructuring background processing and main-thread work.",
      "Integrated REST APIs and push messaging for booking, dispatch and in-trip communication.",
      "Improved app responsiveness and UX across the driver and passenger flows.",
    ],
    technologies: [
      "Kotlin",
      "Java",
      "Jetpack Compose",
      "Google Maps SDK",
      "Firebase",
      "MQTT",
      "REST APIs",
      "MVVM",
      "Clean Architecture",
    ],
    links: [
      { label: "Company website", href: "https://mtr.care/", kind: "website" },
      {
        label: "MTR on Google Play",
        href: "https://play.google.com/store/apps/dev?id=8463082059817782937",
        kind: "google-play",
      },
    ],
  },
  {
    id: "brindasoft",
    company: "BrindaSoft",
    role: "Mobile Application Developer",
    startLabel: "March 2018",
    startDate: "2018-03",
    endLabel: "October 2022",
    endDate: "2022-10",
    employmentType: "Professional employment",
    location: "Lahore",
    summary:
      "Developed Android features for a scalable taxi platform, built on REST APIs and Firebase.",
    responsibilities: [
      "Real-time location tracking",
      "Driver–passenger communication",
      "Live trip updates",
      "REST API and Firebase integration",
    ],
    technologies: ["Kotlin", "Java", "Android SDK", "Firebase", "REST APIs"],
    links: [],
  },
];
