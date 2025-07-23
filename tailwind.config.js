/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // เปิดใช้ dark mode แบบ class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 🌤️ Light mode colors
        primary: "#1e293b", // สีพื้นฐานหลัก (น้ำเงินเทาเข้ม)
        secondary: "#64748b", // สีรอง (เทาอมน้ำเงินกลาง)
        accent: "#f59e42", // สีเน้น (ส้มพีชสดใส)
        background: "#f8fafc", // พื้นหลัง (เกือบขาว)
        foreground: "#0f172a", // สีข้อความหลัก (น้ำเงินดำเข้ม)
        muted: "#e2e8f0", // สีองค์ประกอบรอง เช่น เส้นขอบ

        // 💖 สีธีมโทนชมพู
        mainfontcolor: "#ffc0cb", // ชมพูอ่อน (หวานๆ น่ารัก)
        secfontcolor: "#BE185D", // ชมพูเข้ม (โดดเด่น)
        ssfontcolor: "#F9A8D4", // ชมพูกลาง (สวยงาม)
        sobackfontcolor: "#DB2777", // ชมพูแดงสด (ใช้พื้นหลังเน้น)

        // 🧠 สีระดับความสามารถ
          beginner: "#f9a8d4",      // ชมพูพาสเทล - สดใส เริ่มต้น
          intermediate: "#fb923c",  // ส้มอุ่นๆ - กำลังพัฒนา
          advanced: "#8b5cf6",      // ม่วงแฟชั่น - เชี่ยวชาญ มีเอกลักษณ์



        // ✍️ สีตัวอักษรตัดกับพื้นหลังของแต่ละระดับ
        fontbeginner: "#1e40af", // น้ำเงินเข้ม - ใช้กับ beginner
        fontintermediate: "#1d4ed8", // น้ำเงินสด - ใช้กับ intermediate
        fontadvanced: "#4c1d95", // ม่วงเข้ม - ใช้กับ advanced

        // 📌 สีพื้นหลังของตัวอักษรใน skill tags หรือ badges
        skillcolor: "#0f172a", // ดำอมน้ำเงินเข้ม (เน้นให้อ่านชัด)

        // 🧾 การ์ดแสดงข้อมูลต่าง ๆ
        cardtext: "#334155", // สีข้อความในการ์ด
        cardbg: "#f0f0f0", // พื้นหลังการ์ด (เทาอ่อน)
        cardbggray: "#e5e7eb", // เทาอ่อนอีกระดับ - ใช้ซ้อนเลเยอร์

        // 🌙 Dark mode colors (prefix `dark:` เมื่อใช้งาน)
        "dark-background": "#0f172a", // พื้นหลังหลัก (น้ำเงินดำ)
        "dark-foreground": "#f8fafc", // สีตัวอักษรหลัก (ขาวเทา)
        "dark-foregroundlight": "#ababab", // สีข้อความรอง
        "dark-muted": "#1e293b", // สีองค์ประกอบรอง
        "dark-accent": "#f59e42", // สีเน้น (ส้ม)

        "dark-mainfontcolor": "#ffc0cb",
        "dark-secfontcolor": "#BE185D",

        "dark-cardtext": "#ffffff", // สีข้อความบนการ์ด
        "dark-cardbg": "#1e293b", // พื้นหลังการ์ด (น้ำเงินเข้ม)
        "dark-cardbggray": "#444b57", // เทาเข้ม - สำหรับซ้อนเลเยอร์
      },
      screens: {
        xs: "475px",
        "3xl": "1600px",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
