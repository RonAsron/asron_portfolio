import React, { useState, useEffect, useCallback } from "react";

interface UseScrollSpyOptions {
  offset?: number;
  throttleMs?: number;
}

/**
 * Custom hook for scroll spy functionality
 * Detects which section is currently active based on scroll position
 */
export const useScrollSpy = (
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
) => {
  const { offset = 100, throttleMs = 100 } = options;
  const [activeSection, setActiveSection] = useState<string>(
    sectionIds[0] || ""
  );

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + offset;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const sectionId = sectionIds[i];
      const element = document.getElementById(sectionId);

      if (element) {
        const sectionTop = element.offsetTop;
        const sectionHeight = element.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(sectionId);
          break;
        }

        if (i === sectionIds.length - 1 && scrollPosition >= sectionTop) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  }, [sectionIds, offset]);

  // ใช้ useRef เก็บ timeout id
  const timeoutId = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // ฟังก์ชัน throttled scroll handler
  const throttledHandleScroll = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(handleScroll, throttleMs);
  }, [handleScroll, throttleMs]);

  useEffect(() => {
    // เรียก set ค่าครั้งแรก
    handleScroll();

    // ลงทะเบียน event listener
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // ลบ event listener ตอน cleanup
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [handleScroll, throttledHandleScroll]);

  return activeSection;
};
