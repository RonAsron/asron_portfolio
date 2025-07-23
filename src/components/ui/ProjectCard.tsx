import React from "react";
import { motion } from "framer-motion";
import { Project } from "../../data/projects";
import LazyImage from "./LazyImage";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
    },
  }),
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
};

const ProjectCard = React.memo(({ project, index = 0 }: ProjectCardProps) => {
  return (
    <motion.div
      className="bg-background dark:bg-dark-cardbg  rounded-lg shadow-md overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      custom={index}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Project Image */}
      <div className="relative h-48 bg-cardbggray dark:bg-dark-cardbggray  overflow-hidden">
        <LazyImage
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full transition-transform duration-300 hover:scale-110"
        />
        {project.featured && (
          <motion.div
            className="absolute top-2 right-2 bg-secfontcolor text-white px-2 py-1 rounded-full text-xs font-medium"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            Featured
          </motion.div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold  text-primary dark:text-dark-foreground mb-2">
          {project.title}
        </h3>
        <p className="text-primary dark:text-dark-foregroundlight mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-cardbg text-cardtext dark:text-dark-cardtext dark:bg-dark-cardbg text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-secfontcolor text-white text-center py-3 px-4 rounded-lg hover:bg-mainfontcolor active:bg-sobackfontcolor transition-colors duration-200 font-medium touch-manipulation min-h-[44px] flex items-center justify-center"
            >
              Live Demo
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 border-2 border-gray-300 text-gray-700 text-center py-3 px-4 rounded-lg hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 font-medium touch-manipulation min-h-[44px] flex items-center justify-center ${
              !project.liveUrl
                ? "bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700 border-gray-900"
                : ""
            }`}
          >
            Source Code
          </a>
        </div>
      </div>
    </motion.div>
  );
});

export default ProjectCard;
