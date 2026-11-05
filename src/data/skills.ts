import type { SkillCategory } from "@/types/content";

export const skillCategories: SkillCategory[] = [
  {
    id: "android",
    icon: "smartphone",
    title: "Android Development",
    description: "Native apps with modern, declarative UI and layered architecture.",
    skills: ["Kotlin", "Jetpack Compose", "Android SDK", "Java", "MVVM", "Clean Architecture"],
  },
  {
    id: "web",
    icon: "globe",
    title: "Web Development",
    description: "Typed, component-driven front ends and the services behind them.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    id: "backend",
    icon: "server",
    title: "Backend & Infrastructure",
    description: "APIs, data and the cloud services that keep products running.",
    skills: ["REST APIs", "Firebase", "AWS", "Cloud services"],
  },
  {
    id: "tools",
    icon: "wrench",
    title: "Tools",
    description: "The everyday workflow for building, reviewing and shipping.",
    skills: ["Git", "GitHub", "Android Studio", "VS Code"],
  },
];
