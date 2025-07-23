import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../../data/personal";
import { SECTION_IDS, SCROLL_OFFSET } from "../../utils/constants";
import { smoothScrollToSection } from "../../utils/dataHelpers";
import supabase from "../../utils/supabaseClient";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

const avatarVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const Hero = React.memo(() => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const scrollToSection = (sectionId: string) => {
    smoothScrollToSection(sectionId, SCROLL_OFFSET);
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      // ✅ ชื่อไฟล์แบบกำหนดตรง (เช่น ron.jpg)
      const fileName = "ron.jpg";
      const { data: publicUrlData } = supabase.storage
        .from("profile")
        .getPublicUrl(fileName);

      if (!publicUrlData?.publicUrl) {
        setImageError(true);
        return;
      }

      // ✅ ลบ // ซ้อน (ถ้ามี)
      const cleanUrl = publicUrlData.publicUrl.replace(/([^:]\/)\/+/g, "$1");
      setImageUrl(cleanUrl);
    };

    fetchProfileImage();
  }, []);

  return (
    <section
      id={SECTION_IDS.HERO}
      className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-br from-background to-muted dark:from-dark-background dark:to-dark-muted px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar */}
        <motion.div className="mb-8" variants={avatarVariants}>
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt="Profile"
              onError={() => setImageError(true)}
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto rounded-full shadow-xl object-cover"
            />
          ) : (
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto rounded-full bg-gradient-to-br from-ssfontcolor to-secfontcolor flex items-center justify-center shadow-xl">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                {personalInfo.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </span>
            </div>
          )}
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary dark:text-dark-foreground mb-4"
          variants={itemVariants}
        >
          {personalInfo.name}
        </motion.h1>

        {/* Title */}
        <motion.h2
          className="text-xl sm:text-2xl lg:text-3xl text-secfontcolor font-semibold mb-6"
          variants={itemVariants}
        >
          {personalInfo.title}
        </motion.h2>

        {/* Bio */}
        <motion.p
          className="text-lg sm:text-xl lg:text-2xl text-foreground mb-8 max-w-3xl mx-auto leading-relaxed dark:text-dark-foregroundlight"
          variants={itemVariants}
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => scrollToSection(SECTION_IDS.PROJECTS)}
            className="w-full sm:w-auto px-8 py-4 bg-secfontcolor text-white font-semibold rounded-lg shadow-lg hover:bg-mainfontcolor active:bg-sobackfontcolor transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-mainfontcolor touch-manipulation min-h-[48px]"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            View My Work
          </motion.button>

          <motion.button
            onClick={() => scrollToSection(SECTION_IDS.CONTACT)}
            className="w-full sm:w-auto px-8 py-4 bg-white text-secfontcolor font-semibold rounded-lg shadow-lg border-2 border-secfontcolor hover:bg-mainfontcolor hover:text-white active:bg-muted transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-mainfontcolor touch-manipulation min-h-[48px]"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.button
            onClick={() => scrollToSection(SECTION_IDS.ABOUT)}
            className="text-muted hover:text-mainfontcolor transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-mainfontcolor rounded-full p-2"
            aria-label="Scroll to about section"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
          >
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default Hero;
