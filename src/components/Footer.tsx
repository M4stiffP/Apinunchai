import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-anime-orange/30 py-6 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 mb-6 lg:mb-8">
            {/* Logo Section - Full width on mobile */}
            <div className="lg:col-span-1 text-center lg:text-left">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-graffiti text-anime-orange mb-3 lg:mb-4">
                APINUNCHAI WITTHAYANUKRAO
              </h3>
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                Full Stack Developer & Data Analysis enthusiast. Passionate about creating innovative web solutions 
                and meaningful digital experiences through code.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-1">
              <h4 className="text-base lg:text-lg font-semibold text-white mb-3 lg:mb-4 text-center lg:text-left">Navigation</h4>
              <ul className="space-y-2 lg:space-y-2 flex flex-wrap justify-center lg:block gap-x-6 lg:gap-x-0">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-anime-orange transition-colors duration-300 text-sm lg:text-base whitespace-nowrap"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills/Technologies */}
            <div className="lg:col-span-1">
              <h4 className="text-base lg:text-lg font-semibold text-white mb-3 lg:mb-4 text-center lg:text-left">Technologies</h4>
              <ul className="space-y-2 lg:space-y-2 text-center lg:text-left">
                <li>
                  <span className="text-gray-400 text-sm lg:text-base">
                    React & TypeScript
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 text-sm lg:text-base">
                    Python & Data Analysis
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 text-sm lg:text-base">
                    Node.js & Express
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 text-sm lg:text-base">
                    MySQL & MongoDB
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 text-sm lg:text-base">
                    C# & PHP
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div className="lg:col-span-1">
              <h4 className="text-base lg:text-lg font-semibold text-white mb-3 lg:mb-4 text-center lg:text-left">Connect</h4>
              <div className="space-y-2 lg:space-y-3 mb-4 text-center lg:text-left">
                <p className="text-gray-400 text-sm break-all">📧 Apinunchai.Wtynk@gmail.com</p>
                <p className="text-gray-400 text-sm">📱 061-551-5815</p>
                <p className="text-gray-400 text-sm">📍 Bangkok, Thailand</p>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex justify-center lg:justify-start flex-wrap gap-3 lg:gap-4">
                <a 
                  href="https://github.com/M4stiffP" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-anime-orange/20 hover:bg-anime-orange rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110"
                  aria-label="GitHub Profile"
                >
                  <svg className="w-5 h-5 text-anime-orange group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/apinunchai-witthayanukrao-723a283a4/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-anime-orange/20 hover:bg-anime-orange rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-5 h-5 text-anime-orange group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/pup_wtynk/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-anime-orange/20 hover:bg-anime-orange rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110"
                  aria-label="Instagram Profile"
                >
                  <svg className="w-5 h-5 text-anime-orange group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/apinunchai.wtynk/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-anime-orange/20 hover:bg-anime-orange rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110"
                  aria-label="Facebook Profile"
                >
                  <svg className="w-5 h-5 text-anime-orange group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="mailto:Apinunchai.Wtynk@gmail.com" 
                  className="w-11 h-11 bg-anime-orange/20 hover:bg-anime-orange rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110"
                  aria-label="Send Email"
                >
                  <svg className="w-5 h-5 text-anime-orange group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-4 lg:pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-xs lg:text-sm text-center lg:text-left">
                © 2025 WITTHAYANUKRAO APINUNCHAI. All rights reserved. 
                <span className="block lg:inline lg:ml-1">Full Stack Developer Portfolio.</span>
              </p>
              <div className="flex flex-wrap justify-center lg:justify-end gap-4 lg:gap-6 text-xs lg:text-sm">
                <a href="#about" className="text-gray-400 hover:text-anime-orange transition-colors">
                  About Me
                </a>
                <a href="#projects" className="text-gray-400 hover:text-anime-orange transition-colors">
                  Projects
                </a>
                <a href="#skills" className="text-gray-400 hover:text-anime-orange transition-colors">
                  Skills
                </a>
                <a href="#contact" className="text-gray-400 hover:text-anime-orange transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer