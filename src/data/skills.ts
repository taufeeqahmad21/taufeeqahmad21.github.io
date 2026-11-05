import type { SkillCategory } from "@/types/content";

export const skillCategories: SkillCategory[] = [
  {
    id: "android",
    title: "Android",
    description: "Native apps with modern, declarative UI and layered architecture.",
    skills: ["Kotlin", "Jetpack Compose", "Android SDK", "Java", "MVVM", "Clean Architecture"],
  },
  {
    id: "web",
    title: "Web",
    description: "Typed, component-driven front ends and the services behind them.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    id: "backend",
    title: "Backend & Infrastructure",
    description: "APIs, data and the cloud services that keep products running.",
    skills: ["REST APIs", "Firebase", "AWS", "Cloud Services"],
  },
  {
    id: "tools",
    title: "Tools",
    description: "The everyday workflow for building, reviewing and shipping.",
    skills: ["Git", "GitHub", "Android Studio", "VS Code"],
  },
];
