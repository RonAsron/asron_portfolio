import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { personalInfo } from '../../data/personal'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const socialIcons = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaEnvelope className="h-4 w-4 mr-3 text-secfontcolor" />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="h-4 w-4 mr-3 text-secfontcolor" />
                <span className="text-gray-300">{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
            <div className="flex flex-wrap gap-4">
              {Object.entries(personalInfo.socialLinks).map(([platform, url]) => {
                if (!url) return null
                const IconComponent = socialIcons[platform as keyof typeof socialIcons]
                if (!IconComponent) return null

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white active:text-secfontcolor transition-colors duration-200 p-2 -m-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label={`Visit my ${platform} profile`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {personalInfo.title} passionate about creating innovative solutions 
              and building meaningful digital experiences.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm mt-2 md:mt-0">
              Built with React & Tailwind CSS
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer