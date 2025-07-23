export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  story: string;
  email: string;
  location: string;
  socialLinks: {
    github: string;
    facebook?: string;
    linkedin: string;
    twitter?: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: "Asron Doloh",
  title: "Full Stack Developer",
  bio: `I am a versatile designer and web developer with expertise in creating intuitive UX/UI designs, providing reliable IT support, and building innovative IoT devices. Skilled in combining software and hardware technologies, I leverage React, Node.js, and various IoT platforms to deliver scalable, user-friendly solutions that meet both technical and business needs.`,

  story: `My journey in technology began with a passion for beautiful, functional design alongside a strong curiosity for technical problem-solving. Starting in IT support, I gained hands-on experience maintaining computer systems and networks while assisting users with technical issues. Over time, I expanded my skills to full-stack web development, mastering modern front-end and back-end frameworks such as React and Node.js to build impactful digital experiences.
At the same time, my fascination with IoT inspired me to design and develop connected devices that enhance everyday life and streamline business operations. This multidisciplinary experience across design, IT support, web development, and IoT allows me to create well-rounded solutions that balance usability, performance, and innovation.
I am eager to continue leveraging my diverse skill set to craft outstanding projects that integrate design excellence with robust technology and real-world applications.`,
  email: "ronasron2546@gmail.com",
  location: "Phuket, Thailand",
  socialLinks: {
    github: "https://github.com/RonAsron",
    facebook: "https://www.facebook.com/asron.doloh.9/",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://x.com/ron_asron",

    // ถ้ามี LinkedIn หรือ X (Twitter) กรอกเพิ่มตรงนี้ได้เลย
  },
};
