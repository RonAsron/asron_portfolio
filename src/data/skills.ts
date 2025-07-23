export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
  level: "beginner" | "intermediate" | "advanced";
}

// Sample skills data organized by categories
export const skills: Skill[] = [
  // Frontend Skills
  { name: "React", category: "frontend", level: "advanced" },
  { name: "TypeScript", category: "frontend", level: "advanced" },
  { name: "JavaScript", category: "frontend", level: "advanced" },
  { name: "HTML5", category: "frontend", level: "advanced" },
  { name: "CSS3", category: "frontend", level: "advanced" },
  { name: "Tailwind CSS", category: "frontend", level: "intermediate" },
  { name: "Next.js", category: "frontend", level: "intermediate" },
  { name: "Vue.js", category: "frontend", level: "intermediate" },

  // Backend Skills
  { name: "Node.js", category: "backend", level: "advanced" },
  { name: "Express.js", category: "backend", level: "advanced" },
  { name: "REST APIs", category: "backend", level: "advanced" },
  { name: "Python", category: "backend", level: "intermediate" },
  { name: "PostgreSQL", category: "backend", level: "intermediate" },
  { name: "MongoDB", category: "backend", level: "intermediate" },
  { name: "Django", category: "backend", level: "intermediate" },
  { name: "GraphQL", category: "backend", level: "beginner" },

  // Tools & Technologies
  { name: "Git", category: "tools", level: "advanced" },
  { name: "Figma", category: "tools", level: "advanced" },
  { name: "Adobe Photoshop", category: "tools", level: "advanced" },
  { name: "Adobe Illustrator", category: "tools", level: "advanced" },
  { name: "Figma", category: "tools", level: "advanced" }, // เดิมมีอยู่แล้ว
  { name: "Canva", category: "tools", level: "advanced" },
  { name: 'Blender (3D)', category: 'tools', level: 'beginner' },
  { name: "Adobe XD", category: "tools", level: "intermediate" },
  { name: "Docker", category: "tools", level: "intermediate" },
  { name: "AWS", category: "tools", level: "intermediate" },
  { name: "Vite", category: "tools", level: "intermediate" },
  { name: "Webpack", category: "tools", level: "intermediate" },
  { name: "Jest", category: "tools", level: "intermediate" },

  // Other Skills
  { name: "Agile/Scrum", category: "other", level: "intermediate" },
  { name: "UI/UX Design", category: "other", level: "advanced" },
];
