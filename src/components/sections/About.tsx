import React from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../../data/personal";
import { skills } from "../../data/skills";
import { SECTION_IDS } from "../../utils/constants";

const levelColors = {
  beginner: 'bg-beginner text-white border-beginner',
  intermediate: 'bg-intermediate text-white border-intermediate',
  advanced: 'bg-advanced text-white border-advanced',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const About = React.memo(() => {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Category display names
  const categoryNames = {
    frontend: "Frontend",
    backend: "Backend",
    tools: "Tools & Technologies",
    other: "Other Skills",
  };

  const handleResumeDownload = () => {
    // For now, we'll create a placeholder link
    // In a real implementation, this would link to an actual resume file
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // This would be the actual resume file path
    link.download = `${personalInfo.name.replace(" ", "_")}_Resume.pdf`;
    link.click();
  };

  return (
    <section
      id={SECTION_IDS.ABOUT}
      className="py-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted dark:from-dark-background dark:to-dark-muted px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary dark:text-dark-foreground mb-4">
            About Me
          </h2>
          <motion.div
            className="w-24 h-1 bg-secfontcolor mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          ></motion.div>
        </motion.div>

        {/* Two-column layout: Biography and Skills */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Biography Section */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div>
              <h3 className="text-2xl font-semibold text-primary dark:text-dark-foreground mb-4">
                My Story
              </h3>
              <p className="text-lg text-primary dark:text-dark-foregroundlight leading-relaxed mb-6">
                {personalInfo.bio}

              </p>
              <p className="text-lg text-primary dark:text-dark-foregroundlight leading-relaxed">
                {personalInfo.story}
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Info
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-3 text-secfontcolor"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {personalInfo.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-3 text-secfontcolor"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {personalInfo.email}
                </div>
              </div>
            </div>

            {/* Resume Download Button */}
            <div>
              <button
                onClick={handleResumeDownload}
                className="inline-flex items-center px-6 py-3 bg-secfontcolor text-white font-semibold rounded-lg shadow-lg hover:bg-mainfontcolor transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-sobackfontcolor"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </button>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-secfontcolor dark:text-dark-foreground mb-6">
              Skills & Technologies
            </h3>

            <div className="space-y-8">
              {Object.entries(skillsByCategory).map(
                ([category, categorySkills], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
                  >
                    <h4 className="text-lg font-medium text-primary dark:text-dark-foreground mb-4">
                      {categoryNames[category as keyof typeof categoryNames]}
                    </h4>

                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium text-center transition-all duration-200 hover:shadow-md touch-manipulation min-h-[40px] flex items-center justify-center ${
                            levelColors[skill.level]
                          }`}
                          title={`${skill.name} - ${skill.level}`}
                          variants={skillVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{
                            delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {skill.name}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )
              )}
            </div>

            {/* Skills Legend */}
            <motion.div
              className="mt-8 p-4 bg-muted rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h5 className="text-sm font-medium text-skillcolor mb-3">
                Skill Levels:
              </h5>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2 bg-beginner"></div>
                  <span className="text-sm text-fontbeginner">Beginner</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2 bg-intermediate"></div>
                  <span className="text-sm text-fontintermediate">Intermediate</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2 bg-advanced"></div>
                  <span className="text-sm text-fontadvanced">Advanced</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

export default About;
