import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { NAVIGATION_LINKS, SCROLL_OFFSET } from "../../utils/constants";
import { personalInfo } from "../../data/personal";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { smoothScrollToSection } from "../../utils/dataHelpers";
import ThemeToggle from "../ui/ThemeToggleButton";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use the custom scroll spy hook for active section detection
  const sectionIds = NAVIGATION_LINKS.map((link) => link.id);
  const activeSection = useScrollSpy(sectionIds, {
    offset: SCROLL_OFFSET + 100,
    throttleMs: 100,
  });

  // Close mobile menu when clicking outside or on a link
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest("nav")) {
        closeMobileMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    smoothScrollToSection(sectionId, SCROLL_OFFSET);
    closeMobileMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/90 dark:bg-dark-background/90 backdrop-blur-sm border-b border-gray-200 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Theme Toggle Button */}
          <ThemeToggle />
          
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-xl font-bold text-primary dark:text-dark-foreground transition-colors duration-200"
            >
              {personalInfo.name}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAVIGATION_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === link.id
                      ? "text-secfontcolor dark:text-dark-secfontcolor border-b-2 border-secfontcolor dark:border-dark-secfontcolor"
                      : "text-primary dark:text-dark-foreground hover:text-secfontcolor dark:hover:text-dark-secfontcolor"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-700 hover:text-secfontcolor hover:dark:bg-dark-cardbg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secfontcolor touch-manipulation min-h-[44px] min-w-[44px]"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">
                {isMenuOpen ? "Close menu" : "Open menu"}
              </span>
              {isMenuOpen ? (
                <HiX
                  className="block h-6 w-6 transition-transform duration-200"
                  aria-hidden="true"
                />
              ) : (
                <HiMenu
                  className="block h-6 w-6 transition-transform duration-200"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background dark:bg-dark-cardbg  border-t border-gray-200 shadow-lg">
            {NAVIGATION_LINKS.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg touch-manipulation min-h-[44px] ${
                  activeSection === link.id
                    ? "text-primary dark:text-dark-foreground bg-cardbggray dark:bg-dark-cardbggray border-l-4 border-secfontcolor"
                    : "text-primary dark:text-dark-foregroundlight hover:text-secfontcolor hover:bg-cardbggray dark:hover:bg-dark-cardbggray active:bg-gray-100"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
