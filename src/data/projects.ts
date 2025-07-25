export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
}

// Sample project data
export const projects: Project[] = [
  {
  id: '1',
  title: 'Asron Portfolio',
  description: 'A modern personal portfolio website built with React and TypeScript. It showcases my skills, projects, and contact information. Features include responsive design, dark mode toggle, animated sections, and integration with Supabase for data handling.',
  technologies: ['React', 'TypeScript', 'Supabase', 'Firebase Hosting'],
  imageUrl: 'https://urtihtjsdumqtibnrkkh.supabase.co/storage/v1/object/public/avatars//Asron_Portfolio.png',
  liveUrl: 'https://labsreon.web.app/',
  githubUrl: 'https://github.com/RonAsron/asron_portfolio.git',
  featured: true,
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['React', 'TypeScript', 'Socket.io', 'MongoDB', 'Express'],
    imageUrl: '/images/projects/task-manager.jpg',
    liveUrl: 'https://taskmanager-demo.example.com',
    githubUrl: 'https://github.com/johndoe/task-manager',
    featured: true,
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities using external weather APIs.',
    technologies: ['React', 'JavaScript', 'CSS3', 'Weather API'],
    imageUrl: '/images/projects/weather-dashboard.jpg',
    liveUrl: 'https://weather-dashboard.example.com',
    githubUrl: 'https://github.com/johndoe/weather-dashboard',
    featured: false,
  },
  {
    id: '4',
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React and Tailwind CSS, featuring smooth animations and optimized performance.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    imageUrl: '/images/projects/portfolio-website.jpg',
    githubUrl: 'https://github.com/johndoe/portfolio-website',
    featured: false,
  },
  {
    id: '5',
    title: 'Blog CMS',
    description: 'A content management system for blogs with markdown support, user roles, and SEO optimization features.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    imageUrl: '/images/projects/blog-cms.jpg',
    liveUrl: 'https://blog-cms-demo.example.com',
    githubUrl: 'https://github.com/johndoe/blog-cms',
    featured: true,
  },
  {
    id: '6',
    title: 'API Gateway Service',
    description: 'A microservices API gateway built with Node.js, featuring rate limiting, authentication, and request routing.',
    technologies: ['Node.js', 'Express', 'Redis', 'Docker', 'JWT'],
    imageUrl: '/images/projects/api-gateway.jpg',
    githubUrl: 'https://github.com/johndoe/api-gateway',
    featured: false,
  },
]