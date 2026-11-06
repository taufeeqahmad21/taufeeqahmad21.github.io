import type { SkillCategory } from "@/types/content";

export const skillCategories: SkillCategory[] = [
  {
    id: "android",
    title: "Android",
    description: "Native apps with modern, declarative UI and layered architecture.",
    skills: ["Kotlin", "Java", "Jetpack Compose", "Coroutines & Flow", "Retrofit", "Room", "CameraX", "Google Maps SDK", "MVVM", "Clean Architecture"],
  },
  {
    id: "web",
    title: "Web",
    description: "Typed, component-driven front ends and the services behind them.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    id: "backend",
    title: "Real-time & Cloud",
    description: "Live data, messaging and the cloud services that keep products running.",
    skills: ["MQTT", "SignalR", "REST APIs", "Firebase", "AWS Amplify", "Push messaging"],
  },
  {
    id: "tools",
    title: "Tools",
    description: "The everyday workflow for building, reviewing and shipping.",
    skills: ["Git", "GitHub", "Android Studio", "VS Code", "Postman"],
  },
];
